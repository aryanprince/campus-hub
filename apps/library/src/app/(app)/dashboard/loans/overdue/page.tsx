import { redirect } from "next/navigation";
import { and, eq, lt, or } from "drizzle-orm";

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
          These are the books that are overdue. Return these books as soon as
          possible to minimize late fees.
        </p>
      </div>

      {/* BOOK GRID - Maps over the BookCard component */}
      <div className="grid h-fit max-w-6xl auto-cols-max grid-flow-row grid-cols-2 place-content-center gap-4 pb-4 md:grid-cols-3 lg:grid-cols-4">
        {overdueBooks.map((book) => (
          <BookCard key={book.bookId} book={book} />
        ))}
      </div>
    </div>
  );
}
