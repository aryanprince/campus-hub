import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

import { BookCard } from "~/components/book-card";
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
    where: eq(transaction.userId, user.id),
    columns: {},
    with: {
      books: true,
    },
  });

  // Extract the books from the transaction object
  const loanedBooks = rawLoanedBooks.map((book) => book.books);

  return (
    <div className="flex w-full flex-col gap-4 p-4 pt-0 md:p-8">
      {/* PAGE TITLE */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight md:text-4xl">
          Borrowed Books
        </h1>
        <p className="text-sm text-muted-foreground md:text-base">
          These are the books you have borrowed from the library. You can return
          them anytime.
        </p>
      </div>

      {/* BOOK GRID - Maps over the BookCard component */}
      <div className="grid h-fit max-w-6xl auto-cols-max grid-flow-row grid-cols-2 place-content-center gap-4 pb-4 md:grid-cols-3 lg:grid-cols-4">
        {loanedBooks.map((book) => (
          <BookCard key={book.bookId} book={book} />
        ))}
      </div>
    </div>
  );
}
