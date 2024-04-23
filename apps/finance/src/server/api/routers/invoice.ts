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
      await db
        .update(invoice)
        .set({
          invoiceStatus: "PAID",
        })
        .where(eq(invoice.referenceId, input.referenceId));
    }),
});
