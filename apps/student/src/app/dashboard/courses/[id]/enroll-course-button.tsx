"use client";

import { useRouter } from "next/navigation";
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
  const router = useRouter();

  const { mutate: enrollNewCourse } = api.course.enrollNewCourse.useMutation({
    onSuccess: () => {
      router.refresh();
      toast.success("Successfully enrolled in the course");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <Button
      onClick={async () => {
        void enrollNewCourse({
          courseId: course.courseId,
          studentId: currentStudent.studentId,
        });
      }}
    >
      <GraduationCap className="mr-2 size-4" />
      Enroll
    </Button>
  );
};
