import { eq } from "drizzle-orm";

import { db } from "~/server/db";
import { course } from "~/server/db/schema";
import { columns } from "../columns";
import { DataTable } from "../data-table";

export default async function EnrolledCourses() {
  const courses = await db.query.course.findMany({
    where: eq(course.courseId, 666),
  });

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
      <DataTable columns={columns} data={courses} />
    </div>
  );
}
