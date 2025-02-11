import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { UserRoleResponse } from '@/app/lib/types';
import { checkAccess } from './router/accessControl';
import { decrypt, getAuthSession } from './lib/session';

interface User extends UserRoleResponse {
  email: string | null;
}
// const ROUTES = {
//   ADMIN_LOGIN: '/admin/login',
//   MEMBERS_LOGIN: '/members/login',
//   MEMBERS_REGISTER: '/members/register',
//   MEMBERS_AREA: '/members-area',
// };

// const verifyLogin = async (request: NextRequest): Promise<User> => {

//   const incomingCookies = request.headers.get('cookie') || '';
  
//   try {
//     if (!incomingCookies || !incomingCookies.includes('connect.sid')) {
//       throw new Error('Authentication cookie missing or malformed');
//     }
  
//     const response = await  fetch(`${request.nextUrl.origin}/api/current`, {
//       method: 'GET',
//       credentials: 'include',
//       headers: {
//         'Content-Type': 'application/json',
//         Cookie: incomingCookies,
//       },
//       cache: 'no-cache'
//     });

//     if (response.ok) {
//       const result: User = await response.json()
//       return result
//     }

//     console.log(`Verification failed with status: ${response.status}`);
//     throw new Error(`Verification failed: ${response.statusText}`);
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       console.error('Error verifying login:', error.message);
//     } else {
//       console.error('Unknown error verifying login:', error);
//     }
//     return { id: null, email: null, role: 'guest', message: 'Unsuccessfull authentication' };
//   }
// };


export async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;
  const cookie = request.cookies?.get('connect.sid')?.value
  // const user: User = await verifyLogin(request);
  
  const authSession = getAuthSession()
  const user = await decrypt(authSession)

  if (currentPath.startsWith('/admin/register')) {
    const response = NextResponse.next();
    return response;
  }
  // console.log(user, 'user')
  const role = user?.userRole as "member" | "admin" ?? "guest"
  
  // Check access using externalized logic
  const redirectPath = checkAccess(role, currentPath);
  if (redirectPath) {
    console.log(`Access restricted for role ${role}. Redirecting to ${redirectPath}`);
    const response = NextResponse.redirect(new URL(redirectPath, request.url));
    return response;
  }
  // console.log('public access', currentPath, user)

  const response = NextResponse.next();
  return response;
}

export const config = {
  matcher: [
    '/((?!api/|_next/|favicon.ico|public/|icons/|img/|members/login|members/register|admin/login|members-area).*)',
  ],
};
