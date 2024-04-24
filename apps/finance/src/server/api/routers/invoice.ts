import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { invoice } from "~/server/db/schema/main-schema";

export const invoiceRouter = createTRPCRouter({
  payInvoice: publicProcedure
    .input(
      z.object({
        referenceId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      // Update the invoice status to "PAID" in the database
      await db
        .update(invoice)
        .set({
          invoiceStatus: "PAID",
        })
        .where(eq(invoice.referenceId, input.referenceId));

      // Update book transaction status to "RETURNED" in the database, if any
      await fetch(
        `http://localhost:3002/api/book/update-status/${input.referenceId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }),
});
