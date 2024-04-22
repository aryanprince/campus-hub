import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

// =======================================================================
// STUDENT TABLE
// =======================================================================

export const student = pgTable("student", {
  studentId: text("student_id")
    .primaryKey()
    .$defaultFn(() => createId()),
  studentNumber: text("student_number").notNull(),
  studentEmail: text("student_email"),
  firstName: text("first_name"),
  lastName: text("last_name"),
  userId: text("user_id").references(() => user.id),
});

export type Student = typeof student.$inferSelect;

// =======================================================================
// COURSE TABLE
// =======================================================================

export const course = pgTable("course", {
  courseId: text("course_id")
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text("title").notNull(),
  description: text("description"),
  fee: integer("fee").notNull(),
});

export type Course = typeof course.$inferSelect;

// =======================================================================
// ENROLLMENT TABLE
// =======================================================================

export const enrollment = pgTable(
  "enrollment",
  {
    studentId: text("student_id").references(() => student.studentId),
    courseId: text("course_id").references(() => course.courseId),
  },
  (table) => {
    return {
      // Composite Primary Key - compromising of courseId + studentId
      pk: primaryKey({ columns: [table.studentId, table.courseId] }),

      // Index - used to query this table faster when querying by studentId
      studentIdIndex: uniqueIndex("student_id_idx").on(table.studentId),
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
  student: one(student, {
    fields: [user.id],
    references: [student.userId],
  }),
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
