import Link from "next/link";
import { Type, Zap, Target, ArrowRight } from "lucide-react";

type Language = "uz" | "en" | "ru";

const content = {
  uz: {
    h1: "Lotin yozuvda typing test",
    badge: "O'zbek lotin alifbosi · 1993",
    tagline: "O'zbek lotin yozuvda tez va aniq yozishni mashq qiling",
    intro:
      "Bu test 1993-yilda qabul qilingan o'zbek lotin alifbosi asosida tuzilgan. Mashqlarda o' va g' apostrofli harflar, sh, ch va ng harf birikmalari, hamda zamonaviy o'zbek so'z boyligi qo'llanilgan. Klassik adabiyot va kundalik nutq matnlari aralash berilgan.",
    cta: "Testni boshlash",
    samplePreview: "Matn namunasi:",
    why: {
      title: "Nega lotin yozuvda typing mashqi?",
      items: [
        { icon: "type" as const, title: "Maxsus harflar", text: "o', g' apostrofli harflar va sh, ch, ng birikmalarini avtomatik darajada yozishni o'rganasiz." },
        { icon: "zap" as const, title: "Zamonaviy yozuv", text: "Lotin alifbo 1993-yildan rasmiy. Hujjat, ariza va internetda asosiy yozuv shu." },
        { icon: "target" as const, title: "WPM va aniqlik", text: "Test natijasida WPM, aniqlik, raw WPM va barqarorlik ko'rsatkichlarini ko'rasiz." },
      ],
    },
    faq: {
      title: "Tez-tez beriladigan savollar",
      items: [
        { q: "Lotin yozuvda typing test nima?", a: "Bu zamonaviy o'zbek lotin alifbosida tuzilgan typing test. Unda o', g', sh, ch, ng kabi o'zbek tiliga xos harflar va birikmalar mashq qilinadi." },
        { q: "O'zbek lotin alifbosi qachon qabul qilingan?", a: "Lotin yozuvga o'tish to'g'risidagi qonun 1993-yil 2-sentyabrda qabul qilingan. 1995-yilda alifboga aniq o'zgartirishlar kiritilgan, hozirgi 29 harf va 3 birikmali shakl shu davrda shakllangan." },
        { q: "O' va g' harflarini klaviaturada qanday yozish kerak?", a: "Klaviaturada avval o yoki g harfi, so'ng apostrof (') belgisi bosiladi. Standart QWERTY klaviaturada apostrof Enter klavishasi yonida joylashgan." },
        { q: "Lotin yozuvda yaxshi WPM qancha hisoblanadi?", a: "Boshlovchi: 20-30 WPM, o'rta daraja: 40-50 WPM, professional: 60+ WPM. Apostrofli harflar va ikki belgilik birikmalar tezlikni biroz pasaytirishi tabiiy." },
        { q: "Lotincha va kirillchada yozish tezligida farq bormi?", a: "Ha. Lotin yozuvda apostrof va ikki belgilik birikmalar sababli boshlanishida sekinroq bo'lishi mumkin. Lekin yarim soat amaliyotdan keyin farq sezilmaydi." },
        { q: "Bu test bepulmi?", a: "Ha, butunlay bepul. Ro'yxatdan o'tish shart emas — sahifaga kirgach darhol boshlasangiz bo'ladi." },
      ],
    },
    related: {
      title: "Bog'liq sahifalar",
      items: [
        { href: "/tests/30s-medium", label: "Standart 30 soniyalik test" },
        { href: "/tests/quotes", label: "Mashhur iqtiboslar typing test" },
        { href: "/blog/touch-typing-nima", label: "Touch typing nima — boshlovchi uchun qo'llanma" },
        { href: "/blog", label: "Barcha maqolalar" },
      ],
    },
    breadcrumbHome: "Bosh sahifa",
    breadcrumbTests: "Testlar",
  },
  en: {
    h1: "Uzbek Latin Typing Test",
    badge: "Uzbek Latin alphabet · 1993",
    tagline: "Practice typing modern Uzbek written in the Latin script",
    intro:
      "This test is based on the Uzbek Latin alphabet adopted in 1993. The drills include the apostrophe letters o' and g', the digraphs sh, ch, and ng, and modern Uzbek vocabulary. Texts mix classical literature and everyday language.",
    cta: "Start the test",
    samplePreview: "Sample text:",
    why: {
      title: "Why practice Uzbek Latin typing?",
      items: [
        { icon: "type" as const, title: "Special letters", text: "Train the apostrophe letters o' and g' along with the sh, ch, and ng digraphs until they become automatic." },
        { icon: "zap" as const, title: "Modern script", text: "Latin has been the official script since 1993. It dominates documents, forms, and online Uzbek today." },
        { icon: "target" as const, title: "WPM and accuracy", text: "See your WPM, accuracy, raw WPM, and consistency metrics at the end of every run." },
      ],
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        { q: "What is the Uzbek Latin typing test?", a: "A typing test using the modern Uzbek Latin alphabet. It drills the o', g', sh, ch, and ng letters and digraphs specific to the script." },
        { q: "When was the Uzbek Latin alphabet adopted?", a: "The law transitioning Uzbek to Latin script was passed on 2 September 1993. The 1995 revision finalised the present-day 29-letter and 3-digraph form." },
        { q: "How do you type o' and g' on a keyboard?", a: "Press the o or g key, then press the apostrophe (') key. On a standard QWERTY keyboard the apostrophe sits next to the Enter key." },
        { q: "What is a good WPM in Uzbek Latin?", a: "Beginner 20-30 WPM, intermediate 40-50 WPM, professional 60+ WPM. The apostrophes and digraphs naturally slow the early stages but smooth out with practice." },
        { q: "Is typing in Latin slower than Cyrillic Uzbek?", a: "Initially yes, because of the apostrophes and digraphs. After about half an hour of practice the difference becomes negligible." },
        { q: "Is this test free?", a: "Yes — completely free. No sign-up; press start as soon as the page loads." },
      ],
    },
    related: {
      title: "Related pages",
      items: [
        { href: "/tests/30s-medium", label: "Standard 30-second test" },
        { href: "/tests/quotes", label: "Famous quotes typing test" },
        { href: "/blog/what-is-touch-typing", label: "What is touch typing — beginner's guide" },
        { href: "/blog", label: "All articles" },
      ],
    },
    breadcrumbHome: "Home",
    breadcrumbTests: "Tests",
  },
  ru: {
    h1: "Тест печати на узбекской латинице",
    badge: "Узбекская латиница · 1993",
    tagline: "Тренируйте набор современного узбекского языка в латинской графике",
    intro:
      "Тест основан на узбекском латинском алфавите, принятом в 1993 году. Упражнения включают апострофные буквы o' и g', диграфы sh, ch и ng, а также современный узбекский словарь. Тексты сочетают классическую литературу и повседневную речь.",
    cta: "Начать тест",
    samplePreview: "Пример текста:",
    why: {
      title: "Зачем тренировать узбекскую латиницу?",
      items: [
        { icon: "type" as const, title: "Особые буквы", text: "Отработайте апострофные o' и g', а также диграфы sh, ch, ng — до уровня автоматизма." },
        { icon: "zap" as const, title: "Современная графика", text: "Латиница — официальная графика Узбекистана с 1993 года. Используется в документах, заявлениях, интернете." },
        { icon: "target" as const, title: "WPM и точность", text: "После теста — детальные метрики: WPM, точность, raw WPM, стабильность." },
      ],
    },
    faq: {
      title: "Частые вопросы",
      items: [
        { q: "Что такое тест печати на узбекской латинице?", a: "Тест скорости набора на современном узбекском латинском алфавите. Тренирует характерные для языка буквы o', g' и диграфы sh, ch, ng." },
        { q: "Когда принят узбекский латинский алфавит?", a: "Закон о переходе на латиницу принят 2 сентября 1993 года. Редакция 1995 года закрепила нынешнюю форму — 29 букв и 3 диграфа." },
        { q: "Как набирать o' и g' на клавиатуре?", a: "Нажмите букву o или g, затем апостроф ('). На стандартной QWERTY-клавиатуре апостроф находится рядом с клавишей Enter." },
        { q: "Какая WPM считается хорошей на узбекской латинице?", a: "Начинающий — 20-30 WPM, средний — 40-50 WPM, профессионал — 60+ WPM. Апострофы и диграфы естественно замедляют на старте, но это сглаживается с практикой." },
        { q: "Латинская печать медленнее кириллической?", a: "Поначалу — да, из-за апострофов и диграфов. После примерно получаса практики разница становится незаметной." },
        { q: "Тест бесплатный?", a: "Да, полностью бесплатно. Регистрация не нужна — открыли страницу и сразу начали." },
      ],
    },
    related: {
      title: "Связанные страницы",
      items: [
        { href: "/tests/30s-medium", label: "Стандартный тест 30 секунд" },
        { href: "/tests/quotes", label: "Тест печати известных цитат" },
        { href: "/blog/chto-takoe-touch-typing", label: "Что такое слепая печать — руководство для начинающих" },
        { href: "/blog", label: "Все статьи" },
      ],
    },
    breadcrumbHome: "Главная",
    breadcrumbTests: "Тесты",
  },
};

const textSample = `O'zbekiston Markaziy Osiyoda joylashgan, Samarqand va Buxoro qadimiy shaharlardir. Mustaqillik kuni 1-sentyabrda nishonlanadi.`;

export default async function UzbekLatinTestPage({
  params,
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;
  const t = content[lang];
  const baseUrl = "https://uzbektype.uz";
  const pageUrl = `${baseUrl}/${lang}/tests/uzbek-latin`;

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

  const startHref = `/${lang}/tests/30s-medium?topic=uzbek-latin`;

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
            <Type size={14} />
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

        {/* Text preview */}
        <section className="mb-16">
          <p className="text-sm text-muted-foreground mb-3">{t.samplePreview}</p>
          <pre className="bg-accent/30 border border-border rounded-lg p-4 md:p-6 overflow-x-auto text-sm md:text-base leading-relaxed whitespace-pre-wrap font-sans">
            <code>{textSample}</code>
          </pre>
        </section>

        {/* Why */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">{t.why.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.why.items.map((item, i) => {
              const Icon = item.icon === "type" ? Type : item.icon === "zap" ? Zap : Target;
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
