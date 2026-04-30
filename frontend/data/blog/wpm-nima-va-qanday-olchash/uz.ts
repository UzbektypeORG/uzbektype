// UZ content for blog post: "WPM nima va qanday o'lchash kerak — yozish tezligini oshirish qo'llanmasi"
// Target keywords: yozish tezligini oshirish, wpm nima (HEAD TERMS / PILLAR)

export const uzContent = `## WPM nima degani

WPM — bu **Words Per Minute**, ya'ni **daqiqada nechta so'z** yoza olishingiz. Bu yozish tezligini o'lchashning standart birligi va deyarli barcha typing testlar shu raqamda natija beradi.

Lekin "so'z" deyilganda nima nazarda tutilgan? Aslida har xil uzunlikdagi so'zlarni hisoblash adolatli emas — "men" 3 belgi, "internatsionalizatsiya" 21 belgi. Shu sababli typing sohasida butun dunyo bo'yicha qabul qilingan etalon bor: **5 belgi = 1 so'z**, probel ham hisoblanadi.

Bu 1929-yili August Dvorak (Dvorak klaviaturasini ixtiro qilgan inson) tomonidan kiritilgan. U inglizcha matnlardagi o'rtacha so'z uzunligini o'rganib, 5 belgili norma kelib chiqqan. Hozir bu o'lchov ona tildan qat'i nazar — uzbekcha, inglizcha, ruscha — barcha typing testlarda bir xil ishlatiladi.

Nima uchun aynan **standartlashtirilgan** o'lchov muhim:

- **Adolatli taqqoslash** — siz va do'stingiz turli matnlar yozsangiz ham, baholash teng bo'ladi
- **Vaqt o'tishi bilan progress** — bugungi 45 WPM va keyingi oydagi 60 WPM bir xil shkalada
- **Xalqaro ma'lumotnomalar** — dunyo rekordlari, o'rta professional WPM — hammasi shu mezonda

Demak WPM faqat raqam emas, **o'zaro tushunarli til**. Yozish tezligini oshirish bo'yicha har qanday gap qilinmasin — birinchi savol "WPM'ingiz qancha?" bo'ladi.

## WPM qanday hisoblanadi — formula va misol

Asosiy formula juda oddiy:

\`\`\`
WPM = (yozilgan belgilar soni / 5) / (vaqt daqiqada)
\`\`\`

Yoki sekundlarda:

\`\`\`
WPM = (belgilar / 5) × (60 / sekund)
\`\`\`

### Konkret misol

Tasavvur qiling — 60 sekundda **300 ta belgi** yozdingiz (probel bilan).

- 300 / 5 = 60 so'z
- 60 sekund = 1 daqiqa
- WPM = **60**

Endi murakkab variant — **45 sekundda 250 belgi**:

- 250 / 5 = 50 so'z
- 45 sekund = 0.75 daqiqa
- WPM = 50 / 0.75 ≈ **67**

### Gross WPM va Net WPM

Bu yerda nozik joy bor. Yuqoridagi hisob **Gross WPM** (xom WPM) — sodir etgan barcha xatolarni ham hisoblaydi.

**Net WPM** esa aniqlikni hisobga oladi:

\`\`\`
Net WPM = Gross WPM − (xatolar soni / vaqt daqiqada)
\`\`\`

Misol: 67 Gross WPM, 45 sekundda 6 ta xato qildingiz:

- 6 xato / 0.75 daqiqa = 8 xato/daqiqa
- Net WPM = 67 − 8 = **59**

Aksariyat professional typing testlar (shu jumladan UzbekType) **Net WPM** ni ko'rsatadi — chunki xatolar bilan tezroq yozish foydalanish jihatidan ma'nosiz. Real hayotda har xato keyin tuzatishga vaqt oladi.

### Aniqlik nima va WPM'ga qanday ta'sir qiladi

**Aniqlik (accuracy)** — to'g'ri yozilgan belgilar foizi. 100 belgi yozib, 95 tasi to'g'ri bo'lsa — 95% aniqlik.

| Aniqlik | Bahosi |
|---|---|
| 99-100% | Mukammal — professional darajasi |
| 95-98% | Yaxshi — kundalik foydalanish uchun yetarli |
| 90-94% | O'rta — mashq qilish kerak |
| 85-89% | Past — sekinroq lekin to'g'ri yozishga o'rganing |
| 85% dan past | Tezlikni butunlay unuting, faqat aniqlikka qarab harakat qiling |

Yangi boshlovchilarning eng katta xatosi — aniqlikka e'tibor bermay tezlikka intilish. Bu noto'g'ri yo'l. Avval to'g'ri yozishni odatlang, keyin tezlik **avtomatik** keladi.

## WPM qanday o'lchanadi — usullar

### Onlayn typing test (eng aniq)

Eng oddiy va aniq yo'l. Test sizga belgilangan vaqt davomida (10s, 30s, 60s) matn yozdiradi va avtomatik hisoblaydi. UzbekType.uz da bu **bir bosishda** mavjud:

- **[10 soniyalik test](/uz/tests/10s-easy)** — boshlovchilar uchun, qisqa va engilroq
- **[30 soniyalik test](/uz/tests/30s-medium)** — eng aniq natija beradigan klassik
- **[60 soniyalik test](/uz/tests/60s-hard)** — chidamlilikni ham sinaydi

60 sekundli test eng adekvat WPM ko'rsatkichini beradi — chunki birinchi 5-10 sekund qizib olish, oxirgi sekundlar charchoq. O'rtacha yangi davom etish ko'rsatadi.

### Standart matn vs erkin yozuv

Onlayn testlarda matn **oldindan tayyor** — siz uni ko'chirib yozasiz. Bu adolatli (hamma bir xil matn bilan testdan o'tadi), lekin haqiqiy ishingizni aks ettirmaydi.

Erkin yozuv (chat, kod, maqola) odatda **15-25% sekinroq**, chunki o'ylab, qayta o'qib, tahrir qilib yozasiz. Real ish-WPM va test-WPM farqi normal.

### Manual hisoblash

Agar test sayti yo'q bo'lsa, qo'lda hisoblashingiz mumkin:

1. Telefoningizda taymerni 1 daqiqaga qo'ying
2. Microsoft Word yoki Google Docs'da yozishni boshlang
3. To'xtagandan keyin **Tools → Word Count** ni oching
4. Belgi (Characters with spaces) raqamini 5 ga bo'ling

Lekin bu usul aniqlik xatolarini kuzata olmaydi — chunki o'zingiz xatolaringizni darhol tuzatasiz. Tavsiyali emas.

## Yaxshi WPM qancha — me'yorlar va kontekst

Bu eng ko'p beriladigan savol — "men WPM 45 yozdim, bu yaxshimi?" Javob har doim **kontekstga bog'liq**.

### Umumiy me'yorlar (inglizcha matnlar uchun)

| WPM | Daraja | Kim ko'p uchraydi |
|---|---|---|
| **0-25** | Boshlovchi | Klaviatura yangi o'rganganlar, 2-barmoq yozuvchilari |
| **25-40** | Hawaqil | Standart ofis ishchisi, oddiy foydalanuvchi |
| **40-60** | O'rta | Talabalar, kunlik faol yozuvchilar |
| **60-80** | Yaxshi | Dasturchilar, journalistlar, tezroq professionallar |
| **80-100** | A'lo | Touch typing chempionlari, professional kotiblar |
| **100+** | Mutaxassis | Faqat top 1% — yillab mashq qilgan |
| **150+** | Dunyo darajasi | Online turnirlarda yutuvchilar |

Hozirgi **dunyo rekordi** Anthony "Cyrus" Ermolin tomonidan 305 WPM (2018). Lekin bu sustained emas — burst (qisqa portlash). Doimiy 1 daqiqalik test rekordi 200 WPM atrofida.

### Kasblar bo'yicha

Tipik o'rtacha WPM:

- **Standart ofis xodimi:** 35-45
- **Kotib / sekretar:** 60-80
- **Dasturchi:** 50-70 (lekin maxsus belgilar va kalit so'zlar tufayli sekinroq ko'rinishi mumkin)
- **Journalist / yozuvchi:** 60-90
- **Stenograf:** 200+ (maxsus klaviatura bilan)
- **Onlayn chat / forum foydalanuvchisi:** 40-55

Agar siz **45-55 WPM** orasida bo'lsangiz — bu **o'rtacha foydalanuvchidan yaxshiroq**. Ish jihatidan kifoya. Lekin daromadli kasblarda (dasturchi, journalist) **60+** o'zingizni qulay his qilish chegarasi.

### Uzbekcha matnlar uchun ahamiyatli farq

Uzbekcha so'zlar inglizchadan biroz uzunroq — o'rtacha 5.4 belgi. Bu odatda WPM'ni **5-10% pasaytiradi** chunki 5 belgili etalon adolatsiz. Lekin standart bo'lgani uchun shu raqamni ishlatamiz. Inglizcha 60 WPM ≈ uzbekcha 55 WPM odamning ko'nikma darajasini ko'rsatadi.

## WPM'ni oshirishning 5 amaliy yo'li

### 1. Avval aniqlik, keyin tezlik

Eng katta xato — tezlikka intilib, xatolarni e'tiborsiz qoldirish. Bu **plato** (taraqqiyotdan to'xtash) keltirib chiqaradi. Sababi oddiy: xatoli yozish odat bo'lib qoladi.

Yo'l: 1 hafta davomida **faqat 98%+ aniqlik** uchun yozing. Sekinroq, ammo to'g'ri. Keyin tezlik avtomatik 2-3 hafta ichida ko'tariladi.

### 2. Touch typing — klaviaturaga qaramaslik

10 ta barmoqning hammasi ishlasin va ko'zlaringiz **ekranda** bo'lsin. Bu nazariy emas — odatda touch typing **WPM'ni 50-70% oshiradi**.

Boshlash uchun: F va J tugmalaridagi bo'rtiqlarni his qilib, qo'lingizni "home row" da (A S D F | J K L ;) tutib turing. Har bir barmoq o'z ustuniga javobgar.

Batafsil: [Tez yozishni o'rganish — to'liq qo'llanma](/uz/blog/tez-yozish-organish).

### 3. Har kun 10-15 daqiqa, doimiy mashq

Haftada bir marta 1 soat — yomon strategiya. Har kun 10-15 daqiqa — **3 baravar samarali**. Sababi: motor ko'nikmalar miya tomonidan **sleep cycle** orqali konsolidatsiya qilinadi.

Boshlangan kunlarda WPM o'sishi keskin (2-5 ball/hafta), keyin sekinroq bo'ladi (0.5-1 ball/hafta). Bu normal.

### 4. Turli matnlar bilan mashq qiling

Faqat oddiy oson matn yozish — aldoq taraqqiyot. Real WPM o'sishi uchun:

- **Easy** — odatiy lug'at, qisqa so'zlar
- **Medium** — bosh harf, vergullar, raqamlar
- **Hard** — texnik atamalar, qavslar, maxsus belgilar

UzbekType'da har 3 daraja mavjud. Haftada **kuni bittadan** rotatsiya qiling.

### 5. Real ishingizda qo'llang

Test — bu mashq, lekin haqiqiy WPM **kundalik ishda** qo'llanadi. Telefonda biriktiring: chat'da, kodda, email'da klaviaturaga qaramaslikka harakat qiling. Avvaliga sekinroq tuyiladi, lekin 2-3 haftadan keyin haqiqiy o'zgarish seziladi.

## Qanday doimiy kuzatish kerak

WPM o'sishi — **chiziqli emas**. Hafta-hafta o'lchasangiz, ba'zan tushish ko'rinadi. Bu normal:

1. **Boshlang'ich nuqta belgilang** — bugungi 60s testdagi natijangizni yozib oling
2. **Haftalik takrorlash** — har dushanba ertalab bir xil shartda (xuddi shu daraja, dam olgan holatda)
3. **Aniqlik bilan birga kuzatish** — WPM 50 → 55 lekin aniqlik 95 → 88 = bu **regress**, progress emas
4. **Plateau'larni qabul qiling** — 2-3 hafta o'sish bo'lmasligi mumkin. Bu mashqning "konsolidatsiya" bosqichi
5. **Oylik milestone'lar** — har oy +5 WPM real, doimiy maqsad

UzbekType'da har testdan keyin natija avtomatik saqlanadi. [Profil sahifa](/uz/profile)'da grafik shaklida o'sish ko'rinadi.

## Tez-tez beriladigan savollar

**WPM va CPM nima farqi bor?**

CPM — Characters Per Minute (daqiqada nechta belgi). WPM × 5 = CPM (taxminan). 50 WPM ≈ 250 CPM. Ba'zi testlar (asosan Yevropa) CPM ishlatadi, ammo WPM xalqaro standart.

**WPM 50 yaxshimi yoki yomonmi?**

Kontekstga bog'liq:
- O'rtacha foydalanuvchi uchun — yaxshi
- Dasturchi uchun — kifoya, ammo 60+ qulay
- Professional yozuvchi uchun — past, 70+ kerak

**Tildan tilga WPM farq qiladimi?**

Ha, biroz. Ona tilingizda WPM odatda 10-20% yuqori, chunki so'zlarni avtomatik bilasiz. Lekin **standart 5 belgili etalon** xalqaro qoladi.

**Mexanik klaviatura WPM'ni oshiradimi?**

To'liq emas. Mexanik klaviatura **rohatlik** beradi va uzoq vaqt yozishda charchoqni kamaytiradi. WPM'ga ta'siri kichik (2-5 ball), lekin chidamlilikka katta. Yangi boshlovchilar uchun kerakmas — avval ko'nikma, keyin asbobsozlik.

**WPM'imni qanday tezlik bilan oshira olaman?**

Real raqamlar, kunlik 15 daqiqa mashq bilan:
- **0-30 WPM**: birinchi oyda 30 ga chiqish realistik
- **30-50 WPM**: 1-2 oyda
- **50-70 WPM**: 3-6 oyda
- **70-90 WPM**: 1 yil va undan ortiq
- **90+ WPM**: yillar (yoki professional kasb talab qiladi)

## Xulosa

WPM — **yozish tezligingizning ob'yektiv o'lchovi**, lekin u faqat raqam, ko'nikmangizni umumlashtirmaydi. To'g'ri yondashuv:

1. WPM nima va qanday hisoblanishini bilish (yuqoridagi formula)
2. **Net WPM** (xatolarni hisobga oladigan) bilan qiziqish
3. O'z darajangizni aniqlash uchun haqiqiy testdan o'tish
4. Aniqlik birinchi, tezlik keyin
5. Har kun 10-15 daqiqa mashq

UzbekType.uz da hozir **bepul WPM testdan o'ting** — natijangiz avtomatik saqlanadi va vaqt o'tishi bilan grafik ko'rinishida o'sishni ko'rsatadi.

Hozir [30 soniyalik testdan boshlang](/uz/tests/30s-medium) — oxiri natijani ushbu maqoladagi me'yorlarga taqqoslang. Yoki barcha foydalanuvchilarning o'rtacha natijalarini [leaderboard](/uz/leaderboard/monthly/medium)'da ko'ring.
`;
