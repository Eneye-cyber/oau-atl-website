
import { NextResponse } from 'next/server';
import { PaymentResponse } from '@/app/lib/types';
import { getAuthCookieString } from '@/lib/session';

const baseUrl = process.env.API_BASE;
if (!baseUrl) {
  throw new Error('API_BASE environment variable is not set');
}

const TIMEOUT_MS = 10000;
const paymentUrl: Record<string, string> = {
  'booking': `${baseUrl}/bookings/pay`,
  'donation': `${baseUrl}/donations/pay`,
  'subscription': `${baseUrl}/subscriptions/pay`

}

export async function POST(req: Request): Promise<NextResponse<PaymentResponse>> {
  const authCookies = getAuthCookieString(); 

  const data = await req.json().catch(() => ({message: req.statusText}))
  const paymentType: keyof typeof paymentUrl = data.paymentType
  const url = paymentUrl[paymentType]
  delete data['paymentType']


  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response: Response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: authCookies,
      },
      credentials: 'include',
      body: JSON.stringify(data),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (response.ok) {
      const result = await response.json().catch(() => ({message: response.statusText}));
      console.log(result)
      return NextResponse.json(
        {...result},
        { status: 200 }
      );
    }
    console.log(response.statusText)
    if(response.status === 400) {
      const result = await response.json().catch(() => ({message: response.statusText}));
      return NextResponse.json (
        {message: `Backend error: ${result.message}`},
        { status: response.status }
      );
    }
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
