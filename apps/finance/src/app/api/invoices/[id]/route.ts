import { db } from "~/server/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id;

  const invoice = await db.invoice.findUnique({
    where: {
      id: id,
    },
  });

  return Response.json({ data: invoice }, { status: 200 });
}
