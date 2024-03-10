import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const student = pgTable("student", {
  id: serial("id").primaryKey(),
  studentId: text("student_id"),
  firstName: text("first_name"),
  lastName: text("last_name"),
  studentEmail: text("student_email"),
  userId: text("user_id").references(() => user.id),
});

export const course = pgTable("course", {
  id: serial("course_id").primaryKey(),
  title: text("title"),
  description: text("description"),
  fee: integer("fee"),
});

export const enrollment = pgTable(
  "enrollment",
  {
    studentId: integer("student_id").references(() => student.id),
    courseId: integer("course_id").references(() => course.id),
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

// =======================================================================
// AUTH TABLES
// =======================================================================

export const userRoleEnum = pgEnum("USER_ROLE", [
  "STUDENT",
  "TEACHER",
  "ADMIN",
]);

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  username: text("username").unique(),
  hashedPassword: text("hashed_password"),
  role: userRoleEnum("role").notNull().default("STUDENT"),
});

export const userStudentRelation = relations(user, ({ one }) => ({
  studentInfo: one(student),
}));

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});
