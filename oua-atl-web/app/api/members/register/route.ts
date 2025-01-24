import { NextResponse } from 'next/server';

const baseUrl = process.env.API_BASE


export async function POST(req: Request) {

  try {
    // Parse request body
    const data = await req.json();
    if(data.password !== data.confirm_password) {
      console.log('password verification failed')
      return NextResponse.json(
        { error: 'Password verification failed' },
        { status: 403 }
      );
    }

    const url = `${baseUrl}/users/auth/signup`;
    delete data['confirm_password']
    data['joinedFromMedia'] = "None"
    const body = JSON.stringify(data)

    // console.log('Sending Sign up request to:', url);
    // console.log('Sending data:', body);
    // Make the fetch call
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    // Handle response from the external API
    if (response.ok) {
      const result = await response.json();

    return NextResponse.json(
      { ...result },
      { status: 200 }
    );
      
    }

    const errorResponse = response.statusText;
      return NextResponse.json(
        { error: 'Sign up failed', details: errorResponse },
        { status: response.status, statusText: errorResponse }
      );


  } catch (error: any) {
    console.error('Server error:', error);

    return NextResponse.json(
      { error: 'Internal Server Error', details: error?.message },
      { status: 500, statusText: (error as Error)?.message }
    );
  }
}
