"use client";

import type { User } from "lucia";
import { LogOut, Settings2, UserIcon } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@campus-hub/ui/components/ui/avatar";
import { buttonVariants } from "@campus-hub/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@campus-hub/ui/components/ui/dropdown-menu";

import { logout } from "~/server/actions";

export default function UserAccountDropdown({ user }: { user: User | null }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={buttonVariants({
          variant: "ghost",
          size: "icon",
        })}
      >
        <Avatar className="size-8" aria-label="DP">
          <AvatarImage src="/default-avatar.jpg" alt="Default Avatar Image" />
          <AvatarFallback>DP</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>@{user?.username}</DropdownMenuLabel>
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
  );
}
