import { NextResponse } from "next/server";
import json from "@/lib/pages/pageSchema.json";
import { connectToDatabase } from "@/lib/db"; // Use MySQL connection
import { JsonData, PageData } from "@/app/lib/types";

export async function GET(req: Request): Promise<NextResponse> {
  // Parse the URL to extract query parameters
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json(
      {
        data: json,
        message: "Page slug is required",
      },
      { status: 400 }
    );
  }

  try {
    const db = await connectToDatabase();
    
    // Fetch page data from MySQL
    const [rows] = await db.execute(
      `SELECT * FROM q46r1_pages WHERE name = ? LIMIT 1`,
      [slug]
    );

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json(
        {
          data: json,
          message: "Page not found",
        },
        { status: 404 }
      );
    }

    // Parse sections JSON field
    const page = rows[0] as any;
    // console.log(page)
    // page.sections = JSON.parse(page.sections);

    // Structure response data
    const jsonData: JsonData = { pages: {} };
    jsonData.pages[slug] = page as PageData;

    return NextResponse.json({ data: jsonData, message: "" });
  } catch (error) {
    console.error("Error fetching page schema:", error);
    return NextResponse.json(
      {
        // data: json,
        message: "An error occurred while retrieving the page schema.",
      },
      { status: 500 }
    );
  }
}
