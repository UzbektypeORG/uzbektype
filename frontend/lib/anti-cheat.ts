// Keystroke-behaviour analysis — the layer that catches devtools-console
// autotypers (the `dispatchEvent(new KeyboardEvent(...))` scripts).
//
// Why not "block the console"? It cannot be done. DevTools is a browser
// feature that lives outside the page: `console` overrides, F12/Ctrl+Shift+I
// handlers, right-click blockers and devtools-open detectors are all bypassed
// by pasting the payload into a bookmarklet, a userscript, or by disabling
// JS breakpoints — while breaking accessibility and annoying honest users.
// The only defence that actually holds is one the client cannot lie its way
// past: the server deciding whether the *keystroke pattern* was human.
//
// Two signals are collected in the browser (see TypingTest.tsx):
//   1. `untrusted` — how many key events arrived with `isTrusted === false`.
//      The browser sets that flag on every event it generates itself; a
//      script-dispatched event is false. This alone kills a copy-pasted
//      autotyper outright.
//   2. `gaps` — the inter-keystroke intervals. A human's rhythm is wildly
//      uneven (30 ms bursts inside a familiar word, 400 ms pauses at word
//      boundaries, the occasional 2 s stall). A `setTimeout`-driven bot is
//      metronomic: even with ±5 % jitter its coefficient of variation is
//      ~0.03 where a human sits at 0.4-0.7.
//
// Nothing here is fatal on its own — the metrics feed a suspicion score, and
// only a clearly robotic total drops the result. That keeps a genuinely
// steady fast typist safe while leaving no room for a synthetic run.

export type KeystrokeTelemetry = {
  v: 1;
  /** Inter-keystroke intervals in ms, in order, rounded to whole ms. */
  gaps: number[];
  /** Character keystrokes registered (including ones later deleted). */
  chars: number;
  /** Backspaces pressed. */
  back: number;
  /** Key events that arrived with isTrusted === false (script-dispatched). */
  untrusted: number;
};

/** Max intervals kept client-side and accepted server-side (60 s at 14 cps ≈ 840). */
export const MAX_GAPS = 2000;

/**
 * Below this WPM the behavioural analysis is skipped entirely: a slow result
 * is worthless to fake, and a hunt-and-peck typist can legitimately look
 * metronomic. The `untrusted` check still applies at every speed.
 */
const ANALYSIS_MIN_WPM = 45;

/** Fewer samples than this and the distribution stats are meaningless. */
const MIN_GAPS_FOR_STATS = 20;

/** Suspicion score at or above which the result is dropped. */
export const DROP_SCORE = 60;

/** Runtime-validates a telemetry blob coming off the wire. */
export function parseTelemetry(v: unknown): KeystrokeTelemetry | null {
  if (!v || typeof v !== "object") return null;
  const t = v as Record<string, unknown>;
  if (t.v !== 1) return null;
  if (!Array.isArray(t.gaps) || t.gaps.length > MAX_GAPS) return null;
  if (
    !t.gaps.every(
      (g) => typeof g === "number" && Number.isFinite(g) && g >= 0 && g <= 600_000
    )
  ) {
    return null;
  }
  const isCount = (x: unknown): x is number =>
    typeof x === "number" && Number.isInteger(x) && x >= 0 && x <= 100_000;
  if (!isCount(t.chars) || !isCount(t.back) || !isCount(t.untrusted)) return null;

  return {
    v: 1,
    gaps: t.gaps as number[],
    chars: t.chars,
    back: t.back,
    untrusted: t.untrusted,
  };
}

function quantile(sorted: number[], q: number): number {
  if (sorted.length === 0) return 0;
  const i = (sorted.length - 1) * q;
  const lo = Math.floor(i);
  const hi = Math.ceil(i);
  return lo === hi ? sorted[lo] : sorted[lo] + (sorted[hi] - sorted[lo]) * (i - lo);
}

export type CheatVerdict = {
  score: number;
  /** Machine-readable reasons, most significant first — for logging only. */
  reasons: string[];
  bot: boolean;
};

/**
 * Scores how machine-like a completed test looks. Pure function: no I/O, so
 * it is unit-testable and safe to call from a request handler.
 */
export function analyzeRun(input: {
  telemetry: KeystrokeTelemetry | null;
  wpm: number;
  timeElapsed: number;
  totalChars: number;
  correctedChars: number;
  incorrectChars: number;
}): CheatVerdict {
  const { telemetry, wpm, timeElapsed, totalChars, correctedChars, incorrectChars } =
    input;
  const reasons: string[] = [];
  let score = 0;

  // No telemetry at all. Harmless for a slow run (old cached bundle, exotic
  // input path); at speed it means the payload was hand-assembled, because a
  // real client always sends it.
  if (!telemetry) {
    if (wpm >= ANALYSIS_MIN_WPM) {
      return { score: 100, reasons: ["telemetry_missing"], bot: true };
    }
    return { score: 0, reasons: [], bot: false };
  }

  // ── Signal 1: synthetic events ────────────────────────────────────────────
  // Decisive at any speed. Only a script can produce isTrusted === false.
  if (telemetry.untrusted > 0) {
    score += 100;
    reasons.push(`synthetic_events:${telemetry.untrusted}`);
  }

  if (wpm < ANALYSIS_MIN_WPM) {
    return { score, reasons, bot: score >= DROP_SCORE };
  }

  const gaps = telemetry.gaps;

  // ── Signal 2: the telemetry has to describe the score it ships with ───────
  // Keystrokes minus deletions should land near the final character count, and
  // the intervals cannot add up to more wall-clock than the test lasted.
  // Deliberately loose (mobile autocorrect inserts several chars per event),
  // but tight enough that a stub payload cannot pass.
  if (telemetry.chars < totalChars * 0.5) {
    score += 100;
    reasons.push("keystrokes_below_chars");
  }
  if (gaps.length < Math.min(MIN_GAPS_FOR_STATS, totalChars - 1)) {
    score += 100;
    reasons.push("insufficient_samples");
  }
  const gapSum = gaps.reduce((a, b) => a + b, 0);
  if (gapSum > timeElapsed * 1000 + 2000) {
    score += 100;
    reasons.push("gap_sum_exceeds_duration");
  }

  if (gaps.length < MIN_GAPS_FOR_STATS) {
    return { score, reasons, bot: score >= DROP_SCORE };
  }

  // ── Signal 3: rhythm shape ────────────────────────────────────────────────
  // Everything below is statistical, so it is scored into `rhythm` and then
  // damped on short runs: a 10-word test yields ~55 intervals, where a normal
  // person's spread can look tight by chance. A bot's numbers are so far past
  // the thresholds that it still trips the limit even at 0.6 weight, while a
  // fast human on a short test no longer gets caught by noise.
  let rhythm = 0;
  const mean = gapSum / gaps.length;
  const variance =
    gaps.reduce((s, g) => s + (g - mean) * (g - mean), 0) / gaps.length;
  const cv = mean > 0 ? Math.sqrt(variance) / mean : 0;

  const sorted = [...gaps].sort((a, b) => a - b);
  const p25 = quantile(sorted, 0.25);
  const p50 = quantile(sorted, 0.5) || 1;
  const p75 = quantile(sorted, 0.75);
  const p95 = quantile(sorted, 0.95);
  const max = sorted[sorted.length - 1];

  // Coefficient of variation — the headline metric. Humans: 0.4-0.7.
  // setTimeout bot with ±5 % jitter: ~0.03; even ±40 % jitter only reaches ~0.23.
  if (cv < 0.12) {
    rhythm += 55;
    reasons.push(`cv:${cv.toFixed(3)}`);
  } else if (cv < 0.2) {
    rhythm += 35;
    reasons.push(`cv:${cv.toFixed(3)}`);
  } else if (cv < 0.3) {
    rhythm += 15;
    reasons.push(`cv:${cv.toFixed(3)}`);
  }

  // Relative IQR — same idea as CV but immune to a single outlier pause a
  // cheater might splice in to inflate the variance.
  const rIqr = (p75 - p25) / p50;
  if (rIqr < 0.15) {
    rhythm += 45;
    reasons.push(`riqr:${rIqr.toFixed(3)}`);
  } else if (rIqr < 0.25) {
    rhythm += 25;
    reasons.push(`riqr:${rIqr.toFixed(3)}`);
  } else if (rIqr < 0.4) {
    rhythm += 10;
    reasons.push(`riqr:${rIqr.toFixed(3)}`);
  }

  // Tail shape. Real typing always has slow moments — word boundaries, shift
  // reaches, a glance back at the screen. A bot's slowest keystroke is barely
  // slower than its median.
  const tail = p95 / p50;
  if (tail < 1.4) {
    rhythm += 35;
    reasons.push(`tail:${tail.toFixed(2)}`);
  } else if (tail < 1.8) {
    rhythm += 18;
    reasons.push(`tail:${tail.toFixed(2)}`);
  }

  const maxRatio = max / p50;
  if (maxRatio < 2) {
    rhythm += 25;
    reasons.push(`max:${maxRatio.toFixed(2)}`);
  } else if (maxRatio < 3) {
    rhythm += 10;
    reasons.push(`max:${maxRatio.toFixed(2)}`);
  }

  // Periodic pauses. The obvious way to dress up a metronome is to splice a
  // long gap in every N keystrokes — which leaves the slow keystrokes evenly
  // spaced. Human pauses land on word boundaries, and words are not all the
  // same length, so the spacing between a person's slow keystrokes is never
  // one repeated number (measured: ~0.2-0.4 of gaps share the modal spacing,
  // against 1.0 for a fixed-period script).
  const slowIdx: number[] = [];
  gaps.forEach((g, i) => {
    if (g > p50 * 1.8) slowIdx.push(i);
  });
  // Needs a decent sample: on a 10-word test a handful of pauses can share a
  // spacing by chance, so this only speaks up on longer runs.
  if (gaps.length >= 100 && slowIdx.length >= 10) {
    const spacings = new Map<number, number>();
    for (let i = 1; i < slowIdx.length; i++) {
      const d = slowIdx[i] - slowIdx[i - 1];
      spacings.set(d, (spacings.get(d) ?? 0) + 1);
    }
    const modal = Math.max(...spacings.values());
    const periodicity = modal / (slowIdx.length - 1);
    if (periodicity >= 0.8) {
      rhythm += 50;
      reasons.push(`periodic_pauses:${periodicity.toFixed(2)}`);
    }
  }

  // Empty middle. A bot that adds pauses does it by switching between two
  // speeds — a fast base delay and a spliced-in long one — which leaves a
  // hole in the histogram where the medium-length intervals should be. Human
  // typing slides continuously between fast and slow, so the band just above
  // the median is always populated (measured: 12-17 % of intervals, against
  // 0-3 % for two-speed scripts).
  if (gaps.length >= 100) {
    const midBand =
      gaps.filter((g) => g >= p50 * 1.3 && g <= p50 * 2).length / gaps.length;
    if (midBand < 0.05) {
      rhythm += 40;
      reasons.push(`empty_midband:${midBand.toFixed(3)}`);
    } else if (midBand < 0.08) {
      rhythm += 20;
      reasons.push(`empty_midband:${midBand.toFixed(3)}`);
    }
  }

  // A fast run with not one mistake and not one backspace. Possible for a
  // human, but rare enough to be worth a few points on top of the rhythm
  // evidence — never enough to drop a result on its own.
  if (
    wpm >= 70 &&
    telemetry.back === 0 &&
    correctedChars === 0 &&
    incorrectChars === 0
  ) {
    rhythm += 20;
    reasons.push("flawless_no_backspace");
  }

  // Short runs carry less statistical weight (see the note above).
  score += Math.round(rhythm * (gaps.length >= 100 ? 1 : 0.6));

  return { score, reasons, bot: score >= DROP_SCORE };
}
