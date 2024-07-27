"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { CheckCircle, Copy, ExternalLink, MoreHorizontal } from "lucide-react";

import { Button } from "@campus-hub/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@campus-hub/ui/components/ui/dropdown-menu";

import type { course } from "~/server/db/schema";

type Course = typeof course.$inferSelect;

export const columns: ColumnDef<Course | null>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "fee",
    header: "Fee",
    accessorFn: (course) => `£ ${course?.fee}`,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const course = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/courses/${course?.courseId}`}>
                <ExternalLink className="mr-2 size-4" />
                View course
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CheckCircle className="mr-2 size-4" />
              Enroll course
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                course?.courseId &&
                navigator.clipboard.writeText(course.courseId.toString())
              }
            >
              <Copy className="mr-2 size-4" />
              Copy ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
