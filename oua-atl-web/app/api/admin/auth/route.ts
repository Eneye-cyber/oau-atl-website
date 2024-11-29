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
    const data = await req.json();
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
      console.log(externalResponse)
      const errorResponse = await externalResponse.json();
      console.error('External login failed:', errorResponse);
      return NextResponse.json(
        { error: 'Login failed', details: errorResponse },
        { status: externalResponse.status }
      );
    }

    // Extract cookies from external response
    const cookies = externalResponse.headers.get('set-cookie');
    const result = await externalResponse.json();

    console.log('Backend response:', result);
    console.log('Cookies:', cookies);

    // Create NextResponse and set cookies
    const nextResponse = NextResponse.json(result, { status: 200 });
    if (cookies) {
      nextResponse.headers.set('Set-Cookie', cookies); // Pass cookies to the client
    }

    return nextResponse;
  } catch (error: any) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error?.message },
      { status: 500 }
    );
  }
}

