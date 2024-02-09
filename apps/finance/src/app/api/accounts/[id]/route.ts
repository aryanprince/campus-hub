import { db } from "~/server/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id;

  const account = await db.financeAccount.findUnique({
    select: {
      id: true,
      studentId: true,
      hasOutstandingBalance: true,
    },
    where: {
      id: id,
    },
  });

  return Response.json(
    { data: account },
    {
      status: 200,
    },
  );
}
