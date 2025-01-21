import { NextResponse } from 'next/server';

const baseUrl = process.env.API_BASE

export async function GET(req: Request) {

  try {
    console.log('Remove Event ');

    // Parse request body
    let id = req.url.split("/").at(-1)

    const url = `${baseUrl}/projects/${id}`;

    console.log('Getting projects details from:', url);

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

    console.log('Backend project response:', result);

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

    const url = `${baseUrl}/projects/${id}`;

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

const transformObject = (input: any) => {
  return {
    amountGoal: input.amountGoal,
    projectText: input.projectText,
    projectTitle: input.projectTitle,
    deadline: input.deadline,
    isFeatured: false, // Static value
    imageURL: input.imageURL, // Static value
    locationData: {
      city: input.city, // Use locationAddress as city
      state: input.state, // Use locationState as state
      address: input.address, // Use locationName as postalCode
      latLong: {
        lat: 0, // Static value
        long: 0, // Static value
      },
    },
  };
};

export async function PUT(req: Request, { params }: {params: {id: string}}) {

  try {
    console.log('Process project form');
    const { id } = params;

    // Parse request body
    let data = await req.json();
    data = transformObject(data)

    const url = `${baseUrl}/projects/${id}`;

    console.log('Sending form request to:', url);
    console.log('Transformed data : ', JSON.stringify(data));

    // Make the fetch call to external API
    const incomingCookies = req.headers.get('cookie') || ''; 

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
      const errorResponse = externalResponse.statusText; // Use text() if JSON fails
      console.error(`Error from API: ${externalResponse.status} - ${errorResponse}`);

      return NextResponse.json(
        { error: 'Failed to submit', details: errorResponse },
        { status: externalResponse.status, statusText: errorResponse }
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
