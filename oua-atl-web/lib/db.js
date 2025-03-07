import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env?.MYSQL_HOST ?? "localhost",
  user: process.env?.MYSQL_USER ?? "root",
  password: process.env?.MYSQL_PASSWORD ?? "",
  database: process.env?.MYSQL_DATABASE ?? "oau_atl",
  port: 3306, // Ensure this is correct
};

export async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log("MySQL connection successful");
    return connection;
  } catch (error) {
    console.error("MySQL connection failed:", error);
    throw new Error("MySQL connection failed");
  }
}
