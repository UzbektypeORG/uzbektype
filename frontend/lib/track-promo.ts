// Fire-and-forget promo analytics beacon. Reuses the same anonymous browser id
// as VisitTracker so the admin panel can count unique users per promo without
// any auth. Safe to call from anywhere on the client; failures are swallowed.

const ANON_ID_KEY = "uzbektype_anon_id";

export type PromoName =
  | "author_modal"
  | "author_banner"
  | "uzbektype_modal"
  | "donate_button"
  | "donate_copy"
  | "donate_auto";
export type PromoEventType = "impression" | "click" | "dismiss";

function getAnonId(): string | null {
  try {
    let id = localStorage.getItem(ANON_ID_KEY);
    if (!id) {
      id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
      localStorage.setItem(ANON_ID_KEY, id);
    }
    return id;
  } catch {
    return null;
  }
}

export function trackPromo(promo: PromoName, event: PromoEventType, lang?: string) {
  try {
    const anonId = getAnonId();
    fetch("/api/promo-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ promo, event, anonId, lang }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // localStorage / fetch unavailable — give up silently.
  }
}
