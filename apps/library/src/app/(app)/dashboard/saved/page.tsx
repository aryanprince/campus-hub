import Link from "next/link";
import { BookHeart } from "lucide-react";

import { PageHeader } from "~/components/page-header";

export default function SavedBooks() {
  return (
    <div className="flex w-full flex-col gap-4 p-4 pt-0 md:p-8">
      {/* PAGE HEADER */}
      <PageHeader
        title="Saved Books"
        description="These are the books that you have saved for later. You can borrow them
          anytime."
      />

      <div className="flex-1">
        {/* MESSAGE IF NO BOOKS ARE LOANED */}
        <div className="flex h-full items-center justify-center">
          <div className="flex flex-col items-center justify-center rounded-lg bg-background p-4">
            <div className="mb-6 flex items-center justify-center rounded-full border p-6">
              <BookHeart className="size-12 text-muted-foreground" />
            </div>
            <h2 className="mb-2 text-xl font-semibold text-foreground">
              No books saved
            </h2>
            <p className="text-sm text-muted-foreground">
              Your saved books will appear here.{" "}
              <Link
                href="/dashboard/books"
                className="underline underline-offset-4"
              >
                Browse all books.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
