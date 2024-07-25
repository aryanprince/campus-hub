import { Skeleton } from "~/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-between">
        <div className="flex w-full flex-col justify-start gap-1 p-4 lg:px-12 lg:pt-6">
          {/* PAGE TITLE */}
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Invoice Details
          </h1>
          <Skeleton className="h-4 w-24" />
        </div>

        {/* MAIN CONTENT */}
        <div className="flex w-full flex-1 flex-col items-center gap-8 px-4 lg:max-w-md lg:justify-center lg:px-0">
          {/* COURSE CARD */}
          <InvoiceCardSkeleton />

          {/* COURSE CARD - DISCLAIMER */}
          <div className="flex w-full max-w-xs flex-col gap-2 pb-8 lg:pb-0">
            <p className="text-balance text-center text-sm text-muted-foreground">
              Pay all your due fees from this Finance Portal to be eligible to
              graduate.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

function InvoiceCardSkeleton() {
  return (
    <div className="flex w-full max-w-[400px] flex-col gap-8 rounded-md border p-8">
      {/* INVOICE HEADER - Summary highlighting the invoice amount */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-28" />
          </div>
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-4 w-36" />
        </div>
      </div>

      {/* ADDITIONAL INFORMATION - Displayed in 2 column layout */}
      <div className="flex flex-col gap-4 border-y py-8 text-sm">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-28" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-28" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-28" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-28" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-28" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>

      {/* INVOICE FOOTER - Contains buttons to pay fees and go back */}
      <div className="flex justify-between">
        <Skeleton className="h-9 w-[100px]" />

        <Skeleton className="h-9 w-20" />
      </div>
    </div>
  );
}
