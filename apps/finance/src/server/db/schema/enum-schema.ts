import { pgEnum } from "drizzle-orm/pg-core";

// ========================================================================
// Enums
// ========================================================================

export const invoiceTypeEnum = pgEnum("INVOICE_TYPE", [
  "TUITION_FEES",
  "LIBRARY_FINE",
]);

export const invoiceStatusEnum = pgEnum("INVOICE_STATUS", [
  "PAID",
  "OUTSTANDING",
  "PARTIALLY_PAID",
  "CANCELLED",
]);

export const paymentMethodEnum = pgEnum("PAYMENT_METHOD", [
  "CASH",
  "CHEQUE",
  "BANK_TRANSFER",
  "CREDIT_CARD",
  "DEBIT_CARD",
]);
