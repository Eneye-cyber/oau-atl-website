import { NextResponse } from 'next/server';

const baseUrl = process.env.API_BASE


export async function POST(req: Request) {
  // Validate the HTTP method
  if (req.method !== 'POST') {
    return NextResponse.json(
      { error: 'Method Not Allowed' },
      { status: 405 }
    );
  }

  try {
    // Parse request body
    const data = await req.json();

    const url = `${baseUrl}/auth/login`;

    console.log('Sending login request to:', url);

    // Make the fetch call
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Handle response from the external API
    if (!response.ok) {
      const errorResponse = await response.json();
      console.error('Login failed:', errorResponse);
      return NextResponse.json(
        { error: 'Login failed', details: errorResponse },
        { status: response.status }
      );
    }

    const result = await response.json();

    return NextResponse.json(
      { message: 'Form submitted successfully', data: result },
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
