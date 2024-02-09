import { db } from "../../../server/db";
export async function GET(request: Request) {
  const invoices = await db.invoice.findMany();

  return Response.json({ data: invoices }, { status: 200 });
}
