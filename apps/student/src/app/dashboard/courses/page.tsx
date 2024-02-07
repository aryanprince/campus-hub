import { db } from "~/server/db";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function Courses() {
  const courses = await db.query.course.findMany();

  return (
    <div className="mx-8 my-4 flex flex-col gap-4">
      <div>
        <h1 className="text-3xl font-semibold text-foreground">All Courses</h1>
        <p className="text-muted-foreground">
          Discover a wide range of courses available on our platform. Enroll in
          the courses that interest you.
        </p>
      </div>
      <DataTable columns={columns} data={courses} />
    </div>
  );
}
