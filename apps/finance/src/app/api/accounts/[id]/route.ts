import { eq } from "drizzle-orm";

import { db } from "~/server/db";
import { financeAccount } from "~/server/db/schema";

export async function GET(
  request: Request,
  { params }: { params: { id: number } },
) {
  const id = params.id;

  const account = await db.query.financeAccount.findFirst({
    where: eq(financeAccount.financeAccountId, id),
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

export async function DELETE(
  request: Request,
  { params }: { params: { id: number } },
) {
  const id = params.id;

  const deletedAccount = await db
    .delete(financeAccount)
    .where(eq(financeAccount.financeAccountId, id))
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

export async function PUT(
  request: Request,
  { params }: { params: { id: number } },
) {
  type FinanceAccount = typeof financeAccount.$inferInsert;
  const requestBody = (await request.json()) as FinanceAccount;

  const updatedAccount = await db
    .update(financeAccount)
    .set({
      financeAccountId: requestBody.financeAccountId,
      studentId: requestBody.studentId,
      hasOutstandingBalance: requestBody.hasOutstandingBalance,
    })
    .where(eq(financeAccount.financeAccountId, params.id))
    .returning();

  if (updatedAccount.length === 0) {
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
      message: `Updated finance account successfully`,
      data: updatedAccount,
    },
    {
      status: 200,
    },
  );
}
