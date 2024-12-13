import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req: Request) {
  const cookie = cookies();

  const role = cookie.get('x-custom-role')?.value;
  const id = cookie.get('x-custom-id')?.value;

  return NextResponse.json({role, id}, { status: 200 });
}
