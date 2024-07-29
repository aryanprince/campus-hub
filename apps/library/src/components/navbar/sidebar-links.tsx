import {
  AlertTriangle,
  Bookmark,
  BookOpen,
  Home,
  LibraryBig,
  UserCog,
} from "lucide-react";

export const sidebarLinks = [
  { name: "Home", path: "/dashboard", icon: <Home className="size-5" /> },
  {
    name: "Books",
    path: "/dashboard/books",
    icon: <LibraryBig className="size-5" />,
  },
  {
    name: "Saved",
    path: "/dashboard/saved",
    icon: <Bookmark className="size-5" />,
  },
  {
    name: "Borrowed",
    path: "/dashboard/borrowed",
    icon: <BookOpen className="size-5" />,
  },
  {
    name: "Overdue",
    path: "/dashboard/overdue",
    icon: <AlertTriangle className="size-5" />,
  },
  {
    name: "Account",
    path: "/dashboard/account",
    icon: <UserCog className="size-5" />,
  },
];
