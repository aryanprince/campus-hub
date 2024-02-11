import { eq } from "drizzle-orm";

import { db } from "~/server/db";
import { Invoice } from "~/server/db/schema";

export async function PUT(
  request: Request,
  { params }: { params: { referenceId: string } },
) {
  const referenceId = params.referenceId;

  const paidInvoice = await db
    .update(Invoice)
    .set({
      invoiceStatus: "PAID",
    })
    .where(eq(Invoice.referenceId, referenceId))
    .returning();

  console.log(paidInvoice);

  if (!paidInvoice || paidInvoice.length < 1) {
    return Response.json({
      error: `Error! Invoice does not exist (Reference ID: ${referenceId})`,
    });
  }

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
