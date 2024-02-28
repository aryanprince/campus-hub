import { relations } from "drizzle-orm";
import {
  boolean,
  date,
  decimal,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import {
  accounts,
  accountsRelations,
  sessions,
  sessionsRelations,
  users,
  usersRelations,
  verificationTokens,
} from "./auth-schema";
import {
  invoiceStatusEnum,
  invoiceTypeEnum,
  paymentMethodEnum,
} from "./enum-schema";

// ========================================================================
// Finance Accounts Table
// ========================================================================

export const financeAccount = pgTable("finance_account", {
  financeAccountId: serial("finance_account_id").notNull().primaryKey(),
  studentId: varchar("student_id").unique().notNull(),
  hasOutstandingBalance: boolean("has_outstanding_balance").default(false),
});

export const financeAccountRelations = relations(
  financeAccount,
  ({ many }) => ({
    invoices: many(invoice),
  }),
);

// ========================================================================
// Invoices Table
// ========================================================================

export const invoice = pgTable("invoice", {
  invoiceId: serial("invoice_id").notNull().primaryKey(),
  studentId: varchar("student_id").notNull(),
  referenceId: varchar("reference_id").notNull().unique(),
  amount: decimal("amount").notNull(),
  dueDate: date("due_date").notNull(),
  invoiceType: invoiceTypeEnum("invoice_type").notNull(),
  invoiceStatus: invoiceStatusEnum("invoice_status").default("OUTSTANDING"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const invoiceRelations = relations(invoice, ({ one, many }) => ({
  financeAccounts: one(financeAccount, {
    fields: [invoice.studentId],
    references: [financeAccount.studentId],
  }),
  transactions: many(transaction),
}));

// ========================================================================
// Transactions Table
// ========================================================================

export const transaction = pgTable("transaction", {
  transactionId: serial("transaction_id").notNull().primaryKey(),
  invoiceId: varchar("invoice_id").notNull(),
  amount: decimal("amount").notNull(),
  transactionDate: date("transaction_date").notNull(),
  paymentMethod: paymentMethodEnum("payment_method").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const transactionRelations = relations(transaction, ({ one }) => ({
  invoice: one(invoice, {
    fields: [transaction.invoiceId],
    references: [invoice.invoiceId],
  }),
}));

export {
  accounts,
  accountsRelations,
  invoiceStatusEnum,
  invoiceTypeEnum,
  paymentMethodEnum,
  sessions,
  sessionsRelations,
  users,
  usersRelations,
  verificationTokens,
};
