import { eq } from "drizzle-orm";

import { db } from "~/server/db";
import { financeAccount } from "~/server/db/schema/main-schema";

interface RequestBody {
  studentId: string;
}

export async function GET() {
  const accounts = await db.query.financeAccount.findMany();

  if (accounts.length === 0) {
    return Response.json(
      {
        message: "No finance accounts found",
      },
      {
        status: 404,
      },
    );
  }

  return Response.json(
    { data: accounts },
    {
      status: 200,
    },
  );
}

export async function POST(request: Request) {
  // Receive studentCardId and lectureId from request body
  const { studentId } = (await request.json()) as RequestBody;

  if (request.body === undefined) {
    return Response.json(
      { error: "Missing request body" },
      {
        status: 400,
      },
    );
  }

  // If request body is missing parameters, throw error
  if (!studentId) {
    return Response.json(
      { error: "Missing parameters in request body" },
      {
        status: 400,
      },
    );
  }

  const existingAccount = await db.query.financeAccount.findFirst({
    where: eq(financeAccount.studentId, studentId),
  });

  if (existingAccount) {
    {
      return Response.json(
        {
          message: "Finance account already exists",
        },
        { status: 400 },
      );
    }
  }

  const newAccount = await db
    .insert(financeAccount)
    .values({
      studentId: studentId,
    })
    .returning();

  return Response.json(
    {
      data: newAccount,
    },
    {
      status: 200,
    },
  );
}
