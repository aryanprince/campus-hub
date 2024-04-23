import { eq } from "drizzle-orm";

import { db } from "~/server/db";
import { enrollment, student } from "~/server/db/schema";

interface RequestBody {
  studentNumber: string;
}

export async function POST(request: Request) {
  // Get the student number from the request body and validate it
  const { studentNumber } = (await request.json()) as RequestBody;

  if (!studentNumber) {
    return Response.json(
      {
        validity: false,
        error: "Missing required fields, please provide the student ID number",
      },
      { status: 400 },
    );
  }

  // Fetch student ID using the student number
  const studentInfo = await db.query.student.findFirst({
    where: eq(student.studentNumber, studentNumber),
  });

  if (!studentInfo) {
    return Response.json(
      {
        validity: false,
        error: "No student found with the provided student number",
      },
      { status: 404 },
    );
  }

  // Fetch all enrollments for the student using the student ID provided
  const enrollments = await db.query.enrollment.findMany({
    where: eq(enrollment.studentId, studentInfo.studentId),
  });

  console.log(enrollments);

  // If the student has not enrolled in any courses, return a success message
  // This means that the student is eligible to access the library
  if (enrollments.length !== 0) {
    return Response.json({ validity: true }, { status: 200 });
  }

  // If the student has enrolled in any courses, return an error message
  return Response.json(
    {
      validity: false,
      error:
        "Student has not enrolled in any courses yet. Please enroll in a course to access the library.",
    },
    { status: 200 },
  );
}
