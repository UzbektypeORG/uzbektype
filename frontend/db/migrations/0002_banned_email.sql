CREATE TABLE "banned_email" (
	"email" text PRIMARY KEY NOT NULL,
	"reason" text,
	"user_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "promo_event" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"promo" varchar(40) NOT NULL,
	"event" varchar(16) NOT NULL,
	"anon_id" varchar(64),
	"user_id" uuid,
	"lang" varchar(2),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "banned_email_user_id_idx" ON "banned_email" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "promo_event_promo_idx" ON "promo_event" USING btree ("promo");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "promo_event_created_at_idx" ON "promo_event" USING btree ("created_at");