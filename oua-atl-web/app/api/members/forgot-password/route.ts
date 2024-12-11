import { NextResponse } from 'next/server';

const baseUrl = process.env.API_BASE


export async function POST(req: Request) {

  try {
    // Parse request body
    const data = await req.json();


    const url = `${baseUrl}/users/request-password`;
    const body = JSON.stringify(data)

    console.log('Sending Sign up request to:', url);
    console.log('Sending data:', body);
    // Make the fetch call


   const query = await fetch(url, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(data),
     credentials: 'include', // Ensure cookies are included in the request
   });

    // Handle query from the external API
    if (!query.ok) {
      const errorResponse = await query.json();
      console.error('Password request failed:', errorResponse);
      return NextResponse.json(
        { error: 'Password request', details: errorResponse },
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