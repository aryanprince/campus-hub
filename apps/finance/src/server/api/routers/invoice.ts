import { eq } from "drizzle-orm";
import { z } from "zod";

import { env } from "~/env";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { financeAccount, invoice } from "~/server/db/schema/main-schema";

export const invoiceRouter = createTRPCRouter({
  payInvoice: publicProcedure
    .input(
      z.object({
        referenceId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      await db.transaction(async (tx) => {
        // Update the invoice status to "PAID" in the database
        const invoiceToBePaid = await tx
          .update(invoice)
          .set({
            invoiceStatus: "PAID",
          })
          .where(eq(invoice.referenceId, input.referenceId))
          .returning();

        // Update book transaction status to "RETURNED" in the database, if any
        await fetch(
          `${env.NEXT_PUBLIC_LIBRARY_BASE_URL}/api/book/update-status/${input.referenceId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        // Check if the invoice exists, and return an error if it does not
        if (!invoiceToBePaid || invoiceToBePaid.length < 1) {
          return Response.json({
            error: `Error! Invoice does not exist (Reference ID: ${input.referenceId})`,
          });
        }

        // Check if the invoice has already been paid, and return an error if it has
        if (invoiceToBePaid[0]?.invoiceStatus === "PAID") {
          // Check if all invoices have been paid for the student
          const allInvoicesForStudent = await tx.query.invoice.findMany({
            where: eq(invoice.studentId, invoiceToBePaid[0].studentId),
          });

          // Boolean flag indicating if all invoices have been paid (true if all invoices have been paid, false otherwise)
          const allInvoicesPaid = allInvoicesForStudent.every(
            (invoice) => invoice.invoiceStatus === "PAID",
          );

          // Update student graduation eligibility based on invoice payment status
          if (allInvoicesPaid) {
            await tx
              .update(financeAccount)
              .set({
                hasOutstandingBalance: false,
              })
              .where(
                eq(financeAccount.studentId, invoiceToBePaid[0].studentId),
              );
          }
        }

        return invoiceToBePaid;
      });
    }),
});
