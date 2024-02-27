import FinanceInvoiceForm from "~/components/finance-invoice-form";

export default async function Pay() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="flex w-full flex-col justify-start px-12 pt-6">
        {/* PAGE TITLE */}
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Payments & Invoices
        </h1>
        <p className="text-muted-foreground">
          Pay your fees and view your invoices
        </p>
      </div>

      <div className="-mt-[85px] flex w-full max-w-md flex-1 flex-col justify-center">
        <FinanceInvoiceForm />
      </div>
    </div>
  );
}
