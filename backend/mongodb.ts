import { Db, MongoClient } from "mongodb";

const URI = process.env.MONGODB_URI ?? ""; // Replace with your MongoDB connection string
const DbName = process.env.Db_Name ?? ""; // Replace with your database name

let cachedClient: MongoClient;
let cachedDb: Db;

export async function ConnectMongoDb(): Promise<{ db: Db }> {
  try {
    if (!URI) {
      throw new Error("MONGODB_URI environment variable is not defined");
    }

    if (cachedClient && cachedDb) {
      return { db: cachedDb };
    }

    const client = await MongoClient.connect(URI);

    const db = client.db(DbName);
    cachedClient = client;
    cachedDb = db;

    return { db };
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    throw error;
  }
}

// async function init() {
//   if (db) return;
//   try {
//     db = await ConnectMongoDb();
//     console.log("Connected successfully to sthe database");

//     usersCollection = db.collection("users");
//   } catch (error) {
//     console.error("Failed to connect to the database:", error);
//   }
// }

