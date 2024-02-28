import { eq } from "drizzle-orm";

import { db } from "~/server/db";
import { invoice } from "~/server/db/schema";

export async function GET(
  request: Request,
  { params }: { params: { referenceId: string } },
) {
  const referenceId = params.referenceId;

  const currentInvoice = await db.query.invoice.findFirst({
    where: eq(invoice.referenceId, referenceId),
  });

  return Response.json(currentInvoice, { status: 200 });
}
