"use client";

export const OPEN_LOGIN_EVENT = "uzbektype:open-login";

/**
 * Login helper. Opens the sign-in chooser (components/LoginModal.tsx, mounted
 * once in Providers): Telegram (recommended) or Google. Both land the user on
 * /[lang]/profile, which handles onboarding (no firstName yet) and editing.
 *
 * Kept under its old name so the six login buttons didn't need touching;
 * isLoggingIn stays false because the modal shows its own progress.
 */
export function useGoogleLogin(lang: string) {
  const handleLogin = () => {
    window.dispatchEvent(new CustomEvent(OPEN_LOGIN_EVENT, { detail: { lang } }));
  };

  return { handleLogin, isLoggingIn: false };
}
