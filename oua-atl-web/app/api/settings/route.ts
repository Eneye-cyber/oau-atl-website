import { NextResponse } from 'next/server';
import layout from "@/lib/pages/siteSchema.json";
import { connectToDatabase } from "@/lib/mongodb";
import { SiteSchema, PageData } from '@/app/lib/types';

export async function GET(req: Request): Promise<NextResponse> {
  try {
    const { db } = await connectToDatabase();
    // Parse URL query parameters
    const url = new URL(req.url);
    const isTemp = url.searchParams.get('isTemp');

    const collectionName = isTemp === 'true' ? 'temp_site_settings' : 'site_settings'
    console.log(collectionName, collectionName, 'collectionName')
    const settings = await db.collection(collectionName);


    // Fetch all site settings (or filter by slug if necessary)
    const sections = await settings.find({}).toArray();

    // Transform data into the expected structure
    const jsonData: SiteSchema = {
      general: sections.reduce((acc: any, page) => {
        acc[page.name] = page;
        return acc;
      }, {}),
    };

    // Return transformed data
    return NextResponse.json({ data: jsonData, message: '' });
  } catch (error) {
    console.error('Error fetching page schema:', error);

    // Fallback response
    return NextResponse.json(
      {
        data: layout,
        message: 'An error occurred while retrieving the page schema.',
      },
      { status: 500 }
    );
  }
}
