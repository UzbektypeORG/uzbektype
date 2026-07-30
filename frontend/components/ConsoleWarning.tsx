"use client";

import { useEffect } from "react";

// Self-XSS / paste-a-script warning, the same one Facebook, GitHub and Discord
// print. It is a deterrent, not a defence: the console cannot be disabled from
// a web page, so the actual protection against autotyper scripts lives in
// lib/anti-cheat.ts, where the server refuses to save a run that wasn't typed
// by a human. This just gives the curious visitor a reason to stop before
// pasting something they found in a Telegram channel.
export default function ConsoleWarning() {
  useEffect(() => {
    try {
      console.log(
        "%cTo'xtang!",
        "color:#ef4444;font-size:44px;font-weight:800;text-shadow:1px 1px 2px rgba(0,0,0,.25)"
      );
      console.log(
        "%cBu oyna dasturchilar uchun.\n\nAgar kimdir bu yerga kod nusxalab qo'yishni aytgan bo'lsa — bu firibgarlik. Bunday kod hisobingizni o'g'irlashi mumkin.\n\nSaytdagi natijalar server tomonida tekshiriladi: sun'iy yo'l bilan chiqarilgan natija reytingga tushmaydi.",
        "font-size:14px;line-height:1.6"
      );
    } catch {
      // console may be unavailable in exotic embeds — never break the page.
    }
  }, []);

  return null;
}
