
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { PaymentResponse } from '@/app/lib/types';

const baseUrl = process.env.API_BASE;
if (!baseUrl) {
  throw new Error('API_BASE environment variable is not set');
}

const TIMEOUT_MS = 10000;

export async function POST(req: Request): Promise<NextResponse<PaymentResponse>> {
  const cookieStore = cookies();
  const incomingCookies = cookieStore.getAll().map(cookie => `${cookie.name}=${encodeURIComponent(cookie.value)}`).join('; ');

  const url = `${baseUrl}/donations/pay`;
  const data = await req.json()

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  console.log('trial run', data);
  try {
    const response: Response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: incomingCookies,
      },
      credentials: 'include',
      body: JSON.stringify(data),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (response.ok) {
      const result = await response.json();
      console.log(result)
      return NextResponse.json(
        {...result},
        { status: 200 }
      );
    }
    console.log(response.statusText)
    return NextResponse.json (
      {message: `Backend error: ${response.statusText}`},
      { status: response.status }
    );
  } catch (error: any) {
    clearTimeout(timeout);


    return NextResponse.json(
      { message: error?.message ?? 'An error occurred' },
      { status: 500 }
    );
  }
}
