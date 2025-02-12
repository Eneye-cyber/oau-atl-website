import { NextResponse } from "next/server";
import layout from "@/lib/pages/siteSchema.json";
import { connectToDatabase } from "@/lib/db"; // Use MySQL connection
import { SiteSchema } from "@/app/lib/types";

export async function GET(req: Request): Promise<NextResponse> {
  try {
    const db = await connectToDatabase();
    
    // Parse URL query parameters
    const url = new URL(req.url);
    const isTemp = url.searchParams.get("isTemp") === "true";

    // Choose table based on query parameter
    const tableName = isTemp ? "temp_site_settings" : "site_settings";
    console.log(tableName, "tableName");

    // Fetch all site settings
    const [rows] = await db.execute(`SELECT * FROM ${tableName}`);

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json(
        {
          data: layout,
          message: "No site settings found.",
        },
        { status: 404 }
      );
    }

    // Transform data into the expected structure
    const jsonData: SiteSchema = {
      general: rows.reduce((acc: any, page: any) => {
        acc[page.name] = {
          ...page,
          sections: page.sections, // Parse sections JSON field
        };
        return acc;
      }, {}),
    };

    return NextResponse.json({ data: jsonData, message: "" });
  } catch (error) {
    console.error("Error fetching site settings:", error);

    // Fallback response
    return NextResponse.json(
      {
        data: layout,
        message: "An error occurred while retrieving the site settings.",
      },
      { status: 500 }
    );
  }
}
