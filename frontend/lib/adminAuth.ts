import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "uzb_admin";
const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

function secret(): string {
  const s = process.env.AUTH_SECRET;
  if (!s) throw new Error("AUTH_SECRET not set");
  return s;
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  return timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

export function checkCredentials(username: string, password: string): boolean {
  const u = process.env.ADMIN_USERNAME;
  const p = process.env.ADMIN_PASSWORD;
  if (!u || !p) return false;
  return safeEqual(username, u) && safeEqual(password, p);
}

export async function setAdminCookie(): Promise<void> {
  const expires = Date.now() + SESSION_TTL_MS;
  const payload = String(expires);
  const value = `${payload}.${sign(payload)}`;
  (await cookies()).set(COOKIE_NAME, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: Math.floor(SESSION_TTL_MS / 1000),
  });
}

export async function clearAdminCookie(): Promise<void> {
  (await cookies()).delete(COOKIE_NAME);
}

export async function isAdmin(): Promise<boolean> {
  const cookie = (await cookies()).get(COOKIE_NAME)?.value;
  if (!cookie) return false;
  const [payload, sig] = cookie.split(".");
  if (!payload || !sig) return false;
  if (!safeEqual(sign(payload), sig)) return false;
  const expires = Number(payload);
  if (!Number.isFinite(expires) || Date.now() > expires) return false;
  return true;
}
