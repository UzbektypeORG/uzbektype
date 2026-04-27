"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

/**
 * Login helper. Triggers Google OAuth and lands the user on /[lang]/profile
 * after sign-in. The /profile page handles both onboarding (new users with
 * no firstName) and editing (existing users).
 */
export function useGoogleLogin(lang: string) {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      await signIn("google", { callbackUrl: `/${lang}/profile` });
    } finally {
      setIsLoggingIn(false);
    }
  };

  return { handleLogin, isLoggingIn };
}
