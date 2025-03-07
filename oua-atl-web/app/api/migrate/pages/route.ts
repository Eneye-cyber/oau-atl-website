import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import defaultJson from "@/lib/pages/pageSchema.json";

export async function GET(req: Request) {
  const data = defaultJson.pages;
  const keys = Object.keys(data) as Array<keyof typeof data>;
  let allResults: any[] = [];

  try {
    const db = await connectToDatabase();
    const tableNames = ["pages", "temp_pages"];

    // for (const tableName of tableNames) {
    //   // Ensure table exists
    //   await db.execute(`
    //     CREATE TABLE IF NOT EXISTS q46r1_${tableName} (
    //       id INT AUTO_INCREMENT PRIMARY KEY,
    //       name VARCHAR(255) UNIQUE NOT NULL,
    //       sections JSON NOT NULL
    //     )
    //   `);

    //   for (const key of keys) {
    //     const item = data[key];

    //     try {
    //       await db.execute(
    //         `INSERT INTO q46r1_${tableName} (name, sections) VALUES (?, ?)`,
    //         [key, JSON.stringify(item.sections)]
    //       );

    //       allResults.push({ page: key, isStored: true });
    //     } catch (error: any) {
    //       if (error.code === "ER_DUP_ENTRY") {
    //         allResults.push({ page: key, isStored: false, error: "Duplicate entry" });
    //       } else {
    //         throw error;
    //       }
    //     }
    //   }
    // }

    return NextResponse.json({
      message: "Migration successful",
      payload: allResults,
    });
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Migration error" }, { status: 500 });
  }
}
