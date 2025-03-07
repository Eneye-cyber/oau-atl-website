import { NextResponse } from 'next/server';

import path from 'path';
import { JsonData, PageData, PageSchemaResponse } from '@/app/lib/types';
import { connectToDatabase } from "@/lib/db"; // Use MySQL connection
import { queryPageData, updatePageData } from '@/lib/mysql';
import { RowDataPacket } from 'mysql2';
import { revalidatePath } from 'next/cache';
import { getRoutes } from '@/router/routes';
import { cleanRoutes } from '@/lib/utils';



export async function GET(req: Request): Promise<NextResponse<PageSchemaResponse>> {
  // Define the app directory path
  const appDir = path.join(process.cwd(), 'app'); 
  // Get all routes
  let ROUTES_LIST = await getRoutes(appDir);
  ROUTES_LIST = cleanRoutes(ROUTES_LIST)


   // Extract slug from query parameters
   const { searchParams } = new URL(req.url);
   const slug = searchParams.get('slug');
 
   if (!slug) {
     return NextResponse.json(
       {
         routeList: [],
         message: 'Page slug is required',
       },
       { status: 400 }
     );
   }
 
   try {
     console.log('c1', slug)
    const page: any | null = await queryPageData(slug, true)
 
     if (!page) {
     console.log('c3')
       return NextResponse.json(
         {
           routeList: [],
           message: 'Page not found',
         },
         { status: 404 }
       );
     }
     // Parse sections JSON field
     console.table(page)

     const jsonData: JsonData = { pages: {} };
     jsonData.pages[slug] = page as unknown as PageData;
 
     return NextResponse.json({
       pageSchema: jsonData,
       routeList: ROUTES_LIST,
     });
   } catch (error) {
     console.error('Error fetching page schema:', error);
     return NextResponse.json(
       {
         routeList: [],
         message: 'An error occurred while retrieving the page schema.',
       },
       { status: 500 }
     );
   }
  
  
}

export async function POST(req: Request): Promise<NextResponse<{ message: string; error: boolean }>> {
  try {
    // Extract `schema` from the incoming request body
    const body = await req.json()
    const newData = body.schema.pages;
    const slug = Object.keys(newData) as Array<keyof typeof newData>;


    // If `schema` is not provided, return an error response
    if (!newData || !slug[0]) {
      return NextResponse.json(
        { message: "Schema data is required", error: true },
        { status: 400, statusText: "Schema data is required" }
      );
    }


    // // Find the existing page
    const existingPage: any | null = await queryPageData(slug[0] as string, true)

    // Check if the current JSON data and incoming data are equal
    if (existingPage && JSON.stringify(existingPage) === JSON.stringify(newData[slug[0]])) {
      return NextResponse.json(
        { message: "Data is already up-to-date", error: false },
        { status: 200 }
      );
    }

    // // Update or insert the document in the collection
    const updatedResult = await updatePageData(slug[0] as string, newData[slug[0]].sections, true)

    // Check if the update was acknowledged
    if (updatedResult.success) {
      return NextResponse.json(
        { message: updatedResult?.message ?? "Data updated successfully", error: false },
        { status: 200 }
      );
    }

    // If no modifications were made, return a response
    return NextResponse.json(
      { message: updatedResult?.message ?? "No changes were made to the document", error: false },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing request:", error);

    // Return an error response in case of any issue
    return NextResponse.json(
      { message: "An error occurred while processing the request", error: true },
      { status: 500, statusText: "An error occurred while processing the request" }
    );
  }
}


export async function PUT(req: Request): Promise<NextResponse<{ message: string; error: boolean }>> {
  try {
    const db = await connectToDatabase();

    // Fetch current data from `pages` table
    const [currentData] = await db.execute<RowDataPacket[]>(
      `SELECT name, sections FROM q46r1_pages`
    );

    // Fetch new data from `temp_pages` table
    const [newData] = await db.execute<RowDataPacket[]>(
      `SELECT name, sections FROM q46r1_temp_pages`
    );

    // Ensure data is an array of objects
    if (!Array.isArray(currentData) || !Array.isArray(newData)) {
      throw new Error('Invalid data format from database');
    }

    // console.log(currentData);
    // console.log(newData);

    // Compare data (normalize JSON strings for comparison)
    if (JSON.stringify(currentData) === JSON.stringify(newData)) {
      return NextResponse.json(
        { message: 'Data is already up-to-date', error: false },
        { status: 200 }
      );
    }

    // Update `pages` table with new data from `temp_pages`
    for (const page of newData) {
      const { name, sections } = page as { name: string; sections: any }; // Explicitly define structure
      await db.execute(
        `INSERT INTO q46r1_pages (name, sections) VALUES (?, ?)
         ON DUPLICATE KEY UPDATE sections = VALUES(sections)`,
        [name, JSON.stringify(sections)]
      );
    }
    revalidatePath('/api/schema');

    return NextResponse.json(
      { message: 'Data updated successfully', error: false },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { message: 'An error occurred while processing the request', error: true },
      { status: 500 }
    );
  }
}


