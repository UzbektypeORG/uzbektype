import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error("DATABASE_URL is not set");
}

// Standart Postgres (DigitalOcean) + pgBouncer (transaction pooling).
// `prepare: false` — pgBouncer transaction rejimida prepared statement ishlamaydi.
// postgres.js fetch cache ishlatmaydi, shuning uchun o'qishlar doim live bazaga uradi.
const client = postgres(url, { prepare: false });
export const db = drizzle(client, { schema });

export * from "./schema";
