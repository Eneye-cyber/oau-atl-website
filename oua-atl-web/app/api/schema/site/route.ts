import { NextResponse } from 'next/server';

import fs from 'fs';
import path from 'path';
import { JsonData, PageData, PageSchemaResponse } from '@/app/lib/types';
import { connectToDatabase } from "@/lib/mongodb";

// export async function GET(req: Request): Promise<NextResponse<PageSchemaResponse>> {
//   // Define the app directory path
//   const appDir = path.join(process.cwd(), 'app'); 
//   // Get all routes
//   let ROUTES_LIST = getRoutes(appDir);
//   ROUTES_LIST = cleanRoutes(ROUTES_LIST)


//    // Extract slug from query parameters
//    const { searchParams } = new URL(req.url);
//    const slug = searchParams.get('slug');
 
//    if (!slug) {
//      return NextResponse.json(
//        {
//          routeList: [],
//          message: 'Page slug is required',
//        },
//        { status: 400 }
//      );
//    }
 
//    try {
//      const { db } = await connectToDatabase();
//      const page = await db.collection('temp_pages').findOne({ name: slug });
 
//      if (!page) {
//        return NextResponse.json(
//          {
//            routeList: [],
//            message: 'Page not found',
//          },
//          { status: 404 }
//        );
//      }
 
//      const jsonData: JsonData = { pages: {} };
//      jsonData.pages[slug] = page as unknown as PageData;
 
//      return NextResponse.json({
//        pageSchema: jsonData,
//        routeList: ROUTES_LIST,
//      });
//    } catch (error) {
//      console.error('Error fetching page schema:', error);
//      return NextResponse.json(
//        {
//          routeList: [],
//          message: 'An error occurred while retrieving the page schema.',
//        },
//        { status: 500 }
//      );
//    }
  
  
// }

export async function POST(req: Request): Promise<NextResponse<{ message: string; error: boolean }>> {
  try {
    // Extract `schema` from the incoming request body
    const body = await req.json().catch(() => ({message: req.statusText}));
    const newData = body.schema;
    const name = body.key

    // If `schema` is not provided, return an error response
    if (!newData || !name) {
      return NextResponse.json(
        { message: "Schema data is required", error: true },
        { status: 400, statusText: "Schema data is required" }
      );
    }
    
    const { db } = await connectToDatabase();
    const collection = db.collection("temp_site_settings");

    // Find the existing page
    const existingPage = await collection.findOne({ name: name });

    // Check if the current JSON data and incoming data are equal
    if (existingPage && JSON.stringify(existingPage) === JSON.stringify(newData)) {
      return NextResponse.json(
        { message: "Data is already up-to-date", error: false },
        { status: 200 }
      );
    }

    // Prepare the update data, excluding the `_id` field
    const updateData = { ...newData };
    delete updateData._id; // Remove `_id` if it exists in the incoming data

    // Update or insert the document in the collection
    const updatedResult = await collection.updateOne(
      { name: name }, // Match the document by the name (slug)
      { $set: updateData }, // Update the document with the sanitized data
      { upsert: true } // Create the document if it does not exist
    );

    // // Check if the update was acknowledged
    if (updatedResult.modifiedCount > 0 || updatedResult.upsertedCount > 0) {
      return NextResponse.json(
        { message: "Data updated successfully", error: false },
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
    const { db } = await connectToDatabase();
    const collection = db.collection("site_settings");
    const temp_collection = db.collection("temp_site_settings");

    // Get all documents with only fields name and sections
    const existingPages = collection.find({}, { projection: { _id: 0, name: 1, sections: 1 } });
    const modifiedPages = temp_collection.find({}, { projection: { _id: 0, name: 1, sections: 1 } });

    const currentData = await existingPages.toArray()
    const newData = await modifiedPages.toArray()


    // Check if the current JSON data and incoming data are equal
    if (JSON.stringify(currentData) === JSON.stringify(newData)) {
      return NextResponse.json(
        { message: 'Data is already up-to-date', error: false },
        { status: 200 }
      );
    }

    // Save the new data from temp_collection into collection
    for (const page of newData) {
      const { name, sections } = page; // Destructure the fields
      await collection.updateOne(
        { name }, // Match by `name`
        { $set: { name, sections } }, // Update `name` and `sections`
        { upsert: true } // Insert if the document doesn't exist
      );
    }

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
