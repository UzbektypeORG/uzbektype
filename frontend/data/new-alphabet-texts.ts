import { toNewAlphabet } from "@/lib/new-alphabet";

// Practice texts for /yangi-alifbo. Written in the current spelling (easier
// to proofread) and converted once at import, so every oʻ gʻ sh ch becomes
// ö ğ ş ç exactly as the new alphabet writes it. Each text is dense in the
// four changed letters on purpose.

const SOURCE_TEXTS = [
  "Shahar chetidagi bog'da choyxona bor. Ertalab u yerga keksa cholar to'planib, issiq choy ichishadi va o'tgan kunlarni eslashadi. Bog'dagi o'riklar gullaganda shamol shirin hid taratadi, bolalar esa ariq bo'yida o'ynab, qushlarning sayrashini tinglashadi.",
  "O'zbek tili boy va go'zal til. Unda har bir so'zning o'z o'rni bor. Yangi alifboda o'zbek so'zlari qisqaroq va chiroyliroq yoziladi, chunki to'rtta murakkab harf o'rniga yagona harflar ishlatiladi. Bu klaviaturada yozishni osonlashtiradi va xatolarni kamaytiradi.",
  "Qishda tog'larga qalin qor tushadi. Cho'ponlar qo'ylarni pastga, iliq o'tloqlarga haydab tushishadi. Kechqurun o'choq atrofida o'tirib, chalpak pishirishadi va qadimgi dostonlarni o'qishadi. Ertasi kuni quyosh chiqishi bilan yana yo'lga tushishadi.",
  "Bugun maktabda o'quvchilar yangi alifboni o'rganishdi. O'qituvchi doskaga to'rtta harf yozdi va har birining tovushini tushuntirdi. Bolalar o'z ismlarini yangi harflar bilan yozib ko'rishdi. Shoira, Cho'lpon va G'ofur o'z ismlarining o'zgarganidan juda xursand bo'lishdi.",
  "Bozorda sharbat sotuvchi chol qo'shig'ini baland ovozda kuylaydi. Peshtaxtada shaftoli, o'rik, olcha va qovun turibdi. Xaridorlar narxni so'rab, chaqqonlik bilan savdolashishadi. Kechga yaqin bozor bo'shab, ko'chalar sokin tortadi.",
  "Ishga vaqtida kelish yaxshi odat. Ertalab erta turib, choy ichib, rejangizni tuzib oling. Ish kuni davomida kichik tanaffuslar qiling, shunda charchoq kamayadi. Har kuni oz-oz o'rgangan odam yil oxirida katta o'zgarishni sezadi.",
  "Samarqand va Buxoro qadimiy shaharlardir. Ularning ko'chalarida o'rta asrlardan qolgan madrasalar, minoralar va gumbazlar turibdi. Sayyohlar bu go'zal obidalarni ko'rish uchun dunyoning turli chekkalaridan kelishadi va o'zbek xalqining mehmondo'stligidan hayratga tushishadi.",
  "Bog'bon kuzda daraxtlarni sug'oradi va shoxlarini qirqadi. Bahorda esa yangi ko'chatlar o'tqazadi. U har bir o'simlikka xuddi o'z farzandiday g'amxo'rlik qiladi. Shu sababli uning bog'i mahallada eng chiroyli va eng hosildor bog' hisoblanadi.",
];

export const NEW_ALPHABET_TEXTS: string[] = SOURCE_TEXTS.map(toNewAlphabet);
