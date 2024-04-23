import { eq } from "drizzle-orm";

import { PageTitle } from "~/components/page-title";
import { validateRequest } from "~/server/auth";
import { db } from "~/server/db";
import { student } from "~/server/db/schema";
import EditProfileForm from "./edit-profile-form";

export default async function Profile() {
  const { user: currentUser } = await validateRequest();

  if (!currentUser) {
    return null;
  }

  const currentStudent = await db.query.student.findFirst({
    where: eq(student.userId, currentUser.id),
  });

  return (
    <div className="flex w-full flex-1 flex-col gap-4 px-8 py-4">
      <PageTitle
        title="View Profile"
        description="View your current student profile."
      />

      <p> User ID: {currentStudent?.userId} </p>
      <p> Student ID: {currentStudent?.studentId} </p>
      <p> Student Number: {currentStudent?.studentNumber} </p>

      {currentStudent && (
        <EditProfileForm initialStudentInfo={currentStudent} />
      )}
    </div>
  );
}
