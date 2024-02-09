import { db } from "~/server/db";

export async function GET(
  request: Request,
  { params }: { params: { studentId: string } },
) {
  const studentId = params.studentId;

  const account = await db.financeAccount.findFirst({
    select: {
      id: true,
      studentId: true,
      hasOutstandingBalance: true,
    },
    where: {
      studentId: studentId,
    },
  });

  return Response.json(
    { data: account },
    {
      status: 200,
    },
  );
}
