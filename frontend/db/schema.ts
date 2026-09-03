import {
  pgTable,
  text,
  timestamp,
  primaryKey,
  integer,
  uuid,
  decimal,
  varchar,
  index,
  uniqueIndex,
  date,
  boolean,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "next-auth/adapters";

// ─── Auth.js core tables (users, accounts, sessions, verification_tokens) ──
// Schema follows the @auth/drizzle-adapter conventions.

export const users = pgTable("user", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),

  // Custom profile fields (set via /profile page after sign-in)
  firstName: text("first_name"),
  lastName: text("last_name"),
  avatarUrl: text("avatar_url"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const accounts = pgTable(
  "account",
  {
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    primaryKey({ columns: [account.provider, account.providerAccountId] }),
  ]
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => [primaryKey({ columns: [vt.identifier, vt.token] })]
);

// ─── Application tables ────────────────────────────────────────────────────

export const testResults = pgTable(
  "test_result",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    language: varchar("language", { length: 2 }).notNull(), // 'uz' | 'en' | 'ru'
    testType: varchar("test_type", { length: 4 }).notNull(), // '10s' | '30s' | '60s' | '10w' | '30w' | '60w'
    difficulty: varchar("difficulty", { length: 6 }).notNull(), // 'easy' | 'medium' | 'hard'

    wpm: integer("wpm").notNull(),
    accuracy: decimal("accuracy", { precision: 5, scale: 2 }).notNull(),
    stars: integer("stars").notNull(),
    correctChars: integer("correct_chars").notNull(),
    correctedChars: integer("corrected_chars").notNull().default(0),
    incorrectChars: integer("incorrect_chars").notNull(),
    totalChars: integer("total_chars").notNull(),
    timeElapsed: decimal("time_elapsed", { precision: 10, scale: 2 }).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("test_result_user_id_idx").on(table.userId),
    index("test_result_created_at_idx").on(table.createdAt),
    // Composite index supports leaderboard queries:
    //   WHERE test_type = ? AND difficulty = ? ORDER BY wpm DESC
    index("test_result_leaderboard_idx").on(
      table.testType,
      table.difficulty,
      table.wpm
    ),
  ]
);

// One row per promo interaction (impression / click / dismiss). Powers the
// admin "Reklama" analytics: how many users saw each promo, how many clicked
// the CTA, how many dismissed it. anon_id (same id as daily_visit) gives the
// unique-user count without needing an auth lookup on this hot path.
export const promoEvents = pgTable(
  "promo_event",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    promo: varchar("promo", { length: 40 }).notNull(), // 'uzbektype_modal'
    event: varchar("event", { length: 16 }).notNull(), // 'impression' | 'click' | 'dismiss'
    anonId: varchar("anon_id", { length: 64 }),
    userId: uuid("user_id"),
    lang: varchar("lang", { length: 2 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("promo_event_promo_idx").on(table.promo),
    index("promo_event_created_at_idx").on(table.createdAt),
  ]
);

// One row per browser per day. Anonymous and signed-in browsers both ping;
// the signedIn flag lets the admin panel break down totals.
export const dailyVisits = pgTable(
  "daily_visit",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    anonId: varchar("anon_id", { length: 64 }).notNull(),
    visitDate: date("visit_date").notNull(),
    signedIn: boolean("signed_in").notNull().default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("daily_visit_anon_date_idx").on(table.anonId, table.visitDate),
    index("daily_visit_date_idx").on(table.visitDate),
  ]
);
