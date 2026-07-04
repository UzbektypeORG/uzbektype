import Link from "next/link";
import { Hash, Calculator, Target, ArrowRight } from "lucide-react";

type Language = "uz" | "en" | "ru";

const content = {
  uz: {
    h1: "Raqamlar typing test",
    badge: "Numpad · Sanalar · Narxlar",
    tagline: "Sonlarni tez va aniq yozishni mashq qiling",
    intro:
      "Raqamlar qatori va numpad tez yozuvchilarga ham qiyin keladi — chunki kunlik amaliyot kam. Bu test telefon raqamlari, sanalar, narxlar va statistika ma'lumotlari bilan ishlash tezligingizni oshiradi.",
    cta: "Testni boshlash",
    samplePreview: "Matn namunasi:",
    why: {
      title: "Nega aynan raqamlar testi?",
      items: [
        { icon: "hash" as const, title: "Numpad mashqi", text: "Buxgalterlar, data-entry, va moliyaviy mutaxassislar uchun mukammal." },
        { icon: "calc" as const, title: "Real ma'lumot", text: "Sanalar, narxlar, telefon raqamlari, statistika — kundalik formatlar." },
        { icon: "target" as const, title: "WPM va aniqlik", text: "Raqamlarda WPM odatda harflardan 30-50% past — mashq bilan farq kamayadi." },
      ],
    },
    faq: {
      title: "Tez-tez beriladigan savollar",
      items: [
        { q: "Raqamlar typing test nima?", a: "Bu typing test bo'lib, oddiy matn o'rniga raqamlar — telefon, sanalar, narxlar, statistika — yoziladi. Numpad va raqamlar qatori tezligingizni o'lchaydi va oshiradi." },
        { q: "Raqamlar uchun yaxshi WPM qancha?", a: "Ko'pchilik foydalanuvchilar raqamlarni harflardan 30-50% sekinroq yozadi, chunki bu tugmalar mushak xotirasida kamroq joylashgan. 40-50 WPM yaxshi natija." },
        { q: "Numpad'mi yoki raqamlar qatori?", a: "Sizning ish'ingiz qaysisini ishlatishiga bog'liq. Buxgalter va data-entry mutaxassislari numpad'ni afzal ko'rishadi; dasturchilar va yozuvchilar odatda yuqori qatorni ishlatadi." },
        { q: "Nega raqamlarni harflardan sekin yozamiz?", a: "Raqam tugmalari home row'dan yuqorida joylashgan — barmoq cho'zilishi kerak. Bundan tashqari, oddiy matnda raqamlar kam uchraydi, shuning uchun mashq kam bo'ladi." },
        { q: "Numpad mashqini qaerda bepul qilish mumkin?", a: "Uzbektype'ning raqamlar variantida — shu sahifada. NumLock'ni yoqing va home row 4-5-6'dan boshlang, keyin 0-9'gacha kengaytiring." },
      ],
    },
    related: {
      title: "Bog'liq sahifalar",
      items: [
        { href: "/tests/30s-medium", label: "Standart 30 soniyalik test" },
        { href: "/tests/programming", label: "Programming typing test" },
        { href: "/blog", label: "Barcha maqolalar" },
      ],
    },
    breadcrumbHome: "Bosh sahifa",
    breadcrumbTests: "Testlar",
  },
  en: {
    h1: "Number Typing Test",
    badge: "Numpad · Dates · Prices",
    tagline: "Practice typing numbers quickly and accurately",
    intro:
      "Number rows and numpads challenge even fast typists — daily practice on them is rare. This test trains you on phone numbers, dates, prices, and statistics — the formats you actually meet at work.",
    cta: "Start the test",
    samplePreview: "Sample text:",
    why: {
      title: "Why a number typing test?",
      items: [
        { icon: "hash" as const, title: "Numpad practice", text: "Perfect for accountants, data-entry workers, and finance professionals." },
        { icon: "calc" as const, title: "Real-world data", text: "Dates, prices, phone numbers, and statistics — formats from daily work." },
        { icon: "target" as const, title: "WPM and accuracy", text: "Number WPM is usually 30-50% lower than letter WPM — practice closes the gap." },
      ],
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        { q: "What is a number typing test?", a: "A typing test focused on numerals — phone numbers, dates, prices, and statistics. It trains the number row and numpad fluency separately from the letter rows." },
        { q: "How fast should I type numbers?", a: "Most typists run 30-50% slower on number rows compared to letters because the keys aren't part of muscle memory. 40-50 WPM on numbers is a solid result." },
        { q: "Should I use the number row or numpad?", a: "Use what your day-to-day work uses. Accountants and data-entry workers prefer numpad; programmers and writers usually use the top row." },
        { q: "Why are numbers harder to type than letters?", a: "Number keys sit higher than home row, requiring finger stretch. They're also less rehearsed in normal text — you simply type them less often." },
        { q: "How do I practice numpad typing?", a: "Run timed tests on Uzbektype's number variant with NumLock on. Focus on home keys 4-5-6 and build outward to 0-9." },
      ],
    },
    related: {
      title: "Related pages",
      items: [
        { href: "/tests/30s-medium", label: "Standard 30-second test" },
        { href: "/tests/programming", label: "Programming typing test" },
        { href: "/blog", label: "All articles" },
      ],
    },
    breadcrumbHome: "Home",
    breadcrumbTests: "Tests",
  },
  ru: {
    h1: "Тест печати цифр",
    badge: "Numpad · Даты · Цены",
    tagline: "Тренируйтесь набирать цифры быстро и точно",
    intro:
      "Цифровой ряд и numpad — слабое место даже у быстрых машинистов: на них мало повседневной практики. Тест прокачивает скорость на телефонных номерах, датах, ценах и статистике — форматах из реальной работы.",
    cta: "Начать тест",
    samplePreview: "Пример текста:",
    why: {
      title: "Зачем тест печати цифр?",
      items: [
        { icon: "hash" as const, title: "Тренировка numpad", text: "Идеально для бухгалтеров, операторов ввода данных и финансовых специалистов." },
        { icon: "calc" as const, title: "Реальные данные", text: "Даты, цены, телефоны, статистика — форматы из ежедневной работы." },
        { icon: "target" as const, title: "WPM и точность", text: "WPM на цифрах обычно на 30-50% ниже, чем на буквах — практика сокращает разрыв." },
      ],
    },
    faq: {
      title: "Частые вопросы",
      items: [
        { q: "Что такое тест печати цифр?", a: "Тест на скорость набора, в котором вместо обычного текста печатаются цифры — телефоны, даты, цены, статистика. Тренирует цифровой ряд и numpad отдельно от букв." },
        { q: "Какая WPM хорошая для цифр?", a: "Большинство печатающих набирают цифры на 30-50% медленнее букв, поскольку клавиши хуже отработаны мышечной памятью. 40-50 WPM на цифрах — хороший результат." },
        { q: "Что использовать — цифровой ряд или numpad?", a: "Зависит от вашей работы. Бухгалтеры и операторы ввода данных предпочитают numpad; программисты и писатели обычно работают с верхним рядом." },
        { q: "Почему цифры медленнее букв?", a: "Цифровые клавиши находятся выше домашнего ряда — пальцам нужно тянуться. К тому же в обычном тексте цифры встречаются реже, поэтому меньше тренировки." },
        { q: "Где тренировать numpad бесплатно?", a: "На странице цифрового теста Uzbektype. Включите NumLock, начните с домашних клавиш 4-5-6 и расширяйте до 0-9." },
      ],
    },
    related: {
      title: "Связанные страницы",
      items: [
        { href: "/tests/30s-medium", label: "Стандартный тест 30 секунд" },
        { href: "/tests/programming", label: "Тест печати кода" },
        { href: "/blog", label: "Все статьи" },
      ],
    },
    breadcrumbHome: "Главная",
    breadcrumbTests: "Тесты",
  },
};

const sample = "Phone: 555-1234. Date: 2024-05-15. Price: $1,234.56. Distance: 5.5 km. Speed: 60 mph.";

export default async function NumbersTestPage({
  params,
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;
  const t = content[lang];
  const baseUrl = "https://www.uzbektype.uz";
  const pageUrl = `${baseUrl}/${lang}/tests/numbers`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: t.h1,
        description: t.intro,
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        url: pageUrl,
        inLanguage: lang,
      },
      {
        "@type": "FAQPage",
        mainEntity: t.faq.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t.breadcrumbHome, item: `${baseUrl}/${lang}` },
          { "@type": "ListItem", position: 2, name: t.breadcrumbTests, item: `${baseUrl}/${lang}/tests/30s-easy` },
          { "@type": "ListItem", position: 3, name: t.h1, item: pageUrl },
        ],
      },
    ],
  };

  const startHref = `/${lang}/tests/30s-medium?topic=numbers`;

  return (
    <main className="min-h-screen pt-24 md:pt-28 pb-16 px-4 md:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto">
        <section className="text-center space-y-5 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs text-muted-foreground">
            <Hash size={14} />
            <span>{t.badge}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">{t.h1}</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">{t.tagline}</p>
          <p className="text-sm md:text-base text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed">{t.intro}</p>

          <div className="pt-4">
            <Link
              href={startHref}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all font-semibold text-base md:text-lg"
            >
              {t.cta}
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>

        <section className="mb-16">
          <p className="text-sm text-muted-foreground mb-3">{t.samplePreview}</p>
          <pre className="bg-accent/30 border border-border rounded-lg p-4 md:p-6 overflow-x-auto text-xs md:text-sm font-mono leading-relaxed whitespace-pre-wrap">
            <code>{sample}</code>
          </pre>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">{t.why.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.why.items.map((item, i) => {
              const Icon = item.icon === "hash" ? Hash : item.icon === "calc" ? Calculator : Target;
              return (
                <div
                  key={i}
                  className="text-center space-y-3 p-6 border border-transparent hover:border-border/50 rounded-lg transition-all"
                >
                  <Icon className="mx-auto text-primary" size={32} />
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">{t.faq.title}</h2>
          <div className="space-y-3">
            {t.faq.items.map((item, i) => (
              <details key={i} className="group border border-border rounded-lg">
                <summary className="cursor-pointer px-5 py-4 font-medium flex items-center justify-between hover:bg-accent/30 transition-colors list-none">
                  <h3 className="text-base pr-4">{item.q}</h3>
                  <span className="text-muted-foreground transition-transform group-open:rotate-180 flex-shrink-0">▾</span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed">{item.a}</div>
              </details>
            ))}
          </div>
        </section>

        <section className="text-center mb-16">
          <Link
            href={startHref}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all font-semibold"
          >
            {t.cta}
            <ArrowRight size={18} />
          </Link>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">{t.related.title}</h2>
          <ul className="space-y-2">
            {t.related.items.map((item, i) => (
              <li key={i}>
                <Link href={`/${lang}${item.href}`} className="text-primary hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
