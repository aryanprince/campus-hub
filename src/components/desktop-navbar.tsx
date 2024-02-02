"use client";

import { type Session } from "next-auth";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";

import {
  LibraryBig,
  LogOut,
  NotebookText,
  Settings,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import { signOut } from "next-auth/react";

export function DesktopNavbar({ session }: { session: Session | null }) {
  return (
    <div className="flex w-full items-center justify-between">
      <h1 className="text-xl font-semibold">Student Portal</h1>

      {/* NAVBAR MENU */}
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/dashboard" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className={navigationMenuTriggerStyle()}>
              Courses
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="flex w-[250px] flex-col gap-2 bg-background p-4">
                <NavigationMenuLink asChild>
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
                <NavigationMenuLink asChild>
                  <Link
                    href="/dashboard/courses"
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
        </NavigationMenuList>
      </NavigationMenu>

      {/* NAVBAR AVATAR - DROPDOWN */}
      {session?.user && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <>
                {session.user.image && <AvatarImage src={session.user.image} />}
                <AvatarFallback>DP</AvatarFallback>
              </>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <p className="truncate text-base text-foreground">
                  {session.user?.name}
                </p>
                <p className="truncate font-normal text-muted-foreground">
                  {session.user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/dashboard/settings" className="flex">
                <User size={18} className="mr-2" />
                View profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/dashboard/settings" className="flex">
                <Settings size={18} className="mr-2" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="w-full cursor-pointer text-destructive"
              onClick={() => signOut()}
            >
              <LogOut size={18} className="mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
