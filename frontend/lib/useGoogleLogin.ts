"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { loginWithGoogle, getCurrentUser } from "./mockAuth";

/**
 * Login + onboarding redirect helper.
 * After Google login, if the user has not yet set their firstName
 * (i.e. hasn't completed /profile), redirects to /[lang]/profile so they
 * can fill in name + pick avatar before doing anything else.
 * If the user is already on /profile, no redirect is performed.
 */
export function useGoogleLogin(lang: string) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      await loginWithGoogle();
      const u = getCurrentUser();
      const alreadyOnProfile = pathname?.includes("/profile") ?? false;
      if (u && !u.firstName && !alreadyOnProfile) {
        router.push(`/${lang}/profile`);
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  return { handleLogin, isLoggingIn };
}
