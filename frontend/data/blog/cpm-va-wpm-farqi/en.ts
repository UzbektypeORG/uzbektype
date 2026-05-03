// EN content for blog post: "CPM vs WPM — Which One Should You Use"
// Target keyword: cpm vs wpm difference (CLUSTER → what-is-wpm-typing-speed)

export const enContent = `## One-line answer

**CPM** = Characters Per Minute. **WPM** = Words Per Minute. They link via a simple formula: **WPM × 5 = CPM**. So 60 WPM = 300 CPM. WPM is the international standard; CPM is mostly used in Europe and technical tests.

But behind that simple formula are several nuances. In this article:

- The exact formulas with examples
- Which sites use which metric
- Which one *you* need
- Language-specific differences (English, Russian, Uzbek)
- Which metric job ads typically ask for

If you want to measure right now — [take the free 30-second test](/en/tests/30s-medium); the result shows both.

## Core formulas

### WPM formula

\`\`\`
WPM = (characters typed / 5) / (time in minutes)
\`\`\`

Where **5 characters = 1 word** (the international standard set in 1929 by August Dvorak).

**Example:** you type 300 characters (with spaces) in 60 seconds:
- 300 / 5 = 60 words
- 60 seconds = 1 minute
- WPM = 60

### CPM formula

\`\`\`
CPM = characters typed / (time in minutes)
\`\`\`

No division by 5 — just raw character count.

**Example:** same test:
- 300 characters / 1 minute = 300 CPM

### Conversion table

| WPM | CPM (approx) |
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

Mental shortcut: **append a 0 to the WPM and multiply by 5**. 60 WPM → 300 CPM.

## Why two different metrics exist

Historical reasons:

**WPM** (1929) — introduced in the typewriter era. Goal — fair comparison: assessing without worrying about word length.

**CPM** — used in technical fields (mechanical typewriters, telegraph lines). Reason — every character was a separate "signal," no need for a "word" abstraction.

Today:
- **WPM** — 95% of internet typing tests, job postings
- **CPM** — European typing courses (Germany, France), technical standards (DIN 5008), telegraphy

## Which sites use which

| Site | Primary metric | Note |
|---|---|---|
| **UzbekType.uz** | WPM | CPM also displayed |
| **Monkeytype.com** | WPM | "Raw" WPM and Net WPM |
| **10fastfingers.com** | WPM | CPM hidden |
| **Keybr.com** | WPM | WPM only |
| **Typing.com** | WPM | + Adjusted WPM |
| **Ratatype.com** | WPM | Certificate uses WPM |
| **Schreibtrainer.com (DE)** | CPM | European standard |
| **TippLift (DE)** | CPM | Primary KPI |
| **Klavogonki.ru** | Chars/min | Russian "ZPM" |
| **Sense-lang.org** | WPM | + CPM secondary |

Clear rule: **English-leaning sites use WPM**, **German/European sites use CPM**.

## Language differences

The 5-character standard is **English-tuned**. In other languages it's slightly unfair:

| Language | Avg word length | WPM coefficient |
|---|---|---|
| English | 4.7 chars | 1.0 (baseline) |
| Uzbek | 5.4 chars | 0.87 (~13% lower) |
| Russian | 5.3 chars | 0.89 (~11% lower) |
| German | 6.3 chars | 0.75 (~25% lower) |
| Japanese (rōmaji) | 4.0 chars | 1.18 (~18% higher) |
| Italian | 5.0 chars | 0.94 (~6% lower) |

**Practical implication:** if you hit 60 WPM in English, you'll show 52-55 WPM in Uzbek — that's the **same skill**.

CPM is immune to this — its unit is **characters**, not **words**. Some prefer CPM for **internationally fair comparison**.

### About Russian "ZPM"

The Russian typing community uses **ZPM** (знаков в минуту) — exactly CPM. Klavogonki.ru and other Russian sites display this metric.

Conversion:
- ZPM = CPM
- ZPM ÷ 5 ≈ English WPM
- ZPM ÷ 6 ≈ Russian "WPM" (accounting for word length)

## Net vs Gross — another nuance

Both WPM and CPM come in two flavors:

### Gross (raw)

Counts **all characters typed**, ignores errors.

\`\`\`
Gross WPM = all characters / 5 / time
\`\`\`

### Net (clean)

Penalizes errors, shows real result.

\`\`\`
Net WPM = Gross WPM − (errors / time)
\`\`\`

**Example:** 67 Gross WPM, 6 errors in 45 seconds:
- Errors/min = 6 / 0.75 = 8
- Net WPM = 67 − 8 = 59

Most sites show **Net** because Gross is "fake speed" — in real work, errors must be fixed later.

## Which metric you need

By context:

### If you're job-hunting in the US/UK

**WPM** — that's what listings ask for. CPM is rarely mentioned.

Typical requirements:
- Standard office: 30+ WPM
- Secretary: 60+ WPM
- Customer support: 50+ WPM
- Data entry: 70+ WPM

### If you're applying to a German/European company

**Both CPM and WPM** are useful. German companies usually ask CPM (300+ CPM = standard, 400+ CPM = good).

### If you compete in the typing community

**WPM** — global standard. Monkeytype, TypeRacer leaderboards are in WPM. Quoting CPM here looks odd.

### If you're taking a certified test

Ratatype and other certificate sites use **WPM**. The certificate displays this number.

### If you're a developer

WPM is fine but not the main metric. **Special-character speed** matters more for developers. CPM helps here — every character counts in code.

## Frequently asked questions

**How do I measure both WPM and CPM at once?**

[Take the UzbekType 30-second test](/en/tests/30s-medium) — the result shows both WPM and CPM. Many other sites display only WPM.

**Does a mechanical keyboard boost CPM more than WPM?**

No, they scale together. A mechanical keyboard lifts overall speed by 2-5% — both WPM and CPM equally.

**A job posting says "300 CPM" — how much WPM is that?**

300 CPM = 60 WPM. Standard mid-tier office worker speed.

**Can WPM be 100 but CPM 700?**

No. WPM 100 means CPM 500. CPM 700 = WPM 140 — pro-tier territory. Either the site is buggy or the formula is wrong.

**Are smartphone test results valid?**

No. Touch-screen keyboards use different muscle memory. Phone WPM ≠ desktop WPM. Only measure on a full physical keyboard.

**Which metric is best for kids?**

WPM — "30 words" is more concrete to a child than "150 characters." Schools also use WPM.

## Concrete conversion calculator

| Your result | Conversion |
|---|---|
| 250 CPM | = 50 WPM |
| 300 CPM | = 60 WPM |
| 350 CPM | = 70 WPM |
| 400 CPM | = 80 WPM |
| 500 CPM | = 100 WPM |
| 600 CPM | = 120 WPM |
| 750 CPM | = 150 WPM |
| 1000 CPM | = 200 WPM (world tier) |

The other way:

| Your WPM | CPM |
|---|---|
| 25 | 125 |
| 35 | 175 |
| 45 | 225 |
| 55 | 275 |
| 65 | 325 |
| 75 | 375 |
| 85 | 425 |
| 100 | 500 |

## Conclusion and next step

CPM and WPM are **two views on the same skill**. Core takeaways:

1. **WPM × 5 = CPM** (the master formula)
2. **WPM** is the international standard — 95% of typing tests and job ads
3. **CPM** for Europe and technical contexts — 5%
4. **Net** is always better than **Gross** (counts errors)
5. **Language differences** matter — Uzbek WPM is ~13% lower than English

Start today:

1. **Step 1:** [Take the 30-second test](/en/tests/30s-medium) — both metrics show in the result
2. **Step 2:** [What is WPM and how to measure typing speed](/en/blog/what-is-wpm-typing-speed) — full guide
3. **Step 3:** [Average typing speed — benchmarks](/en/blog/average-typing-speed) — see where your number lands

CPM or WPM — pick one, but always put **accuracy first**. 60 WPM @ 90% accuracy beats 80 WPM @ 70% accuracy in real work.
`;
