import {
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import {
  accounts,
  accountsRelations,
  sessions,
  sessionsRelations,
  users,
  usersRelations,
  verificationTokens,
} from "./nextauth-tables";

export const student = pgTable("student", {
  id: serial("id").primaryKey(),
  studentId: text("studentId"),
  firstName: text("firstName"),
  lastName: text("lastName"),
  email: text("email"),
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

export {
  accounts,
  accountsRelations,
  sessions,
  sessionsRelations,
  users,
  usersRelations,
  verificationTokens,
};

// Sample Table from Create T3 App
// export const posts = pgTable(
//   "post",
//   {
//     id: serial("id").primaryKey(),
//     name: varchar("name", { length: 256 }),
//     createdById: varchar("createdById", { length: 255 })
//       .notNull()
//       .references(() => users.id),
//     createdAt: timestamp("created_at")
//       .default(sql`CURRENT_TIMESTAMP`)
//       .notNull(),
//     updatedAt: timestamp("updatedAt"),
//   },
//   (example) => ({
//     createdByIdIdx: index("createdById_idx").on(example.createdById),
//     nameIndex: index("name_idx").on(example.name),
//   }),
// );
