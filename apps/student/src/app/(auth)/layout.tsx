import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { buttonVariants } from "@campus-hub/ui/components/ui/button";

import { cn } from "~/lib/utils";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-4 flex w-full max-w-sm flex-col gap-8 rounded-lg border p-4 py-8 md:mx-0 md:max-w-lg md:p-8">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute left-4 top-4 md:left-8 md:top-8",
          )}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Link>
        {children}
      </div>
    </div>
  );
}
