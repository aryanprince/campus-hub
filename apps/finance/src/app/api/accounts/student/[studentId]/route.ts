import { eq } from "drizzle-orm";

import { db } from "~/server/db";
import { financeAccount } from "~/server/db/schema/main-schema";

export async function GET(
  request: Request,
  { params }: { params: { studentId: string } },
) {
  const studentId = params.studentId;

  const account = await db.query.financeAccount.findFirst({
    where: eq(financeAccount.studentId, studentId),
    columns: {
      financeAccountId: true,
      studentId: true,
      hasOutstandingBalance: true,
    },
  });

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
