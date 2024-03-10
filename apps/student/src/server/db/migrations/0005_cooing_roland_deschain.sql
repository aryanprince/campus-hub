DO $$ BEGIN
 CREATE TYPE "USER_ROLE" AS ENUM('STUDENT', 'TEACHER', 'ADMIN');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "course" RENAME COLUMN "id" TO "course_id";--> statement-breakpoint
ALTER TABLE "enrollment" RENAME COLUMN "studentId" TO "student_id";--> statement-breakpoint
ALTER TABLE "enrollment" RENAME COLUMN "courseId" TO "course_id";--> statement-breakpoint
ALTER TABLE "student" RENAME COLUMN "studentId" TO "student_id";--> statement-breakpoint
ALTER TABLE "student" RENAME COLUMN "firstName" TO "first_name";--> statement-breakpoint
ALTER TABLE "student" RENAME COLUMN "lastName" TO "last_name";--> statement-breakpoint
ALTER TABLE "student" RENAME COLUMN "studentEmail" TO "student_email";--> statement-breakpoint
ALTER TABLE "enrollment" DROP CONSTRAINT "enrollment_studentId_student_id_fk";
--> statement-breakpoint
ALTER TABLE "enrollment" DROP CONSTRAINT "enrollment_courseId_course_id_fk";
--> statement-breakpoint
DROP INDEX IF EXISTS "studentId_index";--> statement-breakpoint
ALTER TABLE "enrollment" DROP CONSTRAINT "enrollment_studentId_courseId_pk";--> statement-breakpoint
ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_student_id_course_id_pk" PRIMARY KEY("student_id","course_id");--> statement-breakpoint
ALTER TABLE "student" ADD COLUMN "user_id" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" "USER_ROLE" DEFAULT 'STUDENT' NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "studentId_index" ON "enrollment" ("student_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_student_id_student_id_fk" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_course_id_course_course_id_fk" FOREIGN KEY ("course_id") REFERENCES "course"("course_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "student" ADD CONSTRAINT "student_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
