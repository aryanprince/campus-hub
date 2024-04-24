import { AlertTriangle, Book, HandHelping, Home, Users } from "lucide-react";

export const sidebarLinks = [
  { name: "Home", path: "/dashboard", icon: <Home className="size-5" /> },
  {
    name: "All Books",
    path: "/dashboard/books",
    icon: <Book className="size-5" />,
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
  {
    name: "My Account",
    path: "/dashboard/account",
    icon: <Users className="size-5" />,
  },
];
