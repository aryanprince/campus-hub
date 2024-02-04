"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type course } from "~/server/db/schema";

type Course = typeof course.$inferSelect;

export const columns: ColumnDef<Course>[] = [
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
    accessorFn: (course) => `£ ${course.fee}`,
  },
];
