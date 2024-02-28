import type { AdapterAccount } from "next-auth/adapters";
import { relations, sql } from "drizzle-orm";
import {
  boolean,
  date,
  decimal,
  index,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

// ========================================================================
// Enums
// ========================================================================

export const invoiceTypeEnum = pgEnum("InvoiceType", [
  "TUITION_FEES",
  "LIBRARY_FINE",
]);

export const invoiceStatusEnum = pgEnum("InvoiceStatusEnum", [
  "PAID",
  "OUTSTANDING",
  "PARTIALLY_PAID",
  "CANCELLED",
]);

export const paymentMethodEnum = pgEnum("paymentMethodEnum", [
  "CASH",
  "CHEQUE",
  "BANK_TRANSFER",
  "CREDIT_CARD",
  "DEBIT_CARD",
]);

// ========================================================================
// Finance Accounts Table
// ========================================================================

export const financeAccount = pgTable("FinanceAccount", {
  id: serial("id").notNull().primaryKey(),
  studentId: varchar("studentId").unique().notNull(),
  hasOutstandingBalance: boolean("hasOutstandingBalance").default(false),
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

export const invoice = pgTable("Invoice", {
  id: serial("id").notNull().primaryKey(),
  studentId: varchar("studentId").notNull(),
  referenceId: varchar("referenceId").notNull().unique(),
  amount: decimal("amount").notNull(),
  dueDate: date("dueDate").notNull(),
  invoiceType: invoiceTypeEnum("invoiceType").notNull(),
  invoiceStatus: invoiceStatusEnum("invoiceStatus").default("OUTSTANDING"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
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

export const transaction = pgTable("Transaction", {
  id: serial("id").notNull().primaryKey(),
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
    references: [invoice.id],
  }),
}));

// ========================================================================
// Auth Tables
// ========================================================================

export const users = pgTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = pgTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    refresh_token_expires_in: integer("refresh_token_expires_in"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = pgTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);
