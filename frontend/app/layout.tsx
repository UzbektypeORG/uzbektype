import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Poppins } from "next/font/google";
import Script from "next/script";
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
  title: "Uzbektype - Yozish Tezligini Aniqlash | Typing Speed Test | Тест Скорости Печати",
  description: "Yozish tezligini interaktiv tarzda aniqlang. Interactive typing speed test with real-time WPM. Интерактивный тест скорости печати в реальном времени.",
  keywords: [
    // Uzbek
    "yozish tezligini aniqlash",
    "tez yozish testi",
    "yozish tezligi testi",
    "klaviatura tezligi testi",
    "interaktiv typing test",
    "animatsion typing test",
    "wpm testi",
    "yozish tezligini interaktiv tarzda aniqlash",
    "animatsiyali typing test bepul",
    "klaviaturada tez yozishni sinash",
    // English
    "typing speed test",
    "online typing test",
    "free typing test",
    "typing test",
    "interactive typing test",
    "animated typing test",
    "wpm test",
    "check typing speed online",
    "real time typing speed test",
    // Russian
    "тест скорости печати",
    "проверка скорости печати",
    "онлайн тест печати",
    "скорость печати",
    "интерактивный тест печати",
    "анимированный тест печати",
    "wpm тест",
    "проверить скорость печати онлайн",
  ],
  openGraph: {
    title: "Uzbektype - Yozish Tezligini Aniqlash",
    description: "Interaktiv typing test. WPM ni real vaqtda aniqlang. O'zbek, ingliz, rus tillarida.",
    type: "website",
    locale: "uz_UZ",
    alternateLocale: ["en_US", "ru_RU"],
    siteName: "Uzbektype",
  },
  twitter: {
    card: "summary_large_image",
    title: "Uzbektype - Typing Speed Test",
    description: "Interactive typing speed test with real-time WPM tracking. Available in Uzbek, English, Russian.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
      <head>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "v7juhrhjqh");
          `}
        </Script>
      </head>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
