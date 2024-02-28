import { eq } from "drizzle-orm";

import { db } from "~/server/db";
import { invoice } from "~/server/db/schema";

export async function GET(
  request: Request,
  { params }: { params: { id: number } },
) {
  const id = params.id;

  const currentInvoice = await db.query.invoice.findFirst({
    where: eq(invoice.invoiceId, id),
  });

  return Response.json(currentInvoice, { status: 200 });
}
