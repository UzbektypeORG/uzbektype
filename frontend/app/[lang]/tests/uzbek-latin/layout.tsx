import type { Metadata } from "next";

type Language = "uz" | "en" | "ru";

const meta: Record<Language, {
  title: string;
  description: string;
  ogTitle: string;
  keywords: string[];
}> = {
  uz: {
    title: "Lotin yozuvda typing test — O'zbek lotin alifbo mashqi | Uzbektype",
    description: "O'zbek lotin alifbosida bepul typing test. o', g', sh, ch, ng harf birikmalarini mashq qiling. WPM va aniqlikni o'lchang. Ro'yxatdan o'tmasdan.",
    ogTitle: "Lotin yozuvda typing test — O'zbek lotin alifbosi",
    keywords: [
      "lotincha typing test",
      "lotin alifbo mashq",
      "o'zbek lotin yozuv",
      "lotin yozuvda typing",
      "o'zbekcha typing test",
      "o' va g' yozish",
      "apostrof klaviatura",
      "o'zbek tilida tez yozish",
      "lotincha klaviatura mashq",
    ],
  },
  en: {
    title: "Uzbek Latin Typing Test — Practice Modern Uzbek Script | Uzbektype",
    description: "Free Uzbek Latin alphabet typing test. Practice o', g', sh, ch, ng digraphs of the 1993 Latin script. Measure WPM and accuracy. No signup needed.",
    ogTitle: "Uzbek Latin Typing Test — Modern Script Practice",
    keywords: [
      "uzbek latin typing test",
      "uzbek latin script",
      "uzbek alphabet typing",
      "modern uzbek typing",
      "uzbek latin practice",
      "o' g' apostrophe typing",
      "uzbek wpm test",
      "free uzbek typing test",
    ],
  },
  ru: {
    title: "Тест печати на узбекской латинице — Тренировка | Uzbektype",
    description: "Бесплатный тест печати на узбекской латинице. Тренируйте буквы o', g', sh, ch, ng — алфавит 1993 года. Измерьте WPM и точность без регистрации.",
    ogTitle: "Тест печати на узбекской латинице",
    keywords: [
      "узбекская латиница тест печати",
      "тест печати узбекский",
      "узбекский алфавит тренировка",
      "латиница узбекская",
      "тест wpm узбекский",
      "узбекский набор текста",
      "бесплатный тест печати узбекский",
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
      canonical: `https://uzbektype.uz/${lang}/tests/uzbek-latin`,
      languages: {
        uz: "/uz/tests/uzbek-latin",
        en: "/en/tests/uzbek-latin",
        ru: "/ru/tests/uzbek-latin",
      },
    },
    openGraph: {
      title: m.ogTitle,
      description: m.description,
      url: `https://uzbektype.uz/${lang}/tests/uzbek-latin`,
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

export default function UzbekLatinLayout({ children }: { children: React.ReactNode }) {
  return children;
}
