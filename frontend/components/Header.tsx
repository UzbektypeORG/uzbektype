"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
// Backend temporarily disabled
// import { getCurrentUser, loginWithGoogle, logout, type User } from "@/lib/mockAuth";

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
    login: "Kirish",
    logout: "Chiqish",
    profile: "Profil"
  },
  en: {
    home: "Home",
    features: "Features",
    blog: "Blog",
    results: "Results",
    login: "Login",
    logout: "Logout",
    profile: "Profile"
  },
  ru: {
    home: "Главная",
    features: "Возможности",
    blog: "Блог",
    results: "Результаты",
    login: "Войти",
    logout: "Выйти",
    profile: "Профиль"
  }
};

export default function Header({ lang }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Backend temporarily disabled
  // const [user, setUser] = useState<User | null>(null);
  // const [isLoggingIn, setIsLoggingIn] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

    // Backend temporarily disabled
    // Load current user
    // setUser(getCurrentUser());

    // Listen for auth changes
    // const handleAuthChange = () => {
    //   setUser(getCurrentUser());
    // };

    // window.addEventListener('auth-change', handleAuthChange);
    // return () => window.removeEventListener('auth-change', handleAuthChange);
  }, []);

  // Close dropdown when clicking outside or scrolling
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      setIsOpen(false);
      setIsMobileMenuOpen(false);
    };

    if (isOpen || isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen, isMobileMenuOpen]);

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

  // Backend temporarily disabled
  // const handleGoogleLogin = async () => {
  //   setIsLoggingIn(true);
  //   try {
  //     await loginWithGoogle();
  //   } catch (error) {
  //     console.error('Login failed:', error);
  //   } finally {
  //     setIsLoggingIn(false);
  //   }
  // };

  // const handleLogout = () => {
  //   logout();
  // };

  return (
    <header className="backdrop-blur-sm bg-background/0 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link href={`/${lang}`} className="text-xl font-bold">
          uzbektype
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href={`/${lang}#hero`} className="text-sm hover:text-foreground transition-colors">
            {navContent[lang].home}
          </Link>
          <Link href={`/${lang}#features`} className="text-sm hover:text-foreground transition-colors">
            {navContent[lang].features}
          </Link>
          <Link href={`/${lang}#blog`} className="text-sm hover:text-foreground transition-colors">
            {navContent[lang].blog}
          </Link>
          <Link href={`/${lang}#leaderboard`} className="text-sm hover:text-foreground transition-colors">
            {navContent[lang].results}
          </Link>

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

          {/* Language Selector */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="px-3 py-1.5 text-sm border border-border rounded hover:border-foreground transition-colors flex items-center gap-2"
            >
              <span>{languages[lang].flag}</span>
              <span>{languages[lang].name}</span>
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-40 border border-border rounded-lg bg-background/25 backdrop-blur-md">
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

          {/* Auth Section - Backend temporarily disabled */}
          {/* {user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/profile"
                className="flex items-center gap-2 px-3 py-1.5 text-sm border border-border rounded hover:border-foreground dark:hover:border-white transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span className="hidden sm:inline">{user.displayName}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {navContent[currentLang].logout}
              </button>
            </div>
          ) : (
            <button
              onClick={handleGoogleLogin}
              disabled={isLoggingIn}
              className="px-4 py-1.5 text-sm rounded bg-primary text-primary-foreground hover:opacity-90 transition-all font-medium disabled:opacity-50 flex items-center gap-2"
            >
              {isLoggingIn ? (
                <>
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>{currentLang === 'uz' ? 'Kuting...' : currentLang === 'ru' ? 'Загрузка...' : 'Loading...'}</span>
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>{navContent[currentLang].login}</span>
                </>
              )}
            </button>
          )} */}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          {/* Dark Mode Toggle for Mobile */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center text-sm hover:opacity-70 transition-all duration-300 cursor-pointer"
            aria-label="Toggle dark mode"
          >
            <span className="inline-block transition-all duration-300" style={{ transform: isDark ? 'rotate(180deg)' : 'rotate(0deg)', opacity: isDark ? 1 : 0.9 }}>
              {isDark ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </span>
          </button>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 hover:bg-accent rounded transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-4">
            <Link
              href={`/${lang}#hero`}
              className="text-sm hover:text-foreground transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {navContent[lang].home}
            </Link>
            <Link
              href={`/${lang}#features`}
              className="text-sm hover:text-foreground transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {navContent[lang].features}
            </Link>
            <Link
              href={`/${lang}#blog`}
              className="text-sm hover:text-foreground transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {navContent[lang].blog}
            </Link>
            <Link
              href={`/${lang}#leaderboard`}
              className="text-sm hover:text-foreground transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {navContent[lang].results}
            </Link>

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
      )}
    </header>
  );
}
