import type { Language, Difficulty } from "@/types";
import { topicTexts } from "@/data/wordpacks";

// Text data for typing tests - organized by language and difficulty
// Each difficulty has 10 topics, randomly selected during tests
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
      // Uyqu
      "yaxshi uyqu sog'liqning asosi har kun vaqtida yotish va vaqtida turish kerak agar kam uxlasang tana toliq bo'ladi miya yaxshi ishlamaydi diqqat pasayadi yotishdan oldin telefonni qo'y kitob o'qi yoki dam ol xona qorong'i va salqin bo'lsin uyqu yetti yoki sakkiz soat bo'lsin oldidan ko'p ovqatlanma chala uxlash zararli yaxshi uyqu ertangi kunga kuch beradi",
      // Do'stlik
      "do'st hayotda eng qimmat boylik yaxshi do'st quvonchda quvonadi qayg'uda yordam beradi do'stga yolg'on gapirma vada bersang bajar uni hurmat qil va tinglashga harakat qil agar do'st xato qilsa dushmanga aylanma to'g'ri so'z ayt yaxshilik tila do'stlik yillar bilan chuqurlashadi yangi do'st topish oson eski do'st topish qiyin shu uchun har bir do'stni e'zoz",
      // Oila
      "oila eng qadrli joy uy ichida sevgi va g'amxo'rlik bo'lsin ota va ona bolasiga vaqt ajratsin gaplashsin tinglasin ovqat birga yeyilsin har kuni qanday o'tganini so'rang yomon kun bo'lsa yordam bering ko'mak qiling oilada hurmat va sabr bo'lsin yangi avlod oiladan o'rganadi shu uchun namuna ko'rsat oila kuchli bo'lsa hayot ham kuchli bo'ladi har bir kun uchun shukur",
      // Sport
      "sport tana va aqlni mustahkamlaydi har kun bir oz harakat qilish kerak yugurish piyoda yurish yoki suzish foydali sport stress kamaytiradi kayfiyatni yaxshilaydi tana sog'lom bo'lsa ish ham yaxshi yurishadi sportni odat qilib har kun davom et yarim soat ham kifoya kuchli mushak va chidamli yurak shu mashqlardan keladi yangi kun uchun energiya beradi sportga vaqt ajrating",
      // Sayohat
      "sayohat dunyoni ko'rishning eng yaxshi yo'li yangi joyga borsang yangi narsa o'rganasan tabiat ko'r odamlar bilan tanish ovqatini ta'tib ko'r har shahar va qishloqning o'z qiziqligi bor sayohat oldin reja tuz kerakli narsalarni ol pul tejab harajat qil rasmga ol esda saqlash uchun til bilmasang ham qo'l harakat bilan gaplashish mumkin sayohat fikrni ochadi qalbni yangilaydi",
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
      // Texnologiya
      "Zamonaviy Texnologiya Hayotni Sezilarli darajada o'zgartirdi. Smartfon va Internet orqali biz bir necha Soniyada Ma'lumot olamiz, do'stlar bilan Aloqa qilamiz va yangi narsa O'rganamiz. Onlayn Kurslar Uydan Turib Bilim olish imkonini berdi. Lekin Ekran oldida ko'p o'tirish Salomatlikka Zarar yetkazadi. Texnologiyadan Foydali Maqsadlarda Foydalansangiz, vaqt va Kuch tejaladi. Doimo Yangi Vositalarni o'rganib boring.",
      // Til o'rganish
      "Yangi Til O'rganish Sabr va Tartib talab qiladigan Jarayon. Har kuni kamida o'n Daqiqa Mashq qilsangiz, So'z Boyligi sezilarli darajada oshadi. Tilni Eshitish, O'qish, Gapirish va Yozish to'rtta muhim Ko'nikma birga rivojlanishi kerak. Mahalliy So'zlovchilar bilan Suhbatlashish eng tezkor Yo'l. Filmlar va Qo'shiqlar orqali ham o'rganish Foydali. Doimiy Mashq orqali siz albatta Maqsadingizga erishasiz.",
      // Stress kamaytirish
      "Zamonaviy Hayotda Stress muqarrar Hodisa, ammo uni kamaytirish mumkin. Chuqur Nafas Olish va Meditatsiya Asab Tizimini tinchlantiradi. Tabiatda Sayr qilish va Quyosh Nuri Kayfiyatni yaxshilaydi. Muammoni Qog'ozga yozib chiqsangiz, u kichikroq ko'rinadi. Yetarli Uyqu va Sog'lom Ovqat Stress Gormonlarini kamaytiradi. Yaqinlar bilan Suhbat Qalbni yengillashtiradi. Sport bilan shug'ullanish ham Tashvishni kamaytiradigan eng samarali Usuldir.",
      // Yangi ko'nikmalar
      "Yangi Ko'nikma egallash Shaxsiy Rivojlanishning eng muhim Qismi. Har bir o'rgangan Mahorat sizga yangi Imkoniyatlar yaratadi. Boshlang'ich Bosqichda Sabr juda muhim, chunki birinchi Natijalar tezda ko'rinmaydi. Internetda Bepul Darslar va Video Qo'llanmalar mo'l, faqat izlang. Har kuni atigi yarim Soat Mashq qilsangiz, oy ichida sezilarli Taraqqiyot bo'ladi. Yangi Mahorat Karyera Imkoniyatlarini ham kengaytiradi va Hayotni boyitadi.",
      // Pul tejash
      "Pulni To'g'ri Boshqarish Sog'lom Hayotning Asosi hisoblanadi. Har Oy Daromadingizning kamida o'n Foizini Jamg'arish odatga aylantiring. Keraksiz Xaridlardan saqlaning va shoshilinch Qarorlardan voz keching. Xarajatlaringizni yozib boring, shunda Pul qaerga ketayotganini bilasiz. Xaridga Ro'yxat tuzib chiqing, bozorda faqat shu Ro'yxat asosida xarid qiling. Zaxira Fond yaratish Moliyaviy Erkinlikka olib boradi va Xotirjamlik beradi.",
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
      // Kiberxavfsizlik
      "\"CyberSecurity\" Sohasida Ma'lumotlarni himoya qilish Asosiy Vazifa hisoblanadi. Two-Factor Authentication va kuchli Parollar Hisoblarni Buzg'unchidan saqlaydi. Tadqiqotlarga ko'ra, Hujumlarning 80% i Insoniy Xato natijasida sodir bo'ladi. Phishing va Ransomware kabi Tahdidlar yiliga 6 trillion Dollar Zarar keltiradi. Encryption va Regular Backup yagona ishonchli Mudofaa Yo'lidir.",
      // Qayta tiklanuvchan energiya
      "\"RenewableEnergy\" Tarmog'i Iqlim O'zgarishi bilan Kurashda Hal qiluvchi Rol o'ynaydi. Quyosh va Shamol Energiyasi 2024-yilda Global Elektr Ta'minotining 30% ini tashkil qildi. Solar Paneli Texnologiyasining Narxi so'nggi o'n yilda 90% ga arzonlashdi. Net-Zero Maqsadiga erishish uchun Investitsiyalar yiliga 4 trillion Dollarga yetishi kerak.",
      // Masofaviy ish
      "\"RemoteWork\" Modeli Korporativ Madaniyatni Sezilarli darajada o'zgartirdi. Pandemiyadan keyin 35% Mutaxassis Uydan Turib ishlashni davom ettirdi. Slack, Zoom va AsyncCommunication Vositalari Jamoa Hamkorligini ta'minlaydi. Lekin Mehnat va Dam Olish Chegarasi yo'qolgani Burnout Risklarini 25% ga oshirdi. Vaqt Boshqaruvi va Aniq KPI lar Muvaffaqiyatning Asosiy Omillaridir.",
      // Raqamli tibbiyot
      "\"HealthTech\" Sektori Tibbiy Xizmatlarni butunlay yangi shaklga keltirdi. Telemedicine va WearableDevices Bemorlarning Salomatligini Real Vaqtda Kuzatish imkonini berdi. AI-Diagnostika Tizimlari Saraton Aniqlash Aniqligini 95% ga yetkazdi. Sog'liqni Saqlash Sohasiga Investitsiyalar 2025-yilda 600 milliard Dollardan oshdi. Personalized Medicine Kelajakdagi Asosiy Yo'nalish hisoblanadi.",
      // Iqlim o'zgarishi
      "\"ClimateChange\" Muammosi Insoniyat oldidagi eng Jiddiy Sinovlardan biridir. CarbonFootprint kamaytirish va Sustainable Practices joriy etish kechiktirib bo'lmaydi. Global Harorat 1850-yildan beri 1.2°C ga oshdi va 2050-yilga 2°C ortishi kutilmoqda. EV (Electric Vehicle) Sotuvi 2024-yilda 18% ga oshdi. Yashil Iqtisodiyot Kelajakning yagona Yo'lidir.",
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
      // Sleep
      "good sleep is the base of health go to bed and wake up at the same time each day if you sleep too little your body feels tired your brain works slow and focus drops put the phone away before bed read a book or just relax keep the room dark and cool aim for seven or eight hours of sleep good sleep gives you fresh energy for a new day",
      // Friendship
      "a true friend is the most valuable thing in life a good friend shares your joy and helps in hard times never lie to your friend keep your promise show respect and listen with care if a friend makes a mistake do not turn away speak the truth and wish them well friendship grows over years new friends are easy old ones are rare value each friend you have",
      // Family
      "family is the most precious thing in life let your home be full of love and care parents should give time to their kids talk to them and listen eat meals together each day ask how their day was help them when things are hard show respect and patience kids learn from family be a good example strong family makes life strong say thanks for each day",
      // Sport
      "sport keeps your body and mind strong move a little every day running walking or swimming all help sport reduces stress and lifts your mood when your body feels good your work goes well too make it a habit to move every day even thirty minutes is enough strong muscles and a healthy heart come from regular practice it gives you fresh energy for a new day so make time for sport",
      // Travel
      "travel is the best way to see the world when you visit a new place you learn new things see nature meet people and try local food every city has its own charm before you travel make a plan pack what you need spend money wisely take photos to keep memories travel opens your mind and refreshes your soul each day brings a new experience and story",
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
      // Technology
      "Modern Technology has dramatically changed how we Live our daily Lives. Through Smartphones and the Internet, we access Information in Seconds, communicate with Friends across the world, and learn New Skills. Online Courses make it possible to gain quality Education from Home. However, too much Screen time can harm your Health. When you use Technology for Useful Purposes, you save Time and Energy. Continue learning the latest Tools and Apps to stay productive.",
      // Language learning
      "Learning a New Language requires Patience and consistent Practice over time. If you study at least ten Minutes every Day, your Vocabulary will grow significantly. Listening, Reading, Speaking, and Writing are four Essential Skills that must develop together. Conversation with Native Speakers is the fastest Way to improve Fluency. Movies and Songs in the target Language also help build Understanding. Through Daily Practice, you will eventually reach your Language Goals and gain Confidence in Communication.",
      // Stress management
      "Stress is an unavoidable part of Modern Life, but you can effectively reduce its Impact. Deep Breathing Exercises and Meditation calm your Nervous System remarkably well. Walking in Nature and getting Sunlight noticeably improves your Mood. When you write Problems on Paper, they often appear smaller. Adequate Sleep and Healthy Food reduce Stress Hormones. Conversations with Loved Ones lighten the Heart and provide Comfort. Regular Sports activity is one of the most Effective Methods for managing Anxiety.",
      // New skills
      "Acquiring a New Skill is one of the most Important Aspects of Personal Development. Every Skill you learn opens new Opportunities and Doors in Life. Patience matters most at the Beginning Stage, because the first Results take time to appear. The Internet provides countless Free Tutorials and Video Lessons, just search for them. If you practice just thirty Minutes every Day, you will see noticeable Progress within a Month. New Skills also expand Career Opportunities and enrich your overall Life Experience.",
      // Saving money
      "Managing your Money wisely forms the Foundation of a Healthy Life. Make it a Habit to save at least ten Percent of your monthly Income. Avoid unnecessary Purchases and stay away from impulsive financial Decisions. Track all your Expenses on paper, so you know where your Money goes. Make a Shopping List before going to the store, and buy only what is on the List. Building an Emergency Fund leads to Financial Freedom and peace of Mind.",
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
      // Cyber security
      "\"CyberSecurity\" Domain considers Data Protection as the Primary Mission of any Modern Organization. Two-Factor Authentication and strong Passwords protect Accounts from Hackers effectively. According to Research, approximately 80% of Cyber Attacks happen due to Human Error. Phishing and Ransomware Threats cause damages exceeding 6 trillion Dollars annually. Encryption combined with Regular Backups remains the only truly Reliable Defense Strategy.",
      // Renewable energy
      "\"RenewableEnergy\" Sector plays a Decisive Role in Combating Climate Change globally. Solar and Wind Energy provided 30% of the Global Electricity Supply in 2024 according to Reports. Solar Panel Technology Costs have dropped by 90% over the last decade significantly. To achieve Net-Zero Goals, annual Investments must reach 4 trillion Dollars worldwide. Government Policies must continue supporting this critical Transition.",
      // Remote work
      "\"RemoteWork\" Model has fundamentally transformed Corporate Culture across the global Workforce. Following the Pandemic, approximately 35% of Professionals continue working from Home full-time. Tools like Slack, Zoom, and AsyncCommunication enable effective Team Collaboration daily. However, the blurring Boundary between Work and Rest increases Burnout Risk by 25%. Effective Time Management and clear KPIs remain the Critical Success Factors here.",
      // Health tech
      "\"HealthTech\" Sector has completely reshaped Modern Medical Services around the world. Telemedicine and WearableDevices enable Real-Time Patient Health Monitoring at any moment. AI-Diagnostic Systems have achieved 95% Accuracy in Cancer Detection cases. Healthcare Investments exceeded 600 billion Dollars in 2025 alone according to Reports. Personalized Medicine is recognized as the Primary Direction of Future Healthcare Development.",
      // Climate change
      "\"ClimateChange\" represents one of the most Serious Tests facing Modern Humanity. Reducing CarbonFootprint and adopting Sustainable Practices cannot be postponed. Global Temperature has risen 1.2°C since 1850 and may reach 2°C by 2050. EV (Electric Vehicle) Sales increased by 18% during 2024 worldwide. The Green Economy represents the only Viable Path forward for our shared Future.",
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
      // Сон
      "хороший сон это основа здоровья ложись спать и вставай в одно и то же время каждый день если мало спишь тело устает мозг плохо работает внимание падает убери телефон перед сном читай книгу или просто отдыхай пусть в комнате будет темно и прохладно спи семь или восемь часов хороший сон дает свежую силу для нового дня",
      // Дружба
      "настоящий друг это самое ценное в жизни хороший друг радуется с тобой и помогает в трудные минуты не лги другу если дал слово держи уважай и умей слушать если друг ошибся не отворачивайся скажи правду и пожелай добра дружба растет с годами новых друзей найти легко а старых трудно поэтому цени каждого друга",
      // Семья
      "семья это самое ценное в жизни пусть в доме будет любовь и забота родители должны уделять время детям говорить и слушать ешьте вместе каждый день спрашивай как прошел день помогай в трудные моменты в семье нужны уважение и терпение дети учатся в семье будь хорошим примером сильная семья делает сильной жизнь говори спасибо за каждый день",
      // Спорт
      "спорт делает тело и ум сильнее двигайся немного каждый день бег ходьба или плавание полезны спорт снимает стресс и улучшает настроение когда тело здоровое работа тоже идет лучше сделай движение привычкой даже полчаса в день достаточно сильные мышцы и крепкое сердце приходят с регулярной практикой это дает свежую силу для нового дня",
      // Путешествия
      "путешествие лучший способ узнать мир в новом месте ты узнаешь новое видишь природу знакомишься с людьми и пробуешь местную еду у каждого города свой характер перед поездкой составь план и возьми нужное трать деньги с умом снимай фото на память путешествие открывает ум и освежает душу каждый день дарит новый опыт",
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
      // Технологии
      "Современные Технологии значительно изменили нашу повседневную Жизнь. Через Смартфоны и Интернет мы получаем Информацию за Секунды, общаемся с Друзьями по всему миру и осваиваем новые Навыки. Онлайн Курсы позволяют получать качественное Образование из Дома. Однако слишком много времени перед Экраном вредит Здоровью. Если использовать Технологии с Пользой, можно сэкономить Время и Силы. Постоянно изучайте новые Инструменты и Приложения.",
      // Изучение языка
      "Изучение Нового Языка требует Терпения и постоянной Практики. Если заниматься хотя бы десять Минут каждый День, Словарный запас значительно растет. Слушание, Чтение, Говорение и Письмо четыре важных Навыка, которые должны развиваться вместе. Разговор с Носителями Языка самый быстрый Путь к Беглости. Фильмы и Песни на изучаемом Языке тоже помогают понимать. Через Ежедневную Практику вы достигнете своих Целей и обретете Уверенность.",
      // Управление стрессом
      "Стресс неизбежная часть Современной Жизни, но его Влияние можно значительно уменьшить. Глубокое Дыхание и Медитация успокаивают Нервную Систему. Прогулки на Природе и Солнечный Свет улучшают Настроение. Когда записываешь Проблемы на бумагу, они кажутся меньше. Достаточный Сон и Здоровая Пища снижают Гормоны Стресса. Разговор с Близкими облегчает Душу. Регулярные Занятия Спортом один из самых Эффективных Способов справиться с Тревогой.",
      // Новые навыки
      "Освоение Нового Навыка один из важнейших Аспектов Личностного Роста. Каждое изученное Умение открывает новые Возможности в Жизни. На Начальном Этапе важнее всего Терпение, ведь первые Результаты появляются не сразу. В Интернете полно Бесплатных Уроков и Видео, только ищите. Если заниматься всего тридцать Минут каждый День, через Месяц увидите заметный Прогресс. Новые Навыки расширяют Карьерные Возможности и обогащают Жизнь.",
      // Экономия денег
      "Грамотное Управление Деньгами Основа Здоровой Жизни. Сделайте Привычкой откладывать хотя бы десять Процентов от месячного Дохода. Избегайте лишних Покупок и импульсивных финансовых Решений. Записывайте все свои Расходы, чтобы понимать куда уходят Деньги. Перед магазином составляйте Список Покупок и покупайте только то, что в Списке. Создание Резервного Фонда ведет к Финансовой Свободе и дарит Спокойствие.",
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
      // Кибербезопасность
      "\"Кибербезопасность\" Сфера считает Защиту Данных Главной Задачей. ДвухФакторная Аутентификация и Сильные Пароли защищают Аккаунты от Хакеров. Исследования показывают, что 80% Атак происходят из-за Человеческой Ошибки. Фишинг и Программы-Вымогатели наносят Ущерб более 6 триллионов Долларов в год. Шифрование и Регулярное Резервное Копирование единственный надежный Путь Защиты.",
      // Возобновляемая энергия
      "\"ВозобновляемаяЭнергия\" Сектор играет Решающую Роль в Борьбе с Изменением Климата. Солнечная и Ветровая Энергия обеспечили 30% Мирового Электроснабжения в 2024 году. Стоимость Солнечных Панелей снизилась на 90% за последнее Десятилетие. Для достижения Цели Net-Zero, ежегодные Инвестиции должны достичь 4 триллионов Долларов.",
      // Удаленная работа
      "\"УдаленнаяРабота\" Модель кардинально изменила Корпоративную Культуру. После Пандемии 35% Специалистов продолжают работать из Дома. Инструменты Slack, Zoom и AsyncCommunication обеспечивают Командное Взаимодействие. Однако размытая Граница между Работой и Отдыхом увеличивает Риск Выгорания на 25%. Управление Временем и четкие KPI Главные Факторы Успеха.",
      // Цифровая медицина
      "\"ЦифроваяМедицина\" Сектор полностью изменил Современные Медицинские Услуги во всем мире. Telemedicine и WearableDevices позволяют отслеживать Здоровье Пациентов в Реальном Времени. AI-Диагностические Системы достигли 95% Точности в Обнаружении Рака. Инвестиции в Здравоохранение превысили 600 миллиардов Долларов в 2025 году. Персонализированная Медицина признана Главным Направлением Будущего.",
      // Изменение климата
      "\"ИзменениеКлимата\" одно из самых Серьезных Испытаний Современного Человечества. Сокращение CarbonFootprint и внедрение Sustainable Practices нельзя откладывать. Глобальная Температура выросла на 1.2°C с 1850 года и может достичь 2°C к 2050. Продажи EV (Electric Vehicle) выросли на 18% в 2024 году. Зеленая Экономика единственный жизнеспособный Путь Будущего.",
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
  targetCount: number,
  topic?: string
): string {
  // When a topic is supplied (programmatic-SEO landing pages route here via ?topic=),
  // pull from the topic-specific pack instead of the per-language default set.
  const texts = topic && topicTexts[topic]
    ? topicTexts[topic][difficulty]
    : sampleTexts[language][difficulty];
  // Randomly select one topic from the array
  const randomIndex = Math.floor(Math.random() * texts.length);
  const baseText = texts[randomIndex];

  console.log(`[getTestText] Language: ${language}, Difficulty: ${difficulty}, Topic: ${topic ?? "default"}, Index: ${randomIndex}/${texts.length}`);

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
