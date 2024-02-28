"use client";

import { GraduationCap } from "lucide-react";

import { Button } from "~/components/ui/button";

export const EnrollCourseButton = () => {
  return (
    <Button onClick={() => console.log("Enrolled!")}>
      <GraduationCap className="mr-2 size-4" />
      Enroll
    </Button>
  );
};
