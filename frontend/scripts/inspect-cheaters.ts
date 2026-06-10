import { config } from "dotenv";
config({ path: ".env.local" });
import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL not set");
const sql = neon(url);

async function main() {
  // Users whose BEST wpm is physically impossible (>200) — these are the cheaters.
  const suspects = await sql`
    SELECT u.id, u.email, u.first_name, u.last_name, u.created_at,
           COUNT(*) AS n, MAX(t.wpm) AS best_wpm, ROUND(AVG(t.accuracy),1) AS avg_acc
    FROM test_result t
    JOIN "user" u ON u.id = t.user_id
    GROUP BY u.id, u.email, u.first_name, u.last_name, u.created_at
    HAVING MAX(t.wpm) > 200
    ORDER BY best_wpm DESC
  `;
  console.log("\n=== WPM > 200 bo'lgan foydalanuvchilar (jismonan imkonsiz) ===");
  for (const r of suspects) {
    const name = [r.first_name, r.last_name].filter(Boolean).join(" ") || "(ism yo'q)";
    console.log(
      `  id=${r.id}\n    ${name}  <${r.email}>\n    best ${r.best_wpm} WPM, ${r.n} ta natija, avg ${r.avg_acc}%, ro'yxatdan: ${new Date(r.created_at).toLocaleDateString()}`
    );
  }
  console.log("");
}
main().then(() => process.exit(0));
