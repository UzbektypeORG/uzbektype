"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { notFound } from "next/navigation";

type Language = "uz" | "en" | "ru";

const blogArticles = {
  uz: {
    1: {
      title: "10 Kun Ichida Yozish Tezligini Oshirish",
      date: "2024-01-15",
      readTime: "5 daqiqa",
      content: `
# 10 Kun Ichida Yozish Tezligini Oshirish

Yozish tezligi - bu zamonaviy dunyoda muhim ko'nikma hisoblanadi. Kompyuter bilan ishlash, xat yozish yoki shunchaki o'z fikrlaringizni tez ifodalash uchun yaxshi yozish tezligi zarur.

## 1-Kun: Asoslarni O'rganish

Birinchi qadam - to'g'ri barmoq pozitsiyasini o'rganish. Har bir barmoq klaviaturaning ma'lum qismiga mas'ul:

- Chap qo'lning ko'rsatkich barmog'i: F va G tugmalari
- O'ng qo'lning ko'rsatkich barmog'i: J va H tugmalari
- Boshqa barmoqlar: O'z qatorlaridagi tugmalar

## 2-Kun: F va J Tugmalarini Topish

F va J tugmalarida kichik bo'rtiqlar bor. Bu sizga ko'rmasdan ham asosiy pozitsiyani topishga yordam beradi.

## 3-7 Kunlar: Kundalik Mashqlar

Har kuni 15-20 daqiqa mashq qiling:

1. Asosiy qator harflarini yozing (ASDF JKL;)
2. Yuqori qator harflarini qo'shing
3. Pastki qator harflarini mashq qiling
4. So'zlarni yozishni boshlang

## 8-10 Kunlar: Tezlikni Oshirish

Oxirgi kunlarda:

- To'g'ri matnlarni ko'chiring
- Vaqtni o'lchang
- Xatolarni kamaytiring
- Doimiy mashq qiling

## Muhim Maslahatlar

- Ekranga qarang, klaviaturaga emas
- Tez emas, to'g'ri yozishga e'tibor bering
- Muntazam mashq qiling
- Dam olishni unutmang

Ushbu usullarni qo'llasangiz, 10 kun ichida sezilarli natijaga erishishingiz mumkin!
      `
    },
    2: {
      title: "Ko'r Yozish: Boshlang'ich Qo'llanma",
      date: "2024-01-10",
      readTime: "8 daqiqa",
      content: `
# Ko'r Yozish: Boshlang'ich Qo'llanma

Ko'r yozish - bu klaviaturaga qaramasdan yozish ko'nikmasi. Bu ko'nikma sizning mahsuldorligingizni sezilarli darajada oshiradi.

## Ko'r Yozishning Afzalliklari

1. **Tezlik**: Klaviaturaga qarash kerak emas
2. **Samaradorlik**: Fikringizni to'g'ridan-to'g'ri yozasiz
3. **Qulay**: Ko'z charchamaydi
4. **Professional**: Ishda foydali ko'nikma

## Asosiy Qoidalar

### 1. To'g'ri O'tirish

- Tik o'tiring
- Oyoqlaringiz polda bo'lsin
- Qo'llaringiz erkin harakatlansin

### 2. Barmoq Pozitsiyasi

Har bir barmoq o'z tugmalaridan javobgar:

**Chap qo'l:**
- Kichik barmoq: A, Q, Z
- Nomsiz barmoq: S, W, X
- O'rta barmoq: D, E, C
- Ko'rsatkich: F, R, V, T, G, B

**O'ng qo'l:**
- Ko'rsatkich: J, U, M, Y, H, N
- O'rta barmoq: K, I, ,
- Nomsiz barmoq: L, O, .
- Kichik barmoq: ;, P, /

### 3. O'rganish Jarayoni

1. **Birinchi hafta**: Asosiy qator (ASDF JKL;)
2. **Ikkinchi hafta**: Yuqori qator (QWERT YUIOP)
3. **Uchinchi hafta**: Pastki qator (ZXCVB NM,.)
4. **To'rtinchi hafta**: Raqamlar va belgilar

## Mashq Qilish Usullari

- Kuniga 30 daqiqa mashq qiling
- Online mashq dasturlaridan foydalaning
- O'z xatolaringizni tahlil qiling
- Sekin boshlang, tezlikni asta-sekin oshiring

Sabr va muntazamlik muvaffaqiyatning kalitidir!
      `
    },
    3: {
      title: "Ergonomika: To'g'ri O'tirish va Yozish",
      date: "2024-01-05",
      readTime: "6 daqiqa",
      content: `
# Ergonomika: To'g'ri O'tirish va Yozish

Kompyuter bilan uzoq vaqt ishlash sog'ligingizga salbiy ta'sir ko'rsatishi mumkin. To'g'ri ergonomika bu muammolarni oldini oladi.

## To'g'ri O'tirish Pozitsiyasi

### Stul Sozlamalari

1. **Balandlik**: Oyoqlaringiz polda tekis turishi kerak
2. **Orqa tayanch**: Belingizni qo'llab-quvvatlashi kerak
3. **Qo'ltiq dayanchlari**: Elkalaringiz erkin bo'lishi kerak

### Monitor Pozitsiyasi

- Ko'z darajasida yoki biroz pastroq
- 50-70 sm masofada
- Yorug'lik to'g'ri kelmaydi

### Klaviatura va Sichqoncha

- Tirsak 90 daraja burchakda
- Bilaklaringiz tekis
- Klaviatura biroz qiyshiq

## Keng Tarqalgan Muammolar

### 1. Karpal Tunnel Sindromi

**Belgilar:**
- Qo'lda og'riq
- Titroq
- Kuchsizlik

**Oldini Olish:**
- To'g'ri bilak pozitsiyasi
- Muntazam tanaffuslar
- Qo'l mashqlari

### 2. Bo'yin va Elka Og'rig'i

**Sabablari:**
- Noto'g'ri monitor balandligi
- Tarang o'tirish
- Uzoq vaqt harakatsizlik

**Yechimlar:**
- Monitor balandligini sozlash
- Elkalarni bo'shashtirish
- Har soatda 5 daqiqa tanaffus

### 3. Ko'z Charchashi

**Oldini Olish:**
- 20-20-20 qoidasi (har 20 daqiqada 20 soniya 20 fut masofaga qarash)
- To'g'ri yoritish
- Monitor yorqinligini sozlash

## Foydali Mashqlar

### Barmoq va Bilak Mashqlari

1. Barmoqlarni cho'zish
2. Bilaklarni aylantirish
3. Qo'llarni silkitish

### Bo'yin va Elka Mashqlari

1. Bo'yinni asta aylantirish
2. Elkalarni ko'tarish va tushirish
3. Orqaga cho'zilish

## Tanaffuslar

- Har 30 daqiqada 2 daqiqa tanaffus
- Har soatda 5 daqiqa yurish
- Kuniga bir necha marta cho'zilish

Sog'ligingizni birinchi o'ringa qo'ying. To'g'ri ergonomika uzoq muddatli mahsuldorlikni ta'minlaydi!
      `
    }
  },
  en: {
    1: {
      title: "Improve Your Typing Speed in 10 Days",
      date: "2024-01-15",
      readTime: "5 min read",
      content: `
# Improve Your Typing Speed in 10 Days

Typing speed is a crucial skill in today's digital world. Whether you're working on a computer, writing emails, or simply expressing your thoughts, good typing speed is essential.

## Day 1: Learn the Basics

The first step is learning proper finger placement. Each finger is responsible for specific keys:

- Left index finger: F and G keys
- Right index finger: J and H keys
- Other fingers: Keys in their respective rows

## Day 2: Finding F and J Keys

The F and J keys have small bumps. This helps you find the home position without looking.

## Days 3-7: Daily Practice

Practice 15-20 minutes daily:

1. Type home row letters (ASDF JKL;)
2. Add top row letters
3. Practice bottom row letters
4. Start typing words

## Days 8-10: Increase Speed

In the final days:

- Copy real texts
- Time yourself
- Reduce errors
- Practice consistently

## Important Tips

- Look at the screen, not the keyboard
- Focus on accuracy, not speed
- Practice regularly
- Don't forget to take breaks

Following these methods, you can achieve noticeable results in 10 days!
      `
    },
    2: {
      title: "Touch Typing: A Beginner's Guide",
      date: "2024-01-10",
      readTime: "8 min read",
      content: `
# Touch Typing: A Beginner's Guide

Touch typing is the skill of typing without looking at the keyboard. This skill significantly increases your productivity.

## Benefits of Touch Typing

1. **Speed**: No need to look at the keyboard
2. **Efficiency**: Express your thoughts directly
3. **Comfortable**: Less eye strain
4. **Professional**: Useful skill at work

## Basic Rules

### 1. Proper Posture

- Sit upright
- Keep feet flat on floor
- Arms should move freely

### 2. Finger Placement

Each finger is responsible for specific keys:

**Left hand:**
- Pinky: A, Q, Z
- Ring: S, W, X
- Middle: D, E, C
- Index: F, R, V, T, G, B

**Right hand:**
- Index: J, U, M, Y, H, N
- Middle: K, I, ,
- Ring: L, O, .
- Pinky: ;, P, /

### 3. Learning Process

1. **Week 1**: Home row (ASDF JKL;)
2. **Week 2**: Top row (QWERT YUIOP)
3. **Week 3**: Bottom row (ZXCVB NM,.)
4. **Week 4**: Numbers and symbols

## Practice Methods

- Practice 30 minutes daily
- Use online practice programs
- Analyze your errors
- Start slow, gradually increase speed

Patience and consistency are keys to success!
      `
    },
    3: {
      title: "Ergonomics: Proper Posture for Typing",
      date: "2024-01-05",
      readTime: "6 min read",
      content: `
# Ergonomics: Proper Posture for Typing

Long hours of computer work can negatively impact your health. Proper ergonomics prevents these problems.

## Proper Sitting Position

### Chair Settings

1. **Height**: Feet should rest flat on floor
2. **Back support**: Should support your lower back
3. **Armrests**: Shoulders should be relaxed

### Monitor Position

- At eye level or slightly below
- 50-70 cm distance
- No glare on screen

### Keyboard and Mouse

- Elbows at 90-degree angle
- Wrists straight
- Keyboard slightly tilted

## Common Problems

### 1. Carpal Tunnel Syndrome

**Symptoms:**
- Hand pain
- Numbness
- Weakness

**Prevention:**
- Proper wrist position
- Regular breaks
- Hand exercises

### 2. Neck and Shoulder Pain

**Causes:**
- Incorrect monitor height
- Tense posture
- Long periods without movement

**Solutions:**
- Adjust monitor height
- Relax shoulders
- Take 5-minute break every hour

### 3. Eye Strain

**Prevention:**
- 20-20-20 rule (every 20 minutes, look 20 feet away for 20 seconds)
- Proper lighting
- Adjust monitor brightness

## Useful Exercises

### Finger and Wrist Exercises

1. Stretch fingers
2. Rotate wrists
3. Shake hands

### Neck and Shoulder Exercises

1. Gently rotate neck
2. Raise and lower shoulders
3. Stretch backwards

## Breaks

- 2-minute break every 30 minutes
- 5-minute walk every hour
- Stretch several times daily

Put your health first. Proper ergonomics ensures long-term productivity!
      `
    }
  },
  ru: {
    1: {
      title: "Улучшите Скорость Печати за 10 Дней",
      date: "2024-01-15",
      readTime: "5 мин чтения",
      content: `
# Улучшите Скорость Печати за 10 Дней

Скорость печати - это важный навык в современном цифровом мире. Будь то работа на компьютере, написание писем или просто выражение мыслей, хорошая скорость печати необходима.

## День 1: Изучите Основы

Первый шаг - изучение правильного положения пальцев. Каждый палец отвечает за определенные клавиши:

- Левый указательный палец: клавиши F и G
- Правый указательный палец: клавиши J и H
- Остальные пальцы: клавиши в соответствующих рядах

## День 2: Поиск Клавиш F и J

На клавишах F и J есть небольшие выступы. Это помогает найти исходное положение, не глядя.

## Дни 3-7: Ежедневная Практика

Практикуйтесь 15-20 минут ежедневно:

1. Печатайте буквы основного ряда (ФЫВА ОЛДЖ)
2. Добавьте буквы верхнего ряда
3. Практикуйте буквы нижнего ряда
4. Начните печатать слова

## Дни 8-10: Увеличение Скорости

В последние дни:

- Копируйте реальные тексты
- Засекайте время
- Сокращайте ошибки
- Практикуйтесь постоянно

## Важные Советы

- Смотрите на экран, а не на клавиатуру
- Сосредоточьтесь на точности, а не на скорости
- Практикуйтесь регулярно
- Не забывайте делать перерывы

Следуя этим методам, вы можете достичь заметных результатов за 10 дней!
      `
    },
    2: {
      title: "Слепая Печать: Руководство для Начинающих",
      date: "2024-01-10",
      readTime: "8 мин чтения",
      content: `
# Слепая Печать: Руководство для Начинающих

Слепая печать - это навык печати без взгляда на клавиатуру. Этот навык значительно повышает вашу продуктивность.

## Преимущества Слепой Печати

1. **Скорость**: Не нужно смотреть на клавиатуру
2. **Эффективность**: Выражайте мысли напрямую
3. **Комфорт**: Меньше напряжения глаз
4. **Профессионализм**: Полезный навык на работе

## Основные Правила

### 1. Правильная Осанка

- Сидите прямо
- Ноги на полу
- Руки свободно двигаются

### 2. Положение Пальцев

Каждый палец отвечает за определенные клавиши:

**Левая рука:**
- Мизинец: Ф, Й, Я
- Безымянный: Ы, Ц, Ч
- Средний: В, У, С
- Указательный: А, К, М, Е, П, И

**Правая рука:**
- Указательный: О, Г, Т, Н, Р, Ь
- Средний: Л, Ш, Б
- Безымянный: Д, Щ, Ю
- Мизинец: Ж, З, .

### 3. Процесс Обучения

1. **Неделя 1**: Основной ряд (ФЫВА ОЛДЖ)
2. **Неделя 2**: Верхний ряд
3. **Неделя 3**: Нижний ряд
4. **Неделя 4**: Цифры и символы

## Методы Практики

- Практикуйтесь 30 минут ежедневно
- Используйте онлайн-программы для практики
- Анализируйте свои ошибки
- Начните медленно, постепенно увеличивайте скорость

Терпение и последовательность - ключи к успеху!
      `
    },
    3: {
      title: "Эргономика: Правильная Осанка при Печати",
      date: "2024-01-05",
      readTime: "6 мин чтения",
      content: `
# Эргономика: Правильная Осанка при Печати

Долгие часы работы за компьютером могут негативно повлиять на ваше здоровье. Правильная эргономика предотвращает эти проблемы.

## Правильное Положение Сидя

### Настройки Стула

1. **Высота**: Ноги должны стоять на полу
2. **Поддержка спины**: Должна поддерживать нижнюю часть спины
3. **Подлокотники**: Плечи должны быть расслаблены

### Положение Монитора

- На уровне глаз или чуть ниже
- Расстояние 50-70 см
- Нет бликов на экране

### Клавиатура и Мышь

- Локти под углом 90 градусов
- Запястья прямые
- Клавиатура слегка наклонена

## Распространенные Проблемы

### 1. Синдром Карпального Канала

**Симптомы:**
- Боль в руке
- Онемение
- Слабость

**Профилактика:**
- Правильное положение запястья
- Регулярные перерывы
- Упражнения для рук

### 2. Боль в Шее и Плечах

**Причины:**
- Неправильная высота монитора
- Напряженная осанка
- Длительные периоды без движения

**Решения:**
- Отрегулируйте высоту монитора
- Расслабьте плечи
- Делайте 5-минутный перерыв каждый час

### 3. Усталость Глаз

**Профилактика:**
- Правило 20-20-20 (каждые 20 минут смотрите на 20 футов в течение 20 секунд)
- Правильное освещение
- Отрегулируйте яркость монитора

## Полезные Упражнения

### Упражнения для Пальцев и Запястий

1. Растяжка пальцев
2. Вращение запястий
3. Встряхивание рук

### Упражнения для Шеи и Плеч

1. Аккуратное вращение шеи
2. Поднятие и опускание плеч
3. Растяжка назад

## Перерывы

- 2-минутный перерыв каждые 30 минут
- 5-минутная прогулка каждый час
- Растяжка несколько раз в день

Поставьте здоровье на первое место. Правильная эргономика обеспечивает долгосрочную продуктивность!
      `
    }
  }
};

const pageContent = {
  uz: {
    backToBlog: "Maqolalarga qaytish",
    backToHome: "Bosh sahifaga qaytish"
  },
  en: {
    backToBlog: "Back to Articles",
    backToHome: "Back to Home"
  },
  ru: {
    backToBlog: "Вернуться к статьям",
    backToHome: "Вернуться на главную"
  }
};

export default function BlogArticle() {
  const params = useParams();
  const lang = (params.lang as Language) || "uz";
  const articleId = parseInt(params.id as string);
  const article = blogArticles[lang][articleId as keyof typeof blogArticles[typeof lang]];

  if (!article) {
    notFound();
  }

  const t = pageContent[lang];

  return (
    <main className="min-h-[calc(100vh-73px)]">
      <article className="max-w-4xl mx-auto px-6 py-20">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-8 text-sm">
          <Link
            href={`/${lang}/blog`}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ← {t.backToBlog}
          </Link>
          <Link
            href={`/${lang}`}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {t.backToHome}
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-12 space-y-4 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <time>{article.date}</time>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          {article.content.split('\n').map((paragraph, index) => {
            if (paragraph.trim() === '') return null;

            if (paragraph.startsWith('# ')) {
              return (
                <h1 key={index} className="text-4xl font-bold mt-12 mb-6">
                  {paragraph.replace('# ', '')}
                </h1>
              );
            }

            if (paragraph.startsWith('## ')) {
              return (
                <h2 key={index} className="text-3xl font-semibold mt-10 mb-4">
                  {paragraph.replace('## ', '')}
                </h2>
              );
            }

            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={index} className="text-2xl font-semibold mt-8 mb-3">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }

            if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
              return (
                <p key={index} className="font-semibold text-lg mt-4 mb-2">
                  {paragraph.replace(/\*\*/g, '')}
                </p>
              );
            }

            if (paragraph.match(/^\d+\./)) {
              return (
                <li key={index} className="text-lg leading-relaxed ml-6 my-2">
                  {paragraph.replace(/^\d+\.\s*/, '')}
                </li>
              );
            }

            if (paragraph.startsWith('-')) {
              return (
                <li key={index} className="text-lg leading-relaxed ml-6 my-2 list-disc">
                  {paragraph.replace(/^-\s*/, '')}
                </li>
              );
            }

            return (
              <p key={index} className="text-lg leading-relaxed my-4 text-muted-foreground">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Back to Blog */}
        <div className="mt-16 pt-8 border-t border-border">
          <Link
            href={`/${lang}/blog`}
            className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:border-foreground dark:hover:border-white hover:bg-accent/50 transition-all duration-200"
          >
            ← {t.backToBlog}
          </Link>
        </div>
      </article>
    </main>
  );
}
