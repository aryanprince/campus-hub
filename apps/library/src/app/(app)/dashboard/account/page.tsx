import { eq } from "drizzle-orm";

import { PageHeader } from "~/components/page-header";
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
    <div className="flex w-full flex-col gap-4 p-4 pt-0 md:p-8">
      {/* PAGE HEADER */}
      <PageHeader
        title="My Account"
        description="Here you can see the books you've borrowed. Please return them on
          time to avoid overdue fees."
      />

      {/* DATA TABLE - DISPLAYING ALL BOOKS */}
      <div className="flex-1">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
