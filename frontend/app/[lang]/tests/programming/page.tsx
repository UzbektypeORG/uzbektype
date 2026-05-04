import Link from "next/link";
import { Code2, Zap, Target, ArrowRight } from "lucide-react";

type Language = "uz" | "en" | "ru";

const content = {
  uz: {
    h1: "Programming Typing Test",
    badge: "JavaScript · Python · TypeScript",
    tagline: "Kod yozish tezligingizni dasturchi sifatida tekshiring",
    intro:
      "Oddiy matn o'rniga haqiqiy kod — JavaScript, Python, TypeScript yozasiz. Test sizning WPM va aniqligingizni o'lchaydi. Symbol va sintaksis bilan ishlash dasturchining kundalik ko'nikmasi.",
    cta: "Testni boshlash",
    samplePreview: "Kod namunasi:",
    why: {
      title: "Nega aynan kod typing test?",
      items: [
        { icon: "code" as const, title: "Haqiqiy kod", text: "Test'da real-world dasturlash patternlari — funksiyalar, classlar, async, control flow." },
        { icon: "zap" as const, title: "Symbol mashqi", text: "{} [] () => ; : = kabi belgilar bilan ishlashni o'rganasiz." },
        { icon: "target" as const, title: "WPM va aniqlik", text: "Har test'dan keyin batafsil natija — WPM, aniqlik, raw WPM, barqarorlik." },
      ],
    },
    faq: {
      title: "Tez-tez beriladigan savollar",
      items: [
        { q: "Programming typing test nima?", a: "Bu typing test bo'lib, oddiy matn o'rniga haqiqiy kod (funksiyalar, e'lonlar, shartli operatorlar) yoziladi. Dasturchining kod yozish tezligi va aniqligini o'lchaydi." },
        { q: "Dasturchi uchun yaxshi WPM qancha?", a: "Ko'pchilik professional dasturchilar 50-70 WPM yozadi. Kod yozish odatda matn yozishdan 30-50% sekinroq bo'ladi — simbollar va sintaksis sababli." },
        { q: "Nega kod yozish matndan sekin?", a: "Kodda ko'p simbollar ({} [] <> = + * & | !), Shift bosimlari va aniq sintaksis kerak. Barmoq cho'zilishi va akkordlar sekinlashtiradi." },
        { q: "Dasturchilar touch typing'ni o'rganishi kerakmi?", a: "Ha. Touch typing barmoq-barmoq qarashni yo'q qiladi va kod o'qish jarayonida diqqat uzilishini oldini oladi. Bu produktivlikni 30-40% oshirishi mumkin." },
        { q: "Kod yozishni qaerda bepul mashq qilish mumkin?", a: "Uzbektype'ning programming variantida — shu sahifada. 30 va 60 soniyalik testlar JavaScript, Python va TypeScript kodi bilan." },
      ],
    },
    related: {
      title: "Bog'liq sahifalar",
      items: [
        { href: "/tests/30s-medium", label: "Standart 30 soniyalik test" },
        { href: "/blog/kompyuterda-tez-yozish", label: "Kompyuterda tez yozish — 7 ta amaliy maslahat" },
        { href: "/blog", label: "Barcha maqolalar" },
      ],
    },
    breadcrumbHome: "Bosh sahifa",
    breadcrumbTests: "Testlar",
  },
  en: {
    h1: "Programming Typing Test",
    badge: "JavaScript · Python · TypeScript",
    tagline: "Practice code typing speed as a developer",
    intro:
      "Type real code instead of regular text — JavaScript, Python, TypeScript. The test measures your WPM and accuracy. Working with symbols and syntax is a daily developer skill.",
    cta: "Start the test",
    samplePreview: "Code sample:",
    why: {
      title: "Why a code typing test?",
      items: [
        { icon: "code" as const, title: "Real code", text: "The test uses real-world programming patterns — functions, classes, async, control flow." },
        { icon: "zap" as const, title: "Symbol practice", text: "Train the {} [] () => ; : = characters that fill production code." },
        { icon: "target" as const, title: "WPM and accuracy", text: "Detailed results after each test — WPM, accuracy, raw WPM, consistency." },
      ],
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        { q: "What is a programming typing test?", a: "A typing test that uses real code snippets (functions, declarations, control flow) instead of prose. It measures how fast a developer can type code accurately." },
        { q: "What's a good WPM for programmers?", a: "Most professional developers type at 50-70 WPM. Code typing typically runs 30-50% slower than prose due to symbols and syntax." },
        { q: "Why is typing code slower than prose?", a: "Code requires frequent symbols ({} [] <> = + * & | !), Shift presses, and exact syntax. Hand stretches and shift-key chords slow the average rate." },
        { q: "Should programmers learn touch typing?", a: "Yes. Touch typing eliminates finger-by-finger lookup and prevents context-switch interruptions while you read code structure. It can boost productivity by 30-40%." },
        { q: "Where can I practice code typing for free?", a: "On Uzbektype's programming test — this page. Run 30s and 60s rounds across JavaScript, Python, and TypeScript snippets." },
      ],
    },
    related: {
      title: "Related pages",
      items: [
        { href: "/tests/30s-medium", label: "Standard 30-second test" },
        { href: "/blog/fast-typing-on-computer", label: "Fast Typing on a Computer — 7 Practical Tips" },
        { href: "/blog", label: "All articles" },
      ],
    },
    breadcrumbHome: "Home",
    breadcrumbTests: "Tests",
  },
  ru: {
    h1: "Тест печати кода",
    badge: "JavaScript · Python · TypeScript",
    tagline: "Проверьте скорость набора кода как разработчик",
    intro:
      "Печатайте реальный код вместо обычного текста — JavaScript, Python, TypeScript. Тест измеряет вашу WPM и точность набора кода. Работа с символами и синтаксисом — ежедневный навык разработчика.",
    cta: "Начать тест",
    samplePreview: "Пример кода:",
    why: {
      title: "Зачем тест печати кода?",
      items: [
        { icon: "code" as const, title: "Реальный код", text: "В тесте — настоящие паттерны: функции, классы, async, управляющие конструкции." },
        { icon: "zap" as const, title: "Тренировка символов", text: "Отработайте {} [] () => ; : = — символы, которыми наполнен боевой код." },
        { icon: "target" as const, title: "WPM и точность", text: "Детальный результат после теста — WPM, точность, raw WPM, стабильность." },
      ],
    },
    faq: {
      title: "Частые вопросы",
      items: [
        { q: "Что такое тест печати кода?", a: "Тест на скорость набора, в котором вместо обычного текста печатаются реальные фрагменты кода (функции, объявления, управляющие конструкции). Измеряет скорость и точность." },
        { q: "Какая WPM хорошая для программиста?", a: "Большинство профессиональных разработчиков печатают 50-70 WPM. Набор кода обычно на 30-50% медленнее обычного текста из-за символов и синтаксиса." },
        { q: "Почему код печатается медленнее текста?", a: "Код требует частых символов ({} [] <> = + * & | !), нажатий Shift и точного синтаксиса. Растяжение пальцев и аккорды замедляют средний темп." },
        { q: "Нужна ли программистам слепая печать?", a: "Да. Слепая печать устраняет поиск клавиш по одной и предотвращает прерывание внимания при чтении структуры кода. Это повышает продуктивность на 30-40%." },
        { q: "Где бесплатно тренироваться в наборе кода?", a: "На странице programming в Uzbektype. Доступны 30- и 60-секундные раунды с фрагментами JavaScript, Python и TypeScript." },
      ],
    },
    related: {
      title: "Связанные страницы",
      items: [
        { href: "/tests/30s-medium", label: "Стандартный тест 30 секунд" },
        { href: "/blog/bystraya-pechat-na-kompyutere", label: "Быстрая печать на компьютере — 7 практических советов" },
        { href: "/blog", label: "Все статьи" },
      ],
    },
    breadcrumbHome: "Главная",
    breadcrumbTests: "Тесты",
  },
};

const codeSample = `async function fetchUser(id) {
  const response = await fetch("/api/users/" + id);
  return response.json();
}`;

export default async function ProgrammingTestPage({
  params,
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;
  const t = content[lang];
  const baseUrl = "https://uzbektype.uz";
  const pageUrl = `${baseUrl}/${lang}/tests/programming`;

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

  const startHref = `/${lang}/tests/30s-medium?topic=programming`;

  return (
    <main className="min-h-screen pt-24 md:pt-28 pb-16 px-4 md:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <section className="text-center space-y-5 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs text-muted-foreground">
            <Code2 size={14} />
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

        {/* Code preview */}
        <section className="mb-16">
          <p className="text-sm text-muted-foreground mb-3">{t.samplePreview}</p>
          <pre className="bg-accent/30 border border-border rounded-lg p-4 md:p-6 overflow-x-auto text-xs md:text-sm font-mono leading-relaxed">
            <code>{codeSample}</code>
          </pre>
        </section>

        {/* Why */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">{t.why.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.why.items.map((item, i) => {
              const Icon = item.icon === "code" ? Code2 : item.icon === "zap" ? Zap : Target;
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

        {/* FAQ */}
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

        {/* Repeat CTA */}
        <section className="text-center mb-16">
          <Link
            href={startHref}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all font-semibold"
          >
            {t.cta}
            <ArrowRight size={18} />
          </Link>
        </section>

        {/* Related */}
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
