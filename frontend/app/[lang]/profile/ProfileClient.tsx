"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useGoogleLogin } from "@/lib/useGoogleLogin";
import { displayName, avatarSrc } from "@/lib/userDisplay";

type Language = "uz" | "en" | "ru";

const content = {
  uz: {
    title: "Profil",
    subtitle: "Ismingizni va avatarni o'zgartiring",
    nameSection: "Shaxsiy ma'lumotlar",
    firstName: "Ism",
    lastName: "Familiya",
    firstNamePlaceholder: "Masalan: Akmal",
    lastNamePlaceholder: "Masalan: Karimov",
    save: "Saqlash",
    saved: "Saqlandi!",
    avatarSection: "Avatar",
    avatarHint: "Sizga yoqqan piksel ko'rinishni bosing",
    refresh: "Boshqa variantlar",
    backToDashboard: "Natijalarim",
    backToHome: "Asosiy",
    loginRequired: "Profilni o'zgartirish uchun avval Google bilan kiring",
    loginCta: "Google bilan kirish",
    loginLoading: "Kuting...",
  },
  en: {
    title: "Profile",
    subtitle: "Edit your name and avatar",
    nameSection: "Personal info",
    firstName: "First name",
    lastName: "Last name",
    firstNamePlaceholder: "e.g. John",
    lastNamePlaceholder: "e.g. Smith",
    save: "Save",
    saved: "Saved!",
    avatarSection: "Avatar",
    avatarHint: "Click a pixel look you like",
    refresh: "Other variants",
    backToDashboard: "My results",
    backToHome: "Home",
    loginRequired: "Sign in with Google to edit your profile",
    loginCta: "Sign in with Google",
    loginLoading: "Loading...",
  },
  ru: {
    title: "Профиль",
    subtitle: "Измените имя и аватар",
    nameSection: "Личные данные",
    firstName: "Имя",
    lastName: "Фамилия",
    firstNamePlaceholder: "Например: Иван",
    lastNamePlaceholder: "Например: Петров",
    save: "Сохранить",
    saved: "Сохранено!",
    avatarSection: "Аватар",
    avatarHint: "Нажмите понравившийся пиксельный стиль",
    refresh: "Другие варианты",
    backToDashboard: "Мои результаты",
    backToHome: "Главная",
    loginRequired: "Войдите через Google, чтобы редактировать профиль",
    loginCta: "Войти через Google",
    loginLoading: "Загрузка...",
  },
};

const PIXEL_STYLE = "pixel-art";

function dicebearUrl(seed: string): string {
  return `https://api.dicebear.com/7.x/${PIXEL_STYLE}/svg?seed=${encodeURIComponent(seed)}`;
}

function generateRandomSeeds(count: number): string[] {
  return Array.from({ length: count }, () => Math.random().toString(36).slice(2, 12));
}

function normalizeName(value: string): string {
  return value
    .trim()
    .toLocaleLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toLocaleUpperCase() + word.slice(1))
    .join(" ");
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

async function patchProfile(payload: { firstName?: string; lastName?: string; avatarUrl?: string }) {
  const res = await fetch("/api/profile", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`profile_update_failed_${res.status}`);
}

export default function ProfileClient({ lang }: { lang: Language }) {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const user = session?.user ?? null;
  const mounted = status !== "loading";
  const { handleLogin, isLoggingIn } = useGoogleLogin(lang);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [seeds, setSeeds] = useState<string[]>([]);
  const [seedAnimKey, setSeedAnimKey] = useState(0);
  const [pickedSeed, setPickedSeed] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const initialSyncDone = useRef(false);
  const t = content[lang];

  useEffect(() => {
    setSeeds(generateRandomSeeds(6));
  }, []);

  // Sync local form state from session ONCE on first load. Don't keep re-syncing
  // on every session update (would clobber the user's in-progress typing).
  useEffect(() => {
    if (user && !initialSyncDone.current) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      initialSyncDone.current = true;
    }
  }, [user]);

  const canSaveName = firstName.trim().length > 0 && lastName.trim().length > 0;

  // Avatar click = local preview only. Header keeps showing the saved value.
  const handlePickAvatar = (seed: string) => {
    setPickedSeed(seed);
  };

  const handleSave = async () => {
    if (!user || saving) return;

    const payload: { firstName?: string; lastName?: string; avatarUrl?: string } = {};

    if (canSaveName) {
      const f = normalizeName(firstName);
      const l = normalizeName(lastName);
      const nameChanged = f !== (user.firstName || "") || l !== (user.lastName || "");
      if (nameChanged) {
        payload.firstName = f;
        payload.lastName = l;
        setFirstName(f);
        setLastName(l);
      }
    }

    if (pickedSeed) {
      payload.avatarUrl = dicebearUrl(pickedSeed);
    }

    if (Object.keys(payload).length === 0) return;

    setSaving(true);
    try {
      await patchProfile(payload);
      await update({
        user: {
          ...session?.user,
          ...(payload.firstName !== undefined && { firstName: payload.firstName }),
          ...(payload.lastName !== undefined && { lastName: payload.lastName }),
          ...(payload.avatarUrl !== undefined && { avatarUrl: payload.avatarUrl }),
        },
      });
      router.refresh();
      setRedirecting(true);
      setPickedSeed(null);
      router.push(`/${lang}/tests/30s-medium`);
    } catch (err) {
      console.error("Failed to save profile:", err);
      setSaving(false);
    }
  };

  const hasUnsavedChanges = (() => {
    if (!user) return false;
    if (pickedSeed) return true;
    if (!canSaveName) return false;
    const f = normalizeName(firstName);
    const l = normalizeName(lastName);
    return f !== (user.firstName || "") || l !== (user.lastName || "");
  })();

  const handleRefresh = () => {
    setSeeds(generateRandomSeeds(6));
    setSeedAnimKey((k) => k + 1);
    setPickedSeed(null);
  };

  const currentAvatarSeed = mounted && user
    ? seeds.find((s) => dicebearUrl(s) === user.avatarUrl)
    // (user.avatarUrl may be null if not set yet)
    : null;

  // Login gate
  if (mounted && !user) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <circle cx="12" cy="8" r="4" />
              <path d="M5 21a7 7 0 0 1 14 0" />
            </svg>
          </div>
          <p className="text-muted-foreground text-sm">{t.loginRequired}</p>
          <button
            onClick={handleLogin}
            disabled={isLoggingIn}
            className="px-6 py-3 rounded-lg border border-border hover:border-foreground transition-all font-medium disabled:opacity-50 inline-flex items-center justify-center gap-2 mx-auto"
          >
            <GoogleIcon />
            {isLoggingIn ? t.loginLoading : t.loginCta}
          </button>
        </div>
      </main>
    );
  }

  if (!mounted || !user) {
    return <main className="min-h-screen" />;
  }

  if (redirecting) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">…</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 sm:px-6 py-8 md:py-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold">{t.title}</h1>
          <p className="text-sm text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* Preview: shows the picked avatar (before save) or the saved one */}
        <div className="flex flex-col items-center gap-3">
          <div
            className={`w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 transition-all duration-300 ${
              pickedSeed ? "border-primary ring-4 ring-primary/20" : "border-border bg-accent/30"
            }`}
            style={{ imageRendering: "pixelated" }}
          >
            <img
              key={pickedSeed ?? "saved"}
              src={pickedSeed ? dicebearUrl(pickedSeed) : avatarSrc(user)}
              alt={displayName(user)}
              className="w-full h-full animate-fade-in"
              style={{ imageRendering: "pixelated" }}
            />
          </div>
          <div className="text-center">
            <p className="font-semibold">{displayName(user)}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>

        {/* Name section */}
        <section className="border border-border rounded-xl p-5 md:p-6 space-y-4">
          <h2 className="text-base font-semibold">{t.nameSection}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                {t.firstName}
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                onBlur={() => setFirstName(normalizeName(firstName))}
                placeholder={t.firstNamePlaceholder}
                maxLength={30}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                {t.lastName}
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                onBlur={() => setLastName(normalizeName(lastName))}
                placeholder={t.lastNamePlaceholder}
                maxLength={30}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                onKeyDown={(e) => { if (e.key === "Enter" && hasUnsavedChanges) handleSave(); }}
              />
            </div>
          </div>
        </section>

        {/* Avatar section */}
        <section className="border border-border rounded-xl p-5 md:p-6 space-y-4">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <h2 className="text-base font-semibold">{t.avatarSection}</h2>
              <p className="text-xs text-muted-foreground mt-0.5">{t.avatarHint}</p>
            </div>
            <button
              onClick={handleRefresh}
              className="px-3 py-1.5 text-xs rounded-lg border border-border hover:border-foreground transition-all flex items-center gap-1.5 flex-shrink-0"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                <path d="M8 16H3v5" />
              </svg>
              {t.refresh}
            </button>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {seeds.map((seed, i) => {
              const isPicked = pickedSeed === seed;
              const isSavedCurrent = !pickedSeed && currentAvatarSeed === seed;
              return (
                <button
                  key={`${seedAnimKey}-${seed}`}
                  onClick={() => handlePickAvatar(seed)}
                  className={`group relative flex flex-col items-center p-2 md:p-3 rounded-xl border-2 transition-all animate-pixel-pop ${
                    isPicked
                      ? "border-primary bg-primary/10 scale-[1.05] ring-2 ring-primary/30"
                      : isSavedCurrent
                      ? "border-primary/50 bg-primary/5"
                      : "border-border hover:border-foreground/50 hover:bg-accent/30 hover:scale-[1.03]"
                  }`}
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  {(isPicked || isSavedCurrent) && (
                    <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center z-10 shadow">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  )}
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden bg-accent/30 flex items-center justify-center" style={{ imageRendering: "pixelated" }}>
                    <img
                      src={dicebearUrl(seed)}
                      alt="Pixel avatar"
                      className="w-full h-full"
                      loading="lazy"
                      style={{ imageRendering: "pixelated" }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

        </section>

        {/* Single save button — saves both name and avatar */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={handleSave}
            disabled={!hasUnsavedChanges || saving}
            className="px-8 py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed min-w-[140px]"
          >
            {saving ? "…" : t.save}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
          <Link
            href={`/${lang}/dashboard`}
            className="px-6 py-2.5 rounded-lg border border-border hover:border-foreground transition-all text-sm font-medium text-center"
          >
            {t.backToDashboard}
          </Link>
          <Link
            href={`/${lang}`}
            className="px-6 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors text-center"
          >
            ← {t.backToHome}
          </Link>
        </div>
      </div>
    </main>
  );
}
