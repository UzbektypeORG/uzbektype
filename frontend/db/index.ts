import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error("DATABASE_URL is not set");
}

// Neon HTTP client — `fetchOptions: { cache: "no-store" }` opts out of the
// Next.js fetch cache so DB reads always hit the live database. Without this,
// session/profile reads can return stale values just after an update.
const sql = neon(url, { fetchOptions: { cache: "no-store" } });
export const db = drizzle(sql, { schema });

export * from "./schema";
