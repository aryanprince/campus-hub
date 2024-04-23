DO $$ BEGIN
 CREATE TYPE "TRANSACTION_STATUS" AS ENUM('ACTIVE', 'RETURNED', 'OVERDUE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "transaction" RENAME COLUMN "borrowed_at" TO "borrowed_date";--> statement-breakpoint
ALTER TABLE "transaction" RENAME COLUMN "returned_at" TO "returned_date";--> statement-breakpoint
ALTER TABLE "transaction" ALTER COLUMN "returned_date" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "transaction" ADD COLUMN "due_date" date NOT NULL;--> statement-breakpoint
ALTER TABLE "transaction" ADD COLUMN "status" "TRANSACTION_STATUS" NOT NULL;