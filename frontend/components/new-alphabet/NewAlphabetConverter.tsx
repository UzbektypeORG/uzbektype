"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { toNewAlphabet } from "@/lib/new-alphabet";

type Language = "uz" | "en" | "ru";

const labels = {
  uz: {
    input: "Hozirgi lotin yozuvidagi matn",
    output: "Yangi alifboda",
    placeholder: "Masalan: O'zbekiston — go'zal o'lka, shaharlari choyxonalari bilan mashhur.",
    copy: "Nusxalash",
    copied: "Nusxalandi",
    note: "Oʻ, Gʻ, Sh, Ch avtomatik Ö, Ğ, Ş, Ç ga almashadi. Tutuq belgisi (maʼno, sheʼr) saqlanadi.",
  },
  en: {
    input: "Text in the current Latin spelling",
    output: "In the new alphabet",
    placeholder: "E.g.: O'zbekiston — go'zal o'lka, shaharlari choyxonalari bilan mashhur.",
    copy: "Copy",
    copied: "Copied",
    note: "Oʻ, Gʻ, Sh, Ch become Ö, Ğ, Ş, Ç automatically. The tutuq sign (maʼno, sheʼr) is kept.",
  },
  ru: {
    input: "Текст в нынешней латинице",
    output: "В новом алфавите",
    placeholder: "Например: O'zbekiston — go'zal o'lka, shaharlari choyxonalari bilan mashhur.",
    copy: "Копировать",
    copied: "Скопировано",
    note: "Oʻ, Gʻ, Sh, Ch автоматически заменяются на Ö, Ğ, Ş, Ç. Знак тутук (maʼno, sheʼr) сохраняется.",
  },
};

export default function NewAlphabetConverter({ lang }: { lang: Language }) {
  const t = labels[lang];
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const converted = toNewAlphabet(text);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(converted);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard can be blocked (insecure context, permissions) — the text
      // is still selectable in the output box.
    }
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="space-y-1.5">
          <span className="text-xs font-medium text-muted-foreground">{t.input}</span>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t.placeholder}
            rows={6}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm resize-y"
          />
        </label>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">{t.output}</span>
            <button
              onClick={handleCopy}
              disabled={!converted}
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground disabled:opacity-40"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? t.copied : t.copy}
            </button>
          </div>
          <output className="block w-full min-h-[9.5rem] px-4 py-3 rounded-lg border border-primary/30 bg-primary/5 text-sm whitespace-pre-wrap break-words">
            {converted || <span className="text-muted-foreground/60">{toNewAlphabet(t.placeholder)}</span>}
          </output>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">{t.note}</p>
    </div>
  );
}
