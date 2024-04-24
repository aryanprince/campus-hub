import { redirect } from "next/navigation";
import { and, eq, lt, or } from "drizzle-orm";
import { BookCopy } from "lucide-react";

import { BookCard } from "~/components/book-card";
import { validateRequest } from "~/server/auth";
import { db } from "~/server/db";
import { transaction } from "~/server/db/schema/main-schema";

export default async function OverduePage() {
  const { user } = await validateRequest();

  // If the user is not logged in, show a message and a login link
  if (!user) {
    redirect("/login");
  }

  // Fetch the books that the user has borrowed, removing the transaction object from the result
  const rawOverdueBooks = await db.query.transaction.findMany({
    where: or(
      and(eq(transaction.userId, user.id), eq(transaction.status, "OVERDUE")),
      and(
        eq(transaction.userId, user.id),
        and(
          eq(transaction.status, "ACTIVE"),
          lt(transaction.dueDate, new Date()),
        ),
      ),
    ),
    columns: {},
    with: {
      books: true,
    },
  });

  // Extract the books from the transaction object
  const overdueBooks = rawOverdueBooks.map((book) => book.books);

  return (
    <div className="flex w-full flex-col gap-4 p-4 pt-0 md:p-8">
      {/* PAGE TITLE */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight md:text-4xl">
          Overdue Loans
        </h1>
        <p className="text-sm text-muted-foreground md:text-base">
          Return these books as soon as possible to minimize late fees. Pay your
          late fees at the finance portal to return these books.
        </p>
      </div>

      <div className="flex-1">
        {/* BOOK GRID - Maps over the BookCard component */}
        {overdueBooks.length > 0 && (
          <div className="grid h-fit max-w-6xl auto-cols-max grid-flow-row grid-cols-2 place-content-center gap-4 pb-4 md:grid-cols-3 lg:grid-cols-4">
            {overdueBooks.map((book) => (
              <BookCard key={book.bookId} book={book} />
            ))}
          </div>
        )}

        {/* MESSAGE IF NO BOOKS ARE OVERDUE */}
        {overdueBooks.length === 0 && (
          <div className="flex h-full items-center justify-center">
            <div className="flex flex-col items-center justify-center rounded-lg bg-background p-4">
              <div className="mb-6 flex items-center justify-center rounded-full border p-6">
                <BookCopy className="size-12 text-muted-foreground" />
              </div>
              <h2 className="mb-2 text-xl font-semibold text-foreground">
                No overdue books
              </h2>
              <p className="text-sm text-muted-foreground">
                You have no books that are currently overdue.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
