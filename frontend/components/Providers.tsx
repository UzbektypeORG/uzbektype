"use client";

import { SessionProvider } from "next-auth/react";
import ConsoleWarning from "@/components/ConsoleWarning";
import LoginModal from "@/components/LoginModal";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ConsoleWarning />
      <LoginModal />
      {children}
    </SessionProvider>
  );
}
