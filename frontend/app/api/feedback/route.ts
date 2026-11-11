import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db, feedback } from "@/db";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const SOURCES = ["modal", "footer"];
const LANGS = ["uz", "en", "ru"];
const MAX_MESSAGE = 2000;

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as {
    message?: unknown;
    source?: unknown;
    lang?: unknown;
    anonId?: unknown;
  } | null;

  const message = typeof body?.message === "string" ? body.message.trim() : "";
  if (!message || typeof body?.source !== "string" || !SOURCES.includes(body.source)) {
    return new NextResponse(null, { status: 204 });
  }

  try {
    // Feedback is rare, so the session lookup is cheap here (unlike promo-event).
    const session = await auth().catch(() => null);
    await db.insert(feedback).values({
      message: message.slice(0, MAX_MESSAGE),
      source: body.source,
      lang: typeof body.lang === "string" && LANGS.includes(body.lang) ? body.lang : null,
      anonId: typeof body.anonId === "string" ? body.anonId.slice(0, 64) : null,
      userId: session?.user?.id ?? null,
      userAgent: req.headers.get("user-agent")?.slice(0, 500) ?? null,
    });
  } catch {
    // Best-effort — the Google Sheet copy is still sent by the client.
  }

  return new NextResponse(null, { status: 204 });
}
