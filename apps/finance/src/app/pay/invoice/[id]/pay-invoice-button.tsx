"use client";

import { CreditCard } from "lucide-react";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";

export function PayInvoiceButton() {
  return (
    <Button
      onClick={() => {
        toast("Event has been created.");
      }}
    >
      <CreditCard className="mr-2 size-4" />
      Pay
    </Button>
  );
}
