import type { Metadata } from "next";

type Language = "uz" | "en" | "ru";

const meta: Record<Language, {
  title: string;
  description: string;
  ogTitle: string;
  keywords: string[];
}> = {
  uz: {
    title: "Raqamlar typing test — Sonlarni tez yozish mashqi | Uzbektype",
    description: "Raqamlar va sonlar bilan typing test. Telefon raqamlari, sanalar, narxlar, statistika. Numpad va raqamlar qatori tezligini oshiring. Bepul.",
    ogTitle: "Raqamlar typing test — Numpad mashqi",
    keywords: [
      "raqamlar typing test",
      "raqamlarni tez yozish",
      "sonlar typing test",
      "numpad mashqi",
      "raqamlar yozish testi",
      "10-key typing test uz",
      "raqamlar qatori mashqi",
      "tez raqam yozish",
    ],
  },
  en: {
    title: "Number Typing Test — Practice Typing Numbers Fast | Uzbektype",
    description: "Free number typing test with realistic data: phone numbers, dates, prices, statistics. Train your numpad and number row speed. No signup required.",
    ogTitle: "Number Typing Test — Numpad practice",
    keywords: [
      "number typing test",
      "number typing practice",
      "numpad typing test",
      "10-key typing test",
      "typing numbers fast",
      "number row practice",
      "data entry typing test",
      "free number typing test",
    ],
  },
  ru: {
    title: "Тест печати цифр — Тренировка набора чисел | Uzbektype",
    description: "Бесплатный тест печати цифр: номера телефонов, даты, цены, статистика. Тренируйте numpad и цифровой ряд. Без регистрации.",
    ogTitle: "Тест печати цифр — тренировка numpad",
    keywords: [
      "тест печати цифр",
      "тренировка набора цифр",
      "numpad тест",
      "тест печати чисел",
      "цифровой ряд тренировка",
      "10-key тест",
      "тест ввода данных",
      "бесплатный тест цифр",
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Language }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const m = meta[lang];

  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    alternates: {
      canonical: `https://uzbektype.uz/${lang}/tests/numbers`,
      languages: {
        uz: "/uz/tests/numbers",
        en: "/en/tests/numbers",
        ru: "/ru/tests/numbers",
      },
    },
    openGraph: {
      title: m.ogTitle,
      description: m.description,
      url: `https://uzbektype.uz/${lang}/tests/numbers`,
      type: "website",
      locale: lang === "uz" ? "uz_UZ" : lang === "en" ? "en_US" : "ru_RU",
    },
    twitter: {
      card: "summary_large_image",
      title: m.ogTitle,
      description: m.description,
    },
    robots: { index: true, follow: true },
  };
}

export default function NumbersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
