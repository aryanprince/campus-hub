import { add, differenceInWeeks, format } from "date-fns";
import { and, eq, sql } from "drizzle-orm";
import ky from "ky";
import { z } from "zod";

import { env } from "~/env";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { book, transaction } from "~/server/db/schema/main-schema";

export const transactionRouter = createTRPCRouter({
  borrowBook: publicProcedure
    .input(
      z.object({
        bookId: z.string(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      // Check if the book exists
      const checkBook = await db.query.book.findFirst({
        where: eq(book.bookId, input.bookId),
      });

      if (!checkBook?.copies || checkBook.copies <= 0) {
        throw new Error("Book not found or no copies left");
      }

      // Check if user is currently borrowing the book
      const isCurrentlyBorrowing = await db.query.transaction.findFirst({
        where: and(
          and(
            eq(transaction.bookId, input.bookId),
            eq(transaction.userId, input.userId),
          ),
          eq(transaction.status, "ACTIVE"),
        ),
      });

      if (isCurrentlyBorrowing) {
        throw new Error("You are currently borrowing this book");
      }

      // Check if user has borrowed the book before
      const hasBorrowedBefore = await db.query.transaction.findFirst({
        where: and(
          eq(transaction.bookId, input.bookId),
          eq(transaction.userId, input.userId),
        ),
      });

      // If user has borrowed the book before, update the transaction record
      if (hasBorrowedBefore) {
        await db
          .update(transaction)
          .set({
            borrowedDate: new Date(),
            dueDate: add(new Date(), { weeks: 2 }),
            returnedDate: null,
            status: "ACTIVE",
          })
          .where(
            and(
              eq(transaction.bookId, input.bookId),
              eq(transaction.userId, input.userId),
            ),
          );

        // Update the book copies count
        await db
          .update(book)
          .set({
            bookId: input.bookId,
            copies: sql`${book.copies} - 1`,
          })
          .where(eq(book.bookId, input.bookId));
      } else {
        // Create a new transaction record
        await db.insert(transaction).values({
          transactionId: Math.random().toString(36).substring(7),
          bookId: input.bookId,
          userId: input.userId,
          borrowedDate: new Date(),
          dueDate: add(new Date(), { weeks: 2 }),
          returnedDate: null,
          status: "ACTIVE",
        });

        // Update the book copies count
        await db
          .update(book)
          .set({
            bookId: input.bookId,
            copies: sql`${book.copies} - 1`,
          })
          .where(eq(book.bookId, input.bookId));
      }
    }),

  returnBook: publicProcedure
    .input(
      z.object({
        bookId: z.string(),
        userId: z.string(),
        studentNumber: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      // Check if the book exists
      const checkBook = await db.query.book.findFirst({
        where: eq(book.bookId, input.bookId),
      });

      if (!checkBook) {
        throw new Error("Book not found");
      }

      // Check if user has borrowed the book
      const checkTransaction = await db.query.transaction.findFirst({
        where: and(
          eq(transaction.bookId, input.bookId),
          eq(transaction.userId, input.userId),
        ),
      });

      if (!checkTransaction) {
        throw new Error("You have not borrowed this book");
      }

      // Check if the book is overdue
      const currentDate = new Date();
      if (
        checkTransaction.status === "ACTIVE" &&
        currentDate > checkTransaction.dueDate
      ) {
        interface Invoice {
          data: {
            referenceId: string;
          }[];
        }

        // Generate an invoice for the overdue fee
        const data = await ky
          .post(`${env.NEXT_PUBLIC_API_FINANCE_URL}/api/invoices/`, {
            json: {
              amount:
                differenceInWeeks(currentDate, checkTransaction.dueDate) * 10,
              dueDate: format(add(new Date(), { days: 7 }), "yyyy-MM-dd"),
              invoiceType: "LIBRARY_FINE",
              studentId: input.studentNumber,
            },
          })
          .json<Invoice>();

        const referenceId = data.data[0]?.referenceId;

        // Update the transaction record
        await db
          .update(transaction)
          .set({
            bookId: input.bookId,
            userId: input.userId,
            status: "OVERDUE",
            overdueFee:
              differenceInWeeks(currentDate, checkTransaction.dueDate) * 10,
            returnedDate: new Date(),
            invoiceRef: referenceId,
          })
          .where(
            and(
              eq(transaction.bookId, input.bookId),
              eq(transaction.userId, input.userId),
            ),
          );

        return {
          message: "Invoice generated for overdue fee",
          description: `Invoice Ref: ${referenceId}`,
        };
      }

      // Update the transaction record
      await db
        .update(transaction)
        .set({
          bookId: input.bookId,
          userId: input.userId,
          returnedDate: new Date(),
          status: "RETURNED",
        })
        .where(
          and(
            eq(transaction.bookId, input.bookId),
            eq(transaction.userId, input.userId),
          ),
        );

      // Update the book copies count
      await db
        .update(book)
        .set({
          bookId: input.bookId,
          copies: sql`${book.copies} + 1`,
        })
        .where(eq(book.bookId, input.bookId));

      return {
        message: "Book returned",
        description: "Book returned successfully. Thank you!",
      };
    }),

  checkIfUserHasBorrowedBook: publicProcedure
    .input(
      z.object({
        bookId: z.string(),
        userId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      // Check if user has already borrowed the book
      const checkTransaction = await db.query.transaction.findFirst({
        where: and(
          eq(transaction.bookId, input.bookId),
          eq(transaction.userId, input.userId),
        ),
        columns: {
          status: true,
        },
      });

      if (checkTransaction?.status === "ACTIVE") {
        console.log("User has borrowed the book");
        return { hasBorrowedBook: true };
      }

      if (checkTransaction?.status === "RETURNED") {
        console.log("User has returned the book");
        return { hasBorrowedBook: false };
      }

      console.log("User has not borrowed the book");
      return { hasBorrowedBook: false };
    }),
});
