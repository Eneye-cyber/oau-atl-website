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
    const cookies = req.headers.get('cookie') || ''; 
    // console.log('Logging out...', cookies);

    // Parse request body
    const data = await req.json().catch(() => ({message: req.statusText}));
    const url = `${baseUrl}/admins/${data.id}/logout`;

    console.log('Sending logout request to:', url);

    // Make the fetch call to external API
    const externalResponse = await fetch(url, {
      method: 'POST',
      headers: {
        Cookie: cookies,
      },
      credentials: 'include', // Ensure cookies are included in the request
    });

    // Handle errors from external API
    if (!externalResponse.ok) {
      console.log(externalResponse)
      const errorResponse = await externalResponse.text();
      console.error('External logout failed:', errorResponse);
      console.error('Status:', );
      if(externalResponse.statusText === "Unauthorized") {
        const nextResponse = NextResponse.json(
          { message: "Logged out" },
          { status: 200 }
        );
        nextResponse.headers.set('Set-Cookie', 'session=; Path=/; HttpOnly; Secure; Max-Age=0;');

        console.log('Response:', nextResponse);
        return nextResponse;
      }
      return NextResponse.json(
        { message: externalResponse.statusText ?? 'Login failed', details: errorResponse },
        { status: externalResponse.status }
      );
    }

    // Extract cookies from external response
    

    // Create NextResponse and set cookies
    const nextResponse = NextResponse.json({ message: "Logged out" }, { status: 200 });
    nextResponse.headers.set('Set-Cookie', 'session=; Path=/; HttpOnly; Secure; Max-Age=0;');

    console.log('Response:', nextResponse);
    return nextResponse;
  } catch (error: any) {
    console.error('Server error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', details: error?.message },
      { status: 500 }
    );
  }
}
