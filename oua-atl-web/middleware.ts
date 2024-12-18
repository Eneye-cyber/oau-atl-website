import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

interface User {
  id: string | null;
  email: string | null;
  role: string;
}

const ROUTES = {
  ADMIN_LOGIN: '/admin/login',
  MEMBERS_LOGIN: '/members/login',
  MEMBERS_REGISTER: '/members/register',
  MEMBERS_AREA: '/members-area',
};

const verifyLogin = async (request: NextRequest): Promise<User> => {
  const TIMEOUT_MS = 30000; // Reduced timeout to 5 seconds

  try {
    const incomingCookies = request.headers.get('cookie') || '';
    if (!incomingCookies || !incomingCookies.includes('connect.sid')) {
      throw new Error('Authentication cookie missing or malformed');
    }

    const response = await Promise.race([
      fetch(`${request.nextUrl.origin}/api/admin/auth`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Cookie: incomingCookies,
        },
      }),
      new Promise<Response>((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), TIMEOUT_MS)
      ),
    ]);

    if (response.ok) {
      let result;
      try {
        result = await response.json();
      } catch (err) {
        throw new Error('Invalid response format');
      }

      const user: User | null = result?.data?.user || null;
      if (user) {
        return user;
      }
      throw new Error('Error getting user object');
    }

    throw new Error(`Verification failed with status: ${response.status}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error verifying login:', error.message);
    } else {
      console.error('Unknown error verifying login:', error);
    }
    return { id: null, email: null, role: 'guest' };
  }
};

export async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;
  const user: User = await verifyLogin(request);

  if (currentPath.startsWith('/admin/register')) {
    const response = NextResponse.next();
    response.cookies.set('x-custom-id', user?.id || '' );
    response.cookies.set('x-custom-role', user?.role || '' );
    return response;
  }
  console.log(user, 'user')
  switch (user.role) {
    case 'guest':
      if (currentPath.startsWith('/admin') || currentPath.startsWith('/members')) {
        console.log('guest access only', currentPath)
        const response = NextResponse.redirect(new URL(ROUTES.MEMBERS_LOGIN, request.url));
        response.cookies.delete('connect.sid');
        return response;
      }
      break;

    case 'member':
      if (currentPath.startsWith('/admin')) {
        console.log('members access only', currentPath)
        const response = NextResponse.redirect(new URL('/', request.url));
        response.cookies.set('x-custom-id', user?.id || '' );
        response.cookies.set('x-custom-role', user?.role || '' );
        return response;
      }
      break;

    case 'admin':
      if (currentPath.startsWith('/members')) {
        console.log('admin access only', currentPath)
        const response = NextResponse.redirect(new URL('/', request.url));
        response.cookies.set('x-custom-id', user?.id || '' );
        response.cookies.set('x-custom-role', user?.role || '' );
        return response;
      }
      break;
  }
  console.log('public access', currentPath)

  const response = NextResponse.next();
  response.cookies.set('x-custom-id', user?.id || '' );
  response.cookies.set('x-custom-role', user?.role || '' );
  return response;
}

export const config = {
  matcher: [
    '/((?!api/|_next/|favicon.ico|public/|icons/|img/|members/login|members/register|admin/login).*)',
  ],
};
