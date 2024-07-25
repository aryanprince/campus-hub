"use client";

import { useRouter } from "next/navigation";
import { GraduationCap, Loader2 } from "lucide-react";
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

  const { mutate: enrollNewCourse, isLoading: isLoadingEnrollment } =
    api.course.enrollNewCourse.useMutation({
      onSuccess(data) {
        router.refresh();
        toast.success("Successfully enrolled in the course", {
          description: data?.newInvoiceReference,
        });
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
          studentNumber: currentStudent.studentNumber,
          courseAmount: course.fee,
        });
      }}
      disabled={isLoadingEnrollment}
    >
      {/* ENROLL BUTTON - BEFORE ENROLLING */}
      {!isLoadingEnrollment && (
        <>
          <GraduationCap className="mr-2 size-4" />
          Enroll
        </>
      )}

      {/* ENROLL BUTTON - WHILE ENROLLING (LOADING...) */}
      {!!isLoadingEnrollment && (
        <>
          <Loader2 className="mr-2 size-4 animate-spin" />
          Enrolling...
        </>
      )}
    </Button>
  );
};
