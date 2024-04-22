"use client";

import { GraduationCap } from "lucide-react";
import { toast } from "sonner";

import type { Course, Student } from "~/server/db/schema";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

export const EnrollCourseButton = ({
  course,
  currentStudent,
}: {
  course: Course;
  currentStudent: Student;
}) => {
  const { mutate: enrollNewCourse } = api.course.enrollNewCourse.useMutation();

  return (
    <Button
      onClick={async () => {
        void enrollNewCourse({
          courseId: course.courseId,
          studentId: currentStudent.studentId,
        });
        toast.success("Enrolled in course successfully!");
      }}
    >
      <GraduationCap className="mr-2 size-4" />
      Enroll
    </Button>
  );
};
