import { eq } from "drizzle-orm";

import { db } from "~/server/db";
import { course } from "~/server/db/schema";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id;

  const currentCourse = await db.query.course.findFirst({
    where: eq(course.courseId, id),
  });

  return Response.json(currentCourse, { status: 200 });
}
