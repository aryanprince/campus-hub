import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@campus-hub/ui/button";

import { Footer } from "~/components/footer";
import { ThemeToggle } from "~/components/theme-toggle";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* FULL PAGE LAYOUT */}
      <div className="flex min-h-screen flex-col">
        {/* NAVBAR */}
        <div className="flex w-full items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              width={32}
              height={32}
              alt="Finance Portal Logo"
            />
            <h1 className="text-xl font-semibold">Finance Portal</h1>
          </div>
          <Link
            href="/signin"
            className={`${buttonVariants()} cursor-not-allowed`}
          >
            Sign in
          </Link>
        </div>

        {/* CONTENT - TAKES ALL REMAINING SPACE IN MIDDLE */}
        <div className="flex flex-1 flex-col">{children}</div>

        {/* FOOTER */}
        <div className="relative border border-t py-4">
          <Footer />
          <div className="absolute bottom-1.5 right-1.5">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  );
}
