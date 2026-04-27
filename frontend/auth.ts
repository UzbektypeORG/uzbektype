import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { unstable_noStore as noStore } from "next/cache";
import { eq } from "drizzle-orm";
import { db, users } from "@/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [Google],
  session: { strategy: "database" },
  callbacks: {
    async session({ session, user, trigger, newSession }) {
      if (!session.user) return session;

      // Opt out of every caching layer so we always read the latest user row.
      noStore();

      // The `user` arg from the adapter can be served from a cached fetch
      // result on Next.js + Neon HTTP. Re-querying via Drizzle inside the
      // `noStore()` scope guarantees a fresh row including firstName,
      // lastName, and avatarUrl that the user may have just edited.
      const [dbUser] = await db
        .select()
        .from(users)
        .where(eq(users.id, user.id))
        .limit(1);
      const source = dbUser ?? user;
      const u = source as typeof user & {
        firstName?: string | null;
        lastName?: string | null;
        avatarUrl?: string | null;
      };
      session.user.id = user.id;

      // When `update({ user: {...} })` is called from the client we receive
      // the payload here as `newSession`. Prefer those values so the UI can
      // reflect very recent edits without waiting for the next request.
      const fresh = (trigger === "update" && newSession?.user) ? newSession.user : null;
      session.user.firstName = fresh?.firstName ?? u.firstName ?? null;
      session.user.lastName = fresh?.lastName ?? u.lastName ?? null;
      session.user.avatarUrl = fresh?.avatarUrl ?? u.avatarUrl ?? null;

      return session;
    },
  },
});
