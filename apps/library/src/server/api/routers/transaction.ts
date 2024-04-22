import { add } from "date-fns";
import { and, eq, sql } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { book, transaction } from "~/server/db/schema/main-schema";

export const transactionRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  borrowNewBook: publicProcedure
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

      // Check if user has already borrowed the book
      const checkTransaction = await db.query.transaction.findFirst({
        where: and(
          eq(transaction.bookId, input.bookId),
          eq(transaction.userId, input.userId),
        ),
      });

      if (checkTransaction) {
        throw new Error("You have already borrowed this book");
      }

      // Create a new transaction record
      await db.insert(transaction).values({
        bookId: input.bookId,
        userId: input.userId,
        borrowedAt: new Date(),
        returnedAt: add(new Date(), { weeks: 2 }),
        transactionId: Math.random().toString(36).substring(7),
      });

      // Update the book copies count
      await db
        .update(book)
        .set({
          bookId: input.bookId,
          copies: sql`${book.copies} - 1`,
        })
        .where(eq(book.bookId, input.bookId));
    }),
});
