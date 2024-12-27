import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { UserRoleResponse } from '@/app/lib/types';

export async function GET(req: Request): Promise<NextResponse<UserRoleResponse>> {
  try {
    const cookieStore = cookies();

    const role = cookieStore.get('x-custom-role')?.value ?? null;
    const id = cookieStore.get('x-custom-id')?.value ?? null;

    if (!role || !id) {
      return NextResponse.json(
        { role, id, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Optionally, verify the role and id against your database or authentication service

    return NextResponse.json({ role, id }, { status: 200 });
  } catch (error) {
    console.error('Error fetching cookies:', error);
    return NextResponse.json(
      { role: null, id: null, message: 'Failed to retrieve cookies' },
      { status: 500 }
    );
  }
}
