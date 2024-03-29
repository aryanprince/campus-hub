import { eq } from "drizzle-orm";

import { db } from "~/server/db";
import { invoice } from "~/server/db/schema/main-schema";

export async function PUT(
  request: Request,
  { params }: { params: { referenceId: string } },
) {
  const referenceId = params.referenceId;

  const cancelledInvoice = await db
    .update(invoice)
    .set({
      invoiceStatus: "CANCELLED",
    })
    .where(eq(invoice.referenceId, referenceId))
    .returning();

  console.log(cancelledInvoice);

  if (!cancelledInvoice || cancelledInvoice.length < 1) {
    return Response.json({
      error: `Error! Invoice does not exist (Reference ID: ${referenceId})`,
    });
  }

  return Response.json(
    {
      message: `Successfully cancelled invoice (Reference ID: ${referenceId})`,
      data: {
        cancelledInvoice,
      },
    },
    { status: 200 },
  );
}
