import type { Difficulty } from "@/types";

// Uzbek Latin-script typing snippets. The modern Uzbek Latin alphabet
// was adopted in 1993 (Cabinet of Ministers Resolution) and revised in
// 1995. It features two apostrophe-marked letters — o' and g' — plus
// the digraphs sh, ch, and ng. Sources: classical/modern Uzbek authors,
// common everyday vocabulary, and news-register sentences. No fabrication.
export const uzbekLatinTexts: Record<Difficulty, string[]> = {
  easy: [
    "men sen u biz siz ular kim nima qachon qayer nega qanday",
    "kitob daftar qalam ruchka maktab dars talaba sinf imtihon",
    "ona ota aka uka opa singil bobo buvi amaki xola",
    "non suv choy osh palov manti somsa shashlik tovuq baliq",
    "oq qora qizil yashil sariq pushti binafsha jigarrang kulrang havorang",
    "bir ikki uch besh olti yetti sakkiz yuz ming million yarim",
    "kun oy yil hafta soat daqiqa soniya tong tush kech",
    "yaxshi yomon katta kichik baland past uzun qisqa keng tor",
    "uy xona darvoza eshik deraza shift devor pol stol stul",
    "bahor yoz kuz qish issiq sovuq iliq salqin shamol qor",
  ],
  medium: [
    "Bilim olish - har bir insonning umrbod davom etadigan yo'lidir.",
    "O'zbekiston Respublikasi Markaziy Osiyoning yuragida joylashgan davlat.",
    "Toshkent shahri mamlakatimizning poytaxti va eng yirik shahridir.",
    "Mustaqillik kuni har yili 1-sentyabr kuni keng nishonlanadi.",
    "Alisher Navoiy o'zbek mumtoz adabiyotining ulug' namoyandasidir.",
    "Abdulla Qodiriy o'zbek romanchiligining asoschisi hisoblanadi.",
    "Cho'lpon she'riyatda yangi yo'nalish yaratgan iste'dodli shoir edi.",
    "Samarqand, Buxoro va Xivada qadimiy me'morchilik yodgorliklari saqlangan.",
    "Paxta dehqonchilik tarmog'imizning eng asosiy ekinlaridan biri sanaladi.",
    "Internet va kompyuter texnologiyalari kundalik hayotimizga chuqur kirib keldi.",
  ],
  hard: [
    "O'zbek lotin alifbosi 1993-yilda qabul qilingan va 1995-yilda o'zgartirilgan rasmiy yozuvdir, unda 26 harf va 3 ta harf birikmasi mavjud.",
    "Apostrof bilan yoziladigan o' va g' harflari o'zbek tilidagi mahsus tovushlarni ifodalaydi va boshqa lotin alifbolaridan ajralib turadi.",
    "\"O'tkan kunlar\" romani Abdulla Qodiriy tomonidan yozilib, 1922-yilda nashr etilgan o'zbek adabiyotining sara namunalaridan biridir.",
    "\"Kecha va kunduz\" - Cho'lponning eng mashhur romani, 1936-yilda yozilgan, undan o'zbek xalqining murakkab tarixiy davri tasvirlangan.",
    "Sh, ch va ng harf birikmalari o'zbek lotin alifbosida ikkita belgidan tuziladi va bir tovushni ifodalovchi yagona birlik hisoblanadi.",
    "G'arbiy O'zbekistondagi Qoraqalpog'iston Respublikasi mamlakatimizning ma'muriy hududiy tuzilmasiga kiruvchi muxtor respublikadir.",
    "Toshkent metropoliteni 1977-yilda ochilgan bo'lib, Markaziy Osiyodagi birinchi yer osti yo'lovchi tashish tizimi sanaladi.",
    "Amir Temur 1370-yildan 1405-yilgacha hukmronlik qilgan va Samarqandni o'z saltanatining poytaxtiga aylantirgan ulkan sarkardadir.",
    "Mirzo Ulug'bek - Temuriylar sulolasidan chiqqan astronom, matematik va davlat arbobi, uning rasadxonasi Samarqandda joylashgan.",
    "Imom al-Buxoriy IX asrda Buxoro yaqinidagi Xartang qishlog'ida tug'ilgan va islom ilmida \"al-Jome' as-sahih\" asari bilan tanilgan.",
  ],
};
