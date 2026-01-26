import type { Language, Difficulty } from "@/types";

// Text data for typing tests - organized by language and difficulty
// Each difficulty has 5 topics, randomly selected during tests
const sampleTexts: Record<Language, Record<Difficulty, string[]>> = {
  uz: {
    easy: [      // Sog'liq
      "har kun ertalab tur va suv ich tana uchun suv juda kerak agar suv kam bo'lsa tana toliq bo'ladi bosh ham og'rib qoladi shu uchun har soat bir oz suv ichish kerak suv toza bo'lsin iliq bo'lsa ham yaxshi bo'ladi tana suv bilan ishlaydi qon ham suv bilan oqadi miya ham suv talab qiladi sog'lom bo'lish uchun suv ichish odat bo'lsin har kun sakkiz stakan ichish kifoya",
      // O'qish
      "kitob o'qish miyani o'stiradi har kun bir oz o'qish kerak kitob yangi fikr beradi bilim oshadi tez yozish ham kitob bilan bog'liq o'qigan odam ko'p biladi so'z boyligi oshadi kitob do'st kabi bo'ladi yolg'iz qolsang kitob bor u senga yordam beradi yangi dunyo ochadi kitob o'qish odat bo'lsin har kuni o'n daqiqa ham kifoya",
      // Ish va mehnat
      "ish qilish hayotni yaxshi qiladi har kun oz oz ish qilsang katta ish bo'ladi sabr bilan mehnat qilgan odam muvaffaq bo'ladi ish qiyin bo'lsa ham davom et erta meva hosil bo'ladi dangasa odam hech nima qila olmaydi mehnat kuch beradi ruh ham kuchli bo'ladi ishla va umid qilma ishla va natija ko'r ishlagan qo'l barakali bo'ladi",
      // Tabiat
      "tabiat bizni o'rab turadi daraxt havo beradi suv hayot beradi yer oziq beradi tabiatni asra iflos qilma chiqindi tashlama tabiat toza bo'lsa biz ham sog'lom bo'lamiz qush sayraydi gul ochadi havo toza bo'ladi tabiat go'zal joy uni saqla kelajak avlod uchun ham tabiat kerak har kun tabiatga chiq dam ol nafas ol",
      // Odatlar
      "yaxshi odat hayotni oson qiladi har kun bir xil vaqtda tur bir xil vaqtda yot tana odat bilan ishlaydi agar tartib bo'lsa tana ham sog'lom bo'ladi yomon odat esa zararli agar yomon odat bo'lsa uni tashla yaxshi odat qo'sh bir oy davom etsa odat bo'ladi sabr bilan davom et natija albatta keladi yaxshi odat boylik",
],
    medium: [
      // Sog'liq va sport
      "Sog'lom Hayot uchun har kuni Jismoniy Mashqlar qilish muhim, chunki Tana Harakatga muhtoj. Agar Muntazam Sport bilan shug'ullansangiz, Yurak kuchli bo'ladi va Energiya oshadi. Ertalabki Yugurish yoki Sayr Kayfiyatni yaxshilaydi, Stress kamayadi. Mashqdan keyin Tana dam oladi va Mushaklar tiklanadi. Sport faqat Jism uchun emas, Ruh uchun ham foydali. Har hafta kamida uch marta Mashq qiling, Natija sezilarli bo'ladi.",
      // Ta'lim va o'rganish
      "O'rganish Jarayoni butun Umr davom etadi, chunki Bilim chegarasiz. Har kuni yangi Narsa o'rgansangiz, Miya faol ishlaydi. Kitob o'qish, Video ko'rish yoki Amaliyot qilish orqali Bilim oshadi. Muhimi, o'rgangan Narsani Takrorlash kerak, chunki Takror Xotiraga yordam beradi. O'qituvchi yoki Murabbiy Yo'l ko'rsatadi, lekin Mehnat o'zingizdan. Ta'lim Kelajakka Sarmoya, uni Qadrlab o'rganing.",
      // Vaqtni boshqarish
      "Vaqt eng qimmat Boylik, chunki uni qaytarib bo'lmaydi. Har kuni Rejali ishlasangiz, Vaqt tejab qolinadi. Muhim Ishlarni avval bajaring, Kichik Ishlar keyin. Telefon va Ijtimoiy Tarmoqlar ko'p Vaqt oladi, ularni Chegaralang. Ertalab eng Samarali Vaqt, murakkab Ishlarni o'shanda qiling. Kechqurun esa Dam oling va Ertangi Kunga tayyorlaning. Vaqtni to'g'ri Ishlatsangiz, Hayot Tartibli bo'ladi.",
      // Maqsad qo'yish
      "Maqsadsiz Hayot yo'nalishsiz Kemaga o'xshaydi. Aniq Maqsad qo'ying va har kuni unga qarab yuring. Katta Maqsadni kichik Qismlarga bo'ling, shunda osonroq. Har hafta Natijani tekshiring, agar Orqada qolsangiz, Tezlating. Maqsad yozilgan bo'lsin, ko'z oldingizda tursin. Qiyinchilik bo'lsa ham to'xtamang, chunki Sabr Muvaffaqiyat keltiradi. Maqsadga yetgan Inson o'ziga ishonadi va yangi Cho'qqilarni egallaydi.",
      // Sog'lom ovqatlanish
      "To'g'ri Ovqatlanish Sog'liq Asosi, chunki Tana Ozuqa bilan ishlaydi. Ko'proq Sabzavot va Meva iste'mol qiling, ular Vitamin beradi. Tez Taom va Shirinlikdan saqlaning, ular Zararli. Suv ko'p iching, Choy va Qahva ham bo'lishi mumkin, lekin Cheklangan. Ovqatni Sekin yeng, Chaynab yutish Hazm uchun yaxshi. Kechqurun og'ir Ovqat yemang, Uxlash qiyin bo'ladi. Sog'lom Ovqat Energiya beradi va Kasallikdan saqlaydi.",
    ],
    hard: [
      // Produktivlik
      "\"DeepWork\" Metodologiyasi Intellektual Mehnatni Samarali Tashkil etishga yo'naltirilgan, chunki Zamonaviy Dunyoda Diqqatni Jamlash tobora Qiyinlashmoqda. Tadqiqotlarga ko'ra, Multitasking Samaradorlikni 40% ga kamaytiradi. Shuning uchun 2 soatlik Fokuslanish Sessiyalari, \"Pomodoro\" Texnikasi va Raqamli Detoks kabi Strategiyalar Ahamiyatga ega. Natijadorlikni Oshirish uchun WPM ko'rsatkichini Kuzatish va Haftalik Retrospektiva o'tkazish tavsiya etiladi.",
      // Sun'iy intellekt
      "\"ArtificialIntelligence\" Texnologiyasi Zamonaviy Innovatsiyalarning Asosiy Yo'nalishi hisoblanadi. Machine Learning va Neural Networks orqali Kompyuterlar Murakkab Masalalarni hal etishga Qodir. OpenAI, Google va boshqa Gigantlar bu Sohada 10 milliard Dollardan ortiq Sarmoya kiritmoqda. AI Tibbiyot, Moliya va UX Dizaynida Inqilobiy O'zgarishlar yaratmoqda, ammo Etik Muammolar ham Muhokama qilinmoqda.",
      // Moliyaviy savodxonlik
      "\"FinancialLiteracy\" Shaxsiy Moliyani Boshqarish Mahorati sifatida Zamonaviy Hayotning Ajralmas Qismidir. Byudjetlashtirish, Investitsiya va Passiv Daromad Tushunchalari har bir Inson uchun Muhim. Mutaxassislar Daromadning 20% ini Jamg'arish va 3-6 oylik Zaxira Fondini Tavsiya qiladi. Compound Interest Prinsipi orqali Uzoq Muddatda Kapital Sezilarli O'sadi.",
      // Psixologiya
      "\"EmotionalIntelligence\" Tushunchasi Shaxslararo Munosabatlar va Kasbiy Muvaffaqiyatda Muhim Rol o'ynaydi. EQ ko'rsatkichi IQ dan ko'ra Hayotiy Natijalarni Yaxshiroq Bashorat qiladi. O'z-o'zini Anglash, Empatiya va Stressni Boshqarish kabi Komponentlar Rivojlantirilishi mumkin. Tadqiqotlar Yuqori EQ ga ega Insonlar 58% ko'proq Daromad olishini Ko'rsatadi.",
      // Raqamli marketing
      "\"DigitalMarketing\" Strategiyasi Zamonaviy Biznesning Asosiy Tarkibiy Qismi hisoblanadi. SEO, SMM va Content Marketing orqali Brendlar Millionlab Auditoriyaga yetib boradi. A/B Testing va Analytics vositalari Kampaniya Samaradorligini 3x ga Oshirishi mumkin. ROI ni Hisoblash va KPI larni Kuzatish Professional Marketerning Asosiy Vazifasi, chunki Data-Driven Qarorlar Muvaffaqiyatni Ta'minlaydi.",
    ],
  },
  en: {
    easy: [
      // Health
      "water is life and you need it each day your body needs water to work well if you drink less you feel tired and weak try to drink eight cups a day it helps your skin your brain and your heart water keeps you fresh and full of life make it a habit to drink more clean water is best for your body stay well and drink water every day",
      // Learning
      "to learn is to grow and we can learn each day read a book or watch a video that helps you know more your brain loves new facts and ideas when you learn you get smart and wise take notes and review them later this helps you keep what you learn make time to study even if just a bit each day you will see big gains over time",
      // Work habits
      "work is good for your mind and soul when you work hard you feel proud of what you do start your day with a plan and follow it take small steps and soon big things come your way rest when you need to but do not give up keep your space clean and your mind clear work smart not just hard and life gets easier every task done is a win for you",
      // Nature
      "nature is all around us and it gives us life trees give us air to breathe and shade to rest water flows in rivers and gives life to all spend time outside and feel the fresh air walk in a park or sit by a lake nature helps you relax and feel at peace take care of our earth and keep it clean for us and for those who come after us",
      // Habits
      "good habits make life easy and fun wake up at the same time each day and go to bed on time too eat well and move your body read a bit and rest when tired these small acts add up over time bad habits pull you down but you can change them one step at a time start today and keep going soon you will feel the change in your life",
    ],
    medium: [
      // Health and fitness
      "Physical Exercise is essential for a Healthy Lifestyle, because the Body needs regular Movement to stay strong. When you Exercise consistently, your Heart becomes stronger and Energy levels rise. Morning Runs or Evening Walks improve your Mood and reduce Stress. After working out, allow your Body to Rest and recover properly. Fitness benefits both Physical and Mental Health. Try to Exercise at least three times per Week, and you will notice significant Improvements in your overall Wellbeing.",
      // Education
      "Learning is a Lifelong Journey that never truly ends. Every day presents Opportunities to gain new Knowledge and Skills. Reading Books, watching Educational Videos, or practicing Hands-on Activities all contribute to Growth. The key is to Review what you learn, because Repetition strengthens Memory. Teachers and Mentors can guide you, but the real Effort must come from within. Education is an Investment in your Future, so value it and pursue it with Dedication.",
      // Time management
      "Time is our most Valuable Resource, because once it passes, we cannot get it back. Planning your Day carefully helps you accomplish more Tasks efficiently. Prioritize Important Work first, and handle smaller Tasks afterward. Social Media and Digital Distractions consume significant Time, so set clear Boundaries. Mornings are often the most Productive Hours for complex Work. Evenings should be reserved for Rest and Preparation for the next Day.",
      // Goal setting
      "Without clear Goals, Life can feel like a Ship without Direction. Set Specific Objectives and work toward them Daily. Break large Goals into smaller Milestones to make Progress manageable. Review your Results weekly, and adjust your Approach if needed. Write down your Goals and keep them Visible as constant Reminders. Persistence through Challenges leads to Success. Those who achieve their Goals develop Confidence and continue reaching for greater Heights.",
      // Nutrition
      "Proper Nutrition forms the Foundation of good Health, because the Body relies on Quality Fuel to function well. Consume plenty of Vegetables and Fruits for essential Vitamins and Minerals. Avoid excessive Fast Food and Sugary Snacks, as they harm your Health. Drink adequate Water throughout the Day. Eat slowly and chew thoroughly for better Digestion. Avoid heavy Meals before Bedtime, as they disrupt Sleep. Healthy Eating provides Energy and prevents Disease.",
    ],
    hard: [
      // Productivity
      "\"DeepWork\" Methodology focuses on Optimizing Intellectual Labor in an increasingly Distracted World. Research indicates that Multitasking reduces Productivity by approximately 40%, making Focused Sessions essential. Implementing 2-hour Concentration Blocks, utilizing the \"Pomodoro\" Technique, and practicing Digital Detox are Strategies proven to enhance Output. Tracking WPM metrics and conducting Weekly Retrospectives help Professionals continuously improve their Workflow Efficiency.",
      // Artificial intelligence
      "\"ArtificialIntelligence\" Technology represents the Cornerstone of Contemporary Innovation. Through Machine Learning and Neural Networks, Computers can solve increasingly Complex Problems. Industry Giants including OpenAI and Google have invested over 10 billion Dollars in AI Development. These Technologies are creating Revolutionary Changes in Healthcare, Finance, and UX Design, while simultaneously raising important Ethical Considerations that Society must address.",
      // Financial literacy
      "\"FinancialLiteracy\" encompasses the essential Skills required for effective Personal Finance Management. Understanding Budgeting, Investment Strategies, and Passive Income concepts is Crucial for everyone. Financial Experts recommend saving 20% of Income and maintaining 3-6 months of Emergency Reserves. The Compound Interest Principle demonstrates how Capital grows Significantly over Extended Timeframes when properly Managed.",
      // Psychology
      "\"EmotionalIntelligence\" plays a Critical Role in Interpersonal Relationships and Professional Achievement. Studies suggest EQ predicts Life Outcomes more Accurately than traditional IQ measurements. Components including Self-Awareness, Empathy, and Stress Management can be Systematically Developed. Research demonstrates that Individuals with higher EQ earn approximately 58% more Income compared to their Lower-scoring Counterparts.",
      // Digital marketing
      "\"DigitalMarketing\" Strategy constitutes a Fundamental Component of Contemporary Business Operations. Through SEO, SMM, and Content Marketing, Brands reach Millions of potential Customers globally. A/B Testing and Analytics Tools can improve Campaign Effectiveness by 3x or more. Calculating ROI and monitoring KPIs represents the Core Responsibility of Professional Marketers, as Data-Driven Decisions ultimately determine Success.",
    ],
  },
  ru: {
    easy: [
      // Здоровье
      "вода это жизнь и тело нужда в ней каждый день пей воду чтобы быть бодрым и сильным если воды мало ты устаешь и слабеешь восемь стаканов в день это норма для всех вода помогает коже мозгу и сердцу она делает тебя свежим и полным сил пей чистую воду каждый день это простой путь к здоровью и силе",
      // Учеба
      "учиться значит расти и мы можем расти всю жизнь читай книги смотри видео узнавай новое каждый день твой мозг любит новые факты и идеи когда учишься ты становишься умнее записывай важное и повторяй позже это помогает запомнить все что узнал учись хотя бы немного каждый день со временем ты увидишь большой результат",
      // Работа
      "работа это благо для ума и души когда трудишься чувствуешь гордость за себя начни день с плана и следуй ему делай малые шаги и большие дела придут отдыхай когда надо но не сдавайся держи место чистым а мысли ясными работай умно а не только много каждое дело это победа для тебя",
      // Природа
      "природа вокруг нас и она дает нам жизнь деревья дают воздух и тень вода течет в реках и поит все живое проводи время на улице дыши свежим воздухом гуляй в парке или сиди у озера природа помогает расслабиться и найти покой береги землю и держи ее чистой для нас и для тех кто придет после",
      // Привычки
      "хорошие привычки делают жизнь легче вставай в одно время каждый день и ложись вовремя ешь полезную еду и двигай телом читай немного и отдыхай когда устал эти малые дела складываются со временем плохие привычки тянут вниз но ты можешь их изменить шаг за шагом начни сегодня и продолжай скоро ты почувствуешь перемены",
    ],
    medium: [
      // Здоровье и спорт
      "Физические Упражнения необходимы для Здорового Образа Жизни, потому что Тело нуждается в регулярном Движении. Когда вы занимаетесь Спортом постоянно, Сердце становится сильнее и Энергия растет. Утренние Пробежки или Вечерние Прогулки улучшают Настроение и снижают Стресс. После Тренировки позвольте Телу отдохнуть и восстановиться. Фитнес полезен как для Тела, так и для Духа. Занимайтесь минимум три раза в Неделю, и вы заметите положительные Изменения.",
      // Образование
      "Обучение это Путь длиною в Жизнь, который никогда не заканчивается. Каждый День дает Возможности для получения новых Знаний. Чтение Книг, просмотр Видео или Практика помогают расти. Главное это повторять изученное, потому что Повторение укрепляет Память. Учителя могут направлять, но основной Труд должен исходить от вас. Образование это Инвестиция в Будущее, цените его и стремитесь к Знаниям.",
      // Управление временем
      "Время это наш самый Ценный Ресурс, потому что его нельзя вернуть. Планирование Дня помогает достигать больше Целей эффективно. Приоритизируйте Важные Задачи, а мелкие оставьте на потом. Социальные Сети отнимают много Времени, поэтому установите Границы. Утро часто самое Продуктивное Время для сложной Работы. Вечер предназначен для Отдыха и Подготовки к следующему Дню.",
      // Постановка целей
      "Без четких Целей Жизнь похожа на Корабль без Направления. Ставьте конкретные Задачи и работайте над ними каждый День. Разбивайте большие Цели на маленькие Этапы для удобства. Проверяйте Результаты еженедельно и корректируйте Подход. Записывайте Цели и держите их на виду как Напоминание. Упорство через Трудности ведет к Успеху. Те кто достигает Целей обретают Уверенность и покоряют новые Вершины.",
      // Питание
      "Правильное Питание это Основа хорошего Здоровья, потому что Тело работает на качественном Топливе. Употребляйте больше Овощей и Фруктов для получения Витаминов. Избегайте Фастфуда и Сладостей, они вредят Здоровью. Пейте достаточно Воды в течение Дня. Ешьте медленно и тщательно пережевывайте для лучшего Пищеварения. Избегайте тяжелой Еды перед Сном. Здоровое Питание дает Энергию и предотвращает Болезни.",
    ],
    hard: [
        // Продуктивность
      "\"ГлубокаяРабота\" Методология направлена на Оптимизацию Интеллектуального Труда в условиях постоянных Отвлечений. Исследования показывают, что Многозадачность снижает Продуктивность на 40%. Внедрение 2-часовых Сессий Концентрации, использование Техники \"Помодоро\" и практика Цифрового Детокса доказали свою Эффективность. Отслеживание ПоказателейСкоростиПечати и проведение Еженедельных Ретроспектив помогают Специалистам постоянно улучшать Рабочие Процессы.",
      // Искусственный интеллект
      "\"ИскусственныйИнтеллект\" Технология представляет собой Основу Современных Инноваций. Благодаря МашинномуОбучению и НейроннымСетям Компьютеры решают все более Сложные Задачи. Гиганты Индустрии включая ОупенАйАй и Гугл инвестировали более 10 миллиардов Долларов в развитие ИИ. Эти Технологии создают Революционные Изменения в Медицине, Финансах и ПользовательскомДизайне, одновременно поднимая важные Этические Вопросы.",
      // Финансовая грамотность
      "\"ФинансоваяГрамотность\" включает Навыки необходимые для эффективного Управления Личными Финансами. Понимание Бюджетирования, Инвестиционных Стратегий и Пассивного Дохода Критически важно. Эксперты рекомендуют откладывать 20% Дохода и поддерживать Резервный Фонд на 3-6 месяцев. Принцип Сложного Процента демонстрирует как Капитал значительно Растет в Долгосрочной Перспективе.",
      // Психология
      "\"ЭмоциональныйИнтеллект\" играет Ключевую Роль в Межличностных Отношениях и Профессиональных Достижениях. Исследования показывают что ЭмоциональныйКоэффициент предсказывает Жизненные Результаты точнее чем традиционный ИнтеллектуальныйКоэффициент. Компоненты включая Самосознание, Эмпатию и Управление Стрессом можно Систематически Развивать. Данные показывают что Люди с высоким ЭмоциональнымКоэффициентом зарабатывают примерно на 58% больше своих Коллег.",
      // Цифровой маркетинг
      "\"ЦифровойМаркетинг\" Стратегия является Фундаментальным Компонентом Современного Бизнеса. Через ПоисковуюОптимизацию, МаркетингВСоцсетях и КонтентМаркетинг Бренды достигают Миллионов потенциальных Клиентов. СплитТестирование и Аналитика могут повысить Эффективность Кампаний в 3 раза. Расчет ОкупаемостиИнвестиций и мониторинг КлючевыхПоказателейЭффективности составляют Основную Задачу Профессиональных Маркетологов, поскольку РешенияОснованныеНаДанных определяют Успех.",
],
  },
};

/**
 * Get test text based on language and difficulty
 * For word-based tests, returns enough words to meet the requirement
 * For time-based tests, returns a long enough text
 */
export function getTestText(
  language: Language,
  difficulty: Difficulty,
  isWordBased: boolean,
  targetCount: number
): string {
  const texts = sampleTexts[language][difficulty];
  // Randomly select one topic from the array
  const randomIndex = Math.floor(Math.random() * texts.length);
  const baseText = texts[randomIndex];

  console.log(`[getTestText] Language: ${language}, Difficulty: ${difficulty}, Topic index: ${randomIndex}/${texts.length}`);

  if (isWordBased) {
    // For word-based tests, repeat text until we have enough words
    const words = baseText.split(/\s+/);
    const requiredWords: string[] = [];

    while (requiredWords.length < targetCount) {
      requiredWords.push(...words);
    }

    return requiredWords.slice(0, targetCount).join(" ");
  } else {
    // For time-based tests, repeat text to ensure there's enough
    // Average typing speed is ~40 WPM, so for 60s we need ~40 words minimum
    const estimatedWords = Math.ceil((targetCount / 60) * 50); // 50 WPM estimate
    const words = baseText.split(/\s+/);
    const requiredWords: string[] = [];

    while (requiredWords.length < estimatedWords) {
      requiredWords.push(...words);
    }

    return requiredWords.join(" ");
  }
}
