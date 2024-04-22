import React from "react";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

import { DesktopNavbar } from "~/components/desktop-navbar";
import { Footer } from "~/components/footer";
import { ThemeToggle } from "~/components/theme-toggle";
import { validateRequest } from "~/server/auth";
import { db } from "~/server/db";
import { student } from "~/server/db/schema";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();

  if (!user?.id) {
    redirect("/login");
  }

  const currentStudent = await db.query.student.findFirst({
    where: eq(student.userId, user?.id),
  });

  return (
    <div className="flex min-h-screen flex-col justify-between">
      <div className="flex justify-between border-b border-border px-4 py-3">
        <DesktopNavbar user={user} student={currentStudent} />
      </div>
      <div className="mx-auto flex w-full max-w-screen-2xl flex-1 flex-col">
        {children}
      </div>
      <div className="flex items-center justify-center gap-12 border-t border-border p-4">
        <div className="flex-1">
          <Footer />
        </div>
        <div className="">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
