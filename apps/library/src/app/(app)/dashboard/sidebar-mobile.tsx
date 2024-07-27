"use client";

import type { User } from "lucia";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { Button, buttonVariants } from "@campus-hub/ui/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@campus-hub/ui/components/ui/sheet";

import UserAccountDropdown from "~/components/navbar/account-dropdown";
import { sidebarLinks } from "~/components/navbar/sidebar-links";
import { cn } from "~/lib/utils";

export default function MobileSidebar({ user }: { user: User | null }) {
  const pathname = usePathname();

  return (
    <div className="flex justify-between p-2 pt-4">
      <div className="flex gap-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <Menu className="size-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"}>
            {/* SIDEBAR LINKS */}
            <div className="mt-8 flex flex-col gap-2">
              {sidebarLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={cn(
                    buttonVariants({ variant: "secondary" }),
                    "inline-flex items-center justify-start gap-4 text-2xl font-semibold",
                    pathname === link.path
                      ? "bg-neutral-100 dark:bg-neutral-700"
                      : "bg-transparent",
                  )}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        {/* SIDEBAR HEADER */}
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            width={30}
            height={30}
            alt="Library Portal Logo"
          />
          <h1 className="text-2xl font-semibold tracking-tight">Library</h1>
        </div>
      </div>

      <UserAccountDropdown user={user} />
    </div>
  );
}
