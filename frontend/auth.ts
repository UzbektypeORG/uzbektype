import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [Google],
  session: { strategy: "database" },
  callbacks: {
    async session({ session, user, trigger, newSession }) {
      if (!session.user) return session;

      const u = user as typeof user & {
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
