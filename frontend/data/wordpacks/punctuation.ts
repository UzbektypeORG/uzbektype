import type { Difficulty } from "@/types";

// Punctuation-focused snippets. Each text emphasises a different mark
// density — easy stays with the basics (. , ! ? ; :), medium adds quotes,
// dashes, and parentheses, and hard introduces brackets, slashes, and
// inline-code style marks. All sentences are real English prose, not
// random punctuation strings.
export const punctuationTexts: Record<Difficulty, string[]> = {
  easy: [
    "Hello, world! How are you today? I am fine. Thank you for asking; it means a lot to me.",
    "She said, \"I love this book!\" He replied, \"Me too, but the ending was sad.\" They laughed.",
    "First: read carefully. Second: take notes. Third: review your work. Finally: ask questions.",
    "It was a long day, but a good one. We worked, we laughed, we rested; tomorrow brings more.",
    "Please remember the basics: eat well, sleep well, move often. Small habits, big difference.",
    "The list includes apples, oranges, bananas, and grapes. We also need bread, milk, and eggs.",
    "Are you ready? The test starts now! Focus on accuracy, then speed. You can do this; trust it.",
    "Coffee, tea, water, juice — pick one. I prefer water; it is simple, clean, and free of sugar.",
    "Write clearly. Type slowly. Check your work. Repeat the process; consistency beats intensity.",
    "Wait! Did you hear that? Yes, I did. It sounded close. Let us be careful, and stay together.",
  ],
  medium: [
    "The meeting (scheduled for 3:00 PM) was cancelled — again. I'm not surprised; it happens often.",
    "Reference (Smith, 2023) suggests that 50% of users prefer mobile-first design. Read more here.",
    "It's a \"win-win\" situation: cost-effective, time-saving, and — most importantly — fun overall.",
    "She asked, \"Why now?\" He answered, \"Because waiting won't help.\" They moved forward together.",
    "The product (launched in May) sold out quickly — really quickly. Demand exceeded all forecasts.",
    "Rule #1: don't panic. Rule #2: read carefully. Rule #3: when in doubt — refer back to Rule #1.",
    "He wrote: \"It's not the destination — it's the journey.\" She agreed; the words rang truthful.",
    "Tomorrow's agenda (subject to change): breakfast, review, work, lunch — and then more work.",
    "The sign read: \"Open 9-5, Mon-Fri.\" We arrived at 4:55; the door was already locked. Strange!",
    "I love three things: my family, my work, and a quiet evening — preferably with a good book.",
  ],
  hard: [
    "Email me at name@example.com. The hashtag #typing is trending. Use *bold* and _italic_ for style.",
    "Code: `const x = (a > b) ? \"yes\" : \"no\";` — read it carefully! The ternary operator is powerful.",
    "CSS rule: { color: #fff; background: rgba(0, 0, 0, 0.5); } — use vendor prefixes when needed!",
    "Path: /usr/local/bin/node — version 18.17.0 (LTS). Run `npm install --save-dev` for dev tools.",
    "URL: https://example.com/path?query=hello&page=2#section — note the &, ?, and # separators.",
    "Markdown: **bold**, _italic_, `code`, [link](url), and > quote — each mark serves a purpose.",
    "Math: (a + b)² = a² + 2ab + b². Note the ², the parentheses, and the precise spacing of terms.",
    "JSON: { \"name\": \"Ali\", \"age\": 30, \"tags\": [\"dev\", \"writer\"] } — quotes and brackets matter.",
    "Time formats: 14:30:45.123 (HH:MM:SS.ms), 2024-05-15T14:30Z (ISO-8601), or 5/15/24 (US-style).",
    "Symbols mix: @user said #hello to ~everyone! Cost: $19.99 + 8% tax = $21.59 (rounded up neatly).",
  ],
};
