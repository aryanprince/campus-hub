"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Copy } from "lucide-react";

import { Button } from "@campus-hub/ui/components/ui/button";
import { Input } from "@campus-hub/ui/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@campus-hub/ui/components/ui/tooltip";

import { sleep } from "~/lib/utils";

export default function FinanceInvoiceForm() {
  const [referenceId, setReferenceId] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6 rounded-md border p-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold">
          Enter your finance invoice number
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your finance invoice number to view and pay your tuition fees
          and library fines.
        </p>
      </div>

      <div className="flex items-center justify-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"secondary"}
                className="w-fit"
                onClick={async () => {
                  setIsCopied(true);
                  await navigator.clipboard.writeText("ABC123");
                  await sleep(1.5);
                  setIsCopied(false);
                }}
              >
                {isCopied ? (
                  <Check className="mr-2 size-5" />
                ) : (
                  <Copy className="mr-2 size-5" />
                )}
                Try this invoice number for example
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>&quot;ABC123&quot;</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex flex-col gap-3">
        <Input onChange={(e) => setReferenceId(e.target.value)} />
        <Button
          className="w-full"
          onClick={() => {
            router.push(`/pay/invoice/${referenceId}`);
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
