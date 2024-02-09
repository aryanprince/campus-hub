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

  console.log(account);

  if (!account) {
    return Response.json(
      {
        message: "Given finance account doesn't exist",
      },
      {
        status: 400,
      },
    );
  }

  return Response.json(
    { data: account },
    {
      status: 200,
    },
  );
}
