import { db } from "~/server/db";

export async function GET(
  request: Request,
  { params }: { params: { referenceId: string } },
) {
  const referenceId = params.referenceId;

  const invoice = await db.invoice.findUnique({
    where: {
      reference: referenceId,
    },
  });

  return Response.json({ data: invoice }, { status: 200 });
}



