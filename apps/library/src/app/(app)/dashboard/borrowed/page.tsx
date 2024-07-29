import Link from "next/link";
import { redirect } from "next/navigation";
import { and, eq, gt } from "drizzle-orm";
import { BookOpenCheck } from "lucide-react";

import { BookCard } from "~/components/book-card";
import { PageHeader } from "~/components/page-header";
import { validateRequest } from "~/server/auth";
import { db } from "~/server/db";
import { transaction } from "~/server/db/schema/main-schema";

export default async function LoansPage() {
  const { user } = await validateRequest();

  // If the user is not logged in, show a message and a login link
  if (!user) {
    redirect("/login");
  }

  // Fetch the books that the user has borrowed, removing the transaction object from the result
  const rawLoanedBooks = await db.query.transaction.findMany({
    where: and(
      and(eq(transaction.userId, user.id), eq(transaction.status, "ACTIVE")),
      gt(transaction.dueDate, new Date()),
    ),
    columns: {},
    with: {
      books: true,
    },
  });

  // Extract the books from the transaction object
  const loanedBooks = rawLoanedBooks.map((book) => book.books);

  return (
    <div className="flex w-full flex-col gap-4 p-4 pt-0 md:p-8">
      {/* PAGE HEADER */}
      <PageHeader
        title="Borrowed Books"
        description="View the books you have borrowed from the library."
      />

      <div className="flex-1">
        {/* BOOK GRID - Maps over the BookCard component */}
        {loanedBooks.length > 0 && (
          <div className="grid h-fit max-w-6xl auto-cols-max grid-flow-row grid-cols-2 place-content-center gap-4 pb-4 md:grid-cols-3 lg:grid-cols-4">
            {loanedBooks.map((book) => (
              <BookCard key={book.bookId} book={book} />
            ))}
          </div>
        )}
        {/* MESSAGE IF NO BOOKS ARE LOANED */}
        {loanedBooks.length === 0 && (
          <div className="flex h-full items-center justify-center">
            <div className="flex flex-col items-center justify-center rounded-lg bg-background p-4">
              <div className="mb-6 flex items-center justify-center rounded-full border p-6">
                <BookOpenCheck className="size-12 text-muted-foreground" />
              </div>
              <h2 className="mb-2 text-xl font-semibold text-foreground">
                No borrowed books
              </h2>
              <p className="text-sm text-muted-foreground">
                No borrowed books yet.{" "}
                <Link
                  href="/dashboard/books"
                  className="underline underline-offset-4"
                >
                  Explore books to borrow.
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
