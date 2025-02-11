import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'

const baseUrl = process.env.API_BASE;

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  if (!baseUrl) {
    console.error('API_BASE environment variable is not defined');
    return NextResponse.json(
      { error: 'Server Configuration Error' },
      { status: 500 }
    );
  }

  const { id } = params;
    const cookieStore = cookies();
    const incomingCookies = cookieStore.getAll().map(cookie => `${cookie.name}=${encodeURIComponent(cookie.value)}`).join('; ');
  try {
    const data = await req.json().catch(() => ({message: req.statusText}));
    const url = `${baseUrl}/users/${id}/profile`;
    const body = JSON.stringify(data);

    console.log('Sending PUT request to:', url);
    console.log('Request body:', body);

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Cookie: incomingCookies,
      },
      body,
    });

    console.log('External API response status:', response.status);
    console.log('External API response body:', await response.clone().text());

    if (response.ok) {
      const result = await response.json().catch(() => ({message: response.statusText}));
      return NextResponse.json(result, { status: 200 });
    }

    const errorDetails = await response.json().catch(() => ({message: response.statusText}));
    return NextResponse.json(
      { error: 'Profile Update failed', details: errorDetails },
      { status: response.status, statusText: errorDetails?.message ?? 'Something went wrong' }
    );
  } catch (error: any) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
