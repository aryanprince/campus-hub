import { eq } from "drizzle-orm";

import { db } from "~/server/db";
import { invoice } from "~/server/db/schema/main-schema";

export async function DELETE(
  request: Request,
  { params }: { params: { referenceId: string } },
) {
  const referenceId = params.referenceId;

  const deletedInvoice = await db
    .delete(invoice)
    .where(eq(invoice.referenceId, referenceId))
    .returning();

  if (deletedInvoice.length < 1) {
    return Response.json({
      error: `Error! Invoice does not exist (Reference ID: ${referenceId})`,
    });
  }

  return Response.json(
    { message: `Successfully deleted invoice (Refernce ID: ${referenceId})` },
    { status: 200 },
  );
}
