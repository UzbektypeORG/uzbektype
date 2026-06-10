import crypto from "crypto";

// HMAC-signed, stateless test-session token. Issued by /api/test/start the
// moment a test is set up, and required by /api/results to save a score.
//
// Why this exists: the typing test runs entirely client-side, so a result POST
// is just JSON the browser sends. Without a server-issued token anyone could
// `fetch("/api/results", { body: { wpm: 999 } })` from the devtools console.
// The token pins three things the client can no longer forge:
//   1. Authenticity — it's HMAC'd with AUTH_SECRET, so the body can't be made up.
//   2. Identity & params — uid / testType / difficulty / language are baked in.
//   3. A real start time — `iat` is the SERVER clock, letting /api/results check
//      that the reported typing duration didn't exceed real wall-clock time.
// Combined with the server-side WPM recomputation and plausibility caps in
// /api/results, this makes an impossible score (the old 496 WPM rows) rejectable.

const SECRET = process.env.AUTH_SECRET || "";

export type TestTokenPayload = {
  v: 1;
  uid: string;
  tt: string; // testType  — '10s' | '30s' | '60s' | '10w' | '30w' | '60w'
  df: string; // difficulty — 'easy' | 'medium' | 'hard'
  lg: string; // language   — 'uz' | 'en' | 'ru'
  iat: number; // issued-at, ms since epoch, SERVER clock
};

function b64url(buf: Buffer): string {
  return buf
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function sign(data: string): string {
  return b64url(crypto.createHmac("sha256", SECRET).update(data).digest());
}

export function issueTestToken(
  p: Omit<TestTokenPayload, "v" | "iat">,
  now: number
): string {
  const payload: TestTokenPayload = { v: 1, iat: now, ...p };
  const body = b64url(Buffer.from(JSON.stringify(payload), "utf8"));
  return `${body}.${sign(body)}`;
}

export function verifyTestToken(
  token: unknown,
  now: number,
  maxAgeMs: number
): TestTokenPayload | null {
  if (typeof token !== "string" || !SECRET) return null;
  const dot = token.indexOf(".");
  if (dot <= 0) return null;

  const body = token.slice(0, dot);
  const mac = token.slice(dot + 1);

  // Timing-safe signature check — a forged or tampered body never validates.
  const expected = sign(body);
  const a = Buffer.from(mac);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

  let payload: TestTokenPayload;
  try {
    payload = JSON.parse(
      Buffer.from(
        body.replace(/-/g, "+").replace(/_/g, "/"),
        "base64"
      ).toString("utf8")
    );
  } catch {
    return null;
  }

  if (payload.v !== 1 || typeof payload.iat !== "number") return null;
  if (now - payload.iat > maxAgeMs) return null; // expired
  if (payload.iat - now > 60_000) return null; // issued in the future (clock-skew guard)
  return payload;
}
