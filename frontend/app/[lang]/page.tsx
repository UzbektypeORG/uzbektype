import Link from "next/link";
import FeatureIcon from "@/components/FeatureIcon";
import Noise from "@/components/Noise";

type Language = "uz" | "en" | "ru";

const content = {
  uz: {
    hero: {
      title: "Yozish Tezligingizni Sinab Ko'ring",
      subtitle: "Terayotganingizda real vaqtda WPM va aniqlikni kuzating",
      description: "O'zbek, ingliz va rus tillarida bepul onlayn yozish testi. Hech qanday ro'yxatdan o'tishsiz, darhol boshlang.",
      startBtn: "Boshlash",
      learnBtn: "Formatni tanlash"
    },
    features: {
      title: "Imkoniyatlar",
      items: [
        { icon: "zap" as const, title: "Tez va Bepul", description: "Ro'yxatdan o'tish talab qilinmaydi. Darhol boshlang." },
        { icon: "chart" as const, title: "Real Vaqt Statistika", description: "Yozayotganingizda WPM va aniqlikni ko'ring." },
        { icon: "globe" as const, title: "3 Ta Til", description: "O'zbek, ingliz va rus tillarini qo'llab-quvvatlaydi." },
        { icon: "target" as const, title: "Ko'plab Testlar", description: "Vaqt va so'z asosidagi testlar, 3 ta qiyinchilik darajasi." },
        { icon: "star" as const, title: "Yulduzli Baho", description: "Natijalaringiz asosida 1 dan 5 gacha yulduz oling." },
        { icon: "save" as const, title: "Tarixni Saqlash", description: "Natijalaringiz brauzeringizda saqlanadi." }
      ]
    },
    howItWorks: {
      title: "Qanday Ishlaydi",
      steps: [
        { title: "Testni Tanlang", description: "Vaqt asosidagi (10s, 30s, 60s) yoki so'z asosidagi (10w, 30w, 60w) testni qiyinchilik darajasi bilan tanlang." },
        { title: "Yozishni Boshlang", description: "Ko'rsatilgan matnni imkon qadar tez va to'g'ri yozing. Real vaqt statistikasi sizning jarayoningizni ko'rsatadi." },
        { title: "Natijalarni Ko'ring", description: "Yakuniy WPM, aniqlik foizi va yulduzli bahoni ko'ring. Natijalar avtomatik saqlanadi." }
      ]
    },
    blog: {
      title: "Foydali Maqolalar",
      readMore: "Barcha maqolalarni o'qish",
      articles: [
        { title: "10 Kun Ichida Yozish Tezligini Oshirish", excerpt: "Yozish tezligingizni oshirish uchun samarali usullar va mashqlar to'plami.", date: "2024-01-15" },
        { title: "Ko'r Yozish: Boshlang'ich Qo'llanma", excerpt: "Klaviaturaga qaramasdan yozishni o'rganish bo'yicha bosqichma-bosqich yo'riqnoma.", date: "2024-01-10" },
        { title: "Ergonomika: To'g'ri O'tirish va Yozish", excerpt: "Yozish vaqtida sog'lig'ingizni saqlash uchun to'g'ri pozitsiya va ergonomik maslahatlar.", date: "2024-01-05" }
      ]
    },
    cta: {
      title: "Tezligingizni Sinashga Tayyormisiz?",
      description: "Bugundan boshlab yozish ko'nikmalaringizni yaxshilang.",
      button: "Testni Boshlash",
      leaderboard: {
        title: "Haftalik Top 10",
        wpm: "WPM",
        accuracy: "Aniqlik"
      }
    },
    footer: {
      tagline: "Yozish ko'nikmasini rivojlantiring",
      description: "O'zbek, ingliz va rus tillarida bepul onlayn yozish tezligi testi.",
      links: {
        features: "Imkoniyatlar",
        tests: "Testlar",
        blog: "Blog",
        results: "Natijalar"
      },
      social: "Ijtimoiy tarmoqlar",
      copyright: "Uzbektype. Barcha huquqlar himoyalangan."
    }
  },
  en: {
    hero: {
      title: "Test Your Typing Speed",
      subtitle: "Track your WPM and accuracy in real-time as you type",
      description: "Free online typing test in Uzbek, English, and Russian. No signup required, start instantly.",
      startBtn: "Start",
      learnBtn: "Choose Format"
    },
    features: {
      title: "Features",
      items: [
        { icon: "zap" as const, title: "Fast & Free", description: "No signup required. Start testing immediately." },
        { icon: "chart" as const, title: "Real-time Stats", description: "See your WPM and accuracy as you type." },
        { icon: "globe" as const, title: "3 Languages", description: "Support for Uzbek, English, and Russian." },
        { icon: "target" as const, title: "Multiple Tests", description: "Time-based and word-based tests with 3 difficulty levels." },
        { icon: "star" as const, title: "Star Rating", description: "Get rated from 1 to 5 stars based on your performance." },
        { icon: "save" as const, title: "Track Progress", description: "Your results are saved locally in your browser." }
      ]
    },
    howItWorks: {
      title: "How It Works",
      steps: [
        { title: "Choose Your Test", description: "Select time-based (10s, 30s, 60s) or word-based (10w, 30w, 60w) test with your preferred difficulty level." },
        { title: "Start Typing", description: "Type the displayed text as fast and accurately as possible. Real-time stats show your progress." },
        { title: "View Results", description: "See your final WPM, accuracy percentage, and star rating. Results are automatically saved." }
      ]
    },
    blog: {
      title: "Helpful Articles",
      readMore: "Read All Articles",
      articles: [
        { title: "Improve Your Typing Speed in 10 Days", excerpt: "A comprehensive guide with effective methods and exercises to boost your typing speed.", date: "2024-01-15" },
        { title: "Touch Typing: A Beginner's Guide", excerpt: "Step-by-step instructions on how to learn typing without looking at the keyboard.", date: "2024-01-10" },
        { title: "Ergonomics: Proper Posture for Typing", excerpt: "Learn the correct sitting position and ergonomic tips to maintain your health while typing.", date: "2024-01-05" }
      ]
    },
    cta: {
      title: "Ready to Test Your Speed?",
      description: "Start improving your typing skills today.",
      button: "Start Typing Test",
      leaderboard: {
        title: "Weekly Top 10",
        wpm: "WPM",
        accuracy: "Accuracy"
      }
    },
    footer: {
      tagline: "Improve your typing skills",
      description: "Free online typing speed test in Uzbek, English, and Russian.",
      links: {
        features: "Features",
        tests: "Tests",
        blog: "Blog",
        results: "Results"
      },
      social: "Social media",
      copyright: "Uzbektype. All rights reserved."
    }
  },
  ru: {
    hero: {
      title: "Проверьте Скорость Печати",
      subtitle: "Отслеживайте WPM и точность в реальном времени",
      description: "Бесплатный онлайн-тест скорости печати на узбекском, английском и русском языках. Не требуется регистрация, начните сразу.",
      startBtn: "Начать",
      learnBtn: "Выбрать формат"
    },
    features: {
      title: "Возможности",
      items: [
        { icon: "zap" as const, title: "Быстро и Бесплатно", description: "Регистрация не требуется. Начните тестирование сразу." },
        { icon: "chart" as const, title: "Статистика в Реальном Времени", description: "Смотрите WPM и точность во время печати." },
        { icon: "globe" as const, title: "3 Языка", description: "Поддержка узбекского, английского и русского языков." },
        { icon: "target" as const, title: "Множество Тестов", description: "Тесты на время и на количество слов с 3 уровнями сложности." },
        { icon: "star" as const, title: "Звездный Рейтинг", description: "Получайте от 1 до 5 звезд на основе ваших результатов." },
        { icon: "save" as const, title: "Отслеживание Прогресса", description: "Результаты сохраняются локально в вашем браузере." }
      ]
    },
    howItWorks: {
      title: "Как Это Работает",
      steps: [
        { title: "Выберите Тест", description: "Выберите тест на время (10s, 30s, 60s) или на слова (10w, 30w, 60w) с предпочитаемым уровнем сложности." },
        { title: "Начните Печатать", description: "Печатайте отображаемый текст как можно быстрее и точнее. Статистика в реальном времени показывает ваш прогресс." },
        { title: "Просмотр Результатов", description: "Посмотрите финальный WPM, процент точности и звездный рейтинг. Результаты сохраняются автоматически." }
      ]
    },
    blog: {
      title: "Полезные Статьи",
      readMore: "Читать Все Статьи",
      articles: [
        { title: "Улучшите Скорость Печати за 10 Дней", excerpt: "Комплексное руководство с эффективными методами и упражнениями для повышения скорости печати.", date: "2024-01-15" },
        { title: "Слепая Печать: Руководство для Начинающих", excerpt: "Пошаговые инструкции о том, как научиться печатать, не глядя на клавиатуру.", date: "2024-01-10" },
        { title: "Эргономика: Правильная Осанка при Печати", excerpt: "Узнайте правильное положение сидя и эргономичные советы для сохранения здоровья во время печати.", date: "2024-01-05" }
      ]
    },
    cta: {
      title: "Готовы Проверить Свою Скорость?",
      description: "Начните улучшать свои навыки печати сегодня.",
      button: "Начать Тест",
      leaderboard: {
        title: "Топ 10 Недели",
        wpm: "WPM",
        accuracy: "Точность"
      }
    },
    footer: {
      tagline: "Улучшите навыки печати",
      description: "Бесплатный онлайн-тест скорости печати на узбекском, английском и русском языках.",
      links: {
        features: "Возможности",
        tests: "Тесты",
        blog: "Блог",
        results: "Результаты"
      },
      social: "Социальные сети",
      copyright: "Uzbektype. Все права защищены."
    }
  }
};

export default async function LandingPage({ params }: { params: Promise<{ lang: Language }> }) {
  const { lang } = await params;
  const currentLang = lang || "uz";
  const t = content[currentLang];

  return (
    <main className="min-h-screen">
      {/* Hero Section - Full screen */}
      <section id="hero" className="min-h-screen flex items-center justify-center px-4 sm:px-6 noise-bg -mt-[73px]">
        <Noise
          patternSize={300}
          patternScaleX={2}
          patternScaleY={2}
          patternRefreshInterval={3}
          patternAlpha={25}
        />
        <div className="max-w-5xl mx-auto text-center space-y-6 md:space-y-8 animate-fade-in pt-20 md:pt-28" style={{ position: 'relative', zIndex: 2 }}>
          <div className="space-y-3 md:space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-tight px-2">
              {t.hero.title}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground font-medium px-2">
              {t.hero.subtitle}
            </p>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            {t.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center pt-2 md:pt-4 px-4">
            <Link
              href={`/${currentLang}/tests/30s-medium`}
              className="px-8 py-4 md:px-10 md:py-5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all duration-200 font-semibold text-lg md:text-xl"
            >
              {t.hero.startBtn}
            </Link>
            <Link
              href={`/${currentLang}/tests`}
              className="px-8 py-4 md:px-10 md:py-5 border-2 border-border rounded-lg hover:border-foreground transition-all duration-200 font-semibold text-lg md:text-xl"
            >
              {t.hero.learnBtn}
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section - Full screen */}
      <section id="features" className="min-h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16">{t.features.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {t.features.items.map((feature, index) => (
              <div
                key={index}
                className="space-y-3 md:space-y-4 text-center p-6 md:p-8 rounded-lg border border-transparent hover:border-border/50 transition-all duration-300"
                style={{
                  animation: `fade-in 0.4s ease-out ${index * 100}ms forwards`,
                  opacity: 0
                }}
              >
                <FeatureIcon type={feature.icon} />
                <h3 className="text-xl md:text-2xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Full screen */}
      <section className="min-h-screen flex items-center">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16">{t.howItWorks.title}</h2>
          <div className="space-y-6 md:space-y-8">
            {t.howItWorks.steps.map((step, index) => (
              <div
                key={index}
                className="flex gap-4 md:gap-6 p-6 md:p-8 rounded-lg border border-transparent hover:border-border/50 transition-all duration-300"
                style={{
                  animation: `fade-in 0.4s ease-out ${index * 150}ms forwards`,
                  opacity: 0
                }}
              >
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg md:text-xl">
                  {index + 1}
                </div>
                <div className="space-y-1 md:space-y-2">
                  <h3 className="text-xl md:text-2xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section - Temporarily Commented Out */}
      {/* <section id="blog" className="min-h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{t.blog.title}</h2>
            <Link
              href={`/${currentLang}/blog`}
              className="text-base md:text-lg text-muted-foreground hover:text-foreground transition-colors underline"
            >
              {t.blog.readMore} →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {t.blog.articles.map((article, index) => (
              <Link
                key={index}
                href={`/${currentLang}/blog/${index + 1}`}
                className="group p-6 md:p-8 rounded-lg border border-border hover:border-foreground dark:hover:border-white hover:bg-accent/30 transition-all duration-300 space-y-3 md:space-y-4"
                style={{
                  animation: `fade-in 0.4s ease-out ${index * 100}ms forwards`,
                  opacity: 0
                }}
              >
                <div className="text-xs md:text-sm text-muted-foreground">{article.date}</div>
                <h3 className="text-xl md:text-2xl font-semibold group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="text-xs md:text-sm font-medium group-hover:translate-x-2 transition-transform inline-block">
                  {lang === "uz" ? "O'qish" : lang === "ru" ? "Читать" : "Read"} →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section - Full screen */}
      <section id="leaderboard" className="min-h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left side - CTA Content */}
            <div className="text-center lg:text-left space-y-6 md:space-y-8 animate-fade-in">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">{t.cta.title}</h2>
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground">
                {t.cta.description}
              </p>
              <Link
                href={`/${currentLang}/tests`}
                className="inline-block px-8 py-4 md:px-12 md:py-6 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all duration-200 font-semibold text-lg md:text-xl lg:text-2xl"
              >
                {t.cta.button}
              </Link>
            </div>

            {/* Right side - Weekly Leaderboard */}
            <div className="w-full">
              <div className="border border-border rounded-lg p-4 bg-accent/10 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-4 text-center">{t.cta.leaderboard.title}</h3>
                <div className="space-y-2">
                  {[
                    { rank: 1, name: "Kamola_2003", wpm: 142, accuracy: 98.5 },
                    { rank: 2, name: "FastFingers", wpm: 138, accuracy: 97.2 },
                    { rank: 3, name: "TypeMaster", wpm: 135, accuracy: 99.1 },
                    { rank: 4, name: "Alisher_T", wpm: 132, accuracy: 96.8 },
                    { rank: 5, name: "Speedster", wpm: 128, accuracy: 98.3 },
                    { rank: 6, name: "Dilnoza", wpm: 125, accuracy: 97.5 },
                    { rank: 7, name: "QuickType", wpm: 123, accuracy: 96.4 },
                    { rank: 8, name: "Rustam_99", wpm: 120, accuracy: 98.0 },
                    { rank: 9, name: "ProTyper", wpm: 118, accuracy: 95.9 },
                    { rank: 10, name: "Zarina_K", wpm: 115, accuracy: 97.8 }
                  ].map((player, index) => (
                    <div
                      key={player.rank}
                      className={`flex items-center gap-3 p-2.5 rounded-md transition-all duration-200 ${
                        player.rank <= 3
                          ? "bg-primary/10 border border-primary/20"
                          : "bg-background/50 border border-border/50"
                      } hover:border-foreground/30`}
                    >
                      <div
                        className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                          player.rank === 1
                            ? "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400"
                            : player.rank === 2
                            ? "bg-gray-400/20 text-gray-600 dark:text-gray-400"
                            : player.rank === 3
                            ? "bg-orange-600/20 text-orange-600 dark:text-orange-400"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {player.rank}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm truncate">{player.name}</div>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div className="text-right">
                          <div className="font-bold">{player.wpm}</div>
                          <div className="text-[10px] text-muted-foreground">{t.cta.leaderboard.wpm}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{player.accuracy}%</div>
                          <div className="text-[10px] text-muted-foreground">{t.cta.leaderboard.accuracy}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 md:py-16 border-t border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12">
            {/* Brand Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold">uzbektype</h3>
              <p className="text-sm text-muted-foreground">{t.footer.tagline}</p>
              <p className="text-xs text-muted-foreground">{t.footer.description}</p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">{currentLang === "uz" ? "Tezkor havolalar" : currentLang === "ru" ? "Быстрые ссылки" : "Quick Links"}</h4>
              <nav className="flex flex-col space-y-2 text-sm">
                <Link href={`/${lang}#features`} className="text-muted-foreground hover:text-foreground transition-colors">
                  {t.footer.links.features}
                </Link>
                <Link href={`/${lang}/tests`} className="text-muted-foreground hover:text-foreground transition-colors">
                  {t.footer.links.tests}
                </Link>
                <Link href={`/${lang}#blog`} className="text-muted-foreground hover:text-foreground transition-colors">
                  {t.footer.links.blog}
                </Link>
                <Link href={`/${lang}#leaderboard`} className="text-muted-foreground hover:text-foreground transition-colors">
                  {t.footer.links.results}
                </Link>
              </nav>
            </div>

            {/* Social Media */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">{t.footer.social}</h4>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com/uzbektype"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-all"
                  aria-label="Instagram"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/>
                  </svg>
                </a>
                <a
                  href="https://t.me/uzbektype"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-all"
                  aria-label="Telegram"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-border/50 text-center">
            <p className="text-sm text-muted-foreground">&copy; 2024 {t.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
