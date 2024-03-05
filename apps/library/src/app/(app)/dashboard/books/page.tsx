import { db } from "~/server/db/index";

export default async function BooksPage() {
  const books = await db.query.book.findMany();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Books page</h1>
      <ul className="mt-4">
        {books.map((book) => (
          <li key={book.bookId}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
}
