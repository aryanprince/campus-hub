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
    path: "/dashboard/books/saved",
    icon: <Bookmark className="size-5" />,
  },
  {
    name: "Borrowed Loans",
    path: "/dashboard/loans/active",
    icon: <HandHelping className="size-5" />,
  },
  {
    name: "Overdue Loans",
    path: "/dashboard/loans/overdue",
    icon: <AlertTriangle className="size-5" />,
  },
  {
    name: "My Account",
    path: "/dashboard/account",
    icon: <Users className="size-5" />,
  },
];
