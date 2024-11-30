import { NextResponse } from 'next/server';

const baseUrl = process.env.API_BASE

export async function GET(req: Request) {

  try {
    console.log('Remove Event ');

    // Parse request body
    let id = req.url.split("/").at(-1)

    const url = `${baseUrl}/physical-events/${id}`;

    console.log('Getting event details from:', url);

    // Make the fetch call to external API
    const incomingCookies = req.headers.get('cookie') || ''; 
    console.log('has cookie', incomingCookies.trim() !== '')

    const externalResponse = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: incomingCookies,
      },
      credentials: 'include', // Ensure cookies are included in the request
    });

    // Handle errors from external API
    if (!externalResponse.ok) {
      const errorResponse = await externalResponse.text(); // Use text() if JSON fails
      console.error(`Error from API: ${externalResponse.status} - ${errorResponse}`);

      return NextResponse.json(
        { error: 'Failed to delete', details: errorResponse },
        { status: externalResponse.status }
      );
    }

    const result = await externalResponse.json();

    console.log('Backend event response:', result);

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

export async function DELETE(req: Request) {
  if (req.method !== 'DELETE') {
    return NextResponse.json(
      { error: 'Method Not Allowed' },
      { status: 405 }
    );
  }

  try {
    console.log('Remove Event ');

    // Parse request body
    let id = req.url.split("/").at(-1)

    const url = `${baseUrl}/physical-events/${id}`;

    console.log('Sending form request to:', url);

    // Make the fetch call to external API
    const incomingCookies = req.headers.get('cookie') || ''; 
    console.log('has cookie', incomingCookies.trim() !== '')

    const externalResponse = await fetch(url, {
      method: 'DELETE',
      headers: {
        Cookie: incomingCookies,
      },
      credentials: 'include', // Ensure cookies are included in the request
    });

    // Handle errors from external API
    if (!externalResponse.ok) {
      const errorResponse = await externalResponse.text(); // Use text() if JSON fails
      console.error(`Error from API: ${externalResponse.status} - ${errorResponse}`);

      return NextResponse.json(
        { error: 'Failed to delete', details: errorResponse },
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
