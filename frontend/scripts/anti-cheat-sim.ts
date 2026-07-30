// Threshold calibration for lib/anti-cheat.ts.
//
//   npx tsx scripts/anti-cheat-sim.ts
//
// Runs simulated typing sessions through analyzeRun() and reports how often
// each profile is dropped. Re-run this after touching any threshold: the
// `human …` rows must stay at ~0 % dropped (a false positive silently deletes
// a real person's record), the `bot …` rows should stay high.
//
// The human model is log-normal inter-keystroke intervals (sigma = how uneven
// the typist is) plus a word-boundary slowdown every ~6 keys and a rare long
// stall — the shape real typing has. The bot rows mirror what a console
// autotyper produces, including the variants an author would reach for after
// a first attempt fails: wider jitter, spliced-in pauses, and finally a bot
// that samples from a human-like distribution outright.
//
// Note every bot row here assumes untrusted === 0, i.e. the script already
// defeated the isTrusted check. A plain dispatchEvent() payload is dropped on
// that signal alone and never reaches these statistics.
import { analyzeRun, type KeystrokeTelemetry } from "../lib/anti-cheat";

/** Log-normal gaps + word-boundary pauses + occasional stalls. */
function human(meanGap: number, sigma: number, len: number) {
  return Array.from({ length: len }, (_, i) => {
    // Sum of three uniforms ≈ normal, so exp(...) ≈ log-normal.
    let g = meanGap * Math.exp(sigma * (Math.random() + Math.random() + Math.random() - 1.5));
    if (i % 6 === 0) g *= 1.4 + Math.random() * 0.8; // word boundary
    if (Math.random() < 0.02) g *= 3 + Math.random() * 4; // stall
    return g;
  });
}

/** Base inter-keystroke delay for a target WPM. */
const b = (wpm: number) => 60000 / (wpm * 5);

type Run = { gaps: number[]; back: number; corr: number; inc: number };

function score(r: Run) {
  const telemetry: KeystrokeTelemetry = {
    v: 1,
    gaps: r.gaps,
    chars: r.gaps.length + 1,
    back: r.back,
    untrusted: 0,
  };
  const totalChars = telemetry.chars - r.back;
  const timeElapsed = r.gaps.reduce((a, x) => a + x, 0) / 1000;
  const wpm = Math.round((totalChars / 5 / timeElapsed) * 60);
  return {
    v: analyzeRun({
      telemetry,
      wpm,
      timeElapsed,
      totalChars,
      correctedChars: r.corr,
      incorrectChars: r.inc,
    }),
    wpm,
  };
}

function mc(name: string, f: () => Run, n = 2000) {
  let dropped = 0, sum = 0, wpmSum = 0, worst = 0;
  for (let i = 0; i < n; i++) {
    const { v, wpm } = score(f());
    if (v.bot) dropped++;
    sum += v.score;
    wpmSum += wpm;
    worst = Math.max(worst, v.score);
  }
  console.log(
    `${name.padEnd(34)} dropped=${((dropped / n) * 100).toFixed(1).padStart(5)}%` +
      `  avgScore=${(sum / n).toFixed(1).padStart(5)}  worst=${String(worst).padStart(3)}` +
      `  avgWpm=${(wpmSum / n).toFixed(0)}`
  );
}

// ── Humans — false-positive rate must stay ~0 ──────────────────────────────
mc("human 60wpm 60s", () => ({ gaps: human(200, 0.5, 600), back: 25, corr: 8, inc: 4 }));
mc("human 80wpm 60s", () => ({ gaps: human(150, 0.4, 600), back: 20, corr: 6, inc: 3 }));
mc("human 100wpm steady 60s", () => ({ gaps: human(120, 0.3, 600), back: 15, corr: 4, inc: 2 }));
mc("human 120wpm v.steady 60s", () => ({ gaps: human(100, 0.25, 600), back: 10, corr: 3, inc: 1 }));
mc("human 130wpm flawless 60s", () => ({ gaps: human(92, 0.22, 600), back: 0, corr: 0, inc: 0 }));
mc("human 130wpm sigma.18 60s", () => ({ gaps: human(92, 0.18, 600), back: 0, corr: 0, inc: 0 }));
mc("human 110wpm burst-heavy", () => ({
  gaps: Array.from({ length: 600 }, (_, i) => {
    let g = 109 * Math.exp(0.55 * (Math.random() + Math.random() + Math.random() - 1.5));
    if (i % 5 === 0) g *= 1.6 + Math.random();
    if (Math.random() < 0.03) g *= 4 + Math.random() * 5;
    return g;
  }),
  back: 9, corr: 3, inc: 2,
}));
mc("human 90wpm 10s short", () => ({ gaps: human(133, 0.4, 75), back: 3, corr: 1, inc: 1 }));
mc("human 100wpm 10w short", () => ({ gaps: human(120, 0.35, 55), back: 2, corr: 1, inc: 0 }));
mc("human 60wpm 30s", () => ({ gaps: human(200, 0.5, 300), back: 12, corr: 4, inc: 2 }));

// ── Bots — detection rate ─────────────────────────────────────────────────
mc("bot 130wpm ±5%", () => ({
  gaps: Array.from({ length: 600 }, () => b(130) * (1 + (Math.random() * 0.1 - 0.05))),
  back: 0, corr: 0, inc: 0,
}));
mc("bot 130wpm ±40%", () => ({
  gaps: Array.from({ length: 600 }, () => b(130) * (1 + (Math.random() * 0.8 - 0.4))),
  back: 0, corr: 0, inc: 0,
}));
mc("bot 130wpm periodic pauses", () => ({
  gaps: Array.from({ length: 600 }, (_, i) =>
    i % 8 === 0 ? b(130) * (2 + Math.random()) : b(130) * (1 + (Math.random() * 0.6 - 0.3))
  ),
  back: 0, corr: 0, inc: 0,
}));
mc("bot 130wpm random pauses", () => ({
  gaps: Array.from({ length: 600 }, () =>
    Math.random() < 0.12 ? b(130) * (2 + Math.random() * 2) : b(130) * (1 + (Math.random() * 0.6 - 0.3))
  ),
  back: 0, corr: 0, inc: 0,
}));
mc("bot 130wpm rand pauses wide", () => ({
  gaps: Array.from({ length: 600 }, () =>
    Math.random() < 0.12 ? b(130) * (1.5 + Math.random() * 2.5) : b(130) * (1 + (Math.random() * 0.8 - 0.4))
  ),
  back: 0, corr: 0, inc: 0,
}));
mc("bot 130wpm lognormal (smart)", () => ({
  gaps: Array.from({ length: 600 }, () =>
    b(130) * Math.exp(0.45 * (Math.random() + Math.random() + Math.random() - 1.5))
  ),
  back: 0, corr: 0, inc: 0,
}));
mc("bot 130wpm short 10s", () => ({
  gaps: Array.from({ length: 75 }, () => b(130) * (1 + (Math.random() * 0.1 - 0.05))),
  back: 0, corr: 0, inc: 0,
}));
mc("bot 50wpm ±5%", () => ({
  gaps: Array.from({ length: 300 }, () => b(50) * (1 + (Math.random() * 0.1 - 0.05))),
  back: 0, corr: 0, inc: 0,
}));
