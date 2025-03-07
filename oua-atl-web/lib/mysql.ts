import { connectToDatabase } from "@/lib/db"; // Use MySQL connection
import { ResultSetHeader } from "mysql2/promise";

export async function queryPageData(pageName: string, isTemp: boolean = false) {
  try {
    const db = await connectToDatabase();
    const [rows] = await db.execute(
      `SELECT * FROM q46r1_${isTemp ? "temp_pages" : "pages"} WHERE name = ? LIMIT 1`,
      [pageName]
    );
    if (!Array.isArray(rows) || rows.length === 0) {
      throw new Error("Page not found");
    }
    return rows[0];
  } catch (error) {
    console.error("Error fetching page data:", error);
    return null
  }
}

export async function querySettingsData(pageName: string, isTemp: boolean = false) {
  try {
    const db = await connectToDatabase();
    const [rows] = await db.execute(
      `SELECT * FROM q46r1_${isTemp ? "temp_site_settings" : "site_settings"} WHERE name = ? LIMIT 1`,
      [pageName]
    );
    if (!Array.isArray(rows) || rows.length === 0) {
      throw new Error("Site settings not found");
    }
    return rows[0];
  } catch (error) {
    console.error("Error fetching site settings data:", error);
    return null
  }
}

export async function updatePageData(
  pageName: string,
  newSections: object,
  isTemp: boolean = false
) {
  try {
    const db = await connectToDatabase();
    const tableName = isTemp ? "temp_pages" : "pages";

    const [result] = await db.execute<ResultSetHeader>(
      `UPDATE q46r1_${tableName} SET sections = ? WHERE name = ?`,
      [JSON.stringify(newSections), pageName]
    );
    

    if (result.affectedRows === 0) {
      return { success: false, message: "Page not found or no changes made" };
    }

    return { success: true, message: "Page updated successfully" };
  } catch (error) {
    console.error("Error updating page data:", error);
    return { success: false, message: "Failed to update page data" };
  }
}

export async function updateSettingsData(
  pageName: string,
  newSections: object,
  isTemp: boolean = false
) {
  try {
    const db = await connectToDatabase();
    const tableName = isTemp ? "temp_site_settings" : "site_settings";

    const [result] = await db.execute<ResultSetHeader>(
      `UPDATE q46r1_${tableName} SET sections = ? WHERE name = ?`,
      [JSON.stringify(newSections), pageName]
    );
    

    if (result.affectedRows === 0) {
      return { success: false, message: "Settings not found or no changes made" };
    }

    return { success: true, message: "Settings updated successfully" };
  } catch (error) {
    console.error("Error updating setting data:", error);
    return { success: false, message: "Failed to update setting data" };
  }
}