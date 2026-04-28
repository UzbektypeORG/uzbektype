CREATE TABLE "daily_visit" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"anon_id" varchar(64) NOT NULL,
	"visit_date" date NOT NULL,
	"signed_in" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "daily_visit_anon_date_idx" ON "daily_visit" USING btree ("anon_id","visit_date");--> statement-breakpoint
CREATE INDEX "daily_visit_date_idx" ON "daily_visit" USING btree ("visit_date");