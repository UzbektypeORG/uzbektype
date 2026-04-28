"use client";

import { useEffect } from "react";

const ANON_ID_KEY = "uzbektype_anon_id";
const VISIT_MARKER_KEY = "uzbektype_visit_day";

function generateAnonId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

export default function VisitTracker() {
  useEffect(() => {
    try {
      let anonId = localStorage.getItem(ANON_ID_KEY);
      if (!anonId) {
        anonId = generateAnonId();
        localStorage.setItem(ANON_ID_KEY, anonId);
      }

      const today = new Date().toISOString().slice(0, 10);
      const lastVisitDay = localStorage.getItem(VISIT_MARKER_KEY);
      if (lastVisitDay === today) return;

      // Optimistically mark before the request — if the request fails the
      // worst case is one missed ping for the day, which we accept.
      localStorage.setItem(VISIT_MARKER_KEY, today);

      fetch("/api/track-visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ anonId }),
        keepalive: true,
      }).catch(() => {});
    } catch {
      // localStorage / fetch unavailable (private mode, blocked) — give up silently.
    }
  }, []);

  return null;
}
