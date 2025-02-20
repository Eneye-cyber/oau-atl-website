import fs from 'fs';
import path from 'path';
// routes.ts
export const ROUTES = {
  ADMIN_LOGIN: '/admin/login',
  MEMBERS_LOGIN: '/members/login',
  MEMBERS_REGISTER: '/members/register',
  MEMBERS_AREA: '/members-area',
  ROOT: '/',
};



// Define the type for route entries
type RouteEntry = string;

/**
 * Recursively gets all routes from the given directory.
 * @param dir - The current directory to scan for routes.
 * @param basePath - The base path to construct route URLs.
 * @returns An array of route entries.
 */
export async function getRoutes(dir: string, basePath: string = '/'): Promise<RouteEntry[]> {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const routes: RouteEntry[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const nestedRoutes = await getRoutes(fullPath, `${basePath}${entry.name}/`);
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


