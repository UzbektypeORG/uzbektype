import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-jetbrains",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://uzbektype.vercel.app"),
  title: "Uzbektype - Tez Yozish Testi | Typing Speed Test | Тест Скорости Печати",
  description: "Bepul onlayn tez yozish testi. Free online typing speed test. Бесплатный онлайн тест скорости печати.",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${poppins.variable}`}>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
