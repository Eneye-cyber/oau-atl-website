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
    console.log('Process Executive form');

    // Parse request body
    let data = await req.json().catch(() => ({message: req.statusText}));

    const url = `${baseUrl}/executives`;

    console.log('Sending form request to:', url);
    console.log('Transformed data : ', data);

    // Make the fetch call to external API
    const incomingCookies = req.headers.get('cookie') || ''; 
    console.log('has cookie', incomingCookies.trim() !== '')

    const externalResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: incomingCookies,
      },
      body: JSON.stringify(data),
      credentials: 'include', // Ensure cookies are included in the request
    });

    // Handle errors from external API
    if (!externalResponse.ok) {
      const errorResponse = await externalResponse.text(); // Use text() if JSON fails
      console.error(`Error from API: ${externalResponse.status} - ${errorResponse}`);

      return NextResponse.json(
        { error: 'Failed to submit', details: errorResponse },
        { status: externalResponse.status }
      );
    }

    const result = await externalResponse.json();

    console.log('Backend response:', result);

    // Create NextResponse and set cookies
    const nextResponse = NextResponse.json(result, { status: 200 });

    return nextResponse;
  } catch (error: any) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error?.message },
      { status: 500 }
    );
  }
}
