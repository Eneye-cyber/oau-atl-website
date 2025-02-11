import { NextResponse } from 'next/server';

const baseUrl = process.env.API_BASE


export async function PUT(req: Request, { params }: {params: {id: string}}) {

  try {
    console.log('Process Gallery form');

    // Parse request body
    let data = await req.json()
    const { id } = params;
    
    const url = `${baseUrl}/gallery/${id}`;
    console.log('Sending form request to:', url);
    console.log('Transformed data : ', data);

    // Make the fetch call to external API
    const incomingCookies = req.headers.get('cookie') || ''; 
    console.log('has cookie', incomingCookies.trim() !== '')

    const externalResponse = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Cookie: incomingCookies,
      },
      body: JSON.stringify(data),
      credentials: 'include', // Ensure cookies are included in the request
    });

    // Handle errors from external API
    if (!externalResponse.ok) {
      const errorDetails = await externalResponse.json().catch(() => ({message: externalResponse.statusText}));
      console.error(`Error from API: ${externalResponse.status} - ${errorDetails}`);
      return NextResponse.json(
        { error: true, message: errorDetails?.message },
        { status: externalResponse.status, statusText: errorDetails?.message ?? 'Something went wrong' }
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
