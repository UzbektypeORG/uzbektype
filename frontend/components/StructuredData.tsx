type Language = "uz" | "en" | "ru";

interface StructuredDataProps {
  lang: Language;
}

const descriptions = {
  uz: "Bepul onlayn tez yozish testi. O'zbek, ingliz va rus tillarida.",
  en: "Free online typing speed test in Uzbek, English, and Russian languages.",
  ru: "Бесплатный онлайн тест скорости печати на узбекском, английском и русском языках.",
} as const;

const names = {
  uz: "Uzbektype - Tezyozuv Testi",
  en: "Uzbektype - Typing Speed Test",
  ru: "Uzbektype - Тест Скорости Печати",
} as const;

const courseDescriptions = {
  uz: "Klaviaturada tez yozishni interaktiv testlar orqali o'rganing. Real vaqt WPM, aniqlik va yulduz baholash bilan.",
  en: "Improve your typing speed through interactive tests with real-time WPM, accuracy and star ratings.",
  ru: "Повышайте скорость печати с помощью интерактивных тестов с WPM в реальном времени, точностью и звёздным рейтингом.",
} as const;

export default function StructuredData({ lang }: StructuredDataProps) {
  const baseUrl = "https://www.uzbektype.uz";

  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: names[lang],
    url: `${baseUrl}/${lang}`,
    description: descriptions[lang],
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web Browser",
    image: `${baseUrl}/logo.png`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    inLanguage: [lang],
    audience: {
      "@type": "Audience",
      audienceType: "Students, Professionals, Language Learners",
    },
    potentialAction: {
      "@type": "UseAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/${lang}/tests/{testType}`,
        actionPlatform: [
          "https://schema.org/DesktopWebPlatform",
          "https://schema.org/MobileWebPlatform",
        ],
      },
    },
    publisher: {
      "@id": `${baseUrl}/#organization`,
    },
  };

  // WebSite entity — anchors the site name for Google (branding / sitelinks).
  // No SearchAction: the site has no on-site search results page, so a
  // sitelinks searchbox would be invalid.
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    name: "Uzbektype",
    url: baseUrl,
    description: descriptions[lang],
    inLanguage: lang,
    publisher: {
      "@id": `${baseUrl}/#organization`,
    },
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: "Uzbektype",
    url: baseUrl,
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/logo.png`,
      width: 512,
      height: 512,
    },
    sameAs: [
      "https://t.me/uzbektype",
      "https://instagram.com/uzbektype",
    ],
  };

  // Course schema — helps Google show this as an "online course" in results
  const course = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: names[lang],
    description: courseDescriptions[lang],
    provider: {
      "@id": `${baseUrl}/#organization`,
    },
    inLanguage: lang,
    isAccessibleForFree: true,
    educationalLevel: "Beginner to Advanced",
    teaches: lang === "uz"
      ? "Klaviaturada tez yozish, WPM oshirish, aniqlik"
      : lang === "ru"
      ? "Быстрая печать на клавиатуре, повышение WPM, точность"
      : "Touch typing, WPM improvement, typing accuracy",
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Online",
      courseWorkload: "PT15M",
    },
  };

  const blob = JSON.stringify([webApp, website, organization, course]);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: blob }}
    />
  );
}
