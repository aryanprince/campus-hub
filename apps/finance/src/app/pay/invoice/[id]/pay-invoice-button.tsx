"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@campus-hub/ui/button";

import type { invoice } from "~/server/db/schema/main-schema";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
      <DialogContent className="max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Pay Invoice #{invoice.invoiceId}</DialogTitle>
          <DialogDescription>
            Pay the full amount of this invoice to clear your dues. You will be
            redirected to the payment gateway.
          </DialogDescription>
        </DialogHeader>

        {/* DIALOG CONTENT */}
        <div className="flex flex-col gap-4">
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
                toast.success(`Invoice paid successfully!`, {
                  description: `Reference ID: ${invoice.referenceId}`,
                });
              } catch (error) {
                toast.error(`❌ Error: Failed to pay invoice!`);
              }
            }}
          >
            Pay Full Amount
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
