import Link from "next/link";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@campus-hub/ui/badge";
import { buttonVariants } from "@campus-hub/ui/button";

import type { invoice } from "~/server/db/schema/main-schema";
import { env } from "~/env";
import { normalizeString } from "~/lib/utils";
import { PayInvoiceButton } from "./pay-invoice-button";

type Invoice = typeof invoice.$inferSelect;

export default async function InvoicePage({
  params,
}: {
  params: { id: string };
}) {
  const res = await fetch(
    `${env.NEXT_PUBLIC_API_BASE_URL}/api/invoices/reference/${params.id}`,
  );
  const invoice = (await res.json()) as Invoice;

  if (!invoice) {
    return <div>Invoice not found</div>;
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-between">
      <div className="flex w-full flex-col justify-start p-4 lg:px-12 lg:pt-6">
        {/* PAGE TITLE */}
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Invoice Details
        </h1>
        <p className="text-muted-foreground">Invoice #{invoice.invoiceId}</p>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex w-full flex-1 flex-col items-center gap-8 px-4 lg:max-w-md lg:justify-center lg:px-0">
        {/* COURSE CARD */}
        <InvoiceCard invoice={invoice} />

        {/* COURSE CARD - DISCLAIMER */}
        <div className="flex w-full max-w-xs flex-col gap-2 pb-8 lg:pb-0">
          <p className="text-balance text-center text-sm text-muted-foreground">
            Pay all your due fees from this Finance Portal to be eligible to
            graduate.
          </p>
        </div>
      </div>
    </div>
  );
}

function InvoiceCard({ invoice }: { invoice: Invoice }) {
  return (
    <div className="flex w-full max-w-[400px] flex-col gap-8 rounded-md border p-8">
      {/* INVOICE HEADER - Summary highlighting the invoice amount */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <div>
              {invoice.invoiceType === "LIBRARY_FINE" && (
                <p className="text-muted-foreground">Library Fine</p>
              )}
              {invoice.invoiceType === "TUITION_FEES" && (
                <Badge className="w-fit">Tuition Fees</Badge>
              )}
            </div>

            <div>
              {invoice.invoiceStatus === "OUTSTANDING" && (
                <Badge className="w-fit bg-red-500 dark:bg-red-600">
                  Outstanding
                </Badge>
              )}
              {invoice.invoiceStatus === "PARTIALLY_PAID" && (
                <Badge className="w-fit bg-orange-500">Partially Paid</Badge>
              )}
              {invoice.invoiceStatus === "PAID" && (
                <Badge className="w-fit bg-blue-500">Paid</Badge>
              )}
              {invoice.invoiceStatus === "CANCELLED" && (
                <Badge className="w-fit bg-yellow-500">Cancelled</Badge>
              )}
            </div>
          </div>
          <p className="text-4xl font-semibold">£ {invoice.amount}</p>
          <p className="text-sm text-muted-foreground">
            Due {format(invoice.dueDate, "MMMM d, y")}
          </p>
        </div>
      </div>

      {/* ADDITIONAL INFORMATION - Displayed in 2 column layout */}
      <div className="flex flex-col gap-3 border-y py-8 text-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-muted-foreground">Invoice ID</h2>
          <p>{invoice.invoiceId}</p>
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-muted-foreground">Student ID</h2>
          <p>{invoice.studentId}</p>
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-muted-foreground">Reference ID</h2>
          <p>{invoice.referenceId}</p>
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-muted-foreground">Due Date</h2>
          <p>{format(invoice.dueDate, "MMMM d, y")}</p>
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-muted-foreground">Invoice Type</h2>
          <p>{normalizeString(invoice.invoiceType)}</p>
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-muted-foreground">Invoice Status</h2>
          <p>{normalizeString(invoice.invoiceStatus)}</p>
        </div>
      </div>

      {/* INVOICE FOOTER - Contains buttons to pay fees and go back */}
      <div className="flex justify-between">
        <Link
          href={"/pay/"}
          className={buttonVariants({ variant: "secondary" })}
        >
          <ArrowLeft className="mr-2 size-4" />
          Cancel
        </Link>
        <PayInvoiceButton invoice={invoice} />
      </div>
    </div>
  );
}
