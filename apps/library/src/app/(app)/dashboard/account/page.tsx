import { eq } from "drizzle-orm";

import { validateRequest } from "~/server/auth";
import { db } from "~/server/db";
import { transaction } from "~/server/db/schema/main-schema";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function AccountsPage() {
  const { user } = await validateRequest();

  if (!user) {
    return null;
  }

  const data = await db.query.transaction.findMany({
    where: eq(transaction.userId, user.id),
  });

  return (
    <div className="space-y-6 p-6">
      {/* PAGE TITLE */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight md:text-4xl">
          My Account
        </h1>
        <p className="text-sm text-muted-foreground md:text-base">
          Here you can see the books you&apos;ve borrowed. Please return them on
          time to avoid overdue fees.
        </p>
      </div>

      {/* DATA TABLE - DISPLAYING ALL BOOKS */}
      <div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
