import { NextResponse } from 'next/server';

import fs from 'fs';
import path from 'path';
import { JsonData, PageSchemaResponse } from '@/app/lib/types';


export async function GET(req: Request): Promise<NextResponse<PageSchemaResponse>> {
  // Define the app directory path
  const appDir = path.join(process.cwd(), 'app'); // Adjust this path if necessary
  // Define the path to the JSON file
  const filePath = path.join(process.cwd(), 'lib', 'pages', 'tempSchema.json');
  
  // Read the file and parse the data
  const fileData = await fs.promises.readFile(filePath, 'utf8');
  const jsonData = JSON.parse(fileData);

  // Get all routes
  let ROUTES_LIST = getRoutes(appDir);
  ROUTES_LIST = cleanRoutes(ROUTES_LIST)

  if(jsonData) {
    return NextResponse.json({
      pageSchema: jsonData,
      routeList: ROUTES_LIST
    });
  }

  
  return NextResponse.json({
    routeList: [],
    message: "Missing Json Schema"
  });
}

export async function POST(req: Request): Promise<NextResponse<{message: string; error: boolean}>> {
  // Define the path to the JSON file
  const filePath = path.join(process.cwd(), 'lib', 'pages', 'tempSchema.json');

  try {
    // Extract `schema` from the incoming request body
    let body = await req.json();
    const newData = body.schema;

    // If `schema` is not provided, return an error response
    if (!newData) {
      return NextResponse.json(
        { message: 'Schema data is required', error: true },
        { status: 400, statusText: 'Schema data is required' }
      );
    }

    // Read the current JSON file
    const fileData = await fs.promises.readFile(filePath, 'utf8');
    const currentData = JSON.parse(fileData);

    // Check if the current JSON data and incoming data are equal
    if (JSON.stringify(currentData) === JSON.stringify(newData)) {
      return NextResponse.json(
        { message: 'Data is already up-to-date', error: false },
        { status: 200 }
      );
    }

    // Save the new data to the file if it is different
    await fs.promises.writeFile(filePath, JSON.stringify(newData, null, 2), 'utf8');

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

export async function PUT(req: Request): Promise<NextResponse<{message: string; error: boolean}>> {
  // Define the path to the JSON file
  const timestamp = new Date().getTime();
  const tempFilePath = path.join(process.cwd(), 'lib', 'pages', 'tempSchema.json');
  const filePath = path.join(process.cwd(), 'lib', 'pages', 'pageSchema.json');
  const recordPath = path.join(process.cwd(), 'lib', 'pages', `pageSchema_${timestamp}.json`);

  try {
    
    // Read the current JSON file
    const fileData = await fs.promises.readFile(filePath, 'utf8');
    const tempData = await fs.promises.readFile(tempFilePath, 'utf8');
    const currentData = JSON.parse(fileData);
    const newData = JSON.parse(tempData);

    // Check if the current JSON data and incoming data are equal
    if (JSON.stringify(currentData) === JSON.stringify(newData)) {
      return NextResponse.json(
        { message: 'Data is already up-to-date', error: false },
        { status: 200 }
      );
    }

    // Save the new data to the file if it is different
    await fs.promises.writeFile(recordPath, JSON.stringify(currentData, null, 2), 'utf8');
    await fs.promises.writeFile(filePath, JSON.stringify(newData, null, 2), 'utf8');

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


// Define the type for route entries
type RouteEntry = string;

/**
 * Recursively gets all routes from the given directory.
 * @param dir - The current directory to scan for routes.
 * @param basePath - The base path to construct route URLs.
 * @returns An array of route entries.
 */
function getRoutes(dir: string, basePath: string = '/'): RouteEntry[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const routes: RouteEntry[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const nestedRoutes = getRoutes(fullPath, `${basePath}${entry.name}/`);
      routes.push(...nestedRoutes);
    } else if (
      entry.isFile() &&
      (entry.name === 'page.js' || entry.name === 'page.tsx')
    ) {
      // Add the route if it's a valid page file
      routes.push(basePath.endsWith('/') ? basePath.slice(0, -1) : basePath); // Remove trailing slash
    }
  }

  return routes;
}

function cleanRoutes(routes: RouteEntry[]): RouteEntry[] {
  return routes
      .filter(route => {
          // Exclude routes starting with "/admin", "/customize", or "/members/"
          return !/^\/(admin|customize|members)\//.test(route);
      })
      .filter(route => {
          // Exclude routes containing dynamic routes ([*])
          return !/\[\w+\]/.test(route);
      })
      .map(route => {
          // Remove strings inside parentheses
          return route.replace(/\(.*?\)\//g, '');
      });
}


