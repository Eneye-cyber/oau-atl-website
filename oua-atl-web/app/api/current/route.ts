import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { UserRoleResponse } from '@/app/lib/types';

interface User extends UserRoleResponse {
  email: string | null;
}

const baseUrl = process.env.API_BASE;
if (!baseUrl) {
  throw new Error('API_BASE environment variable is not set');
}

const TIMEOUT_MS = 10000;

export async function GET(req: Request): Promise<NextResponse<User>> {
  const cookieStore = cookies();
  const incomingCookies = cookieStore.getAll().map(cookie => `${cookie.name}=${encodeURIComponent(cookie.value)}`).join('; ');
  const incomingCookies2 = req.headers.get('cookie') || ''; 

  const url = `${baseUrl}/auth/current`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response: Response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: incomingCookies2,
      },
      credentials: 'include',
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (response.ok) {
      const result = await response.json();
      const user: User | null = result?.user || null;
      if (user) {
        const { role, id, email } = user;
        return NextResponse.json({ role, id, email }, { status: 200 });
      }

      return NextResponse.json(
        { role: null, id: null, email: null, message: 'Unauthorized' },
        { status: 203 }
      );
    }

    if (response.status === 401) {
      return NextResponse.json(
        { role: null, id: null, email: null, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    throw new Error(response.statusText);
  } catch (error: any) {
    clearTimeout(timeout);

    console.error('Error verifying login:', {
      message: error?.message,
      cookies: incomingCookies,
    });

    return NextResponse.json(
      { role: null, id: null, email: null, message: error?.message ?? 'An error occurred' },
      { status: 500 }
    );
  }
}
