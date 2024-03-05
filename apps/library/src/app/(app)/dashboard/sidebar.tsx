"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AlertTriangle, Book, HandHelping, Home, Users } from "lucide-react";

import { ThemeToggle } from "~/components/theme-toggle";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export default function Sidebar() {
  const pathname = usePathname();

  const sidebarLinks = [
    { name: "Home", path: "/dashboard", icon: <Home className="size-5" /> },
    {
      name: "Books",
      path: "/dashboard/books",
      icon: <Book className="size-5" />,
    },
    {
      name: "Students",
      path: "/dashboard/students",
      icon: <Users className="size-5" />,
    },
    {
      name: "Loans",
      path: "/dashboard/loans",
      icon: <HandHelping className="size-5" />,
    },
    {
      name: "Overdue",
      path: "/dashboard/overdue",
      icon: <AlertTriangle className="size-5" />,
    },
  ];

  return (
    <div className="flex w-full flex-1 flex-col space-y-8 border-r p-6">
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

      <div className="flex justify-center">
        <ThemeToggle />
      </div>
    </div>
  );
}
