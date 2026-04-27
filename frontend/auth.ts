import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import { db, users } from "@/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [Google],
  session: { strategy: "database" },
  callbacks: {
    async session({ session, user, trigger, newSession }) {
      if (!session.user) return session;

      // Always re-read the user row directly to dodge any cached query results.
      // The `user` arg is supposed to be fresh, but Auth.js + Drizzle + Neon HTTP
      // can return stale data depending on Next.js fetch cache behaviour.
      const [dbUser] = await db.select().from(users).where(eq(users.id, user.id)).limit(1);
      const source = dbUser ?? user;
      const u = source as typeof user & {
        firstName?: string | null;
        lastName?: string | null;
        avatarUrl?: string | null;
      };
      session.user.id = user.id;

      // When `update({ user: {...} })` is called from the client we get the
      // payload here as `newSession`. Prefer those values so the UI reflects
      // recent edits immediately, falling back to the DB record otherwise.
      const fresh = (trigger === "update" && newSession?.user) ? newSession.user : null;
      session.user.firstName = fresh?.firstName ?? u.firstName ?? null;
      session.user.lastName = fresh?.lastName ?? u.lastName ?? null;
      session.user.avatarUrl = fresh?.avatarUrl ?? u.avatarUrl ?? null;

      return session;
    },
  },
});
