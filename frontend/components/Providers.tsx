"use client";

import { SessionProvider } from "next-auth/react";
import ConsoleWarning from "@/components/ConsoleWarning";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ConsoleWarning />
      {children}
    </SessionProvider>
  );
}
