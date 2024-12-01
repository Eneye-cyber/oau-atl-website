import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export async function middleware(request: NextRequest) {
  // const protectedRoutes
  const currentPath = request.nextUrl.pathname
  console.log('currentPath', currentPath)
  const user = await verifyLogin(request)
  // if (!user) {
  //   return NextResponse.redirect(new URL('/login', request.url))
  // }
  const response = NextResponse.next();
  response.headers.set('x-custom-id', user?.id || '');
  response.headers.set('x-custom-role', user?.role || '');
  return response;
}
 
const verifyLogin = async (request: NextRequest): Promise<{ id: string; email: string; role: string;} | null> => {
  try {
    // Use absolute URL for fetch calls in Edge Runtime
    const incomingCookies = request.headers.get('cookie') || ''; 
    console.log('middleWareCookies', incomingCookies)
    const response = await fetch(`${request.nextUrl.origin}/api/admin/auth`, {
      method: 'GET',
      credentials: 'include', // Pass cookies if needed
      headers: {
        'Content-Type': 'application/json',
        Cookie: incomingCookies,
      },
    });

    console.log('verification response:', response.status);

    if (response.ok) {
      const result = await response.json();
      console.log('verification result middle:', result);
      const user = result?.data?.user || null;
      return user; // Adjust based on your API response
    }
  } catch (error) {
    console.error('Error verifying login:', error);
  }

  return null; // Default to unauthenticated
};


// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/((?!api|_next|favicon.ico|public).*)', // Exclude API, all _next assets, favicon, and public assets
  ],
};