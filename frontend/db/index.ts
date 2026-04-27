import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error("DATABASE_URL is not set");
}

// Neon HTTP client — works in edge and Node runtimes, no connection pooling needed.
const sql = neon(url);
export const db = drizzle(sql, { schema });

export * from "./schema";
