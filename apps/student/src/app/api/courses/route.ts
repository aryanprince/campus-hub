import { db } from "~/server/db";

export async function GET(_request: Request) {
  const allCourses = await db.query.course.findMany();

  return Response.json(allCourses, { status: 200 });
}
