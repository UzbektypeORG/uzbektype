import { NextResponse } from "next/server";
import { db, promoEvents } from "@/db";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

// Deliberately does NOT call auth() — this is a hot path (fires on every promo
// impression) and the unique-user count is keyed off anon_id, so a per-request
// session lookup would just burn compute for no analytic gain.

const PROMOS = ["author_modal", "author_banner", "uzbektype_modal"];
const EVENTS = ["impression", "click", "dismiss"];
const LANGS = ["uz", "en", "ru"];

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as {
    promo?: unknown;
    event?: unknown;
    anonId?: unknown;
    lang?: unknown;
  } | null;

  // Silently ignore anything malformed — this is a fire-and-forget beacon,
  // never worth returning an error the client would have to handle.
  if (
    !body ||
    typeof body.promo !== "string" ||
    !PROMOS.includes(body.promo) ||
    typeof body.event !== "string" ||
    !EVENTS.includes(body.event)
  ) {
    return new NextResponse(null, { status: 204 });
  }

  try {
    await db.insert(promoEvents).values({
      promo: body.promo,
      event: body.event,
      anonId: typeof body.anonId === "string" ? body.anonId.slice(0, 64) : null,
      lang:
        typeof body.lang === "string" && LANGS.includes(body.lang)
          ? body.lang
          : null,
    });
  } catch {
    // Best-effort — a tracking write must never break the user's flow.
  }

  return new NextResponse(null, { status: 204 });
}
