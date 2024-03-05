import Image from "next/image";
import Link from "next/link";

import type { book } from "~/server/db/schema/main-schema";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { db } from "~/server/db/index";

type Book = typeof book.$inferSelect;

export default async function BooksPage() {
  const books = await db.query.book.findMany();

  return (
    <div className="flex w-full flex-col gap-4 p-6 pt-0 md:p-8">
      <div>
        <h1 className="text-2xl font-semibold md:text-4xl">Books</h1>
        <p className="text-sm text-muted-foreground md:text-base">
          A collection of books from the library. You can borrow books from
          here.
        </p>
      </div>
      <div className="flex h-fit max-w-6xl flex-wrap items-start justify-evenly gap-4 pb-8 lg:justify-start">
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
      className="flex h-fit w-[150px] flex-col gap-2 rounded-md border bg-card p-4 transition-colors hover:scale-[1.005] hover:border-neutral-300 dark:hover:border-neutral-600 md:w-[200px] md:p-6"
      key={book.bookId}
    >
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
      <div>
        <h1 className="truncate text-base font-medium md:text-lg">
          {book.title}
        </h1>
        <p className="truncate text-xs text-muted-foreground md:text-sm">
          {book.author}
        </p>
      </div>
    </Link>
  );
}
