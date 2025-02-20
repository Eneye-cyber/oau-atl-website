import { NextResponse } from 'next/server';

import path from 'path';
import {  PageData, PageSchemaResponse, SiteSchema } from '@/app/lib/types';
import { connectToDatabase } from "@/lib/db"; // Use MySQL connection

import { getRoutes } from '@/router/routes';
import { cleanRoutes } from '@/lib/utils';

import {  querySettingsData,  updateSettingsData } from '@/lib/mysql';
import { RowDataPacket } from 'mysql2';
import { revalidatePath } from 'next/cache';

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
    const page: any | null = await querySettingsData(slug, true)

 
     if (!page) {
       return NextResponse.json(
         {
           routeList: [],
           message: 'Settings not found',
         },
         { status: 404 }
       );
     }
     console.table(page)
 
     const jsonData: SiteSchema = { general: {} };
     jsonData.general[slug] = page as unknown as PageData;
 
     return NextResponse.json({
       settingsSchema: jsonData,
       routeList: ROUTES_LIST,
     });
   } catch (error) {
     console.error('Error fetching setting schema:', error);
     return NextResponse.json(
       {
         routeList: [],
         message: 'An error occurred while retrieving the seting schema.',
       },
       { status: 500 }
     );
   }
  
  
}

export async function POST(req: Request): Promise<NextResponse<{ message: string; error: boolean }>> {
  try {
    // Extract `schema` from the incoming request body
    const body = await req.json()
    const newData = body.schema;
    const name = body.key

    // If `schema` is not provided, return an error response
    if (!newData || !name) {
      return NextResponse.json(
        { message: "Schema data is required", error: true },
        { status: 400, statusText: "Schema data is required" }
      );
    }
    
    const existingPage: any | null = await querySettingsData(name as string, true)


    // Check if the current JSON data and incoming data are equal
    if (existingPage && JSON.stringify(existingPage) === JSON.stringify(newData)) {
      return NextResponse.json(
        { message: "Data is already up-to-date", error: false },
        { status: 200 }
      );
    }

    // // Update or insert the document in the collection
    const updatedResult = await updateSettingsData(name as string, newData[name].sections, true)

    // Check if the update was acknowledged
    if (updatedResult.success) {
      return NextResponse.json(
        { message: updatedResult?.message ?? "Data updated successfully", error: false },
        { status: 200 }
      );
    }

    // If no modifications were made, return a response
    return NextResponse.json(
      { message: "No changes were made to the document", error: false },
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

export async function PUT(req: Request): Promise<NextResponse<{message: string; error: boolean}>> {
  // Define the path to the JSON file
  const timestamp = new Date().getTime();


  try {
    
    // Read the current JSON file
    const db = await connectToDatabase();

     // Fetch current data from `pages` table
     const [currentData] = await db.execute<RowDataPacket[]>(
      `SELECT name, sections FROM site_settings`
    );

    // Fetch new data from `temp_pages` table
    const [newData] = await db.execute<RowDataPacket[]>(
      `SELECT name, sections FROM temp_site_settings`
    );

    // Ensure data is an array of objects
    if (!Array.isArray(currentData) || !Array.isArray(newData)) {
      throw new Error('Invalid data format from database');
    }


    // Update `pages` table with new data from `temp_pages`
    for (const page of newData) {
      const { name, sections } = page as { name: string; sections: any }; // Explicitly define structure
      await db.execute(
        `INSERT INTO site_settings (name, sections) VALUES (?, ?)
         ON DUPLICATE KEY UPDATE sections = VALUES(sections)`,
        [name, JSON.stringify(sections)]
      );
    }
    revalidatePath('/api/schema/site');


    // Return a success response
    return NextResponse.json(
      { message: 'Data updated successfully', error: false },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing request:', error);

    // Return an error response in case of any issue
    return NextResponse.json(
      { message: 'An error occurred while processing the request', error: true },
      { status: 500, statusText: 'An error occurred while processing the request' }
    );
  }
}
