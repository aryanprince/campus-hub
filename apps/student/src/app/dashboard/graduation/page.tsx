import Link from "next/link";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

import { Badge } from "@campus-hub/ui/components/ui/badge";

import { env } from "~/env";
import { validateRequest } from "~/server/auth";
import { db } from "~/server/db";
import { student } from "~/server/db/schema";

export default async function Graduation() {
  // Fetch the user from the current session
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }

  // Fetch the current student from the database using the user ID
  const currentStudent = await db.query.student.findFirst({
    where: eq(student.userId, user?.id),
  });

  // Fetch the student's eligibility to graduate from the Finance Portal REST API
  interface FinanceAccount {
    hasOutstandingBalance: boolean;
  }

  const res = await fetch(
    `${env.NEXT_PUBLIC_API_FINANCE_URL}/api/accounts/student/${currentStudent?.studentNumber}`,
  );
  const { hasOutstandingBalance } = (await res.json()) as FinanceAccount;

  // Parse the response from the Finance Portal REST API
  console.log(hasOutstandingBalance);

  return (
    <div className="flex flex-1 flex-col items-center justify-between">
      {/* PAGE TITLE */}
      <div className="flex w-full flex-col justify-start px-12 pt-6">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Graduation
        </h1>
        <p className="text-muted-foreground">Graduation Eligibility</p>
      </div>

      {/* MAIN CONTENT */}
      <div className="-mt-[85px] flex flex-1 flex-col justify-center">
        <div className="flex max-w-md flex-1 flex-col items-center justify-center gap-8">
          {/* IF STUDENT IS ELIGIBLE TO GRADUATE */}
          {!hasOutstandingBalance && (
            <div className="flex flex-col gap-8 rounded-md border p-8">
              <div className="flex flex-col gap-6">
                <Badge className="w-fit bg-emerald-900 text-emerald-400">
                  Eligibility Success
                </Badge>
                <p>You are eligible to graduate. Congratulations!</p>
              </div>
            </div>
          )}

          {/* IF STUDENT IS NOT ELIGIBLE TO GRADUATE */}
          {!!hasOutstandingBalance && (
            <div className="flex flex-col gap-8 rounded-md border p-8">
              <div className="flex flex-col gap-6">
                <Badge className="w-fit bg-red-900 text-red-200">
                  Eligibility Failed
                </Badge>
                <div className="space-y-2">
                  <p>You are currently not eligible to graduate.</p>
                  <p>
                    Please pay all due fees from the{" "}
                    <Link
                      href={env.NEXT_PUBLIC_API_FINANCE_URL}
                      className="underline underline-offset-4"
                    >
                      Finance Portal
                    </Link>{" "}
                    to be eligible to graduate.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
