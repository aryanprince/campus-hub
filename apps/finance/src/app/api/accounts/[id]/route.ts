import { eq } from "drizzle-orm";

import { db } from "~/server/db";
import { FinanceAccount } from "~/server/db/schema";

export async function GET(
  request: Request,
  { params }: { params: { id: number } },
) {
  const id = params.id;

  const account = await db.query.FinanceAccount.findFirst({
    where: eq(FinanceAccount.id, id),
    columns: {
      id: true,
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

export async function DELETE(
  request: Request,
  { params }: { params: { id: number } },
) {
  const id = params.id;

  const deletedAccount = await db
    .delete(FinanceAccount)
    .where(eq(FinanceAccount.id, id))
    .returning();

  if (deletedAccount.length === 0) {
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
    {
      message: `Deleted finance account successfully`,
      data: deletedAccount,
    },
    {
      status: 200,
    },
  );
}

