import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  Book,
  HandHelping,
  Home,
  Menu,
  Users,
} from "lucide-react";

import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";

export default function MobileSidebar() {
  return (
    <div className="flex justify-between p-6">
      {/* SIDEBAR HEADER */}
      <div className="flex items-center gap-3">
        <Image
          src="/logo.png"
          width={32}
          height={32}
          alt="Library Portal Logo"
        />
        <h1 className="text-2xl font-semibold tracking-tight">
          Library Portal
        </h1>
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant={"ghost"} size={"icon"}>
            <Menu className="size-8" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <div className="mt-8 flex flex-col gap-4">
            <Link
              className="inline-flex items-center gap-2 text-xl font-semibold"
              href="/dashboard"
            >
              <Home className="size-5" />
              Home
            </Link>
            <Link
              className="inline-flex items-center gap-2 text-xl font-semibold"
              href="/dashboard/books"
            >
              <Book className="size-5" />
              Books
            </Link>
            <Link
              className="inline-flex items-center gap-2 text-xl font-semibold"
              href="/dashboard/students"
            >
              <Users className="size-5" />
              Students
            </Link>
            <Link
              className="inline-flex items-center gap-2 text-xl font-semibold"
              href="/dashboard/loans"
            >
              <HandHelping className="size-5" />
              Loans
            </Link>
            <Link
              className="inline-flex items-center gap-2 text-xl font-semibold"
              href="/dashboard/overdue"
            >
              <AlertTriangle className="size-5" />
              Overdue
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
