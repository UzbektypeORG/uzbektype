"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useGoogleLogin } from "@/lib/useGoogleLogin";
import { displayName, avatarSrc } from "@/lib/userDisplay";
import DonateModal from "@/components/DonateModal";
import AnimatedSupportLabel from "@/components/AnimatedSupportLabel";

type Language = "uz" | "en" | "ru";

const languages = {
  uz: { name: "O'zbek", flag: "🇺🇿" },
  en: { name: "English", flag: "🇬🇧" },
  ru: { name: "Русский", flag: "🇷🇺" },
};

interface HeaderProps {
  lang: Language;
}

const navContent = {
  uz: {
    home: "Asosiy",
    features: "Imkoniyatlar",
    blog: "Bloglar",
    results: "Natijalar",
    leaderboard: "Reyting",
    login: "Kirish",
    logout: "Chiqish",
    profile: "Profil",
    start: "Boshlash",
    support: "Qo'llab-quvvatlash",
    donate: "Donat qilish",
    darkMode: "Tungi rejim",
    lightMode: "Kunduzgi rejim"
  },
  en: {
    home: "Home",
    features: "Features",
    blog: "Blog",
    results: "Results",
    leaderboard: "Leaderboard",
    login: "Login",
    logout: "Logout",
    profile: "Profile",
    start: "Start",
    support: "Support",
    donate: "Donate",
    darkMode: "Dark mode",
    lightMode: "Light mode"
  },
  ru: {
    home: "Главная",
    features: "Возможности",
    blog: "Блог",
    results: "Результаты",
    leaderboard: "Рейтинг",
    login: "Войти",
    logout: "Выйти",
    profile: "Профиль",
    start: "Начать",
    support: "Поддержать",
    donate: "Донат",
    darkMode: "Тёмная тема",
    lightMode: "Светлая тема"
  }
};

export default function Header({ lang }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDonate, setShowDonate] = useState(false);
  const { data: session } = useSession();
  const user = session?.user ?? null;
  const { handleLogin: handleGoogleLogin, isLoggingIn } = useGoogleLogin(lang);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Check if we're on a test page
  const isTestPage = pathname.includes('/tests/');

  useEffect(() => {
    // Language is now controlled by the URL, not localStorage

    // Initialize dark mode from localStorage or system preference
    const savedTheme = localStorage.getItem("uzbektype_theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      const isDarkMode = savedTheme === "dark";
      setIsDark(isDarkMode);
      document.documentElement.classList.toggle("dark", isDarkMode);
    } else {
      // Use system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(prefersDark);
      document.documentElement.classList.toggle("dark", prefersDark);
    }

  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    const handleScroll = () => {
      setIsOpen(false);
      setIsUserMenuOpen(false);
      setIsMobileMenuOpen(false);
    };

    if (isOpen || isUserMenuOpen || isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen, isUserMenuOpen, isMobileMenuOpen]);

  const changeLang = (newLang: Language) => {
    setIsOpen(false);
    // Get current path without the language prefix
    const pathWithoutLang = pathname.replace(/^\/(uz|en|ru)/, '');
    // Navigate to the new language URL
    router.push(`/${newLang}${pathWithoutLang || ''}`);
  };

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle("dark", newIsDark);
    localStorage.setItem("uzbektype_theme", newIsDark ? "dark" : "light");
  };

  // Handle navigation with hash scrolling
  const handleHashNavigation = (e: React.MouseEvent, hash: string) => {
    e.preventDefault();
    const isOnLandingPage = pathname === `/${lang}` || pathname === `/${lang}/`;

    if (isOnLandingPage) {
      // Already on landing page, just scroll to the section
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to landing page first, then scroll
      router.push(`/${lang}`);
      // Wait for navigation and then scroll
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleLogout = async () => {
    setIsUserMenuOpen(false);
    await signOut({ callbackUrl: `/${lang}` });
  };

  const userMenuContent = {
    uz: { dashboard: "Natijalarim", leaderboard: "Reyting", profile: "Profil", logout: "Chiqish", loading: "Kuting..." },
    en: { dashboard: "My results", leaderboard: "Leaderboard", profile: "Profile", logout: "Logout", loading: "Loading..." },
    ru: { dashboard: "Мои результаты", leaderboard: "Рейтинг", profile: "Профиль", logout: "Выйти", loading: "Загрузка..." },
  };
  const um = userMenuContent[lang];

  return (
    <header className="backdrop-blur-md bg-background/15 sticky top-0 z-50 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link href={`/${lang}`} className="text-xl font-bold">
          uzbektype
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href={`/${lang}/leaderboard/weekly/easy`}
            className="text-sm hover:text-foreground transition-colors flex items-center gap-1.5"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
              <path d="M4 22h16" />
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
            </svg>
            {navContent[lang].leaderboard}
          </Link>

          <a
            href={`/${lang}#hero`}
            onClick={(e) => handleHashNavigation(e, 'hero')}
            className="text-sm hover:text-foreground transition-colors cursor-pointer"
          >
            {navContent[lang].home}
          </a>

          <Link
            href={`/${lang}/blog`}
            className="text-sm hover:text-foreground transition-colors"
          >
            {navContent[lang].blog}
          </Link>

          {/* Donate / Support — a fixed-width slot (sized to the widest label)
              reserves layout space, so the button can grow/shrink freely
              without nudging the rest of the nav. The real button is centered
              over the invisible sizer. */}
          <span className="relative inline-flex items-center">
            <span
              aria-hidden
              className="invisible flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold border rounded-full"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span className="grid">
                <span className="col-start-1 row-start-1 whitespace-nowrap">{navContent[lang].support}</span>
                <span className="col-start-1 row-start-1 whitespace-nowrap">{navContent[lang].donate}</span>
              </span>
            </span>
            <button
              onClick={() => setShowDonate(true)}
              className="absolute inset-y-0 left-1/2 -translate-x-1/2 text-sm font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/60 text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300 cursor-pointer whitespace-nowrap"
            >
              <svg className="heart-beat" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <AnimatedSupportLabel support={navContent[lang].support} donate={navContent[lang].donate} />
            </button>
          </span>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center text-sm hover:opacity-70 transition-all duration-300 cursor-pointer"
            aria-label="Toggle dark mode"
          >
            <span className="inline-block transition-all duration-300" style={{ transform: isDark ? 'rotate(180deg)' : 'rotate(0deg)', opacity: isDark ? 1 : 0.9 }}>
              {isDark ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/>
                  <line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </span>
          </button>

          {/* Language Selector — icon only */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-8 h-8 flex items-center justify-center rounded hover:bg-accent transition-colors text-base"
              aria-label="Change language"
            >
              {languages[lang].flag}
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-40 border border-border rounded-lg bg-background/95 backdrop-blur-md z-50">
                {(Object.keys(languages) as Language[]).map((langOption) => (
                  <button
                    key={langOption}
                    onClick={() => changeLang(langOption)}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-accent transition-colors first:rounded-t-lg last:rounded-b-lg flex items-center gap-2 ${
                      lang === langOption ? "font-semibold bg-accent/50" : ""
                    }`}
                  >
                    <span>{languages[langOption].flag}</span>
                    <span>{languages[langOption].name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Start Button - only show on landing page */}
          {!isTestPage && (
            <Link
              href={`/${lang}/tests/30s-easy`}
              className="px-4 py-1.5 text-sm rounded bg-primary text-primary-foreground hover:opacity-90 transition-all font-medium"
            >
              {navContent[lang].start}
            </Link>
          )}

          {/* Auth Section */}
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 px-2 py-1 rounded hover:bg-accent transition-colors"
                aria-label="User menu"
              >
                <img
                  src={avatarSrc(user)}
                  alt={displayName(user)}
                  className="w-7 h-7 rounded-full border border-border"
                />
                <span className="text-sm hidden lg:inline">{displayName(user)}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`}>
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 border border-border rounded-lg bg-background/95 backdrop-blur-md shadow-lg overflow-hidden">
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-sm font-medium truncate">{displayName(user)}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                  <Link
                    href={`/${lang}/dashboard`}
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="9"/>
                      <rect x="14" y="3" width="7" height="5"/>
                      <rect x="14" y="12" width="7" height="9"/>
                      <rect x="3" y="16" width="7" height="5"/>
                    </svg>
                    <span>{um.dashboard}</span>
                  </Link>
                  <Link
                    href={`/${lang}/leaderboard/weekly/easy`}
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
                      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                      <path d="M4 22h16"/>
                      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
                    </svg>
                    <span>{um.leaderboard}</span>
                  </Link>
                  <Link
                    href={`/${lang}/profile`}
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="4"/>
                      <path d="M5 21a7 7 0 0 1 14 0"/>
                    </svg>
                    <span>{um.profile}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent transition-colors text-left border-t border-border"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                      <polyline points="16 17 21 12 16 7"/>
                      <line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                    <span>{um.logout}</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleGoogleLogin}
              disabled={isLoggingIn}
              className="px-4 py-1.5 text-sm rounded border border-border hover:border-foreground transition-all font-medium disabled:opacity-50 flex items-center gap-2"
            >
              {isLoggingIn ? (
                <>
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  <span>{um.loading}</span>
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>{navContent[lang].login}</span>
                </>
              )}
            </button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          {/* Donate — always visible in the mobile top bar */}
          <button
            onClick={() => setShowDonate(true)}
            aria-label={navContent[lang].support}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-primary/60 text-primary text-xs font-bold hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
          >
            <svg className="heart-beat" width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            {navContent[lang].donate}
          </button>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 hover:bg-accent rounded transition-colors relative w-10 h-10 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <span
              className={`absolute h-0.5 w-5 bg-current transition-all duration-300 ease-in-out ${
                isMobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'
              }`}
            />
            <span
              className={`absolute h-0.5 w-5 bg-current transition-all duration-300 ease-in-out ${
                isMobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
              }`}
            />
            <span
              className={`absolute h-0.5 w-5 bg-current transition-all duration-300 ease-in-out ${
                isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute left-0 right-0 top-full border-t border-border bg-background/95 backdrop-blur-md overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-[85vh] opacity-100 overflow-y-auto' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
          {/* User card at top when logged in */}
          {user && (
            <Link
              href={`/${lang}/profile`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 p-3 rounded-lg bg-accent/50 mb-2"
            >
              <img src={avatarSrc(user)} alt={displayName(user)} className="w-10 h-10 rounded-full border border-border" style={{ imageRendering: "pixelated" }} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold truncate">{displayName(user)}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground flex-shrink-0">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          )}

          {/* Primary navigation */}
          <a
            href={`/${lang}#hero`}
            onClick={(e) => { handleHashNavigation(e, 'hero'); setIsMobileMenuOpen(false); }}
            className="px-3 py-2.5 text-sm rounded-lg hover:bg-accent transition-colors flex items-center gap-3"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            {navContent[lang].home}
          </a>

          <Link
            href={`/${lang}/leaderboard/weekly/easy`}
            onClick={() => setIsMobileMenuOpen(false)}
            className="px-3 py-2.5 text-sm rounded-lg hover:bg-accent transition-colors flex items-center gap-3"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
              <path d="M4 22h16" />
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
            </svg>
            {navContent[lang].leaderboard}
          </Link>

          <Link
            href={`/${lang}/blog`}
            onClick={() => setIsMobileMenuOpen(false)}
            className="px-3 py-2.5 text-sm rounded-lg hover:bg-accent transition-colors flex items-center gap-3"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            {navContent[lang].blog}
          </Link>

          {/* Theme toggle — moved into the mobile menu */}
          <button
            onClick={toggleTheme}
            className="px-3 py-2.5 text-sm rounded-lg hover:bg-accent transition-colors flex items-center gap-3 text-left"
          >
            {isDark ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
            {isDark ? navContent[lang].lightMode : navContent[lang].darkMode}
          </button>

          {user && (
            <Link
              href={`/${lang}/dashboard`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2.5 text-sm rounded-lg hover:bg-accent transition-colors flex items-center gap-3"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                <rect x="3" y="3" width="7" height="9"/>
                <rect x="14" y="3" width="7" height="5"/>
                <rect x="14" y="12" width="7" height="9"/>
                <rect x="3" y="16" width="7" height="5"/>
              </svg>
              {um.dashboard}
            </Link>
          )}

          {/* Start Button - only on non-test pages */}
          {!isTestPage && (
            <Link
              href={`/${lang}/tests/30s-easy`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 mt-2 text-sm rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all font-medium text-center"
            >
              {navContent[lang].start}
            </Link>
          )}

          {/* Auth — login button when signed out, logout link when signed in */}
          {user ? (
            <button
              onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
              className="px-3 py-2.5 mt-2 text-sm rounded-lg hover:bg-accent transition-colors flex items-center gap-3 text-left text-muted-foreground"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              {um.logout}
            </button>
          ) : (
            <button
              onClick={() => { handleGoogleLogin(); setIsMobileMenuOpen(false); }}
              disabled={isLoggingIn}
              className="px-4 py-3 mt-2 text-sm rounded-lg border border-border hover:border-foreground transition-all font-medium disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>{isLoggingIn ? um.loading : navContent[lang].login}</span>
            </button>
          )}

          {/* Language Selector for Mobile */}
          <div className="border-t border-border pt-4 mt-2">
            <div className="text-xs text-muted-foreground mb-2">Language / Til / Язык</div>
            <div className="flex flex-col gap-2">
              {(Object.keys(languages) as Language[]).map((langOption) => (
                <button
                  key={langOption}
                  onClick={() => {
                    changeLang(langOption);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-4 py-2 text-left text-sm hover:bg-accent transition-colors rounded flex items-center gap-2 ${
                    lang === langOption ? "font-semibold bg-accent/50" : ""
                  }`}
                >
                  <span>{languages[langOption].flag}</span>
                  <span>{languages[langOption].name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <DonateModal isOpen={showDonate} onClose={() => setShowDonate(false)} lang={lang} />
    </header>
  );
}
