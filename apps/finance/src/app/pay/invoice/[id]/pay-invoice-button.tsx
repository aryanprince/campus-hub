"use client";

import { CreditCard } from "lucide-react";
import { toast } from "sonner";

import type { Invoice } from "~/server/db/schema";
import { Button } from "~/components/ui/button";

type Invoice = typeof Invoice.$inferSelect;

export function PayInvoiceButton({ invoice }: { invoice: Invoice }) {
  return (
    <Button
      onClick={async () => {
        await fetch(`/api/invoices/reference/${invoice.referenceId}/pay`, {
          method: "PUT",
        });
        toast.message(`✅ Invoice paid successfully!`, {
          description: `Reference ID: ${invoice.referenceId}`,
        });
      }}
    >
      <CreditCard className="mr-2 size-4" />
      Pay
    </Button>
  );
}
