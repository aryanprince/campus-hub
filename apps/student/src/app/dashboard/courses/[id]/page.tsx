import { GraduationCap } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { type course } from "~/server/db/schema";

type Course = typeof course.$inferSelect;

export default async function Page({ params }: { params: { id: string } }) {
  const response = await fetch(
    `http://localhost:3001/api/courses/${params.id}`,
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
          Course #{course.id} - {course.title}
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex max-w-md flex-1 flex-col items-center justify-center gap-8">
        {/* COURSE CARD */}
        <CourseCard course={course} />

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

function CourseCard({ course }: { course: Course }) {
  return (
    <div className="flex flex-col gap-8 rounded-md border p-8">
      <div className="flex flex-col gap-4">
        <Badge className="w-fit">Course ID: {course.id}</Badge>
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
        <Button>
          <GraduationCap className="mr-2 size-4" />
          Enroll
        </Button>
      </div>
    </div>
  );
}
