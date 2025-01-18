import { NextResponse } from 'next/server';
import json from "@/lib/pages/pageSchema.json";
import layout from "@/lib/pages/siteSchema.json"; 
import { connectToDatabase } from "@/lib/mongodb";
import { JsonData, PageData } from '@/app/lib/types';

export async function GET(req: Request): Promise<NextResponse> {
  // Parse the URL to extract query parameters
  const { searchParams } = new URL(req.url);
  const schema = searchParams.get('schema');

  // Check the value of 'schema' and return the appropriate response
  if (schema === 'layout') {
    return NextResponse.json(layout);
  }
  // Extract slug from query parameters
   const slug = searchParams.get('slug');
 
   if (!slug) {
     return NextResponse.json(
       {
        data: json,
         message: 'Page slug is required',
       },
       { status: 400 }
     );
   }
 
   try {
     const { db } = await connectToDatabase();
     const page = await db.collection('pages').findOne({ name: slug });
 
     if (!page) {
       return NextResponse.json(
         {
          data: json,
           message: 'Page not found',
         },
         { status: 404 }
       );
     }
 
     const jsonData: JsonData = { pages: {} };
     jsonData.pages[slug] = page as unknown as PageData;
 
     return NextResponse.json({data: jsonData, message: ''});

   } catch (error) {
     console.error('Error fetching page schema:', error);
     return NextResponse.json(
       {
        data: json,
         message: 'An error occurred while retrieving the page schema.',
       },
       { status: 500 }
     );
   }
  // Default to returning 'json' if no query or an unrecognized schema is provided
  
}
