import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { UserRoleResponse } from '@/app/lib/types';
import { checkAccess } from './router/accessControl';
import { decrypt, getAuthSession } from './lib/session';

interface User extends UserRoleResponse {
  email: string | null;
}

export async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;
  
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
  // if (redirectPath) {
  //   console.log(`Access restricted for role ${role}. Redirecting to ${redirectPath}`);
  //   const response = NextResponse.redirect(new URL(redirectPath, request.url));
  //   return response;
  // }
  // console.log('public access', currentPath, user)

  const response = NextResponse.next();
  return response;
}

export const config = {
  matcher: [
    '/((?!api/|_next/|favicon.ico|public/|icons/|img/|members/|admin/|members-area).*)',
  ],
};
