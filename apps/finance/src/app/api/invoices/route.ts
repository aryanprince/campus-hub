import { asc, eq } from "drizzle-orm";

import { generateRandomReferenceString } from "~/lib/utils";
import { db } from "~/server/db";
import { financeAccount, invoice } from "~/server/db/schema/main-schema";

type RequestBody = typeof invoice.$inferInsert;

export async function GET(_request: Request) {
  const allInvoices = await db.query.invoice.findMany({
    orderBy: [asc(invoice.invoiceId)],
  });

  if (allInvoices.length === 0) {
    return Response.json({ error: "No invoices found" }, { status: 404 });
  }

  return Response.json({ data: allInvoices }, { status: 200 });
}

export async function POST(request: Request) {
  const requestBody = (await request.json()) as RequestBody;

  try {
    const newInvoice = await db.transaction(async (tx) => {
      // Create a new invoice in the database
      const newlyCreatedInvoice = await tx
        .insert(invoice)
        .values({
          referenceId: generateRandomReferenceString(),
          studentId: requestBody.studentId,
          amount: requestBody.amount,
          invoiceType: requestBody.invoiceType,
          dueDate: requestBody.dueDate,
          updatedAt: new Date(),
        })
        .returning();

      // Update the student graduation eligibility status in the finance account
      await tx
        .update(financeAccount)
        .set({
          hasOutstandingBalance: true,
        })
        .where(eq(financeAccount.studentId, requestBody.studentId));

      return newlyCreatedInvoice;
    });

    // Return the newly created invoice
    return Response.json({ data: newInvoice }, { status: 200 });
  } catch (error) {
    console.error(error);

    // Return a 500 error if the transaction fails
    return Response.json(
      { error: "ERROR: Failed to create invoice" },
      { status: 500 },
    );
  }
}
