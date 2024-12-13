import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server';

interface User {
  id: string;
  email: string;
  role: string;
}

const ROUTES = {
  ADMIN_LOGIN: '/admin/login',
  MEMBERS_LOGIN: '/members/login',
  MEMBERS_REGISTER: '/members/register',
  MEMBERS_AREA: '/members-area',
};

const verifyLogin = async (request: NextRequest): Promise<User | null> => {
  const TIMEOUT_MS = 30000; // 5 seconds timeout for the fetch request

  try {
    const incomingCookies = request.headers.get('cookie') || '';
    // const cookie = cookies().get('connect.sid')?.value || '';
  

    // console.log('cookie:', cookie);
    
    console.log('middlewareCookies:', incomingCookies);
    if(!incomingCookies) return null;

    // Adding a timeout wrapper around fetch
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
      const result = await response.json();
      const user: User | null = result?.data?.user || null;
      if (!user) throw new Error('Error getting user object');
      console.log('verification result:', user.role);
      return user;
    } else {
      console.error(`Verification failed with status: ${response.status}`);
      throw new Error(response.statusText ?? 'Error getting user')
    }
  } catch (error: any) {
    console.error('Error verifying login:', error.message);
    return null
  }
};



export async function middleware(request: NextRequest) {
  console.log('current route', request.nextUrl.pathname);
  const currentPath = request.nextUrl.pathname;
  // const user = {id: '', role: ''};
  const user = await verifyLogin(request);
  console.log('middleware user', user, 'vid')

  const isFormRoute = (path: string, allowedPaths: string[]) =>
    allowedPaths.includes(path);

  if (!user) {
    let response;
    console.log('unaunthicated')
    // cookies().set('connect.sid', '', { maxAge: 0 });
    if ((currentPath.startsWith('/admin') || currentPath.startsWith('/members')) 
      && 
      !isFormRoute(currentPath, [ROUTES.ADMIN_LOGIN, ROUTES.MEMBERS_LOGIN, ROUTES.MEMBERS_REGISTER, ROUTES.MEMBERS_AREA])
    ) {
      console.log(1)
      response = NextResponse.redirect(new URL('/', request.url));
    } else {
      console.log(2)
      response = NextResponse.next();
    }
    response.cookies.delete('connect.sid'); 
    response.cookies.delete('x-custom-id'); 
    response.cookies.delete('x-custom-role'); 
    return response;
  }

  const isAdmin = user?.role === 'admin';
  const isMember = user?.role === 'member';
  
  
  // if (isAdmin && currentPath === ROUTES.ADMIN_LOGIN) {
  //   console.log('User is admin')
  //   let response = NextResponse.redirect(new URL('/', request.url));
  //   response.cookies.set('x-custom-id', user?.id || '');
  //   response.cookies.set('x-custom-role', user?.role || '');
  //   return response;
  // }
  // if (isMember && [ROUTES.MEMBERS_LOGIN, ROUTES.MEMBERS_REGISTER].includes(currentPath)) {
  //   console.log('User is member')
  //   return NextResponse.redirect(new URL('/', request.url));
  // }
  // if (currentPath.startsWith('/admin') && !isAdmin) {
  //   console.log('User is not an admin')
  //   return NextResponse.redirect(new URL('/admin/login', request.url));
  // }
  // if (currentPath.startsWith('/members') && !isMember) {
  //   console.log('User is not a member')
  //   return NextResponse.redirect(new URL('/members/login', request.url));
  // }

  const response = NextResponse.next();
  response.cookies.set('x-custom-id', user?.id || '');
  response.cookies.set('x-custom-role', user?.role || '');
  return response;
}

export const config = {
  matcher: [
    // Match all paths except those starting with "/api" or other static assets
    '/((?!api/|_next/|favicon.ico|public/|icons/).*)',
  ],
};
