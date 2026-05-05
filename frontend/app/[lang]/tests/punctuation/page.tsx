import Link from "next/link";
import { Quote, Type, Target, ArrowRight } from "lucide-react";

type Language = "uz" | "en" | "ru";

const content = {
  uz: {
    h1: "Tinish belgilari typing test",
    badge: ", . ! ? ; : \" ' — ( ) [ ]",
    tagline: "Punktuatsiya tezligi va aniqligini mashq qiling",
    intro:
      "Tinish belgilari Shift tugmasi bilan kombinatsiyada keladi va shu sababli ko'pchilik foydalanuvchilarni sekinlashtiradi. Bu test sizni vergul, qo'shtirnoq, qavs va shunga o'xshash belgilar bilan tezroq va aniqroq ishlashga o'rgatadi.",
    cta: "Testni boshlash",
    samplePreview: "Matn namunasi:",
    why: {
      title: "Nega punktuatsiya testi?",
      items: [
        { icon: "quote" as const, title: "Shift mashqi", text: "Ko'p tinish belgilari Shift bilan keladi — bu kombinatsiyalarni mashq qiling." },
        { icon: "type" as const, title: "Real jumla", text: "Sun'iy belgi to'plami emas — haqiqiy gaplar ichida tabiiy tinish belgilari." },
        { icon: "target" as const, title: "Aniqlik fokusi", text: "Tinish belgilari xatolari WPM'dan ko'ra aniqlikni ko'proq pasaytiradi — bu yerda tuzatasiz." },
      ],
    },
    faq: {
      title: "Tez-tez beriladigan savollar",
      items: [
        { q: "Tinish belgilari typing test nima?", a: "Bu typing test bo'lib, jumla ichida tinish belgilari (vergul, nuqta, qo'shtirnoq, qavs, tire) ustun ahamiyatga ega. Eng ko'p Shift bosishni talab qiluvchi tugmalarda tezlikni oshiradi." },
        { q: "Qaysi tinish belgilari eng qiyin?", a: "Qavslar ({} []), ikki nuqta (:) va apostrof (') odatda eng sekin — chunki ular Shift bilan birga bosiladi va mushak xotirasida zaif." },
        { q: "Punktuatsiya tezligini qanday oshirish mumkin?", a: "Aralash belgili gaplarda fokuslangan mashqlar qiling. Klaviaturaga qaramang — barmoqlar Shift pozitsiyalarini takrorlash orqali o'rganadi." },
        { q: "Nega tinish belgilari meni sekinlashtiradi?", a: "Har bir Shift'li belgi aslida ikki bosish (Shift + tugma). Qo'l koordinatsiyasi gap o'rtasida flat-press va chord-press patternlar o'rtasida o'tishi kerak." },
        { q: "Punktuatsiya mashqini qaerda bepul qilish mumkin?", a: "Uzbektype'ning punktuatsiya variantida — shu sahifada. Matnda asosiy belgilar (.,!?) va ilg'or belgilar (\"\"—()[]{}) aralashgan." },
      ],
    },
    related: {
      title: "Bog'liq sahifalar",
      items: [
        { href: "/tests/30s-medium", label: "Standart 30 soniyalik test" },
        { href: "/tests/programming", label: "Programming typing test" },
        { href: "/tests/numbers", label: "Raqamlar typing test" },
        { href: "/blog", label: "Barcha maqolalar" },
      ],
    },
    breadcrumbHome: "Bosh sahifa",
    breadcrumbTests: "Testlar",
  },
  en: {
    h1: "Punctuation Typing Test",
    badge: ", . ! ? ; : \" ' — ( ) [ ]",
    tagline: "Train punctuation speed and accuracy",
    intro:
      "Punctuation marks usually require Shift, and that's exactly where most typists slow down. This test trains accurate, fast use of commas, quotes, brackets, dashes, and the rest — within real sentences, not random symbol streams.",
    cta: "Start the test",
    samplePreview: "Sample text:",
    why: {
      title: "Why a punctuation typing test?",
      items: [
        { icon: "quote" as const, title: "Shift practice", text: "Most punctuation requires Shift — train the chord patterns that slow you down." },
        { icon: "type" as const, title: "Real sentences", text: "Not artificial symbol streams — natural punctuation inside real prose." },
        { icon: "target" as const, title: "Accuracy focus", text: "Punctuation errors hurt accuracy more than WPM — fix the pattern here." },
      ],
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        { q: "What is a punctuation typing test?", a: "A typing test that emphasises punctuation marks (commas, periods, quotes, brackets, dashes) within real sentences. It builds speed on the most-shifted keys." },
        { q: "Which punctuation keys are hardest?", a: "Brackets ({} []), the colon (:), and the apostrophe (') are typically the slowest because they require Shift modifiers and aren't muscle memory." },
        { q: "How do I improve punctuation typing speed?", a: "Run focused drills on sentences with mixed marks. Don't look at the keyboard — let your fingers learn the Shift positions through repetition." },
        { q: "Why does punctuation slow me down?", a: "Each shifted character is effectively two key-presses (Shift + key). Hand coordination has to switch between flat-press and chord-press patterns mid-sentence." },
        { q: "Where can I practice punctuation typing for free?", a: "On Uzbektype's punctuation test — this page. The text mixes basic marks (.,!?) with advanced ones (\"\"—()[]{})." },
      ],
    },
    related: {
      title: "Related pages",
      items: [
        { href: "/tests/30s-medium", label: "Standard 30-second test" },
        { href: "/tests/programming", label: "Programming typing test" },
        { href: "/tests/numbers", label: "Number typing test" },
        { href: "/blog", label: "All articles" },
      ],
    },
    breadcrumbHome: "Home",
    breadcrumbTests: "Tests",
  },
  ru: {
    h1: "Тест печати знаков препинания",
    badge: ", . ! ? ; : \" ' — ( ) [ ]",
    tagline: "Тренируйте скорость и точность пунктуации",
    intro:
      "Большинство знаков препинания требует Shift — и именно на этом большинство печатающих замедляется. Тест тренирует точное и быстрое использование запятых, кавычек, скобок и тире внутри реальных предложений, а не случайных наборов символов.",
    cta: "Начать тест",
    samplePreview: "Пример текста:",
    why: {
      title: "Зачем тест пунктуации?",
      items: [
        { icon: "quote" as const, title: "Тренировка Shift", text: "Большинство знаков требует Shift — отработайте аккорды, которые вас тормозят." },
        { icon: "type" as const, title: "Реальные предложения", text: "Не случайные символы — естественная пунктуация внутри настоящих предложений." },
        { icon: "target" as const, title: "Фокус на точности", text: "Ошибки в пунктуации бьют по точности сильнее, чем по WPM — здесь вы их исправите." },
      ],
    },
    faq: {
      title: "Частые вопросы",
      items: [
        { q: "Что такое тест печати знаков препинания?", a: "Тест на скорость набора, в котором акцент сделан на знаках препинания (запятые, точки, кавычки, скобки, тире) внутри реальных предложений. Он развивает скорость на клавишах, требующих Shift." },
        { q: "Какие знаки препинания самые сложные?", a: "Скобки ({} []), двоеточие (:) и апостроф (') обычно самые медленные — они требуют Shift и плохо отработаны мышечной памятью." },
        { q: "Как улучшить скорость пунктуации?", a: "Делайте сфокусированные упражнения на предложениях со смешанными знаками. Не смотрите на клавиатуру — пусть пальцы выучат позиции Shift через повторение." },
        { q: "Почему пунктуация меня тормозит?", a: "Каждый знак с Shift — это фактически два нажатия (Shift + клавиша). Координации рук приходится переключаться между обычным и аккордным паттернами в середине предложения." },
        { q: "Где бесплатно тренировать пунктуацию?", a: "На странице теста пунктуации Uzbektype. В текстах смешаны базовые знаки (.,!?) и продвинутые (\"\"—()[]{})." },
      ],
    },
    related: {
      title: "Связанные страницы",
      items: [
        { href: "/tests/30s-medium", label: "Стандартный тест 30 секунд" },
        { href: "/tests/programming", label: "Тест печати кода" },
        { href: "/tests/numbers", label: "Тест печати цифр" },
        { href: "/blog", label: "Все статьи" },
      ],
    },
    breadcrumbHome: "Главная",
    breadcrumbTests: "Тесты",
  },
};

const sample = "She said, \"It's a long day — but a good one.\" We worked, we laughed; tomorrow brings more.";

export default async function PunctuationTestPage({
  params,
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;
  const t = content[lang];
  const baseUrl = "https://uzbektype.uz";
  const pageUrl = `${baseUrl}/${lang}/tests/punctuation`;

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

  const startHref = `/${lang}/tests/30s-medium?topic=punctuation`;

  return (
    <main className="min-h-screen pt-24 md:pt-28 pb-16 px-4 md:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto">
        <section className="text-center space-y-5 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs text-muted-foreground font-mono">
            <Quote size={14} />
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
              const Icon = item.icon === "quote" ? Quote : item.icon === "type" ? Type : Target;
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
