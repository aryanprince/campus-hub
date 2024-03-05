import { db } from "~/server/db/index";

export default async function BooksPage() {
  const books = await db.query.book.findMany();

  return (
    <div>
      <h1>Books Page</h1>
      <ul>
        {books.map((book) => (
          <li key={book.bookId}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
}
