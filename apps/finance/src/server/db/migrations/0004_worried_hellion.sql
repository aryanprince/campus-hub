ALTER TABLE "FinanceAccount" RENAME TO "finance_account";--> statement-breakpoint
ALTER TABLE "Invoice" RENAME TO "invoice";--> statement-breakpoint
ALTER TABLE "Transaction" RENAME TO "transaction";--> statement-breakpoint
ALTER TABLE "finance_account" RENAME COLUMN "studentId" TO "student_id";--> statement-breakpoint
ALTER TABLE "finance_account" RENAME COLUMN "hasOutstandingBalance" TO "has_outstanding_balance";--> statement-breakpoint
ALTER TABLE "invoice" RENAME COLUMN "studentId" TO "student_id";--> statement-breakpoint
ALTER TABLE "invoice" RENAME COLUMN "referenceId" TO "reference_id";--> statement-breakpoint
ALTER TABLE "invoice" RENAME COLUMN "dueDate" TO "due_date";--> statement-breakpoint
ALTER TABLE "invoice" RENAME COLUMN "invoiceType" TO "invoice_type";--> statement-breakpoint
ALTER TABLE "invoice" RENAME COLUMN "invoiceStatus" TO "invoice_status";--> statement-breakpoint
ALTER TABLE "invoice" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "invoice" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "finance_account" DROP CONSTRAINT "FinanceAccount_studentId_unique";--> statement-breakpoint
ALTER TABLE "invoice" DROP CONSTRAINT "Invoice_referenceId_unique";--> statement-breakpoint
ALTER TABLE "finance_account" ADD CONSTRAINT "finance_account_student_id_unique" UNIQUE("student_id");--> statement-breakpoint
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_reference_id_unique" UNIQUE("reference_id");