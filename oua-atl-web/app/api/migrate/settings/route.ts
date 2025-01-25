import { NextResponse } from 'next/server';
import { connectToDatabase } from "@/lib/mongodb";
import defaultJson from "@/lib/pages/siteSchema.json";
import { MongoError } from 'mongodb';

const jsonSchema = {
  bsonType: "object",
  required: ["_id", "name", "sections"],
  properties: {
    name: { bsonType: "string", minLength: 1 },
    sections: { bsonType: "array", items: { bsonType: "object" } },
  },
};

export async function GET(req: Request) {
  const data = defaultJson.general;
  const keys = Object.keys(data) as Array<keyof typeof data>;
  let allResults: any[] = []; // Store results across all collections

  try {
    const { db } = await connectToDatabase();
    const collectionNames = ["site_settings", "temp_site_settings"];

    await Promise.all(
      collectionNames.map(async (collectionName) => {
        try {
          // Ensure collection schema
          await db.command({
            collMod: collectionName,
            validator: { $jsonSchema: jsonSchema },
            validationLevel: "strict",
          });
        } catch (err: any) {
          if (err.codeName === "NamespaceNotFound") {
            await db.createCollection(collectionName, {
              validator: { $jsonSchema: jsonSchema },
            });
          } else {
            throw err;
          }
        }

        const collection = db.collection(collectionName);
        await collection.createIndex({ name: 1 }, { unique: true });

        const results = await Promise.all(
          keys.map(async (key) => {
            const item = data[key];
            try {
              const result = await collection.insertOne({
                name: key,
                sections: item.sections,
              });
              return { page: key, isStored: result.acknowledged };
            } catch (insertError) {
              if (insertError instanceof MongoError && insertError.code === 11000) {
                return { page: key, isStored: false, error: "Duplicate key" };
              }
              throw insertError;
            }
          })
        );

        allResults = [...allResults, ...results];
      })
    );

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
