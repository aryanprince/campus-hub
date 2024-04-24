import { asc } from "drizzle-orm";

import { BookCard } from "~/components/book-card";
import { db } from "~/server/db/index";
import { book } from "~/server/db/schema/main-schema";

export default async function BooksPage() {
  const books = await db.query.book.findMany({
    orderBy: [asc(book.bookId)],
  });

  return (
    <div className="flex w-full flex-col gap-4 p-4 pt-0 md:p-8">
      {/* PAGE TITLE */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight md:text-4xl">
          All Books
        </h1>
        <p className="text-sm text-muted-foreground md:text-base">
          A collection of books from the library. You can borrow books from
          here.
        </p>
      </div>

      {/* BOOK GRID - Maps over the BookCard component */}
      <div className="grid h-fit max-w-6xl auto-cols-max grid-flow-row grid-cols-2 place-content-center gap-4 pb-4 md:grid-cols-3 lg:grid-cols-4">
        {books.map((book) => (
          <BookCard key={book.bookId} book={book} />
        ))}
      </div>
    </div>
  );
}
