// app/api/logout/route.js
import { deleteSession } from '@/lib/session';
import { NextResponse } from 'next/server';

const url = process.env?.APP_URL ?? 'http://localhost:3000'
export async function POST(req: Request) {
  const referer = req.headers.get('referer')
  deleteSession()
  const response = NextResponse.redirect(referer || `${url}/`);

  
  return response;
}

export async function GET(req: Request) {
  const referer = req.headers.get('referer')
  deleteSession()
  const response = NextResponse.redirect(referer || `${url}/`);
  return response;
}
