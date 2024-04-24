import { eq } from "drizzle-orm";

import { db } from "~/server/db";
import { transaction } from "~/server/db/schema/main-schema";

export async function POST(
  request: Request,
  { params }: { params: { invoiceId: string } },
) {
  // Fetch the invoice ID from the request parameters
  const invoiceId = params.invoiceId;

  // Find the transaction with the provided invoice ID
  const fetchBookTransaction = await db.query.transaction.findFirst({
    where: eq(transaction.invoiceRef, invoiceId),
  });

  // If no transaction is found, return a 404 response
  if (!fetchBookTransaction) {
    return Response.json(
      { message: "No transaction found with the provided invoice id" },
      { status: 404 },
    );
  }

  // If the transaction status is already "RETURNED", return a 400 response
  if (fetchBookTransaction.status === "RETURNED") {
    return Response.json(
      { message: "Transaction already marked as returned" },
      { status: 400 },
    );
  }

  // Update the transaction status to "RETURNED" if the transaction is found
  await db
    .update(transaction)
    .set({
      status: "RETURNED",
    })
    .where(eq(transaction.invoiceRef, invoiceId));

  // Return a success response
  return Response.json(
    { success: true, message: "Transaction status updated to RETURNED" },
    { status: 200 },
  );
}
