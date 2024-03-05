import { eq } from "drizzle-orm";

import { db } from "~/server/db/index";
import { book } from "~/server/db/schema/main-schema";
import BookInfo from "./book-info";

export default async function BookDetailPage({
  params,
}: {
  params: { bookId: string };
}) {
  const currentBook = await db.query.book.findFirst({
    where: eq(book.bookId, params.bookId),
  });

  return (
    <div className="flex flex-col gap-4 p-8">
      <div className="flex h-fit max-w-6xl flex-wrap items-start gap-4 pb-8">
        {currentBook && <BookInfo currentBook={currentBook} />}
      </div>
    </div>
  );
}
