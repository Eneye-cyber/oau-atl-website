import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers';
import { UserRoleResponse } from '@/app/lib/types';
import { currentUserId } from '@/lib/utils/api';

interface User extends UserRoleResponse {
  email: string | null;
}

export async function GET(req: Request): Promise<NextResponse<User>> {
  try {
    const user = await currentUserId()

    const role= user?.role as "guest" | "member" | "admin" | undefined ?? null;
    const id = user?.id ?? null;
    const email = user?.email ?? null

    if (!role || !id || !email) {
      return NextResponse.json(
        { role: "guest", id, email, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Optionally, verify the role and id against your database or authentication service
    
    return NextResponse.json({ role, id, email }, { status: 200 });
  } catch (error) {
    console.error('Error fetching cookies:', error);
    return NextResponse.json(
      { role: "guest", id: null, email: null, message: 'Failed to retrieve cookies' },
      { status: 500 }
    );
  }
}


// const baseUrl = process.env.API_BASE;
// if (!baseUrl) {
//   throw new Error('API_BASE environment variable is not set');
// }

// const TIMEOUT_MS = 20000;

// export async function GET(req: Request): Promise<NextResponse<User>> {
//   const cookieStore = cookies();
//   const incomingCookies = cookieStore.getAll().map(cookie => `${cookie.name}=${encodeURIComponent(cookie.value)}`).join('; ');

//   const url = `${baseUrl}/auth/current`;

//   const controller = new AbortController();
//   const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

//   try {
//     const response: Response = await fetch(url, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Cookie: incomingCookies,
//       },
//       credentials: 'include',
//       signal: controller.signal,
//     });
//     clearTimeout(timeout);

//     if (response.ok) {
//       const result = await response.json();
//       const user: User | null = result?.user || null;
//       if (user) {
//         const { role, id, email } = user;
//         return NextResponse.json({ role, id, email }, { status: 200 });
//       }

//       return NextResponse.json(
//         { role: 'guest', id: null, email: null, message: 'Unauthorized' },
//         { status: 203 }
//       );
//     }

//     if (response.status === 401) {
//       return NextResponse.json(
//         { role: 'guest', id: null, email: null, message: 'Unauthorized' },
//         { status: 401 }
//       );
//     }

//     throw new Error(response.statusText);
//   } catch (error: any) {
//     clearTimeout(timeout);

//     console.error('Error verifying login:', {
//       message: error?.message,
//       cookies: incomingCookies,
//     });

//     return NextResponse.json(
//       { role: 'guest', id: null, email: null, message: error?.message ?? 'An error occurred' },
//       { status: 500 }
//     );
//   }
// }
