import Image from "next/image";

import type { book } from "~/server/db/schema/main-schema";
import { db } from "~/server/db/index";

type Book = typeof book.$inferSelect;

export default async function BooksPage() {
  const books = await db.query.book.findMany();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Books</h1>
      <div className="mt-4 flex gap-4">
        {books.map((book) => (
          <BookCard key={book.bookId} book={book} />
        ))}
      </div>
    </div>
  );
}

function BookCard({ book }: { book: Book }) {
  return (
    <div
      className="flex max-w-[200px] flex-col gap-2 rounded-md bg-neutral-50 p-6"
      key={book.bookId}
    >
      <Image src={book.image} width={150} height={250} />
      <div>
        <h1 className="truncate text-lg font-medium">{book.title}</h1>
        <p className="text-sm text-muted-foreground">{book.author}</p>
      </div>
    </div>
  );
}
