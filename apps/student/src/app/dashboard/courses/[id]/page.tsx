import { eq } from "drizzle-orm";

import type { Course, Student } from "~/server/db/schema";
import { Badge } from "~/components/ui/badge";
import { env } from "~/env";
import { validateRequest } from "~/server/auth";
import { db } from "~/server/db";
import { student } from "~/server/db/schema";
import { EnrollCourseButton } from "./enroll-course-button";

export default async function Page({ params }: { params: { id: string } }) {
  const { user } = await validateRequest();

  if (!user) {
    return null;
  }

  const currentStudent = await db.query.student.findFirst({
    where: eq(student.userId, user.id),
  });

  if (!currentStudent) {
    return null;
  }

  const response = await fetch(
    `${env.NEXT_PUBLIC_API_BASE_URL}/api/courses/${params.id}`,
  );
  const course = (await response.json()) as Course;

  return (
    <div className="flex flex-1 flex-col items-center justify-between">
      <div className="flex w-full flex-col justify-start px-12 pt-6">
        {/* PAGE TITLE */}
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Course Details
        </h1>
        <p className="text-muted-foreground">
          Course #{course.courseId} - {course.title}
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex max-w-md flex-1 flex-col items-center justify-center gap-8">
        {/* COURSE CARD */}
        <CourseCard course={course} currentStudent={currentStudent} />

        {/* COURSE CARD - DISCLAIMER */}
        <div className="flex w-full max-w-sm flex-col gap-2">
          <p className="text-balance text-center text-sm text-muted-foreground">
            Enrolling in this course will generate an invoice for £{course.fee}.
          </p>
          <p className="text-balance text-center text-sm text-muted-foreground">
            You will need to pay all due fees from the Finance Portal to be
            eligible to graduate.
          </p>
        </div>
      </div>
    </div>
  );
}

function CourseCard({
  course,
  currentStudent,
}: {
  course: Course;
  currentStudent: Student;
}) {
  return (
    <div className="flex flex-col gap-8 rounded-md border p-8">
      <div className="flex flex-col gap-4">
        <Badge className="w-fit">Course ID: {course.courseId}</Badge>
        <div>
          <h2 className="text-sm text-muted-foreground">Title</h2>
          <p>{course.title}</p>
        </div>
        <div>
          <h2 className="text-sm text-muted-foreground">Description</h2>
          <p>{course.description}</p>
        </div>
        <div>
          <h2 className="text-sm text-muted-foreground">Fee</h2>
          <p>£ {course.fee}</p>
        </div>
        <EnrollCourseButton course={course} currentStudent={currentStudent} />
      </div>
    </div>
  );
}
