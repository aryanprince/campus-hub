import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

import { validateRequest } from "~/server/auth";
import { db } from "~/server/db";
import { enrollment, student } from "~/server/db/schema";
import { DataTable } from "../data-table";
import { columns } from "./columns";

export default async function EnrolledCourses() {
  // Get currently logged in user
  const { user } = await validateRequest();

  if (!user) {
    redirect("/login");
  }

  // Find the student record for the current user
  const currentStudent = await db.query.student.findFirst({
    where: eq(student.userId, user.id),
  });

  if (!currentStudent) {
    redirect("/student/dashboard");
  }

  // Find all courses that the student is enrolled in
  const allEnrollments = await db.query.enrollment.findMany({
    with: {
      course: true,
    },
    where: eq(enrollment.studentId, currentStudent.studentId),
  });

  const enrolledCourses = allEnrollments.map((enrollment) => enrollment.course);

  return (
    <div className="mx-8 my-4 flex flex-col gap-4">
      <div>
        <h1 className="text-3xl font-semibold text-foreground">
          Enrolled Courses
        </h1>
        <p className="text-muted-foreground">
          These are the courses you are currently enrolled in. You can unenroll
          from a course at any time.
        </p>
      </div>
      <DataTable columns={columns} data={enrolledCourses} />
    </div>
  );
}
