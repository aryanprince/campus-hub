"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import type { Transaction } from "~/server/db/schema/main-schema";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "transactionId",
    header: "ID",
  },
  {
    accessorKey: "bookId",
    header: "Book ID",
  },
  {
    accessorKey: "borrowedDate",
    header: "Borrowed Date",
    cell: ({ row }) => {
      const date = row.original.borrowedDate;
      return format(date, "yyyy-MM-dd");
    },
  },
  {
    accessorKey: "returnedDate",
    header: "Returned Date",
    cell: ({ row }) => {
      const date = row.original.returnedDate ?? new Date("1970-01-01");
      return format(date, "yyyy-MM-dd");
    },
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => {
      const date = row.original.dueDate;
      return format(date, "yyyy-MM-dd");
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "overdueFee",
    header: "Overdue Fee",
    cell: ({ row }) => {
      const fee = row.original.overdueFee;
      return fee ? (
        <div className="text-right tabular-nums">{`£ ${fee.toFixed(2)}`}</div>
      ) : (
        <div className="text-center">-</div>
      );
    },
  },
  {
    accessorKey: "invoiceRef",
    header: "Invoice Reference",
    cell: ({ row }) => {
      const ref = row.original.invoiceRef;
      return ref ? (
        <div className="">{ref}</div>
      ) : (
        <div className="text-center">-</div>
      );
    },
  },
];
