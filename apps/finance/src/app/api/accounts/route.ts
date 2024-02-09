import { db } from "../../../server/db";

export async function GET(request: Request) {
  const accounts = await db.financeAccount.findMany();

  return Response.json(
    { data: accounts },
    {
      status: 200,
    },
  );
}
