import {
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const student = pgTable("student", {
  id: serial("id").primaryKey(),
  studentId: text("studentId"),
  firstName: text("firstName"),
  lastName: text("lastName"),
  studentEmail: text("studentEmail"),
});

export const course = pgTable("course", {
  id: serial("id").primaryKey(),
  title: text("title"),
  description: text("description"),
  fee: integer("fee"),
});

export const enrollment = pgTable(
  "enrollment",
  {
    studentId: integer("studentId").references(() => student.id),
    courseId: integer("courseId").references(() => course.id),
  },
  (table) => {
    return {
      // Composite Primary Key - compromising of courseId + studentId
      pk: primaryKey({ columns: [table.studentId, table.courseId] }),

      // Index - used to query this table faster when querying by studentId
      studentIdIndex: uniqueIndex("studentId_index").on(table.studentId),
    };
  },
);
