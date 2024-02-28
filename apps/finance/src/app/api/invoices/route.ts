import { asc } from "drizzle-orm";

import { generateRandomReferenceString } from "~/lib/utils";
import { db } from "~/server/db";
import { invoice } from "~/server/db/schema";

type RequestBody = typeof invoice.$inferInsert;

export async function GET(_request: Request) {
  const allInvoices = await db.query.invoice.findMany({
    orderBy: [asc(invoice.invoiceId)],
  });

  return Response.json({ data: allInvoices }, { status: 200 });
}

export async function POST(request: Request) {
  const requestBody = (await request.json()) as RequestBody;

  const newInvoice = await db
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

  return Response.json({ data: newInvoice }, { status: 200 });
}
