import { NextResponse } from 'next/server';

const baseUrl = process.env.API_BASE

export async function POST(req: Request) {

  try {
    console.log('Proocess Contact Enquiry');

    // Parse request body
    const data = await req.json().catch(() => ({message: req.statusText}));
    const url = `${baseUrl}/contact`;

    console.log('Sending Contact Enquiry: ', url);
    console.log('Sending Contact Enquiry: ', data);

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
      console.error('Contact Enquiry failed:', errorResponse);
      return NextResponse.json(
        { error: 'Contact Enquiry', details: errorResponse },
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
