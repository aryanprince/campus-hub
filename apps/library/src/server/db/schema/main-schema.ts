import { relations } from "drizzle-orm";
import {
  date,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
} from "drizzle-orm/pg-core";

import { session, user } from "./auth-schema";

// ========================================================================
// ENUMS
// ========================================================================

export const transactionStatusEnum = pgEnum("TRANSACTION_STATUS", [
  "ACTIVE",
  "RETURNED",
  "OVERDUE",
]);

// ========================================================================
// Books Table
// ========================================================================

export const book = pgTable(
  "book",
  {
    bookId: text("book_id").primaryKey(),
    isbn: text("isbn").unique(),
    title: text("title"),
    author: text("author"),
    year: integer("year"),
    genre: text("genre"),
    language: text("language"),
    copies: integer("copies"),
    image: text("image"),
    description: text("description"),
  },
  (table) => {
    return {
      isbnIdx: index("isbn_idx").on(table.isbn),
      titleIdx: index("title_idx").on(table.title),
    };
  },
);

export const bookRelations = relations(book, ({ many }) => ({
  transactions: many(transaction),
}));

export type Book = typeof book.$inferSelect;
export type NewBook = typeof book.$inferInsert;

// ========================================================================
// Transactions Table
// ========================================================================

export const transaction = pgTable("transaction", {
  transactionId: text("transaction_id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  bookId: text("book_id")
    .notNull()
    .references(() => book.bookId),
  borrowedDate: date("borrowed_date", { mode: "date" }).notNull(),
  returnedDate: date("returned_date", { mode: "date" }),
  dueDate: date("due_date", { mode: "date" }).notNull(),
  status: transactionStatusEnum("status").notNull(),
});

export const transactionRelations = relations(transaction, ({ one }) => ({
  books: one(book, {
    fields: [transaction.bookId],
    references: [book.bookId],
  }),
}));

export type Transaction = typeof transaction.$inferSelect;
export type NewTransaction = typeof transaction.$inferInsert;

export { session, user };
