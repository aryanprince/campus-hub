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
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";

import { LogOut, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import { signOut, useSession } from "next-auth/react";

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
            <Link href="/dashboard/courses" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Courses
              </NavigationMenuLink>
            </Link>
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
                <AvatarFallback>{session.user.name}</AvatarFallback>
              </>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
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
