import { NextResponse } from 'next/server';

const baseUrl = process.env.API_BASE
const transformObject = (input: any) => {
  return {
    content: input.content, // Static value
    title: input.title, // Static value
    startDate: input.startDate, // Current date and time
    endDate: !input?.endDate ? input.startDate : input.endDate, // 10 seconds after startDate
    entranceFee: input.entranceFee, // Static value
    isFeatured: input.isFeatured === "1", // Static value
    tags: input.tags, // Static value
    imageUrl: input.imageUrl, // Static value
    locationData: {
      address: input.address,
      city: input.city, // Use locationAddress as city
      state: input.state, // Use locationState as state
      postalCode: input.locationName, // Use locationName as postalCode
      latLong: {
        lat: 0, // Static value
        long: 0, // Static value
      },
    },
  };
};

export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return NextResponse.json(
      { error: 'Method Not Allowed' },
      { status: 405 }
    );
  }

  try {
    console.log('Process Event form');

    // Parse request body
    let data = await req.json();
    data = transformObject(data)

    const url = `${baseUrl}/physical-events`;

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
