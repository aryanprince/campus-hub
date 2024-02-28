"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard } from "lucide-react";
import { toast } from "sonner";

import type { invoice } from "~/server/db/schema/main-schema";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

type Invoice = typeof invoice.$inferSelect;

export function PayInvoiceButton({ invoice }: { invoice: Invoice }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <CreditCard className="mr-2 size-4" />
          Pay
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter amount to pay for invoice</DialogTitle>
          <DialogDescription>
            Provide an amount to pay, or select the full amount to pay the
            invoice.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={async () => {
              try {
                await fetch(
                  `/api/invoices/reference/${invoice.referenceId}/pay`,
                  {
                    method: "PUT",
                  },
                );
                router.refresh();
                setIsOpen(false);
                toast.message(`✅ Invoice paid successfully!`, {
                  description: `Reference ID: ${invoice.referenceId}`,
                });
              } catch (error) {
                toast.error(`❌ Error: Failed to pay invoice!`);
              }
            }}
          >
            Pay in Full
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
