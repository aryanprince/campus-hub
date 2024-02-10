import { asc } from "drizzle-orm";
import { generateRandomReferenceString } from "~/lib/utils";
import { db } from "~/server/db";
import { Invoice } from "~/server/db/schema";

type RequestBody = typeof Invoice.$inferInsert;

export async function GET(_request: Request) {
  const invoices = await db.query.Invoice.findMany({
    orderBy: [asc(Invoice.id)],
  });

  return Response.json({ data: invoices }, { status: 200 });
}

export async function POST(request: Request) {
  const requestBody = (await request.json()) as RequestBody;

  const newInvoice = await db
    .insert(Invoice)
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
