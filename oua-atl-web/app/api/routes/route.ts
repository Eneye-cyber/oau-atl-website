import { NextResponse } from 'next/server';

import fs from 'fs';
import path from 'path';

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



export async function GET(req: Request): Promise<NextResponse<{data: string[]}>> {
  // Define the app directory path
  const appDir = path.join(process.cwd(), 'app'); // Adjust this path if necessary

  // Get all routes
  let ROUTES_LIST = getRoutes(appDir);
  ROUTES_LIST = cleanRoutes(ROUTES_LIST)
  console.log(ROUTES_LIST)
  return NextResponse.json({
    data: ROUTES_LIST
  });
}
