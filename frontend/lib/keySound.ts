// Keyboard sound effects from real switch recordings (public/sounds/keyboard,
// from kbsim — MIT, see NOTICE.txt there). Each switch has five recordings
// of an ordinary key press plus one release; NK Cream and Holy Panda also
// have their own space and backspace. Press plays on keydown and release on
// keyup, like a real board.
//
// Files are fetched and decoded once per switch (preloadKeySound, ~40 KB),
// so a keypress only starts an already-decoded buffer.

export type SoundProfile = "off" | "cream" | "holypanda" | "mxblue";
export type KeyKind = "char" | "space" | "back";
type Phase = "press" | "release";
type Switch = Exclude<SoundProfile, "off">;

export const SOUND_PROFILES: SoundProfile[] = ["off", "cream", "holypanda", "mxblue"];
export const SOUND_STORAGE_KEY = "uzbektype_key_sound";

export const SOUND_LABELS: Record<Switch, { short: string; title: string }> = {
  cream: { short: "Cream", title: "NK Cream — linear (thock)" },
  holypanda: { short: "Panda", title: "Holy Panda — tactile" },
  mxblue: { short: "Blue", title: "Cherry MX Blue — clicky" },
};

// Switches recorded with their own space/backspace sounds; the rest reuse
// the ordinary key for those.
const HAS_SPECIAL_KEYS: Record<Switch, boolean> = { cream: true, holypanda: true, mxblue: false };
const PRESS_VARIANTS = 5;

type Bank = { press: Record<KeyKind, AudioBuffer[]>; release: Record<KeyKind, AudioBuffer> };

let ctx: AudioContext | null = null;
const banks = new Map<Switch, Bank>();
const loading = new Map<Switch, Promise<void>>();

function getCtx(): AudioContext | null {
  if (ctx) return ctx;
  try {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new AC({ latencyHint: "interactive" });
  } catch {
    ctx = null;
  }
  return ctx;
}

async function decode(c: AudioContext, path: string): Promise<AudioBuffer> {
  const res = await fetch(`/sounds/keyboard/${path}.mp3`);
  return c.decodeAudioData(await res.arrayBuffer());
}

// Safe to call repeatedly; fetches each switch at most once.
export function preloadKeySound(profile: SoundProfile): Promise<void> {
  if (profile === "off" || typeof window === "undefined") return Promise.resolve();
  const existing = loading.get(profile);
  if (existing) return existing;

  const c = getCtx();
  if (!c) return Promise.resolve();

  const p = (async () => {
    const sw = profile;
    const special = HAS_SPECIAL_KEYS[sw];
    const generic = await Promise.all(
      Array.from({ length: PRESS_VARIANTS }, (_, i) => decode(c, `${sw}/press/GENERIC_R${i}`))
    );
    const [releaseGeneric, pressSpace, pressBack, releaseSpace, releaseBack] = await Promise.all([
      decode(c, `${sw}/release/GENERIC`),
      special ? decode(c, `${sw}/press/SPACE`) : null,
      special ? decode(c, `${sw}/press/BACKSPACE`) : null,
      special ? decode(c, `${sw}/release/SPACE`) : null,
      special ? decode(c, `${sw}/release/BACKSPACE`) : null,
    ]);
    banks.set(sw, {
      press: {
        char: generic,
        space: pressSpace ? [pressSpace] : generic,
        back: pressBack ? [pressBack] : generic,
      },
      release: {
        char: releaseGeneric,
        space: releaseSpace ?? releaseGeneric,
        back: releaseBack ?? releaseGeneric,
      },
    });
  })().catch(() => {
    loading.delete(profile); // let a later call retry (e.g. after a network blip)
  });

  loading.set(profile, p);
  return p;
}

export function playKeySound(profile: SoundProfile, kind: KeyKind, phase: Phase = "press") {
  if (profile === "off" || typeof window === "undefined") return;
  const bank = banks.get(profile);
  const c = getCtx();
  if (!bank || !c) {
    preloadKeySound(profile); // first keystrokes stay silent until it's decoded
    return;
  }
  try {
    if (c.state === "suspended") c.resume();
    const list = phase === "press" ? bank.press[kind] : [bank.release[kind]];
    const src = c.createBufferSource();
    src.buffer = list[Math.floor(Math.random() * list.length)];
    // ±2% pitch so a run of the same recording doesn't sound looped.
    src.playbackRate.value = 0.98 + Math.random() * 0.04;
    src.connect(c.destination);
    src.start();
  } catch {
    // Web Audio unavailable — typing just stays silent.
  }
}
