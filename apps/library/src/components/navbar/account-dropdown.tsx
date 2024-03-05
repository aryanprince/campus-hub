"use client";

import type { Session, User } from "lucia";
import { LogOut, Settings2, UserIcon } from "lucide-react";

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
import { logout } from "~/server/actions";

export default function UserAccountDropdown({
  session,
}: {
  session: {
    user: User | null;
    session: Session | null;
  };
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={buttonVariants({
          variant: "ghost",
          size: "icon",
        })}
      >
        <Avatar className="size-8">
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
  );
}
