import { asc } from "drizzle-orm";

import { BookCard } from "~/components/book-card";
import { PageHeader } from "~/components/page-header";
import { db } from "~/server/db/index";
import { book } from "~/server/db/schema/main-schema";

export default async function BooksPage() {
  const books = await db.query.book.findMany({
    orderBy: [asc(book.bookId)],
  });

  return (
    <div className="flex w-full flex-col gap-4 p-4 pt-0 md:p-8">
      {/* PAGE HEADER */}
      <PageHeader
        title="All Books"
        description="A collection of books from the library. You can borrow books from
          here."
      />

      {/* BOOK GRID - Maps over the BookCard component */}
      <div className="flex-1">
        <div className="grid h-fit max-w-6xl auto-cols-max grid-flow-row grid-cols-2 place-content-center gap-4 pb-4 md:grid-cols-3 lg:grid-cols-4">
          {books.map((book) => (
            <BookCard key={book.bookId} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}
