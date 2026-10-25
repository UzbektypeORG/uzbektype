import type { Metadata } from "next";
import Link from "next/link";
import { Keyboard, Scale, CalendarDays, ArrowRight } from "lucide-react";
import NewAlphabetPlay from "@/components/new-alphabet/NewAlphabetPlay";
import NewAlphabetConverter from "@/components/new-alphabet/NewAlphabetConverter";
import { NEW_ALPHABET, LETTER_CHANGES } from "@/lib/new-alphabet";

// Standalone practice page for the 2026 Uzbek alphabet. Every fact here is
// from the law text on lex.uz (O'RQ-1184) unless attributed otherwise —
// keep it that way; the page is written to be quoted by search and AI.

type Language = "uz" | "en" | "ru";

const BASE_URL = "https://www.uzbektype.uz";
const PATH = "/yangi-alifbo";
const LAW_URL = "https://www.lex.uz/uz/docs/8548754";

const BLOG_SLUGS: Record<Language, string> = {
  uz: "yangi-ozbek-alifbosi-2026",
  en: "new-uzbek-alphabet-2026",
  ru: "novyy-uzbekskiy-alfavit-2026",
};

const NEW_LETTERS = new Set(["Ö", "Ğ", "Ş", "Ç"]);

const content = {
  uz: {
    metaTitle: "Yangi o'zbek alifbosini sinash — Ö, Ğ, Ş, Ç typing test | UzbekType",
    metaDescription:
      "2026-yilgi yangi o'zbek alifbosida bepul yozish testi: Ö, Ğ, Ş, Ç harflarini mashq qiling, matnni yangi alifboga o'giring. Qonun O'RQ-1184, 22.04.2027 dan kuchga kiradi.",
    keywords: [
      "yangi o'zbek alifbosi",
      "yangi alifbo 2026",
      "o'zbek alifbosi o'zgardi",
      "yangi alifboda yozish",
      "Ö Ğ Ş Ç harflari",
      "yangi alifbo typing test",
      "lotin alifbosi o'zgarishi",
      "matnni yangi alifboga o'girish",
      "28 harfli o'zbek alifbosi",
    ],
    badge: "Qonun O'RQ-1184 · 22.04.2027 dan kuchga kiradi",
    h1: "Yangi o'zbek alifbosini sinab ko'ring",
    summary:
      "2026-yil 21-oktabrda imzolangan qonunga ko'ra o'zbek lotin alifbosida to'rtta harf o'zgaradi: Oʻ → Ö, Gʻ → Ğ, Sh → Ş, Ch → Ç. Alifbo 28 ta harf va 1 ta tutuq belgisidan iborat bo'ladi. Qonun 2027-yil 22-aprelda kuchga kiradi. Quyida yangi harflarda yozishni hoziroq mashq qiling.",
    testTitle: "Yangi alifboda yozish testi",
    testNote: "Natijalar saqlanmaydi va reytingga kirmaydi — bu faqat mashq.",
    changesTitle: "Nima o'zgardi: 4 ta harf",
    colOld: "Hozirgi",
    colNew: "Yangi",
    colExample: "Misol",
    alphabetTitle: "Yangi alifbo: 28 harf + tutuq belgisi",
    alphabetNote: "Qonunning 1-moddasidagi tartibda. Yangi harflar ajratib ko'rsatilgan. Tutuq belgisi (ʼ) saqlanadi: maʼno, sheʼr.",
    keyboardTitle: "Klaviaturada Ö, Ğ, Ş, Ç qanday yoziladi",
    keyboard: [
      "Shu sahifadagi testda eski usulda yozavering: o' → ö, g' → ğ, sh → ş, ch → ç avtomatik almashadi.",
      "Kompyuterda: turk (Turkish Q) klaviatura joylashuvida Ö, Ğ, Ş, Ç uchun alohida tugmalar bor.",
      "Telefonda: ko'p klaviaturalarda harfni bosib tursangiz, qo'shimcha belgilar chiqadi — masalan, o ni bosib turib ö ni tanlash mumkin.",
    ],
    converterTitle: "Matnni yangi alifboga o'girish",
    factsTitle: "Qonun haqida asosiy faktlar",
    facts: [
      { label: "Hujjat", value: "O'RQ-1184-son Qonun (1993-yilgi 931-XII-son qonunga o'zgartirish)" },
      { label: "Qonunchilik palatasi qabul qildi", value: "2026-yil 7-iyul" },
      { label: "Senat ma'qulladi", value: "2026-yil 10-sentabr" },
      { label: "Prezident imzoladi", value: "2026-yil 21-oktabr (O'zbek tili bayrami kuni)" },
      { label: "Kuchga kiradi", value: "2027-yil 22-aprel (rasmiy e'lon qilinganidan 6 oy o'tib)" },
      { label: "Hozirgi hujjatlar", value: "O'z kuchida qoladi; milliy valyuta va qimmatli qog'ozlar muomalada qoladi" },
    ],
    faqTitle: "Tez-tez beriladigan savollar",
    faq: [
      { q: "Yangi o'zbek alifbosi qachon kuchga kiradi?", a: "O'RQ-1184-son qonun rasmiy e'lon qilingan kundan e'tiboran olti oy o'tgach — 2027-yil 22-aprelda kuchga kiradi. Qonun 2026-yil 21-oktabrda imzolangan." },
      { q: "Yangi alifboda nechta harf bor?", a: "28 ta harf va 1 ta tutuq belgisi (ʼ). Hozirgi alifbo 26 ta harf va 3 ta harf birikmasidan iborat edi." },
      { q: "Qaysi harflar o'zgardi?", a: "To'rtta: Oʻ o'rniga Ö, Gʻ o'rniga Ğ, Sh o'rniga Ş, Ch o'rniga Ç. Qolgan harflar o'zgarmaydi." },
      { q: "Ng harf birikmasi nima bo'ladi?", a: "Ng alifbodan alohida harf sifatida chiqarildi. Yozuvda harf birikmasi sifatida qoladi (masalan, tong), uning qoidalari imlo qoidalarida belgilanadi." },
      { q: "Eski alifbodagi pasport va hujjatlar amal qiladimi?", a: "Ha. Qonunning 2-moddasiga ko'ra, kuchga kirgunga qadar rasmiylashtirilgan hujjatlar, milliy valyuta va qimmatli qog'ozlardagi harflarning avvalgi shakli ularning amal qilishiga monelik qilmaydi." },
      { q: "Klaviaturada Ö, Ğ, Ş, Ç harflarini qanday yozaman?", a: "Bu sahifadagi testda o', g', sh, ch deb yozsangiz yetarli — ular avtomatik yangi harfga almashadi. Kompyuterda turk (Turkish Q) joylashuvida bu harflar uchun tugmalar bor." },
      { q: "Maktab darsliklari qachon yangi alifboga o'tadi?", a: "Daryo xabariga ko'ra, darsliklarni 2031-yilgacha to'liq yangi alifboga o'tkazish rejalashtirilgan. Bu muddat qonun matnida emas; amalga oshirish dasturini Vazirlar Mahkamasi ikki oy ichida tasdiqlashi kerak." },
    ],
    sourcesTitle: "Manbalar",
    relatedTitle: "Bog'liq sahifalar",
    related: [
      { href: `/blog/${BLOG_SLUGS.uz}`, label: "Yangi o'zbek alifbosi 2026 — to'liq qo'llanma" },
      { href: "/tests/uzbek-latin", label: "Hozirgi lotin yozuvida typing test" },
      { href: "/tests/30s-medium", label: "Oddiy 30 soniyalik test" },
    ],
    home: "Bosh sahifa",
  },
  en: {
    metaTitle: "New Uzbek Alphabet Typing Test — Practice Ö, Ğ, Ş, Ç | UzbekType",
    metaDescription:
      "Free typing test in the 2026 Uzbek alphabet: practice Ö, Ğ, Ş, Ç and convert text to the new spelling. Law O'RQ-1184, in force from 22 April 2027.",
    keywords: [
      "new uzbek alphabet",
      "uzbek alphabet 2026",
      "uzbek alphabet reform",
      "uzbek latin alphabet change",
      "Ö Ğ Ş Ç uzbek",
      "new uzbek alphabet typing test",
      "uzbek alphabet converter",
      "28 letter uzbek alphabet",
    ],
    badge: "Law O'RQ-1184 · in force from 22.04.2027",
    h1: "Try the new Uzbek alphabet",
    summary:
      "Under the law signed on 21 October 2026, four letters of the Uzbek Latin alphabet change: Oʻ → Ö, Gʻ → Ğ, Sh → Ş, Ch → Ç. The alphabet will have 28 letters and 1 tutuq (apostrophe) sign. The law enters into force on 22 April 2027. Practise typing the new letters below.",
    testTitle: "Typing test in the new alphabet",
    testNote: "Results are not saved and don't count toward the leaderboard — practice only.",
    changesTitle: "What changed: 4 letters",
    colOld: "Current",
    colNew: "New",
    colExample: "Example",
    alphabetTitle: "The new alphabet: 28 letters + tutuq sign",
    alphabetNote: "In the order of Article 1 of the law. New letters are highlighted. The tutuq sign (ʼ) stays: maʼno, sheʼr.",
    keyboardTitle: "How to type Ö, Ğ, Ş, Ç on a keyboard",
    keyboard: [
      "In the test on this page, type the old way: o' → ö, g' → ğ, sh → ş, ch → ç are swapped automatically.",
      "On a computer: the Turkish Q keyboard layout has dedicated keys for Ö, Ğ, Ş, Ç.",
      "On a phone: many keyboards show extra characters when you hold a letter — for example, hold o to pick ö.",
    ],
    converterTitle: "Convert text to the new alphabet",
    factsTitle: "Key facts about the law",
    facts: [
      { label: "Document", value: "Law No. O'RQ-1184 (amending Law No. 931-XII of 1993)" },
      { label: "Adopted by the Legislative Chamber", value: "7 July 2026" },
      { label: "Approved by the Senate", value: "10 September 2026" },
      { label: "Signed by the President", value: "21 October 2026 (Uzbek Language Day)" },
      { label: "Enters into force", value: "22 April 2027 (six months after official publication)" },
      { label: "Existing documents", value: "Remain valid; national currency and securities stay in circulation" },
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      { q: "When does the new Uzbek alphabet take effect?", a: "Law O'RQ-1184 enters into force six months after its official publication — on 22 April 2027. It was signed on 21 October 2026." },
      { q: "How many letters does the new alphabet have?", a: "28 letters and 1 tutuq (apostrophe) sign. The current alphabet has 26 letters and 3 letter combinations." },
      { q: "Which letters changed?", a: "Four: Oʻ becomes Ö, Gʻ becomes Ğ, Sh becomes Ş and Ch becomes Ç. All other letters stay the same." },
      { q: "What happens to Ng?", a: "Ng is no longer a separate unit of the alphabet. It is still written as a letter combination (e.g. tong); its rules are set by the spelling rules." },
      { q: "Are passports and documents in the old alphabet still valid?", a: "Yes. Under Article 2 of the law, the old letter forms in documents, national currency and securities issued before it takes effect do not affect their validity." },
      { q: "How do I type Ö, Ğ, Ş, Ç on a keyboard?", a: "In the test on this page, type o', g', sh, ch and they turn into the new letters automatically. On a computer, the Turkish Q layout has keys for these letters." },
      { q: "When will school textbooks switch?", a: "According to Daryo, textbooks are planned to fully switch to the new alphabet by 2031. That deadline is not in the law itself; the Cabinet of Ministers must approve an implementation programme within two months." },
    ],
    sourcesTitle: "Sources",
    relatedTitle: "Related pages",
    related: [
      { href: `/blog/${BLOG_SLUGS.en}`, label: "New Uzbek alphabet 2026 — the complete guide" },
      { href: "/tests/uzbek-latin", label: "Typing test in the current Latin script" },
      { href: "/tests/30s-medium", label: "Standard 30-second test" },
    ],
    home: "Home",
  },
  ru: {
    metaTitle: "Новый узбекский алфавит — тест печати Ö, Ğ, Ş, Ç | UzbekType",
    metaDescription:
      "Бесплатный тест печати на новом узбекском алфавите 2026 года: тренируйте Ö, Ğ, Ş, Ç и переводите текст в новое написание. Закон O'RQ-1184, вступает в силу 22.04.2027.",
    keywords: [
      "новый узбекский алфавит",
      "узбекский алфавит 2026",
      "реформа узбекского алфавита",
      "изменение узбекской латиницы",
      "Ö Ğ Ş Ç узбекский",
      "тест печати новый алфавит",
      "конвертер узбекский алфавит",
      "узбекский алфавит 28 букв",
    ],
    badge: "Закон O'RQ-1184 · вступает в силу 22.04.2027",
    h1: "Попробуйте новый узбекский алфавит",
    summary:
      "По закону, подписанному 21 октября 2026 года, в узбекской латинице меняются четыре буквы: Oʻ → Ö, Gʻ → Ğ, Sh → Ş, Ch → Ç. Алфавит будет состоять из 28 букв и 1 знака тутук (апостроф). Закон вступает в силу 22 апреля 2027 года. Потренируйтесь печатать новые буквы прямо здесь.",
    testTitle: "Тест печати на новом алфавите",
    testNote: "Результаты не сохраняются и не попадают в рейтинг — только тренировка.",
    changesTitle: "Что изменилось: 4 буквы",
    colOld: "Сейчас",
    colNew: "Новая",
    colExample: "Пример",
    alphabetTitle: "Новый алфавит: 28 букв + знак тутук",
    alphabetNote: "В порядке статьи 1 закона. Новые буквы выделены. Знак тутук (ʼ) сохраняется: maʼno, sheʼr.",
    keyboardTitle: "Как набирать Ö, Ğ, Ş, Ç на клавиатуре",
    keyboard: [
      "В тесте на этой странице пишите по-старому: o' → ö, g' → ğ, sh → ş, ch → ç заменяются автоматически.",
      "На компьютере: в турецкой раскладке (Turkish Q) есть отдельные клавиши для Ö, Ğ, Ş, Ç.",
      "На телефоне: во многих клавиатурах при удержании буквы появляются дополнительные символы — например, удерживайте o, чтобы выбрать ö.",
    ],
    converterTitle: "Перевести текст в новый алфавит",
    factsTitle: "Ключевые факты о законе",
    facts: [
      { label: "Документ", value: "Закон № O'RQ-1184 (изменения в закон № 931-XII 1993 года)" },
      { label: "Принят Законодательной палатой", value: "7 июля 2026 года" },
      { label: "Одобрен Сенатом", value: "10 сентября 2026 года" },
      { label: "Подписан Президентом", value: "21 октября 2026 года (День узбекского языка)" },
      { label: "Вступает в силу", value: "22 апреля 2027 года (через шесть месяцев после официального опубликования)" },
      { label: "Действующие документы", value: "Сохраняют силу; национальная валюта и ценные бумаги остаются в обращении" },
    ],
    faqTitle: "Частые вопросы",
    faq: [
      { q: "Когда вступает в силу новый узбекский алфавит?", a: "Закон O'RQ-1184 вступает в силу через шесть месяцев после официального опубликования — 22 апреля 2027 года. Он подписан 21 октября 2026 года." },
      { q: "Сколько букв в новом алфавите?", a: "28 букв и 1 знак тутук (апостроф). Нынешний алфавит состоит из 26 букв и 3 буквосочетаний." },
      { q: "Какие буквы изменились?", a: "Четыре: Oʻ заменяется на Ö, Gʻ — на Ğ, Sh — на Ş, Ch — на Ç. Остальные буквы не меняются." },
      { q: "Что будет с Ng?", a: "Ng исключён из алфавита как отдельная единица. На письме он остаётся буквосочетанием (например, tong), правила определяются орфографией." },
      { q: "Действуют ли паспорта и документы на старом алфавите?", a: "Да. По статье 2 закона прежние формы букв в документах, национальной валюте и ценных бумагах, выпущенных до вступления закона в силу, не влияют на их действительность." },
      { q: "Как набирать Ö, Ğ, Ş, Ç на клавиатуре?", a: "В тесте на этой странице пишите o', g', sh, ch — они автоматически превращаются в новые буквы. На компьютере в турецкой раскладке Turkish Q есть клавиши для этих букв." },
      { q: "Когда школьные учебники перейдут на новый алфавит?", a: "По данным Daryo, учебники планируется полностью перевести на новый алфавит к 2031 году. Этого срока нет в самом законе; программу реализации Кабинет министров должен утвердить в течение двух месяцев." },
    ],
    sourcesTitle: "Источники",
    relatedTitle: "Связанные страницы",
    related: [
      { href: `/blog/${BLOG_SLUGS.ru}`, label: "Новый узбекский алфавит 2026 — полное руководство" },
      { href: "/tests/uzbek-latin", label: "Тест печати на нынешней латинице" },
      { href: "/tests/30s-medium", label: "Стандартный тест 30 секунд" },
    ],
    home: "Главная",
  },
};

const SOURCES = [
  { label: "lex.uz — O'RQ-1184-son Qonun, 21.10.2026", href: LAW_URL },
  { label: "Gazeta.uz — Prezident qonunni imzoladi (21.10.2026)", href: "https://www.gazeta.uz/oz/2026/10/21/alphabet/" },
  { label: "Gazeta.uz — Senat 28 harfli alifboni ma'qulladi (10.09.2026)", href: "https://www.gazeta.uz/oz/2026/09/10/uzb-alphabet/" },
  { label: "Daryo — darsliklar 2031-yilgacha (10.09.2026)", href: "https://daryo.uz/en/2026/09/10/uzbekistan-to-fully-switch-school-textbooks-to-updated-alphabet-by-2031/" },
];

const LOCALES: Record<Language, string> = { uz: "uz_UZ", en: "en_US", ru: "ru_RU" };

export async function generateMetadata({ params }: { params: Promise<{ lang: Language }> }): Promise<Metadata> {
  const { lang } = await params;
  const c = content[lang];
  const url = `${BASE_URL}/${lang}${PATH}`;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    keywords: c.keywords,
    alternates: {
      canonical: url,
      languages: { uz: `/uz${PATH}`, en: `/en${PATH}`, ru: `/ru${PATH}`, "x-default": `/uz${PATH}` },
    },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url,
      type: "website",
      locale: LOCALES[lang],
      siteName: "UzbekType",
      images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: c.h1 }],
    },
    twitter: { card: "summary_large_image", title: c.metaTitle, description: c.metaDescription, images: [`${BASE_URL}/og-image.png`] },
    robots: { index: true, follow: true },
  };
}

export default async function NewAlphabetPage({ params }: { params: Promise<{ lang: Language }> }) {
  const { lang } = await params;
  const c = content[lang];
  const pageUrl = `${BASE_URL}/${lang}${PATH}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${pageUrl}#app`,
        name: c.testTitle,
        description: c.metaDescription,
        url: pageUrl,
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web",
        inLanguage: lang,
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "UZS" },
        about: { "@id": `${pageUrl}#law` },
      },
      {
        "@type": "Legislation",
        "@id": `${pageUrl}#law`,
        name: "Lotin yozuviga asoslangan oʻzbek alifbosini joriy etish toʻgʻrisidagi Qonunga oʻzgartirish kiritish haqida",
        legislationIdentifier: "O'RQ-1184",
        legislationDate: "2026-10-21",
        legislationDateOfApplicability: "2027-04-22",
        legislationJurisdiction: { "@type": "Country", name: "Uzbekistan" },
        legislationType: "Law",
        inLanguage: "uz",
        url: LAW_URL,
        description: c.summary,
      },
      {
        "@type": "FAQPage",
        mainEntity: c.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: c.home, item: `${BASE_URL}/${lang}` },
          { "@type": "ListItem", position: 2, name: c.h1, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* First screen: the same play UI as the main test page */}
      <NewAlphabetPlay lang={lang} />

      <div className="max-w-4xl mx-auto space-y-14 px-4 md:px-6 pt-12 pb-16 border-t border-border">
        {/* Hero: answer-first summary so search snippets and AI answers can quote it */}
        <section className="text-center space-y-4">
          <a
            href={LAW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs text-muted-foreground hover:text-foreground"
          >
            <Scale size={14} />
            <span>{c.badge}</span>
          </a>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">{c.h1}</h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">{c.summary}</p>
          <p className="text-xs text-muted-foreground">{c.testNote}</p>
        </section>

        {/* What changed */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-5">{c.changesTitle}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm md:text-base border-collapse">
              <thead>
                <tr className="border-b-2 border-border text-left">
                  <th className="py-2 px-3 font-semibold">{c.colOld}</th>
                  <th className="py-2 px-3 font-semibold">{c.colNew}</th>
                  <th className="py-2 px-3 font-semibold">{c.colExample}</th>
                </tr>
              </thead>
              <tbody>
                {LETTER_CHANGES.map((row) => (
                  <tr key={row.new} className="border-b border-border/50">
                    <td className="py-3 px-3 font-mono">{row.old}</td>
                    <td className="py-3 px-3 font-mono text-lg font-bold text-primary">{row.new}</td>
                    <td className="py-3 px-3">
                      <span className="text-muted-foreground">{row.example.old}</span> → <strong>{row.example.new}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Full alphabet */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{c.alphabetTitle}</h2>
          <p className="text-sm text-muted-foreground mb-5">{c.alphabetNote}</p>
          <ol className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2" aria-label={c.alphabetTitle}>
            {[...NEW_ALPHABET, "ʼ"].map((letter, i) => (
              <li
                key={letter}
                className={`aspect-square flex flex-col items-center justify-center rounded-lg border text-lg md:text-xl font-bold ${
                  NEW_LETTERS.has(letter) ? "border-primary bg-primary/10 text-primary" : "border-border"
                }`}
              >
                <span>{letter}</span>
                <span className="text-[10px] font-normal text-muted-foreground">{i + 1}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Keyboard */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-5 flex items-center gap-2">
            <Keyboard className="text-primary" size={28} />
            {c.keyboardTitle}
          </h2>
          <ul className="space-y-3">
            {c.keyboard.map((line, i) => (
              <li key={i} className="flex gap-3 text-sm md:text-base leading-relaxed">
                <span className="text-primary font-bold">{i + 1}.</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Converter */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-5">{c.converterTitle}</h2>
          <NewAlphabetConverter lang={lang} />
        </section>

        {/* Facts */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-5 flex items-center gap-2">
            <CalendarDays className="text-primary" size={28} />
            {c.factsTitle}
          </h2>
          <dl className="divide-y divide-border border border-border rounded-xl">
            {c.facts.map((f) => (
              <div key={f.label} className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 px-4 py-3">
                <dt className="text-sm text-muted-foreground">{f.label}</dt>
                <dd className="sm:col-span-2 text-sm md:text-base font-medium">{f.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-5">{c.faqTitle}</h2>
          <div className="space-y-3">
            {c.faq.map((item, i) => (
              <details key={i} className="group border border-border rounded-lg" open={i === 0}>
                <summary className="cursor-pointer px-5 py-4 font-medium flex items-center justify-between hover:bg-accent/30 transition-colors list-none">
                  <h3 className="text-base pr-4">{item.q}</h3>
                  <span className="text-muted-foreground transition-transform group-open:rotate-180 flex-shrink-0">▾</span>
                </summary>
                <p className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Sources + related */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-3">{c.sourcesTitle}</h2>
            <ul className="space-y-2 text-sm">
              {SOURCES.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-3">{c.relatedTitle}</h2>
            <ul className="space-y-2 text-sm">
              {c.related.map((r) => (
                <li key={r.href}>
                  <Link href={`/${lang}${r.href}`} className="text-primary hover:underline inline-flex items-center gap-1">
                    {r.label}
                    <ArrowRight size={14} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
