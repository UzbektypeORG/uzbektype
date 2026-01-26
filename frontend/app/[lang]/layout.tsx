import type { Metadata } from "next";
import Header from "@/components/Header";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";
import KeyboardShortcutsInfo from "@/components/KeyboardShortcutsInfo";
import StructuredData from "@/components/StructuredData";

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

// Supported languages
const languages = ['uz', 'en', 'ru'] as const;
type Language = typeof languages[number];

// Language-specific metadata
const getMetadata = (lang: Language): Metadata => {
  const titles = {
    uz: "UzbekType — Yozish Tezligini Sinab Ko'ring | Typing Test",
    en: "UzbekType — Test Your Typing Speed | Free Online Typing Test",
    ru: "UzbekType — Проверьте Скорость Печати | Бесплатный Тест Онлайн"
  };

  const descriptions = {
    uz: "Minimalist dizayn va interaktiv animatsiyalar bilan yozish tezligini sinang, natijangizni real vaqtda ko'ring. UzbekType — tez, qulay va bepul typing test.",
    en: "Test your typing speed with minimalist design and interactive animations, see your results in real time. UzbekType — fast, convenient, and free typing test.",
    ru: "Проверьте скорость печати с минималистичным дизайном и интерактивными анимациями, смотрите результаты в реальном времени. UzbekType — быстрый, удобный и бесплатный тест печати."
  };

  const keywords = {
    uz: [
      // Primary
      "tez yozish testi",
      "typing test uzbek",
      "tez yozish testi online",
      // Secondary
      "klaviaturada tez yozish mashqi",
      "yozish tezligini tekshirish",
      "yozish tezligini oshirish",
      "interaktiv typing test",
      "harflar animatsiyasi bilan tez yozish testi",
      "minimalist typing test",
      "bepul tez yozish testi",
      "1 daqiqa tez yozish testi",
      "WPM test o'zbek",
    ],
    en: [
      // Primary
      "typing speed test",
      "online typing test",
      "wpm test",
      // Secondary
      "interactive typing test",
      "animated typing test",
      "minimal typing practice",
      "typing accuracy test",
      "typing test 1 minute",
      "free typing test",
      "modern typing test",
      "typing practice online",
    ],
    ru: [
      // Primary
      "тест скорости печати",
      "скорость печати онлайн",
      "wpm тест",
      // Secondary
      "интерактивный тест печати",
      "анимация букв при печати",
      "минималистичный тест печати",
      "тест печати 1 минута",
      "бесплатный тест скорости печати",
      "проверка скорости печати",
      "тренировка печати онлайн",
    ]
  };

  const locales = {
    uz: "uz_UZ",
    en: "en_US",
    ru: "ru_RU"
  };

  return {
    metadataBase: new URL("https://uzbektype.vercel.app"),
    title: titles[lang],
    description: descriptions[lang],
    keywords: keywords[lang],
    authors: [{ name: "Uzbektype" }],
    creator: "Uzbektype",
    publisher: "Uzbektype",
    robots: "index, follow",
    manifest: "/manifest.json",
    icons: {
      icon: "/icon.svg",
      apple: "/icon.svg",
    },
    alternates: {
      canonical: `https://uzbektype.vercel.app/${lang}`,
      languages: {
        'uz': 'https://uzbektype.vercel.app/uz',
        'en': 'https://uzbektype.vercel.app/en',
        'ru': 'https://uzbektype.vercel.app/ru',
      }
    },
    openGraph: {
      type: "website",
      locale: locales[lang],
      alternateLocale: Object.values(locales).filter(l => l !== locales[lang]),
      url: `https://uzbektype.vercel.app/${lang}`,
      title: titles[lang],
      description: descriptions[lang],
      siteName: "Uzbektype",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: titles[lang]
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: titles[lang],
      description: descriptions[lang],
      images: ["/og-image.png"]
    },
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const currentLang = (lang || 'uz') as Language;
  return getMetadata(currentLang);
}

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;
  const currentLang = (lang || 'uz') as Language;

  return (
    <>
      <StructuredData lang={currentLang} />
      <KeyboardShortcuts />
      <KeyboardShortcutsInfo />
      <Header lang={currentLang} />
      {children}
    </>
  );
}
