import { eq } from "drizzle-orm";

import { db } from "~/server/db";
import { Invoice } from "~/server/db/schema";

export async function GET(
  request: Request,
  { params }: { params: { referenceId: string } },
) {
  const referenceId = params.referenceId;

  const invoice = await db.query.Invoice.findFirst({
    where: eq(Invoice.referenceId, referenceId),
  });

  return Response.json(invoice, { status: 200 });
}
