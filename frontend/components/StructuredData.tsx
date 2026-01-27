type Language = "uz" | "en" | "ru";

interface StructuredDataProps {
  lang: Language;
}

export default function StructuredData({ lang }: StructuredDataProps) {
  const descriptions = {
    uz: "Bepul onlayn tez yozish testi. O'zbek, ingliz va rus tillarida.",
    en: "Free online typing speed test in Uzbek, English, and Russian languages",
    ru: "Бесплатный онлайн тест скорости печати на узбекском, английском и русском языках"
  };

  const names = {
    uz: "Uzbektype - Tezyozuv Testi",
    en: "Uzbektype - Typing Speed Test",
    ru: "Uzbektype - Тест Скорости Печати"
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": names[lang],
    "url": `https://uzbektype.uz/${lang}`,
    "description": descriptions[lang],
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "image": "https://uzbektype.uz/logo.png",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "inLanguage": [lang],
    "audience": {
      "@type": "Audience",
      "audienceType": "Students, Professionals, Language Learners"
    },
    "potentialAction": {
      "@type": "UseAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `https://uzbektype.uz/${lang}/tests/{testType}`,
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform"
        ]
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "Uzbektype",
      "logo": {
        "@type": "ImageObject",
        "url": "https://uzbektype.uz/logo.png"
      }
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
