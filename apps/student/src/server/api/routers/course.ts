import { format } from "date-fns";
import { z } from "zod";

import { env } from "~/env";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { enrollment } from "~/server/db/schema";

// This router is used to manage course-related tRPC procedures
export const courseRouter = createTRPCRouter({
  // This procedure is used to enroll a student in a course and create an invoice for the new course enrollment
  enrollNewCourse: publicProcedure
    .input(
      z.object({
        courseId: z.string(),
        studentId: z.string(),
        studentNumber: z.string(),
        courseAmount: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        // Create a new invoice for the student on the finance service
        interface InvoiceResponse {
          data: [{ referenceId: string }];
        }

        const res = await fetch(
          `${env.NEXT_PUBLIC_API_FINANCE_URL}/api/invoices/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              amount: input.courseAmount,
              dueDate: format(new Date(), "yyyy-MM-dd"),
              invoiceType: "TUITION_FEES",
              studentId: input.studentNumber,
            }),
          },
        );
        const data = (await res.json()) as InvoiceResponse;

        const newInvoiceReference = data.data[0].referenceId;
        console.log(newInvoiceReference);

        // Insert a new enrollment record in the database
        await db.insert(enrollment).values({
          courseId: input.courseId,
          studentId: input.studentId,
          invoiceReferenceId: newInvoiceReference,
        });

        return { newInvoiceReference: newInvoiceReference };
      } catch (error) {
        console.error("Error enrolling student in course", error);
      }
    }),
});
