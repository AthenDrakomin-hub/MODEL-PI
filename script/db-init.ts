import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "../shared/schema";

async function migrate() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  const db = drizzle(client, { schema });

  console.log("Database connected successfully");
  
  // Close the connection
  await client.end();
  console.log("Database connection closed");
}

migrate().catch(console.error);

