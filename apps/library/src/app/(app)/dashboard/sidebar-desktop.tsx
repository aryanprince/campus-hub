"use client";

import type { User } from "lucia";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { buttonVariants } from "@campus-hub/ui/components/ui/button";

import UserAccountDropdown from "~/components/navbar/account-dropdown";
import { sidebarLinks } from "~/components/navbar/sidebar-links";
import { ThemeToggle } from "~/components/theme-toggle";
import { cn } from "~/lib/utils";

export default function DesktopSidebar({ user }: { user: User | null }) {
  const pathname = usePathname();

  return (
    <div className="flex w-full flex-1 flex-col space-y-8 border-r p-6">
      {/* SIDEBAR HEADER */}
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            width={32}
            height={32}
            alt="Library Portal Logo"
          />
          <h1 className="text-2xl font-semibold tracking-tight">Library</h1>
        </div>

        <UserAccountDropdown user={user} />
      </div>

      {/* SIDEBAR LINKS */}
      <div className="flex flex-1 flex-col gap-2">
        {sidebarLinks.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "inline-flex items-center justify-start gap-3 text-base font-medium",
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

      <div className="flex flex-col gap-4">
        <ThemeToggle />
      </div>
    </div>
  );
}
