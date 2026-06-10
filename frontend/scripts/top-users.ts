import { config } from "dotenv";
config({ path: ".env.local" });
import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL not set");
const sql = neon(url);

const DIFF = process.argv[2] || "easy";

async function main() {
  console.log(`\n=== Top 5 (best WPM) — qiyinlik: ${DIFF} ===`);
  const top = await sql`
    SELECT u.first_name, u.last_name, u.email,
           MAX(t.wpm) AS best_wpm,
           COUNT(*) AS n,
           ROUND(AVG(t.accuracy), 1) AS avg_acc
    FROM test_result t
    JOIN "user" u ON u.id = t.user_id
    WHERE t.difficulty = ${DIFF}
    GROUP BY u.id, u.first_name, u.last_name, u.email
    ORDER BY best_wpm DESC
    LIMIT 5
  `;
  top.forEach((r, i) => {
    const name = [r.first_name, r.last_name].filter(Boolean).join(" ") || r.email;
    console.log(
      `  ${i + 1}. ${name.padEnd(28)} ${String(r.best_wpm).padStart(3)} WPM  ` +
        `(${r.n} ta natija, avg acc ${r.avg_acc}%)`
    );
  });

  const totals = await sql`
    SELECT COUNT(*) AS results, COUNT(DISTINCT user_id) AS users
    FROM test_result WHERE difficulty = ${DIFF}
  `;
  console.log(`\n  ${DIFF} jami: ${totals[0].results} ta natija, ${totals[0].users} ta foydalanuvchi\n`);
}
main().then(() => process.exit(0));
