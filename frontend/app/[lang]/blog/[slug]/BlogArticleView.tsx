import Link from "next/link";
import type { BlogPost, Language } from "@/data/blogPosts";

const navContent: Record<Language, { backToBlog: string; backToHome: string; published: string; updated: string; readTime: string; cta: string }> = {
  uz: {
    backToBlog: "Maqolalarga qaytish",
    backToHome: "Bosh sahifa",
    published: "Chiqarildi",
    updated: "Yangilandi",
    readTime: "o'qish",
    cta: "Hoziroq tezligingizni sinab ko'ring",
  },
  en: {
    backToBlog: "Back to articles",
    backToHome: "Home",
    published: "Published",
    updated: "Updated",
    readTime: "read",
    cta: "Test your typing speed now",
  },
  ru: {
    backToBlog: "К статьям",
    backToHome: "Главная",
    published: "Опубликовано",
    updated: "Обновлено",
    readTime: "чтения",
    cta: "Проверьте свою скорость прямо сейчас",
  },
};

function renderInline(text: string): React.ReactNode {
  // Bold **text**
  // Italic *text*
  // Inline link [text](url)
  // Inline code `code`
  const tokens: React.ReactNode[] = [];
  let buffer = "";
  let i = 0;
  let key = 0;
  const flush = () => {
    if (buffer) {
      tokens.push(buffer);
      buffer = "";
    }
  };
  while (i < text.length) {
    if (text.startsWith("**", i)) {
      const end = text.indexOf("**", i + 2);
      if (end > -1) {
        flush();
        tokens.push(<strong key={key++} className="font-semibold text-foreground">{text.slice(i + 2, end)}</strong>);
        i = end + 2;
        continue;
      }
    }
    if (text[i] === "[") {
      const closeBracket = text.indexOf("]", i);
      if (closeBracket > -1 && text[closeBracket + 1] === "(") {
        const closeParen = text.indexOf(")", closeBracket + 2);
        if (closeParen > -1) {
          flush();
          const linkText = text.slice(i + 1, closeBracket);
          const href = text.slice(closeBracket + 2, closeParen);
          tokens.push(
            <Link key={key++} href={href} className="text-primary underline underline-offset-2 hover:opacity-80">
              {linkText}
            </Link>
          );
          i = closeParen + 1;
          continue;
        }
      }
    }
    if (text[i] === "`") {
      const end = text.indexOf("`", i + 1);
      if (end > -1) {
        flush();
        tokens.push(
          <code key={key++} className="px-1.5 py-0.5 rounded bg-accent text-foreground text-sm font-mono">
            {text.slice(i + 1, end)}
          </code>
        );
        i = end + 1;
        continue;
      }
    }
    buffer += text[i];
    i++;
  }
  flush();
  return tokens;
}

function MarkdownRenderer({ content }: { content: string }) {
  const lines = content.split("\n");
  const blocks: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Empty line — skip
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Headings
    if (line.startsWith("## ")) {
      blocks.push(
        <h2 key={key++} className="text-2xl md:text-3xl font-bold mt-12 mb-4 scroll-mt-24">
          {line.slice(3)}
        </h2>
      );
      i++;
      continue;
    }
    if (line.startsWith("### ")) {
      blocks.push(
        <h3 key={key++} className="text-xl md:text-2xl font-semibold mt-8 mb-3">
          {line.slice(4)}
        </h3>
      );
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      blocks.push(
        <blockquote key={key++} className="my-6 pl-4 border-l-4 border-primary/40 text-lg italic text-foreground">
          {renderInline(line.slice(2))}
        </blockquote>
      );
      i++;
      continue;
    }

    // Table
    if (line.startsWith("| ")) {
      const tableLines: string[] = [line];
      let j = i + 1;
      while (j < lines.length && lines[j].startsWith("|")) {
        tableLines.push(lines[j]);
        j++;
      }
      const rows = tableLines.map((ln) =>
        ln.split("|").slice(1, -1).map((cell) => cell.trim())
      );
      const [headers, , ...body] = rows;
      blocks.push(
        <div key={key++} className="my-6 overflow-x-auto">
          <table className="w-full border-collapse text-sm md:text-base">
            <thead>
              <tr className="border-b-2 border-border">
                {headers.map((h, idx) => (
                  <th key={idx} className="text-left py-2 px-3 font-semibold">{renderInline(h)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row, ri) => (
                <tr key={ri} className="border-b border-border/50 last:border-0">
                  {row.map((cell, ci) => (
                    <td key={ci} className="py-2 px-3">{renderInline(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      i = j;
      continue;
    }

    // Numbered list
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ""));
        i++;
      }
      blocks.push(
        <ol key={key++} className="my-4 ml-6 list-decimal space-y-2 text-base md:text-lg leading-relaxed">
          {items.map((item, idx) => <li key={idx}>{renderInline(item)}</li>)}
        </ol>
      );
      continue;
    }

    // Bullet list
    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      blocks.push(
        <ul key={key++} className="my-4 ml-6 list-disc space-y-2 text-base md:text-lg leading-relaxed">
          {items.map((item, idx) => <li key={idx}>{renderInline(item)}</li>)}
        </ul>
      );
      continue;
    }

    // Paragraph
    blocks.push(
      <p key={key++} className="my-4 text-base md:text-lg leading-relaxed text-foreground/90">
        {renderInline(line)}
      </p>
    );
    i++;
  }

  return <>{blocks}</>;
}

export default function BlogArticleView({ post, lang }: { post: BlogPost; lang: Language }) {
  const t = navContent[lang];
  const baseUrl = "https://uzbektype.uz";

  // JSON-LD: Article + (optional) HowTo
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": post.articleType,
    headline: post.titles[lang],
    description: post.excerpts[lang],
    inLanguage: lang,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    url: `${baseUrl}/${lang}/blog/${post.slugs[lang]}`,
    image: `${baseUrl}/og-image.png`,
    author: { "@type": "Organization", name: "Uzbektype", url: baseUrl },
    publisher: {
      "@type": "Organization",
      name: "Uzbektype",
      logo: { "@type": "ImageObject", url: `${baseUrl}/logo.png` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/${lang}/blog/${post.slugs[lang]}`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t.backToHome, item: `${baseUrl}/${lang}` },
      { "@type": "ListItem", position: 2, name: t.backToBlog, item: `${baseUrl}/${lang}/blog` },
      { "@type": "ListItem", position: 3, name: post.titles[lang], item: `${baseUrl}/${lang}/blog/${post.slugs[lang]}` },
    ],
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([articleSchema, breadcrumbSchema]) }}
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-16">
        {/* Top breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
          <Link href={`/${lang}`} className="hover:text-foreground">{t.backToHome}</Link>
          <span>›</span>
          <Link href={`/${lang}/blog`} className="hover:text-foreground">{t.backToBlog}</Link>
        </nav>

        <header className="mb-10 space-y-3 animate-fade-in">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight">
            {post.titles[lang]}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {post.excerpts[lang]}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground pt-2">
            <span>{t.published}: <time dateTime={post.publishedAt}>{post.publishedAt}</time></span>
            <span>•</span>
            <span>{post.readTime[lang]} {t.readTime}</span>
          </div>
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <MarkdownRenderer content={post.content[lang]} />
        </div>

        {/* Bottom CTA */}
        <section className="mt-16 pt-10 border-t border-border">
          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 md:p-8 text-center space-y-4">
            <p className="text-lg md:text-xl font-semibold">{t.cta}</p>
            <Link
              href={`/${lang}/tests/30s-easy`}
              className="inline-block px-8 py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all font-medium"
            >
              {lang === "uz" ? "Sinashni boshlash" : lang === "ru" ? "Начать тест" : "Start typing test"} →
            </Link>
          </div>
          <div className="flex justify-between gap-3 mt-8 text-sm">
            <Link href={`/${lang}/blog`} className="text-muted-foreground hover:text-foreground">
              ← {t.backToBlog}
            </Link>
            <Link href={`/${lang}`} className="text-muted-foreground hover:text-foreground">
              {t.backToHome} →
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}
