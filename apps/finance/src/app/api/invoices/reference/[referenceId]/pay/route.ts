import { eq } from "drizzle-orm";

import { db } from "~/server/db";
import { financeAccount, invoice } from "~/server/db/schema/main-schema";

export async function PUT(
  request: Request,
  { params }: { params: { referenceId: string } },
) {
  const referenceId = params.referenceId;

  const paidInvoice = await db.transaction(async (tx) => {
    // Update the invoice status to "PAID" in the database
    const invoiceToBePaid = await tx
      .update(invoice)
      .set({
        invoiceStatus: "PAID",
      })
      .where(eq(invoice.referenceId, referenceId))
      .returning();

    console.log(invoiceToBePaid);

    // Check if the invoice exists, and return an error if it does not
    if (!invoiceToBePaid || invoiceToBePaid.length < 1) {
      return Response.json({
        error: `Error! Invoice does not exist (Reference ID: ${referenceId})`,
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
          .where(eq(financeAccount.studentId, invoiceToBePaid[0].studentId));
      }
    }

    return invoiceToBePaid;
  });

  // Return a success message if the invoice was successfully paid
  return Response.json(
    {
      message: `Successfully paid invoice (Reference ID: ${referenceId})`,
      data: {
        paidInvoice,
      },
    },
    { status: 200 },
  );
}
