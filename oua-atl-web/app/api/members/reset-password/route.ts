import { NextResponse } from 'next/server';

const baseUrl = process.env.API_BASE


export async function POST(req: Request) {

  try {
    // Parse request body
    const data = await req.json()
    const id = data.id;

    delete data['id']

    const url = `${baseUrl}/users/${id}/reset-password`;
    const body = JSON.stringify(data)

    console.log('Sending Sign up request to:', url);
    console.log('Sending data:', body);
    // Make the fetch call
   // Make the fetch call to external API
   const incomingCookies = req.headers.get('cookie') || ''; 
   console.log('has cookie', incomingCookies.trim() !== '')

   const query = await fetch(url, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       Cookie: incomingCookies,
     },
     body: JSON.stringify(data),
     credentials: 'include', // Ensure cookies are included in the request
   });

    // Handle query from the external API
    if (!query.ok) {
      const errorResponse = await query.json();
      console.error('Sign up failed:', errorResponse);
      return NextResponse.json(
        { error: 'Sign up failed', details: errorResponse },
        { status: query.status }
      );
    }

    const result = await query.json();
    

    const response = NextResponse.json(
      { ...result },
      { status: 200 }
    );

    response.cookies.set('flash-message', 'Password changed successfully', {
      httpOnly: true,
      path: '/',
      maxAge: 60, // 1 minute to ensure the message is temporary
    });

    return response;

  } catch (error: any) {
    console.error('Server error:', error);

    return NextResponse.json(
      { error: 'Internal Server Error', details: error?.message },
      { status: 500 }
    );
  }
}