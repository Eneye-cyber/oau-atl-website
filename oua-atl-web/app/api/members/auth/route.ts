import { createSession, getSessionExpiry } from '@/lib/session';
import { NextResponse } from 'next/server';

const baseUrl = process.env.API_BASE

interface loginResult {
  message: string;
  user: {
    email: string;
    id: string;
    role: 'member' | 'admin'
  }
}

export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return NextResponse.json(
      { error: 'Method Not Allowed' },
      { status: 405 }
    );
  }

  try {
    // Parse request body
    console.log('Proocess members login');
    const data = await req.json();
    const url = `${baseUrl}/users/auth/login`;

    console.log('Sending login request to:', url);

    // Make the fetch call to external API
    const externalResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include', // Ensure cookies are included in the request
    });

    // Handle errors from external API
    if (!externalResponse.ok) {
      const errorResponse = await externalResponse.json();
      console.error('External login failed:', errorResponse);
      return NextResponse.json(
        { error: 'Login failed', details: errorResponse },
        { status: externalResponse.status }
      );
    }

    // Extract cookies from external response
    const cookies = externalResponse.headers.get('set-cookie');
    const result: loginResult = await externalResponse.json();

    if(!cookies || !result || !result?.user) {
      return NextResponse.json(
        { error: 'Login failed', details: 'No cookies or result received' },
        { status: 500 }
      );
    }

    // Create NextResponse and set cookies
    const nextResponse = NextResponse.json(result, { status: 200 });
    nextResponse.headers.set('Set-Cookie', cookies); // Pass cookies to the client

    // connect.sid=s%3Akj0W8CZKFVKxNgegX9hZetEN3I1HXYlR.Mm01aEJ9tXzBpmKXxRf7UI66E0I0vZ2xWTNnKALaY7E; Path=/; Expires=Fri, 14 Feb 2025 14:51:38 GMT; HttpOnly
    const user = result?.user;
    const expiresAt = getSessionExpiry(cookies)
    await createSession(user.id, user.role, user.email, expiresAt);
    return nextResponse;

  } catch (error: any) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error?.message },
      { status: 500 }
    );
  }
}
