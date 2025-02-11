import { NextResponse } from 'next/server';
import { UserRoleResponse } from '@/app/lib/types';
import { getAuthSession, decrypt } from '@/lib/session';

export async function GET(req: Request): Promise<NextResponse<UserRoleResponse>> {
  try {
    const authSession = getAuthSession()
    const user = await decrypt(authSession)

    const role= user?.userRole as "guest" | "member" | "admin" | undefined ?? null;
    const id = user?.userId ?? null;

    if (!role || !id) {
      return NextResponse.json(
        { role: "guest", id, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Optionally, verify the role and id against your database or authentication service
    
    return NextResponse.json({ role, id }, { status: 200 });
  } catch (error) {
    console.error('Error fetching cookies:', error);
    return NextResponse.json(
      { role: "guest", id: null, message: 'Failed to retrieve cookies' },
      { status: 500 }
    );
  }
}
