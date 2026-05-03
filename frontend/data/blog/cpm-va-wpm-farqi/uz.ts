// UZ content for blog post: "CPM va WPM farqi — qaysi birini ishlatish kerak"
// Target keyword: cpm va wpm farqi (CLUSTER → wpm-nima-va-qanday-olchash)

export const uzContent = `## Bir jumla javob

**CPM** = Characters Per Minute (daqiqada belgilar). **WPM** = Words Per Minute (daqiqada so'zlar). Ular bir-biriga bog'liq formula bilan: **WPM × 5 = CPM**. Ya'ni 60 WPM = 300 CPM. WPM xalqaro standart, CPM esa asosan Yevropa va texnik testlarda ishlatiladi.

Lekin bu sodda formula ortida bir necha nuans bor. Bu maqolada:

- Aniq formula va misollar
- Qaysi sayt qaysi metrika ishlatadi
- Sizga qaysi biri kerak
- Til bo'yicha farqlar (uzbekcha, ruscha, inglizcha)
- Ish e'lonlarida qaysi metrika ko'rsatiladi

Agar darrov o'lchamoqchi bo'lsangiz — [30 soniyalik bepul testdan o'ting](/uz/tests/30s-medium), natijada ikkalasi ham ko'rsatiladi.

## Asosiy formulalar

### WPM formulasi

\`\`\`
WPM = (yozilgan belgilar / 5) / (vaqt daqiqada)
\`\`\`

Bu yerda **5 belgi = 1 so'z** (xalqaro standart, 1929-yili August Dvorak tomonidan o'rnatilgan).

**Misol:** 60 sekundda 300 belgi yozdingiz (probel bilan):
- 300 / 5 = 60 so'z
- 60 sekund = 1 daqiqa
- WPM = 60

### CPM formulasi

\`\`\`
CPM = yozilgan belgilar / (vaqt daqiqada)
\`\`\`

Hech qanday bo'linish yo'q — to'g'ridan-to'g'ri belgilar soni.

**Misol:** xuddi shu test:
- 300 belgi / 1 daqiqa = 300 CPM

### Konversiya jadvali

| WPM | CPM (taxminiy) |
|---|---|
| 20 | 100 |
| 30 | 150 |
| 40 | 200 |
| 50 | 250 |
| 60 | 300 |
| 70 | 350 |
| 80 | 400 |
| 100 | 500 |
| 150 | 750 |

Sodda esda saqlash: **so'nggi raqamga 0 qo'shing va 5 ga ko'paytiring**. 60 WPM → 300 CPM.

## Nima uchun ikki xil metrika bor

Tarixiy sabablar:

**WPM** (1929) — yozish mashinkalari davrida kiritilgan. Maqsad — adolatli solishtirish: turli xil so'z uzunligini hisobga olmasdan baholash.

**CPM** — texnik soha (mexanik mashinkalar, telefon liniyalari) uchun ishlatilgan. Sababi — har belgi alohida "signal" bo'lib uzatilgan, so'z deyilgan abstraksiya kerakmas edi.

Hozir:
- **WPM** — internetdagi 95% typing testlari, ish e'lonlari
- **CPM** — Yevropa typing kurslari (Germaniya, Fransiya), texnik standartlar (DIN 5008), telegraflar

## Qaysi sayt qaysini ishlatadi

| Sayt | Asosiy metrika | Eslatma |
|---|---|---|
| **UzbekType.uz** | WPM | CPM ham ko'rsatiladi |
| **Monkeytype.com** | WPM | "Raw" WPM (xom) va Net WPM |
| **10fastfingers.com** | WPM | CPM yashirin |
| **Keybr.com** | WPM | Faqat WPM |
| **Typing.com** | WPM | + Adjusted WPM |
| **Ratatype.com** | WPM | Sertifikat WPM da |
| **Schreibtrainer.com (DE)** | CPM | Yevropa standarti |
| **TippLift (DE)** | CPM | Asosiy ko'rsatkich |
| **Klavogonki.ru** | Belgi/daqiqa | Ruscha "ZPM" |
| **Sense-lang.org** | WPM | + CPM ikkilamchi |

Aniq qoida: **inglizcha-ustun saytlar WPM**, **nemis/yevropa saytlar CPM**.

## Til bo'yicha farqlar

5 belgili etalon — **inglizchaga moslangan**. Boshqa tillarda biroz adolatsiz:

| Til | O'rtacha so'z uzunligi | WPM koeffitsient |
|---|---|---|
| Inglizcha | 4.7 belgi | 1.0 (etalon) |
| Uzbekcha | 5.4 belgi | 0.87 (~13% past) |
| Ruscha | 5.3 belgi | 0.89 (~11% past) |
| Nemis | 6.3 belgi | 0.75 (~25% past) |
| Yapon (rōmaji) | 4.0 belgi | 1.18 (~18% yuqori) |
| Italyan | 5.0 belgi | 0.94 (~6% past) |

**Amaliy ma'no:** agar siz inglizchada 60 WPM ko'rsatsangiz, uzbekchada 52-55 WPM ko'rsatasiz — bu **bir xil ko'nikma**.

CPM bu muammodan xolis — chunki o'lchov **belgi**, **so'z** emas. Shu sababli **xalqaro adolatli solishtirish** uchun ba'zilar CPM'ni afzal ko'radi.

### Ruscha "ZPM" haqida

Ruscha typing community **ZPM** (знаков в минуту) ishlatadi — bu CPM'ning aynan o'zi. Klavogonki.ru va boshqa rus saytlarida shu metrik ko'rsatiladi.

Konversiya:
- ZPM = CPM
- ZPM ÷ 5 ≈ inglizcha WPM
- ZPM ÷ 6 ≈ ruscha "WPM" (rus so'zlari uzunligini hisobga olib)

## Net vs Gross — yana bir nuans

WPM ham CPM ham ikki xil bo'ladi:

### Gross (xom)

Sodir etilgan **barcha belgi**larni hisoblaydi, xatolarni e'tiborsiz qoldiradi.

\`\`\`
Gross WPM = barcha belgilar / 5 / vaqt
\`\`\`

### Net (sof)

Xatolarni jarima qilib, real natijani ko'rsatadi.

\`\`\`
Net WPM = Gross WPM − (xatolar / vaqt)
\`\`\`

**Misol:** 67 Gross WPM, 45 sekundda 6 ta xato:
- Xato/daqiqa = 6 / 0.75 = 8
- Net WPM = 67 − 8 = 59

Aksariyat saytlar **Net** ni ko'rsatadi, chunki Gross "soxta tezlik" — real ishda xatolarni keyin tuzatish kerak bo'ladi.

## Qaysi metrika sizga kerak

Sizning kontekstingizga qarab:

### Agar siz Uzbekistondagi ish izlasangiz

**WPM** — chunki Uzbekistondagi ish e'lonlari xalqaro standartni ishlatadi. CPM'ni hech kim so'ramaydi.

Tipik talablar:
- Standart ofis: 30+ WPM
- Sekretar: 60+ WPM
- Customer support: 50+ WPM
- Data entry: 70+ WPM

### Agar siz Yevropa kompaniyasiga ariza topshirsangiz

**CPM ham WPM ham** ko'rsatishingiz mumkin. Nemis kompaniyalari odatda CPM so'raydi (300+ CPM = standart, 400+ CPM = yaxshi).

### Agar siz typing community'da raqobatlashsangiz

**WPM** — global standart. Monkeytype, TypeRacer leaderboard'lari WPM da. CPM ko'rsatish bu yerda noma'qul.

### Agar siz texnik test topshirsangiz (sertifikat)

Ratatype va boshqa sertifikat saytlari **WPM** ishlatadi. Sertifikat'da shu raqam ko'rsatiladi.

### Agar siz dasturchi bo'lsangiz

WPM bo'lsa-da, asosiy ko'rsatkich emas. Dasturchi uchun **maxsus belgilar tezligi** muhimroq. CPM bu yerda foydali — chunki kod yozishda har belgi sanaladi.

## Tez-tez beriladigan savollar

**WPM va CPM ni qanday qilib bir vaqtda o'lchayman?**

[UzbekType 30 sekundli testdan o'ting](/uz/tests/30s-medium) — natijada WPM bilan birga CPM ham ko'rsatiladi. Boshqa ko'p saytlar faqat WPM beradi.

**Mexanik klaviatura CPM oshiradimi WPM ga qaraganda?**

Yo'q, ular bir xil koeffitsientda o'sadi. Mexanik klaviatura jami tezlikni 2-5% oshiradi — ham WPM, ham CPM.

**Ish e'lonida "300 CPM" ko'rsatilgan — bu qancha WPM?**

300 CPM = 60 WPM. Bu standart o'rta darajadagi ofis xodimi tezligi.

**WPM 100, lekin CPM 700 — bu mumkinmi?**

Yo'q. Agar haqiqatan WPM 100 bo'lsa, CPM 500 bo'lishi kerak. 700 CPM bo'lsa, WPM 140 — bu professional darajasi. Sayt buggy bo'lishi mumkin yoki sizda noto'g'ri formula.

**Smartphone'da test o'tsangiz, raqamlar haqiqiymi?**

Yo'q. Touch screen klaviatura — boshqa muskul xotirasi. Smartphone WPM ≠ kompyuter WPM. Faqat to'liq fizik klaviaturada o'lchang.

**Bolalar uchun qaysi metrik yaxshi?**

WPM — chunki bolaga "30 ta so'z" "150 ta belgi"dan tushunarli. Maktab darslarida ham WPM ishlatiladi.

## Konkret konversiya kalkulator

| Sizdagi natija | Konversiya |
|---|---|
| 250 CPM | = 50 WPM |
| 300 CPM | = 60 WPM |
| 350 CPM | = 70 WPM |
| 400 CPM | = 80 WPM |
| 500 CPM | = 100 WPM |
| 600 CPM | = 120 WPM |
| 750 CPM | = 150 WPM |
| 1000 CPM | = 200 WPM (dunyo darajasi) |

Aksincha:

| Sizdagi WPM | CPM |
|---|---|
| 25 | 125 |
| 35 | 175 |
| 45 | 225 |
| 55 | 275 |
| 65 | 325 |
| 75 | 375 |
| 85 | 425 |
| 100 | 500 |

## Xulosa va keyingi qadam

CPM va WPM — **bitta ko'nikmaning ikki xil o'lchovi**. Asosiy tushunish:

1. **WPM × 5 = CPM** (asosiy formula)
2. **WPM** xalqaro standart — typing testlar va ish e'lonlarining 95%
3. **CPM** Yevropada va texnik kontekstda — 5%
4. **Net** har doim **Gross**'dan yaxshi (xatolarni hisobga oladi)
5. **Til bo'yicha farq** bor — uzbekcha WPM inglizchadan ~13% past

Bugundan boshlash:

1. **Bosqich 1:** [30 soniyalik testdan o'ting](/uz/tests/30s-medium) — natijada ikkalasi ham
2. **Bosqich 2:** [WPM nima va qanday hisoblanadi](/uz/blog/wpm-nima-va-qanday-olchash) — to'liq qo'llanma
3. **Bosqich 3:** [O'rtacha yozish tezligi qancha](/uz/blog/ortacha-yozish-tezligi) — sizning natijangiz qaerda joylashgan

CPM yoki WPM — tanlang, lekin **doim aniqlikni** birinchi qo'ying. 60 WPM @ 90% aniqlik — 80 WPM @ 70% aniqlikdan **tezroq real ishda**.
`;
