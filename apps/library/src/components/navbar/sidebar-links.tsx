import {
  AlertTriangle,
  Book,
  Bookmark,
  HandHelping,
  Home,
  Users,
} from "lucide-react";

export const sidebarLinks = [
  { name: "Home", path: "/dashboard", icon: <Home className="size-5" /> },
  {
    name: "All Books",
    path: "/dashboard/books",
    icon: <Book className="size-5" />,
  },
  {
    name: "Saved Books",
    path: "/dashboard/saved",
    icon: <Bookmark className="size-5" />,
  },
  {
    name: "Borrowed Loans",
    path: "/dashboard/borrowed",
    icon: <HandHelping className="size-5" />,
  },
  {
    name: "Overdue Loans",
    path: "/dashboard/overdue",
    icon: <AlertTriangle className="size-5" />,
  },
  {
    name: "My Account",
    path: "/dashboard/account",
    icon: <Users className="size-5" />,
  },
];
