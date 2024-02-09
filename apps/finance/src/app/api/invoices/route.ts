import { format } from "date-fns/fp";
import { generateRandomReferenceString } from "~/lib/utils";
import { db } from "~/server/db";

// TODO: Fix these hacky node_modules imports
import { type InvoiceType } from "../../../../node_modules/.prisma/client";

type RequestBody = {
  amount: number;
  dueDate: Date;
  type: InvoiceType;
  account: {
    studentId: string;
  };
};

export async function GET(_request: Request) {
  const invoices = await db.invoice.findMany();

  return Response.json({ data: invoices }, { status: 200 });
}

export async function POST(request: Request) {
  const {
    amount,
    dueDate,
    type,
    account: { studentId },
  } = (await request.json()) as RequestBody;

  // Set the due date to the end of the day by default
  const formattedDueDate: string = format(
    "yyyy-MM-dd 23:59:59",
    new Date(dueDate),
  );
  // Convert the formatted due date to a Date object
  const formattedDueDateAsDate: Date = new Date(formattedDueDate);

  const newInvoice = await db.invoice.create({
    data: {
      amount: amount,
      dueDate: formattedDueDateAsDate,
      invoiceType: type,
      studentId: studentId,
      reference: generateRandomReferenceString(),
    },
  });

  return Response.json({ data: newInvoice }, { status: 200 });
}
