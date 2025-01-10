import { NextResponse } from 'next/server';
import json from "@/lib/pages/pageSchema.json"

export async function GET(req: Request): Promise<NextResponse<typeof json>> {
  return NextResponse.json(json);
}
