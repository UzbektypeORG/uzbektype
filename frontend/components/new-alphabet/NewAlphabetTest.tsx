"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { RotateCcw } from "lucide-react";
import { NEW_ALPHABET_TEXTS } from "@/data/new-alphabet-texts";
import { SPECIAL_LETTERS, appendTyped, charsMatch, isComboPrefix } from "@/lib/new-alphabet";

// Standalone practice test for the 2026 alphabet. Deliberately separate from
// components/typing/TypingTest: nothing is saved, so it stays out of the
// leaderboard and anti-cheat pipeline, and it can accept the two-key forms
// (o' → ö, sh → ş) that a normal test would mark as errors.

type Language = "uz" | "en" | "ru";
type Duration = 30 | 60;

const labels = {
  uz: {
    focus: "Yozishni boshlash uchun shu yerni bosing",
    seconds: "soniya",
    combos: "o' → ö, g' → ğ, sh → ş, ch → ç avtomatik",
    restart: "Qaytadan",
    wpm: "WPM",
    accuracy: "Aniqlik",
    letters: "Yangi harflar bo'yicha aniqlik",
    noLetters: "Bu safar yangi harflarga yetib bormadingiz",
    readMore: "Yangi alifbo haqida to'liq maqola",
    hint: "Klaviaturada Ö, Ğ, Ş, Ç yo'q bo'lsa, eski usulda yozing: o' yozsangiz ö bo'ladi.",
  },
  en: {
    focus: "Click here to start typing",
    seconds: "seconds",
    combos: "o' → ö, g' → ğ, sh → ş, ch → ç automatically",
    restart: "Restart",
    wpm: "WPM",
    accuracy: "Accuracy",
    letters: "Accuracy on the new letters",
    noLetters: "You didn't reach any new letters this time",
    readMore: "Full article on the new alphabet",
    hint: "No Ö, Ğ, Ş, Ç keys? Type the old way: o' turns into ö.",
  },
  ru: {
    focus: "Нажмите здесь, чтобы начать",
    seconds: "секунд",
    combos: "o' → ö, g' → ğ, sh → ş, ch → ç автоматически",
    restart: "Заново",
    wpm: "WPM",
    accuracy: "Точность",
    letters: "Точность на новых буквах",
    noLetters: "В этот раз вы не дошли до новых букв",
    readMore: "Полная статья о новом алфавите",
    hint: "Нет клавиш Ö, Ğ, Ş, Ç? Пишите по-старому: o' превратится в ö.",
  },
};

const BLOG_SLUGS: Record<Language, string> = {
  uz: "yangi-ozbek-alifbosi-2026",
  en: "new-uzbek-alphabet-2026",
  ru: "novyy-uzbekskiy-alfavit-2026",
};

function buildText(): string {
  const shuffled = [...NEW_ALPHABET_TEXTS].sort(() => Math.random() - 0.5);
  return shuffled.join(" ");
}

export default function NewAlphabetTest({ lang }: { lang: Language }) {
  const t = labels[lang];
  const [duration, setDuration] = useState<Duration>(30);
  const [combos, setCombos] = useState(true);
  const [target, setTarget] = useState(NEW_ALPHABET_TEXTS.join(" "));
  const [typed, setTyped] = useState("");
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [now, setNow] = useState(0);
  const [finished, setFinished] = useState(false);
  const [focused, setFocused] = useState(false);
  // Positions that were ever wrong — fixing them later still costs accuracy.
  const errorPositions = useRef<Set<number>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);

  // Shuffle after mount only, so server and client render the same text.
  useEffect(() => setTarget(buildText()), []);

  const reset = useCallback(() => {
    setTarget(buildText());
    setTyped("");
    setStartedAt(null);
    setNow(0);
    setFinished(false);
    errorPositions.current = new Set();
    if (boxRef.current) boxRef.current.scrollTop = 0;
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!startedAt || finished) return;
    const id = setInterval(() => {
      const n = Date.now();
      setNow(n);
      if (n - startedAt >= duration * 1000) setFinished(true);
    }, 100);
    return () => clearInterval(id);
  }, [startedAt, finished, duration]);

  // Keep the caret line in view inside the 3-line window.
  useEffect(() => {
    const box = boxRef.current;
    const caret = caretRef.current;
    if (!box || !caret) return;
    const lineTop = caret.offsetTop; // box is position:relative, so this is box-relative
    if (lineTop > box.scrollTop + box.clientHeight / 2 || lineTop < box.scrollTop) {
      box.scrollTop = Math.max(0, lineTop - caret.offsetHeight);
    }
  }, [typed]);

  const handleChange = (value: string) => {
    if (finished) return;
    let next: string;
    if (value.startsWith(typed)) {
      next = appendTyped(typed, value.slice(typed.length), target, combos);
    } else if (typed.startsWith(value)) {
      next = value; // backspace
    } else {
      return;
    }
    if (!startedAt && next.length > 0) {
      const n = Date.now();
      setStartedAt(n);
      setNow(n);
    }
    // Every position before the caret is final; the last one may still be
    // the first key of a two-key letter, which isn't an error yet.
    for (let i = 0; i < next.length; i++) {
      const last = i === next.length - 1;
      if (!charsMatch(next[i], target[i]) && !(last && combos && isComboPrefix(next[i], target[i]))) {
        errorPositions.current.add(i);
      }
    }
    setTyped(next);
    if (next.length >= target.length) setFinished(true);
  };

  const elapsed = startedAt ? Math.min(duration, (now - startedAt) / 1000) : 0;
  const remaining = Math.max(0, Math.ceil(duration - elapsed));

  const stats = useMemo(() => {
    let correct = 0;
    const perLetter: Record<string, { ok: number; total: number }> = {};
    for (let i = 0; i < typed.length; i++) {
      const ok = charsMatch(typed[i], target[i]);
      if (ok) correct++;
      const letter = target[i].toLowerCase();
      if ((SPECIAL_LETTERS as readonly string[]).includes(letter)) {
        perLetter[letter] ??= { ok: 0, total: 0 };
        perLetter[letter].total++;
        if (ok && !errorPositions.current.has(i)) perLetter[letter].ok++;
      }
    }
    const minutes = elapsed / 60;
    const wpm = minutes > 0 ? Math.round(correct / 5 / minutes) : 0;
    let errors = 0;
    errorPositions.current.forEach((i) => {
      if (i < typed.length) errors++;
    });
    const accuracy = typed.length > 0 ? Math.round(((typed.length - errors) / typed.length) * 1000) / 10 : 100;
    return { wpm, accuracy, perLetter };
  }, [typed, target, elapsed]);

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap text-sm">
        <div className="flex gap-1 p-0.5 rounded-lg border border-border bg-accent/30">
          {([30, 60] as Duration[]).map((d) => (
            <button
              key={d}
              onClick={() => {
                setDuration(d);
                reset();
              }}
              className={`px-3 py-1 rounded-md transition-colors ${
                duration === d ? "bg-background shadow-sm font-medium" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {d} {t.seconds}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-muted-foreground cursor-pointer select-none">
          <input type="checkbox" checked={combos} onChange={(e) => setCombos(e.target.checked)} className="accent-primary" />
          <span>{t.combos}</span>
        </label>
      </div>

      {!finished ? (
        <div className="relative">
          <div className="flex items-center justify-between mb-2 text-sm">
            <span className="font-mono text-2xl font-semibold text-primary tabular-nums">{remaining}</span>
            <button onClick={reset} className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
              <RotateCcw size={14} />
              {t.restart}
            </button>
          </div>

          <div
            ref={boxRef}
            onClick={() => inputRef.current?.focus()}
            className="relative h-[7.5rem] md:h-[9rem] overflow-hidden cursor-text text-xl md:text-2xl leading-[2.5rem] md:leading-[3rem] font-mono break-words"
            aria-label={t.focus}
          >
            {target.split("").map((ch, i) => {
              let cls = "text-muted-foreground/50";
              if (i < typed.length) {
                const last = i === typed.length - 1;
                if (charsMatch(typed[i], ch)) cls = "text-foreground";
                else if (last && combos && isComboPrefix(typed[i], ch)) cls = "text-primary underline decoration-dotted";
                else cls = "text-red-500 bg-red-500/10 rounded-sm";
              }
              const isCaret = i === typed.length;
              const isNew = (SPECIAL_LETTERS as readonly string[]).includes(ch.toLowerCase());
              return (
                <span
                  key={i}
                  ref={isCaret ? caretRef : undefined}
                  className={`${cls} ${isNew && i >= typed.length ? "text-primary/70" : ""} ${
                    isCaret && focused ? "border-l-2 border-primary animate-pulse" : ""
                  }`}
                >
                  {ch}
                </span>
              );
            })}
          </div>

          {!focused && (
            <button
              onClick={() => inputRef.current?.focus()}
              className="absolute inset-0 top-8 flex items-center justify-center bg-background/70 backdrop-blur-[2px] rounded-lg text-sm md:text-base font-medium"
            >
              {t.focus}
            </button>
          )}

          <input
            ref={inputRef}
            value={typed}
            onChange={(e) => handleChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            className="absolute opacity-0 pointer-events-none w-px h-px"
            aria-label={t.focus}
          />
          <p className="mt-3 text-xs text-muted-foreground">{t.hint}</p>
        </div>
      ) : (
        <div className="border border-border rounded-xl p-5 md:p-6 space-y-5 animate-fade-in">
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-4 border border-border rounded-lg">
              <div className="text-4xl md:text-5xl font-bold text-primary tabular-nums">{stats.wpm}</div>
              <div className="text-xs text-muted-foreground mt-1">{t.wpm}</div>
            </div>
            <div className="text-center p-4 border border-border rounded-lg">
              <div className="text-4xl md:text-5xl font-bold tabular-nums">{stats.accuracy}%</div>
              <div className="text-xs text-muted-foreground mt-1">{t.accuracy}</div>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">{t.letters}</p>
            {Object.keys(stats.perLetter).length > 0 ? (
              <div className="grid grid-cols-4 gap-2">
                {SPECIAL_LETTERS.map((l) => {
                  const s = stats.perLetter[l];
                  return (
                    <div key={l} className="text-center p-2 border border-border rounded-lg">
                      <div className="text-xl font-bold">{l.toUpperCase()}</div>
                      <div className="text-xs text-muted-foreground tabular-nums">{s ? `${s.ok}/${s.total}` : "—"}</div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">{t.noLetters}</p>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link href={`/${lang}/blog/${BLOG_SLUGS[lang]}`} className="text-sm text-primary hover:underline">
              {t.readMore} →
            </Link>
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 font-medium text-sm"
            >
              <RotateCcw size={16} />
              {t.restart}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
