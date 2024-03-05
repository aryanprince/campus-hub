import Image from "next/image";
import Link from "next/link";

import type { Book } from "~/server/db/schema/main-schema";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { db } from "~/server/db/index";

export default async function BooksPage() {
  const books = await db.query.book.findMany();

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

function BookCard({ book }: { book: Book }) {
  return (
    <Link
      href={`/dashboard/books/${book.bookId}`}
      className="flex flex-col gap-2 rounded-sm border bg-card p-2 transition-colors hover:scale-[1.005] hover:border-neutral-300 dark:hover:border-neutral-600 md:p-2 lg:p-4"
      key={book.bookId}
    >
      {/* BOOK IMAGE */}
      {book.image && book.title && (
        <AspectRatio ratio={1 / 1.6} className="bg-muted">
          <Image
            className="rounded-[5px] object-cover"
            src={book.image}
            alt={book.title}
            fill
          />
        </AspectRatio>
      )}

      {/* BOOK DETAILS */}
      <div>
        <h1 className="truncate text-sm font-medium md:text-base">
          {book.title}
        </h1>
        <p className="truncate text-xs text-muted-foreground md:text-sm">
          {book.author}
        </p>
      </div>
    </Link>
  );
}
