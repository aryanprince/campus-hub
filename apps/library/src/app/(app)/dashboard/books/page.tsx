import Image from "next/image";
import Link from "next/link";

import type { book } from "~/server/db/schema/main-schema";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { db } from "~/server/db/index";

type Book = typeof book.$inferSelect;

export default async function BooksPage() {
  const books = await db.query.book.findMany();

  return (
    <div className="flex w-full flex-col gap-4 p-8">
      <div>
        <h1 className="text-4xl font-semibold">Books</h1>
        <p className="text-muted-foreground">
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
      className="flex h-fit w-[150px] flex-col gap-2 rounded-md border bg-card p-6 transition-colors hover:scale-[1.005] hover:border-neutral-300 dark:hover:border-neutral-600 md:w-[200px]"
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
        <h1 className="truncate text-lg font-medium">{book.title}</h1>
        <p className="truncate text-sm text-muted-foreground">{book.author}</p>
      </div>
    </Link>
  );
}
