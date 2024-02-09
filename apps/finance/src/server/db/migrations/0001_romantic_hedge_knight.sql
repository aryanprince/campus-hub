DO $$ BEGIN
 CREATE TYPE "InvoiceStatusEnum" AS ENUM('PAID', 'OUTSTANDING', 'PARTIALLY_PAID', 'CANCELLED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "InvoiceType" AS ENUM('TUITION_FEES', 'LIBRARY_FINE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "FinanceAccount" (
	"id" serial PRIMARY KEY NOT NULL,
	"studentId" varchar NOT NULL,
	"hasOutstandingBalance" boolean DEFAULT false,
	CONSTRAINT "FinanceAccount_studentId_unique" UNIQUE("studentId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Invoice" (
	"id" serial PRIMARY KEY NOT NULL,
	"studentId" varchar NOT NULL,
	"referenceId" varchar NOT NULL,
	"amount" numeric NOT NULL,
	"dueDate" date NOT NULL,
	"invoiceType" "InvoiceType" NOT NULL,
	"invoiceStatus" "InvoiceStatusEnum" DEFAULT 'OUTSTANDING',
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp NOT NULL,
	CONSTRAINT "Invoice_studentId_unique" UNIQUE("studentId"),
	CONSTRAINT "Invoice_referenceId_unique" UNIQUE("referenceId")
);
