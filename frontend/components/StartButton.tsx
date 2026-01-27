"use client";

import { useRouter } from "next/navigation";

type Language = "uz" | "en" | "ru";

interface StartButtonProps {
  href: string;
  lang: Language;
  children: React.ReactNode;
  className?: string;
}

export default function StartButton({ href, lang, children, className }: StartButtonProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // Store fullscreen state before navigation
    if (document.fullscreenElement) {
      localStorage.setItem("uzbektype_was_fullscreen", "true");
    }

    // Use router.push for client-side navigation (keeps fullscreen)
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
