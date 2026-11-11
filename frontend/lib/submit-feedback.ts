import { getAnonId } from "./track-promo";

const SHEET_URL =
  "https://script.google.com/macros/s/AKfycby-IiWY0K3DKTYsy3G3Rknj_8O-Ux67qkIAV9ChaGrG4jJsGOZyVFgBmaqudiW9e6fi/exec";

// Sends feedback to both the Google Sheet and our own feedback table. Each
// write is independent, so one failing never blocks the other.
export async function submitFeedback(
  message: string,
  source: "modal" | "footer",
  lang: string
) {
  await Promise.allSettled([
    fetch(SHEET_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        feedback: message,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        source,
      }),
    }),
    fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, source, lang, anonId: getAnonId() }),
    }),
  ]);

  localStorage.setItem("uzbektype_feedback_submitted", "true");
}
