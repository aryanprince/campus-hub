import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { Invoice } from "~/server/db/schema";

export async function GET(
  request: Request,
  { params }: { params: { id: number } },
) {
  const id = params.id;

  const invoice = await db.query.Invoice.findFirst({
    where: eq(Invoice.id, id),
  });

  return Response.json({ data: invoice }, { status: 200 });
}
