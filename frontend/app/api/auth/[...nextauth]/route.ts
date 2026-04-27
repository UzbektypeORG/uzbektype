import { handlers } from "@/auth";

// Auth route reads cookies + queries DB on every request — never cache.
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export const { GET, POST } = handlers;
