import { eq } from "drizzle-orm";

import { validateRequest } from "~/server/auth";
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

  const { user } = await validateRequest();

  if (!user) {
    return (
      <div>
        <h1>Unauthorized</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-8">
      <div className="flex h-fit max-w-6xl flex-wrap items-start gap-4 pb-8">
        {currentBook && (
          <BookInfo currentBook={currentBook} currentUser={user} />
        )}
      </div>
    </div>
  );
}
