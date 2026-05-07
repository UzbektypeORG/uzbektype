import Link from "next/link";
import { Quote, BookOpen, Target, ArrowRight } from "lucide-react";

type Language = "uz" | "en" | "ru";

const content = {
  uz: {
    h1: "Mashhur iqtiboslar typing test",
    badge: "Shakespeare · Einstein · Lincoln · Steve Jobs",
    tagline: "Tarixiy iqtiboslar bilan typing tezligini mashq qiling",
    intro:
      "Test'da Shakespeare asarlari, Lincoln Gettysburg nutqi, Einstein maqolalari, Steve Jobs Stanford nutqi va boshqa birlamchi manbalardan iqtiboslar mavjud. Ma'noli matn bilan mashq qilish — quruq so'z to'plamiga qaraganda esda yaxshiroq qoladi va qo'lingiz haqiqiy proza ritmini o'rganadi.",
    cta: "Testni boshlash",
    samplePreview: "Iqtibos namunasi:",
    why: {
      title: "Nega aynan iqtiboslar testi?",
      items: [
        { icon: "quote" as const, title: "Tasdiqlangan manba", text: "Hech qanday to'qib chiqarilgan iqtibos yo'q — faqat asarlar, nutqlar va keng qabul qilingan manbalar." },
        { icon: "book" as const, title: "Real proza", text: "Bosh harflar, em-dash, atoqli otlar, gap tuzilishi — qo'lingiz haqiqiy yozish patternlarini o'rganadi." },
        { icon: "target" as const, title: "Tarixiy entitetlar", text: "Shakespeare, Einstein, Lincoln, JFK kabi shaxslar — Google va LLM'lar uchun aniq anchorlar." },
      ],
    },
    faq: {
      title: "Tez-tez beriladigan savollar",
      items: [
        { q: "Mashhur iqtiboslar typing test nima?", a: "Bu typing test bo'lib, oddiy so'zlar o'rniga taniqli shaxslarning iqtiboslari yoziladi. Matn ma'noli, shuning uchun mashq mexanik tuyulmaydi va qo'l real proza ritmini o'rganadi." },
        { q: "Iqtiboslar tasdiqlanganmi?", a: "Ha. Barcha iqtiboslar nashr etilgan asarlardan, yozilgan nutqlardan yoki keng qabul qilingan manbalardan olingan: Shakespeare asarlari, Lincoln Gettysburg nutqi, Steve Jobs Stanford 2005 nutqi, AQSh Mustaqillik deklaratsiyasi va h.k." },
        { q: "Nega iqtiboslar bilan mashq qilish foydali?", a: "Iqtiboslar real-world proza pattern'larida — punktuatsiya, bosh harflar, gap tuzilishi — qo'lingizni mashq qiladi. Tasodifiy so'z to'plamlari berolmaydigan kontekstli mashqni beradi." },
        { q: "Qaysi mualliflar test'da bor?", a: "Shakespeare, Einstein, Lincoln, JFK, Steve Jobs, Robert Frost, Tolstoy, Jane Austen, Nietzsche, Sun Tzu, Lao Tzu, Charles Dickens, George Orwell va boshqa birlamchi manbasi tasdiqlangan shaxslar." },
        { q: "Iqtibos test'larini qaerda bepul topish mumkin?", a: "Uzbektype'ning iqtibos variantida — shu sahifada. Matnda qisqa iqtiboslar (oson), to'liq nutq parchalari (o'rta) va adabiy ochilishlar (qiyin) aralashgan." },
      ],
    },
    related: {
      title: "Bog'liq sahifalar",
      items: [
        { href: "/tests/30s-medium", label: "Standart 30 soniyalik test" },
        { href: "/tests/programming", label: "Programming typing test" },
        { href: "/tests/punctuation", label: "Tinish belgilari typing test" },
        { href: "/blog", label: "Barcha maqolalar" },
      ],
    },
    breadcrumbHome: "Bosh sahifa",
    breadcrumbTests: "Testlar",
  },
  en: {
    h1: "Famous Quotes Typing Test",
    badge: "Shakespeare · Einstein · Lincoln · Steve Jobs",
    tagline: "Practice typing with timeless lines from history",
    intro:
      "The test draws from Shakespeare's plays, Lincoln's Gettysburg Address, Einstein's articles, Steve Jobs's Stanford commencement, and other primary sources. Typing meaningful prose builds memory better than random word salad — and your hands learn the rhythm of real writing.",
    cta: "Start the test",
    samplePreview: "Sample quote:",
    why: {
      title: "Why a famous quotes typing test?",
      items: [
        { icon: "quote" as const, title: "Verified sources", text: "No fabricated quotes — only published works, recorded speeches, and widely accepted attributions." },
        { icon: "book" as const, title: "Real prose", text: "Capitalisation, em-dashes, proper nouns, sentence structure — your hands learn authentic writing patterns." },
        { icon: "target" as const, title: "Historical entities", text: "Shakespeare, Einstein, Lincoln, JFK — clear anchors for search engines and language models." },
      ],
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        { q: "What is a famous quotes typing test?", a: "A typing test that uses quotes from notable speakers, writers, and historical figures instead of random words. The text is meaningful, so practice doesn't feel mechanical and your hands learn real prose rhythm." },
        { q: "Are the quotes verified?", a: "Yes. Every quote is sourced from published works, recorded speeches, or widely accepted attributions: Shakespeare's plays, the Gettysburg Address, Steve Jobs's 2005 Stanford commencement, the Declaration of Independence, and more." },
        { q: "Why is practising with quotes useful?", a: "Famous quotes train your hands on real-world prose patterns — punctuation, capitalisation, sentence structure. They give you contextual practice that random word lists cannot." },
        { q: "Which authors are in the test?", a: "Shakespeare, Einstein, Lincoln, JFK, Steve Jobs, Robert Frost, Tolstoy, Jane Austen, Nietzsche, Sun Tzu, Lao Tzu, Charles Dickens, George Orwell, and other primary-source verified figures." },
        { q: "Where can I take a famous quotes typing test for free?", a: "On Uzbektype's quotes test — this page. The text mixes short famous lines (easy), full speech excerpts (medium), and literary openings (hard) across difficulties." },
      ],
    },
    related: {
      title: "Related pages",
      items: [
        { href: "/tests/30s-medium", label: "Standard 30-second test" },
        { href: "/tests/programming", label: "Programming typing test" },
        { href: "/tests/punctuation", label: "Punctuation typing test" },
        { href: "/blog", label: "All articles" },
      ],
    },
    breadcrumbHome: "Home",
    breadcrumbTests: "Tests",
  },
  ru: {
    h1: "Тест печати известных цитат",
    badge: "Шекспир · Эйнштейн · Линкольн · Стив Джобс",
    tagline: "Тренируйтесь на классических цитатах из истории",
    intro:
      "Тест составлен из пьес Шекспира, Геттисбергской речи Линкольна, статей Эйнштейна, речи Стива Джобса в Стэнфорде и других первоисточников. Печать осмысленной прозы запоминается лучше случайного набора слов — пальцы учатся ритму настоящего письма.",
    cta: "Начать тест",
    samplePreview: "Пример цитаты:",
    why: {
      title: "Зачем тест на цитатах?",
      items: [
        { icon: "quote" as const, title: "Проверенные источники", text: "Никаких выдуманных цитат — только опубликованные работы, записанные речи и общепринятые атрибуции." },
        { icon: "book" as const, title: "Настоящая проза", text: "Заглавные буквы, тире, имена собственные, структура предложений — пальцы учатся настоящему письму." },
        { icon: "target" as const, title: "Исторические личности", text: "Шекспир, Эйнштейн, Линкольн, Кеннеди — ясные якоря для поисковиков и языковых моделей." },
      ],
    },
    faq: {
      title: "Частые вопросы",
      items: [
        { q: "Что такое тест печати известных цитат?", a: "Тест на скорость набора, в котором вместо случайных слов используются цитаты выдающихся ораторов, писателей и исторических личностей. Текст осмысленный — тренировка не кажется механической, а пальцы учатся ритму настоящей прозы." },
        { q: "Цитаты проверены?", a: "Да. Все цитаты взяты из опубликованных работ, записанных речей или общепринятых атрибуций: пьесы Шекспира, Геттисбергская речь Линкольна, речь Стива Джобса в Стэнфорде в 2005 году, Декларация независимости США и другие." },
        { q: "Зачем тренироваться на цитатах?", a: "Известные цитаты тренируют руки на реальных паттернах прозы — пунктуация, заглавные буквы, структура предложений. Они дают контекстную практику, которую случайные списки слов не дают." },
        { q: "Какие авторы есть в тесте?", a: "Шекспир, Эйнштейн, Линкольн, Кеннеди, Стив Джобс, Роберт Фрост, Толстой, Джейн Остин, Ницше, Сунь-цзы, Лао-цзы, Чарльз Диккенс, Джордж Оруэлл и другие фигуры с проверенными первоисточниками." },
        { q: "Где бесплатно пройти тест печати цитат?", a: "На странице теста цитат Uzbektype. В текстах смешаны короткие известные строки (easy), отрывки речей (medium) и литературные начала (hard) на разных уровнях сложности." },
      ],
    },
    related: {
      title: "Связанные страницы",
      items: [
        { href: "/tests/30s-medium", label: "Стандартный тест 30 секунд" },
        { href: "/tests/programming", label: "Тест печати кода" },
        { href: "/tests/punctuation", label: "Тест печати пунктуации" },
        { href: "/blog", label: "Все статьи" },
      ],
    },
    breadcrumbHome: "Главная",
    breadcrumbTests: "Тесты",
  },
};

const sample = '"The only way to do great work is to love what you do." — Steve Jobs, Stanford commencement, 2005.';

export default async function QuotesTestPage({
  params,
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;
  const t = content[lang];
  const baseUrl = "https://uzbektype.uz";
  const pageUrl = `${baseUrl}/${lang}/tests/quotes`;

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

  const startHref = `/${lang}/tests/30s-medium?topic=quotes`;

  return (
    <main className="min-h-screen pt-24 md:pt-28 pb-16 px-4 md:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto">
        <section className="text-center space-y-5 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs text-muted-foreground">
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
              const Icon = item.icon === "quote" ? Quote : item.icon === "book" ? BookOpen : Target;
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
