"use client";

import type { Session, User } from "lucia";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AlertTriangle,
  Book,
  HandHelping,
  Home,
  LogOut,
  Settings2,
  User as UserIcon,
  Users,
} from "lucide-react";

import { ThemeToggle } from "~/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { buttonVariants } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { cn } from "~/lib/utils";
import { logout } from "~/server/actions";

export default function DesktopSidebar({
  session,
}: {
  session: {
    user: User | null;
    session: Session | null;
  };
}) {
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
        <DropdownMenu>
          <DropdownMenuTrigger
            className={buttonVariants({
              variant: "ghost",
              size: "icon",
            })}
          >
            <Avatar>
              <AvatarImage src="/default-avatar.jpg" />
              <AvatarFallback>DP</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>@{session.user?.username}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserIcon className="mr-2 size-4" />
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings2 className="mr-2 size-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => await logout()}
              className="text-red-500"
            >
              <LogOut className="mr-2 size-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
