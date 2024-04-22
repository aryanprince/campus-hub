import { eq } from "drizzle-orm";

import { PageTitle } from "~/components/page-title";
import { validateRequest } from "~/server/auth";
import { db } from "~/server/db";
import { student } from "~/server/db/schema";

export default async function Profile() {
  const { user } = await validateRequest();

  if (!user) {
    return null;
  }

  const currentUser = await db.query.student.findFirst({
    where: eq(student.userId, user.id),
  });

  return (
    <div className="flex w-full flex-1 flex-col gap-4 px-8 py-4">
      <PageTitle
        title="View Profile"
        description="View your current student profile."
      />

      <p> User ID: {currentUser?.userId} </p>
      <p> Student Number: {currentUser?.studentNumber} </p>

      {/* {currentUser && <EditProfileForm initialData={currentUser} />} */}
    </div>
  );
}
