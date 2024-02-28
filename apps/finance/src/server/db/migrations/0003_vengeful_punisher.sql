DO $$ BEGIN
 CREATE TYPE "paymentMethodEnum" AS ENUM('CASH', 'CHEQUE', 'BANK_TRANSFER', 'CREDIT_CARD', 'DEBIT_CARD');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Transaction" (
	"id" serial PRIMARY KEY NOT NULL,
	"invoice_id" varchar NOT NULL,
	"amount" numeric NOT NULL,
	"transaction_date" date NOT NULL,
	"payment_method" "paymentMethodEnum" NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "Invoice" ALTER COLUMN "updatedAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "Invoice" ALTER COLUMN "updatedAt" DROP NOT NULL;