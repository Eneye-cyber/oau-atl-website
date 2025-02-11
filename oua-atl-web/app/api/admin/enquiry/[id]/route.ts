import { getAuthCookieString } from '@/lib/session';
import { NextResponse } from 'next/server';

const baseUrl = process.env.API_BASE
export async function PUT(req: Request, { params }: {params: {id: string}}) {
  try {
    console.log('Process Event form');
    const { id } = params;


    const url = `${baseUrl}/contact/${id}/close`;
    // Make the fetch call to external API
     const authCookies = getAuthCookieString(); 

    const externalResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: authCookies,
      },
      credentials: 'include', // Ensure cookies are included in the request
    });

    if (!externalResponse.ok) {
      const errorResponse =  externalResponse.statusText; 

      return NextResponse.json(
        { message: 'Failed to submit', error: true },
        { status: externalResponse.status, statusText: errorResponse }
      );
    }

    const result = await externalResponse.json();

    

    // Create NextResponse and set cookies
    const nextResponse = NextResponse.json({...result, message: "This issue has been marked as resolved"}, { status: 200 });

    return nextResponse;
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Internal Server Error', details: error?.message, error: true },
      { status: 500 }
    );
  }
}
