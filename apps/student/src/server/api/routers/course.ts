import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { enrollment } from "~/server/db/schema";

export const courseRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  enrollNewCourse: publicProcedure
    .input(z.object({ courseId: z.string(), studentId: z.string() }))
    .mutation(async ({ input }) => {
      await db.insert(enrollment).values({
        courseId: input.courseId,
        studentId: input.studentId,
      });
    }),
});
