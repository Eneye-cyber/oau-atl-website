import { createSession, getAuthCookieString, getSessionExpiry } from '@/lib/session';
import { NextResponse } from 'next/server';

const baseUrl = process.env.API_BASE

export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return NextResponse.json(
      { error: 'Method Not Allowed' },
      { status: 405 }
    );
  }

  try {
    console.log('Proocess admin login');

    // Parse request body
    const data = await req.json()
    const url = `${baseUrl}/admins/auth/login`;

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
      const errorDetails = await externalResponse.json().catch(() => ({message: externalResponse.statusText}));
      return NextResponse.json(
        { error: true, message: errorDetails?.message },
        { status: externalResponse.status, statusText: errorDetails?.message ?? 'Something went wrong' }
      );
    }

    // Extract cookies from external response
    const cookies = externalResponse.headers.get('set-cookie');
    const result = await externalResponse.json();

    if(!cookies || !result || !result?.user) {
      return NextResponse.json(
        { error: 'Login failed', details: 'No cookies or result received' },
        { status: 500 }
      );
    }


    // Create NextResponse and set cookies
    const nextResponse = NextResponse.json(result, { status: 200 });
    nextResponse.headers.set('Set-Cookie', cookies); // Pass cookies to the client

    console.log('login result', result)

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


export async function GET(req: Request) {
  try {
    // Construct the target URL
    const url = `${baseUrl}/auth/current`;
    console.log('Requesting admin status from:', url);

    // Make the fetch call to the external API
    const authCookies = getAuthCookieString();
    
    const externalResponse = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: authCookies,
      },
      credentials: 'include', // Ensure cookies are sent with the request
    });

    // Check for errors in the external response
    if (!externalResponse.ok) {
      const errorResponse = await externalResponse.json();
      console.error('External API error:', errorResponse);
      return NextResponse.json(
        { error: 'Failed to fetch login status', details: errorResponse },
        { status: externalResponse.status }
      );
    }

    // Parse and return the successful response
    const result = await externalResponse.json();
    return NextResponse.json(
      { message: 'Login status retrieved successfully', data: result },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Server error:', error);

    return NextResponse.json(
      { error: 'Internal Server Error', details: error?.message },
      { status: 500 }
    );
  }
}