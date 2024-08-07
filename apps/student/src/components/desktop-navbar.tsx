"use client";

import type { User } from "lucia";
import Image from "next/image";
import Link from "next/link";
import {
  CircleUserRound,
  Grip,
  Landmark,
  Library,
  LibraryBig,
  LogOut,
  NotebookText,
  Settings,
  User as UserIcon,
} from "lucide-react";

import { Button } from "@campus-hub/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@campus-hub/ui/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@campus-hub/ui/components/ui/navigation-menu";

import type { student } from "~/server/db/schema";
import { env } from "~/env";
import { logout } from "~/server/actions";

type Student = typeof student.$inferSelect;

export function DesktopNavbar({
  user,
  student,
}: {
  user: User | null;
  student: Student | undefined;
}) {
  return (
    <div className="flex w-full items-center justify-between">
      {/* NAVBAR - BRAND LOGO */}
      <div className="flex items-center gap-4">
        <Image
          src="/logo.png"
          width={32}
          height={32}
          alt="Student Portal Logo"
        />
        <h1 className="text-xl font-semibold">Student Portal</h1>
      </div>

      {/* NAVBAR - NAVMENU LINKS */}
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem asChild>
            <Link href="/dashboard" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className={navigationMenuTriggerStyle()}>
              <Link href="/dashboard/courses">Courses</Link>
            </NavigationMenuTrigger>

            {/* COURSES - DROPDOWN SUB-NAVMENU */}
            <NavigationMenuContent>
              <div className="flex w-[250px] flex-col gap-2 bg-background p-4">
                <NavigationMenuLink>
                  <Link
                    href="/dashboard/courses"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="flex items-center gap-2">
                      <LibraryBig className="size-5" />
                      <p className="leading-none">All Courses</p>
                    </div>
                    <p className="line-clamp-2 max-w-fit text-sm leading-snug text-muted-foreground">
                      View all the courses on our platform
                    </p>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink>
                  <Link
                    href="/dashboard/courses/enrolled"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="flex items-center gap-2">
                      <NotebookText className="size-5" />
                      <p className="leading-none">Enrolled Courses</p>
                    </div>
                    <p className="line-clamp-2 max-w-fit text-sm leading-snug text-muted-foreground">
                      See the courses you are enrolled in
                    </p>
                  </Link>
                </NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem asChild>
            <Link href="/dashboard/graduation" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Graduation
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem asChild>
            <Link href="/dashboard/profile" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Profile
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* NAVBAR - RIGHT SIDE ICONS */}
      <div className="flex items-center gap-4">
        {/* NAVBAR - MICROSERVICE SWITCHER */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="rounded-full p-2 active:bg-zinc-200">
              <Grip size={24} className="hidden md:block" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel className="truncate text-sm text-foreground">
              Switch microservices
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href={`${env.NEXT_PUBLIC_API_FINANCE_URL}`}
                target="_blank"
                className="flex"
              >
                <Landmark size={18} className="mr-2" />
                Finance
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={`${env.NEXT_PUBLIC_API_LIBRARY_URL}`}
                target="_blank"
                className="flex"
              >
                <Library size={18} className="mr-2" />
                Library
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* NAVBAR - USER DROPDOWN */}
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size={"icon"} variant={"ghost"}>
                <CircleUserRound />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel asChild>
                <div className="flex flex-col">
                  <p className="truncate text-base text-foreground">
                    {student?.firstName}
                  </p>
                  <p className="truncate text-sm font-normal text-muted-foreground">
                    {student?.studentEmail}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile" className="flex">
                  <UserIcon size={18} className="mr-2" />
                  View profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings" className="flex">
                  <Settings size={18} className="mr-2" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="w-full cursor-pointer text-red-600 dark:text-red-500"
                onClick={async () => await logout()}
              >
                <LogOut size={18} className="mr-2" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}
