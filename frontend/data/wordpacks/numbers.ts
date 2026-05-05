import type { Difficulty } from "@/types";

// Number-focused typing snippets. Easy = pure number rows / sequences;
// medium = realistic mixed text with dates, prices, units; hard = scientific
// notation and full numerical formats. No fabrication — all data shapes are
// real-world conventions.
export const numbersTexts: Record<Difficulty, string[]> = {
  easy: [
    "1 2 3 4 5 6 7 8 9 0 11 22 33 44 55 66 77 88 99 100 200 300 400 500 1000 2000 3000 4000 5000",
    "My phone is 555-1234. Call me at 9 in the morning. The price is 50 dollars and 25 cents today.",
    "Year 2024. Month 12. Day 31. Time 23 59. Temperature 72 degrees. Distance 100 meters total.",
    "I have 5 apples, 10 oranges, 15 bananas, 20 grapes, and 25 berries in the basket every day.",
    "The car drove 60 miles per hour for 3 hours and covered 180 miles in total during the trip.",
    "Score 95 out of 100. Rank 7 of 250. Time 4 minutes 30 seconds. Total points 1450 in the round.",
    "Room 204, Floor 3, Building 12, Block A. Postal code 100000. Phone +998 90 123 45 67 today.",
    "Add 25 plus 17 equals 42. Multiply 8 by 9 equals 72. Divide 144 by 12 equals 12. Subtract 10.",
    "The store opens at 8 30 and closes at 22 00. Lunch break is from 13 00 to 14 00 every day.",
    "On 15 March 2024, 1500 students completed the test with an average score of 78 out of 100.",
  ],
  medium: [
    "The meeting is scheduled for 2024-05-15 at 14:30. Conference room 201, building 5, floor 3 today.",
    "Invoice #12345 totals $1,234.56 with 8% tax included. Payment due by 30/06/2024 at the latest.",
    "Stock prices: AAPL 175.50, GOOG 142.80, MSFT 410.25, TSLA 245.60, AMZN 178.90 closed today.",
    "Distance 5.5 km. Speed 25 km/h. Time 13 minutes. Weight 65.2 kg. Height 175 cm precisely.",
    "Order quantity: 250 units. Price per unit: $19.99. Discount: 15%. Total: $4,247.13 was final.",
    "Flight UZ-301 departs at 06:45 from Gate B12. Boarding 06:15. Arrival 09:20 at terminal 2.",
    "Population 36,800,000. Area 448,978 km². Density 82 per km². GDP $80.4 billion measured 2023.",
    "Workout: 3 sets of 12 reps at 50 kg. Rest 60 seconds. Total time 45 minutes. Calories 320 burned.",
    "Recipe: 250g flour, 100g sugar, 2 eggs, 50ml milk, 1 tsp salt. Bake at 180°C for 25 minutes.",
    "Server log: 200 OK at 14:32:15. 404 error at 14:35:42. 500 error at 14:38:01. 99.8% uptime hit.",
  ],
  hard: [
    "The molecular weight is 1.234 × 10^23 g/mol. Avogadro constant: 6.022 × 10^23 per mole exactly.",
    "Coordinates: 40.7128°N, 74.0060°W. Population: 8,336,817. Area: 783.8 km². Density: 10,194/km².",
    "GDP 2023: $25,462,700,000,000. Growth rate 2.5%. Inflation 3.4%. Unemployment 3.8% reported.",
    "Pi = 3.14159265358979. e = 2.71828182845904. Golden ratio = 1.61803398874989 mathematical.",
    "Server response: 200 OK, 150ms, 2048 bytes. Status: 99.9% uptime, 45ms avg latency observed.",
    "Bitcoin price: $67,432.18 (+2.34%). Ethereum: $3,421.55 (-0.87%). Volume 24h: $42.5B trading.",
    "DNA sequence: ATCG repeats 1,000,000 times. Mutation rate 1.6 × 10^-8 per base per generation.",
    "Mortgage: $450,000 at 6.875% APR for 30 years. Monthly payment $2,956.42. Total $1,064,311 paid.",
    "Equation: y = 3.5x² + 2.7x - 4.2 = 0. Solutions: x = 0.829 or x = -1.600 (verified numerically).",
    "Network: 192.168.1.1/24. MAC: 00:1A:2B:3C:4D:5E. Throughput: 1.25 Gbps. Latency: 0.8ms peak.",
  ],
};
