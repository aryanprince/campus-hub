import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { student } from "~/server/db/schema";

export const profileRouter = createTRPCRouter({
  editProfile: publicProcedure
    .input(
      z.object({
        studentId: z.string(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        email: z.string().email().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      await db
        .update(student)
        .set({
          firstName: input.firstName,
          lastName: input.lastName,
          studentEmail: input.email,
        })
        .where(eq(student.studentId, input.studentId));
    }),
});
