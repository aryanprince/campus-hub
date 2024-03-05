import { AlertTriangle, Book, HandHelping, Home, Users } from "lucide-react";

export const sidebarLinks = [
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
