import { NextResponse } from 'next/server';

const baseUrl = process.env.API_BASE

export async function POST(req: Request): Promise<NextResponse> {


  try {

    // Check content type
    const contentType = req.headers.get('content-type');
    if (!contentType?.startsWith('multipart/form-data')) {
      return NextResponse.json(
        { error: 'Invalid content type, expected multipart/form-data' },
        { status: 400 }
      );
    }

    // Parse FormData
    const formData = await req.formData();

    // Extract the file from FormData
    const file = formData.get('file') as File | null;
    if (!file) {
      return NextResponse.json({ error: 'File not provided' }, { status: 400 });
    }

    console.log('Received file:', file.name);

    // Create a new FormData object to send to the external API
    const externalFormData = new FormData();
    externalFormData.append('images', file);

    // External API URL
    const url = `${baseUrl}/images`;

    console.log('Sending image upload request to:', url);

    // Make the fetch call to the external API
    console.log('externalFormData', externalFormData)

    const externalResponse = await fetch(url, {
      method: 'POST',
      body: externalFormData,
    });

    // Handle errors from the external API
    if (!externalResponse.ok) {
      const errorResponse = await externalResponse.json();
      console.error('External API failed:', errorResponse);
      return NextResponse.json(
        { error: 'Upload failed', details: errorResponse },
        { status: externalResponse.status }
      );
    }

    // Parse the successful response
    const result = await externalResponse.json();

    console.log('External API response:', result);

    // Respond with the result
    return NextResponse.json(result, { status: 200 });
  } catch (error: unknown) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: (error as Error)?.message },
      { status: 500, statusText: (error as Error)?.message }
    );
  }
}