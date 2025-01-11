import { NextResponse } from 'next/server';
import json from "@/lib/pages/pageSchema.json";
import layout from "@/lib/pages/siteSchema.json";

export async function GET(req: Request): Promise<NextResponse> {
  // Parse the URL to extract query parameters
  const url = new URL(req.url);
  const schema = url.searchParams.get('schema');

  // Check the value of 'schema' and return the appropriate response
  if (schema === 'layout') {
    return NextResponse.json(layout);
  }

  // Default to returning 'json' if no query or an unrecognized schema is provided
  return NextResponse.json(json);
}
