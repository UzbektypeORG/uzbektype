"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

type Language = "uz" | "en" | "ru";

const blogArticles = {
  uz: [
    {
      id: 1,
      title: "10 Kun Ichida Yozish Tezligini Oshirish",
      excerpt: "Yozish tezligingizni oshirish uchun samarali usullar va mashqlar to'plami.",
      date: "2024-01-15",
      readTime: "5 daqiqa"
    },
    {
      id: 2,
      title: "Ko'r Yozish: Boshlang'ich Qo'llanma",
      excerpt: "Klaviaturaga qaramasdan yozishni o'rganish bo'yicha bosqichma-bosqich yo'riqnoma.",
      date: "2024-01-10",
      readTime: "8 daqiqa"
    },
    {
      id: 3,
      title: "Ergonomika: To'g'ri O'tirish va Yozish",
      excerpt: "Yozish vaqtida sog'lig'ingizni saqlash uchun to'g'ri pozitsiya va ergonomik maslahatlar.",
      date: "2024-01-05",
      readTime: "6 daqiqa"
    },
    {
      id: 4,
      title: "WPM Nima va Uni Qanday Hisoblash Mumkin?",
      excerpt: "Words Per Minute (WPM) ko'rsatkichini tushunish va uni to'g'ri o'lchash usullari.",
      date: "2024-01-01",
      readTime: "4 daqiqa"
    },
    {
      id: 5,
      title: "Eng Yaxshi Klaviatura Layoutlari",
      excerpt: "QWERTY, Dvorak va boshqa klaviatura layoutlarining afzalliklari va kamchiliklari.",
      date: "2023-12-28",
      readTime: "7 daqiqa"
    },
    {
      id: 6,
      title: "Yozish Mashqlari: Kundalik Rejalar",
      excerpt: "Har kuni 15 daqiqa mashq qilish orqali yozish ko'nikmalaringizni rivojlantiring.",
      date: "2023-12-20",
      readTime: "10 daqiqa"
    }
  ],
  en: [
    {
      id: 1,
      title: "Improve Your Typing Speed in 10 Days",
      excerpt: "A comprehensive guide with effective methods and exercises to boost your typing speed.",
      date: "2024-01-15",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Touch Typing: A Beginner's Guide",
      excerpt: "Step-by-step instructions on how to learn typing without looking at the keyboard.",
      date: "2024-01-10",
      readTime: "8 min read"
    },
    {
      id: 3,
      title: "Ergonomics: Proper Posture for Typing",
      excerpt: "Learn the correct sitting position and ergonomic tips to maintain your health while typing.",
      date: "2024-01-05",
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "What is WPM and How to Calculate It?",
      excerpt: "Understanding the Words Per Minute metric and how to measure it accurately.",
      date: "2024-01-01",
      readTime: "4 min read"
    },
    {
      id: 5,
      title: "Best Keyboard Layouts Explained",
      excerpt: "Pros and cons of QWERTY, Dvorak, and other keyboard layouts for typing efficiency.",
      date: "2023-12-28",
      readTime: "7 min read"
    },
    {
      id: 6,
      title: "Daily Typing Practice Routines",
      excerpt: "Build your typing skills with just 15 minutes of daily practice exercises.",
      date: "2023-12-20",
      readTime: "10 min read"
    }
  ],
  ru: [
    {
      id: 1,
      title: "Улучшите Скорость Печати за 10 Дней",
      excerpt: "Комплексное руководство с эффективными методами и упражнениями для повышения скорости печати.",
      date: "2024-01-15",
      readTime: "5 мин чтения"
    },
    {
      id: 2,
      title: "Слепая Печать: Руководство для Начинающих",
      excerpt: "Пошаговые инструкции о том, как научиться печатать, не глядя на клавиатуру.",
      date: "2024-01-10",
      readTime: "8 мин чтения"
    },
    {
      id: 3,
      title: "Эргономика: Правильная Осанка при Печати",
      excerpt: "Узнайте правильное положение сидя и эргономичные советы для сохранения здоровья во время печати.",
      date: "2024-01-05",
      readTime: "6 мин чтения"
    },
    {
      id: 4,
      title: "Что Такое WPM и Как Его Рассчитать?",
      excerpt: "Понимание метрики Words Per Minute и как точно измерить скорость печати.",
      date: "2024-01-01",
      readTime: "4 мин чтения"
    },
    {
      id: 5,
      title: "Лучшие Раскладки Клавиатуры",
      excerpt: "Плюсы и минусы QWERTY, Dvorak и других раскладок клавиатуры для эффективной печати.",
      date: "2023-12-28",
      readTime: "7 мин чтения"
    },
    {
      id: 6,
      title: "Ежедневные Упражнения для Печати",
      excerpt: "Развивайте навыки печати всего за 15 минут ежедневных упражнений.",
      date: "2023-12-20",
      readTime: "10 мин чтения"
    }
  ]
};

const pageContent = {
  uz: {
    title: "Foydali Maqolalar",
    subtitle: "Yozish tezligi va ko'nikmalarini oshirish bo'yicha maslahatlar",
    backHome: "Bosh sahifaga qaytish",
    read: "O'qish"
  },
  en: {
    title: "Helpful Articles",
    subtitle: "Tips and guides to improve your typing speed and skills",
    backHome: "Back to Home",
    read: "Read"
  },
  ru: {
    title: "Полезные Статьи",
    subtitle: "Советы и руководства по улучшению скорости и навыков печати",
    backHome: "Вернуться на главную",
    read: "Читать"
  }
};

export default function BlogPage() {
  const params = useParams();
  const lang = (params.lang as Language) || "uz";

  const articles = blogArticles[lang];
  const t = pageContent[lang];

  return (
    <main className="min-h-[calc(100vh-73px)]">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <Link
            href={`/${lang}`}
            className="inline-block text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            ← {t.backHome}
          </Link>
          <h1 className="text-5xl md:text-6xl font-bold">{t.title}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <Link
              key={article.id}
              href={`/${lang}/blog/${article.id}`}
              className="group p-8 rounded-lg border border-border hover:border-foreground dark:hover:border-white hover:bg-accent/30 transition-all duration-300 space-y-4"
              style={{
                animation: `fade-in 0.4s ease-out ${index * 100}ms forwards`,
                opacity: 0
              }}
            >
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{article.date}</span>
                <span>{article.readTime}</span>
              </div>
              <h2 className="text-2xl font-semibold group-hover:text-primary transition-colors">
                {article.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {article.excerpt}
              </p>
              <div className="text-sm font-medium group-hover:translate-x-2 transition-transform inline-block">
                {t.read} →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
