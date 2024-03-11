import { eq } from "drizzle-orm";

import { course } from "~/server/db/schema";

export async function GET(
  request: Request,
  { params }: { params: { id: number } },
) {
  const id = params.id;

  const currentCourse = await db?.query.course.findFirst({
    where: eq(course.courseId, id),
  });

  return Response.json(currentCourse, { status: 200 });
}
