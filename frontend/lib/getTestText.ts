import type { Language, Difficulty } from "@/types";

// Temporary text data - will be moved to database later
const sampleTexts: Record<Language, Record<Difficulty, string[]>> = {
  uz: {
    easy: [
      "Bugun havo juda chiroyli. Men bog'da sayr qildim. Gullalar juda chiroyli edi. Qushlar quvnoq sayrashdi. Bahor keldi.",
      "Kun juda issiq edi. Bulutlar osmonda suzib yurardi. Shamol esib turardi. Daraxtlar hilpiramoqda. Qushlar uchib yurishardi.",
      "Men kitob o'qishni yaxshi ko'raman. Har kuni yangi narsalar o'rganaman. Bilim olish juda muhim. Bu hayotda yordam beradi.",
    ],
    medium: [
      "O'zbekiston go'zal va boy tabiiy boylikka ega mamlakat. Bu yerda do'stona va mehmondo'st xalq yashaydi. Tarixiy yodgorliklar va zamonaviy binolar bir-birini to'ldiradi.",
      "Toshkent shahrida ko'plab universitеtlar va maktablar mavjud. Yoshlar bu yеrda sifatli ta'lim olish imkoniyatiga ega. Ilm-fan va madaniyat rivojlanmoqda.",
      "Sport insonning sog'lig'i uchun juda foydali. Har kuni jismoniy mashqlar qilish zarur. Bu immunitetni mustahkamlaydi va kayfiyatni yaxshilaydi.",
    ],
    hard: [
      "Fan-texnika taraqqiyoti jamiyat hayotining barcha jabhalarida o'z aksini topmoqda. Zamonaviy kommunikatsiya vositalari odamlar o'rtasidagi masofani qisqartirmoqda va bilim almashish imkoniyatlarini kengaytirmoqda.",
      "Axborot texnologiyalari insoniyat taraqqiyotida muhim rol o'ynamoqda. Sun'iy intellekt va mashinali o'qitish sohalari tez rivojlanmoqda. Bu yangi imkoniyatlar yaratmoqda va kelajakni o'zgartirmoqda.",
      "Ekologiya muammolari butun dunyo bo'yicha katta e'tiborni talab qilmoqda. Iqlim o'zgarishi va atrof-muhit ifloslanishi hayotimizga ta'sir ko'rsatmoqda. Barcha davlatlar birgalikda hal qilish usullarini qidirmoqda.",
    ],
  },
  en: {
    easy: [
      "The sun is shining bright today. Birds are singing in the trees. I love this beautiful weather. Spring is finally here.",
      "The sky is very blue today. Clouds are floating above. I can hear birds singing. The weather is perfect for a walk.",
      "I like to read books every day. Learning new things is fun. Knowledge is very important. It helps us grow and improve.",
    ],
    medium: [
      "Technology has changed the way we communicate with each other. Modern devices make it easier to stay connected with friends and family around the world.",
      "Exercise is very important for maintaining good health. Regular physical activity strengthens the body and improves mental wellbeing. It also helps reduce stress and anxiety.",
      "Education plays a crucial role in personal development. Schools and universities provide knowledge and skills. Learning never stops and continues throughout life.",
    ],
    hard: [
      "The advancement of artificial intelligence and machine learning has revolutionized various industries, from healthcare to finance, enabling unprecedented levels of automation and data analysis capabilities.",
      "Climate change represents one of the most significant challenges facing humanity today. Global cooperation is essential to develop sustainable solutions and mitigate environmental damage for future generations.",
      "Cybersecurity has become increasingly important in our digital age. Organizations must implement robust security measures to protect sensitive data from sophisticated threats and maintain user trust in online systems.",
    ],
  },
  ru: {
    easy: [
      "Сегодня хорошая погода. Светит яркое солнце. Птицы поют на деревьях. Наконец пришла весна. Я очень рад этому.",
      "Небо очень голубое сегодня. Облака плывут высоко. Я слышу пение птиц. Погода идеальная для прогулки.",
      "Я люблю читать книги каждый день. Учиться новому очень интересно. Знания очень важны. Они помогают нам расти.",
    ],
    medium: [
      "Технологии изменили способ нашего общения друг с другом. Современные устройства облегчают поддержание связи с друзьями и семьей по всему миру.",
      "Физические упражнения очень важны для здоровья. Регулярная активность укрепляет тело и улучшает самочувствие. Это помогает снизить стресс и тревогу.",
      "Образование играет важную роль в развитии личности. Школы и университеты дают знания и навыки. Обучение продолжается на протяжении всей жизни.",
    ],
    hard: [
      "Развитие искусственного интеллекта и машинного обучения революционизировало различные отрасли промышленности, от здравоохранения до финансов, обеспечивая беспрецедентный уровень автоматизации и возможностей анализа данных.",
      "Изменение климата представляет собой одну из самых серьезных проблем, стоящих перед человечеством сегодня. Глобальное сотрудничество необходимо для разработки устойчивых решений и смягчения экологического ущерба для будущих поколений.",
      "Кибербезопасность становится все более важной в нашу цифровую эпоху. Организации должны внедрять надежные меры безопасности для защиты конфиденциальных данных от сложных угроз и поддержания доверия пользователей к онлайн-системам.",
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
  const baseText = texts.join(" ");

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
