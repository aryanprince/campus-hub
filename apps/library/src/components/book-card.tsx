import Image from "next/image";
import Link from "next/link";

import type { Book } from "~/server/db/schema/main-schema";
import { AspectRatio } from "~/components/ui/aspect-ratio";

export function BookCard({ book }: { book: Book }) {
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
