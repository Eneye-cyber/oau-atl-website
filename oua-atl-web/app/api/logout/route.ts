// app/api/logout/route.js
import { NextResponse } from 'next/server';

const url = process.env?.APP_URL ?? 'http://localhost:3000'
export async function POST(req: Request) {
  const referer = req.headers.get('referer')
  const response = NextResponse.redirect(referer || `${url}/`);

  response.cookies.set('connect.sid', '', { maxAge: 0 }); // Clear auth token or session cookie
  response.cookies.set('x-custom-id', '')
  response.cookies.set('x-custom-role', '')
  return response;
}
