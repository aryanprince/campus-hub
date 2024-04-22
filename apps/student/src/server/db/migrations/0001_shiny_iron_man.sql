DROP INDEX IF EXISTS "student_id_idx";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "student_id_idx" ON "enrollment" ("student_id");