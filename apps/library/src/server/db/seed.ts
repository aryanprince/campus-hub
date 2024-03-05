import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "~/env";
import { book } from "./schema/main-schema";

if (!env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const postgresClient = postgres(env.DATABASE_URL, {
  max: 1,
});

const db = drizzle(postgresClient, { logger: true });

async function seed() {
  console.log("🌱 Seeding db migration...");

  console.log("🌱 Deleting all data...\n");

  // First deletes all books from the database
  await db.delete(book);

  // Inserts 10 books into the database
  await db.insert(book).values([
    {
      bookId: "1",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      copies: 5,
      description:
        "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.",
      genre: "Fiction",
      isbn: "9780743273565",
      language: "English",
      year: 1925,
    },
    {
      bookId: "2",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      copies: 3,
      description:
        "To Kill a Mockingbird is a novel by the American author Harper Lee. It was published in 1960 and was instantly successful. In the United States, it is widely read in high schools and middle schools.",
      genre: "Fiction",
      isbn: "6066832853858",
      language: "English",
      year: 1960,
    },
    {
      bookId: "3",
      title: "1984",
      author: "George Orwell",
      copies: 7,
      description:
        "1984 is a novel by George Orwell. It was published in 1949. It is about a society where the government is in complete control over everything. The book is set in London, which is part of the country Oceania. The world is divided into three countries that are always at war with each other: Oceania, Eurasia, and Eastasia.",
      genre: "Fiction",
      isbn: "9838455853566",
      language: "English",
      year: 1949,
    },
    {
      bookId: "4",
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      copies: 6,
      description:
        "The Hobbit, or There and Back Again is a children's fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction.",
      genre: "Fiction",
      isbn: "7138559762583",
      language: "English",
      year: 1937,
    },
    {
      bookId: "5",
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      copies: 8,
      description:
        "The Lord of the Rings is an epic high-fantasy novel by the English author and scholar J. R. R. Tolkien. Set in Middle-earth, the world at some distant time in the past, the story began as a sequel to Tolkien's 1937 children's book The Hobbit, but eventually developed into a much larger work.",
      genre: "Fiction",
      isbn: "3773221091069",
      language: "English",
      year: 1954,
    },
    {
      bookId: "6",
      title: "The Alchemist",
      author: "Paulo Coelho",
      copies: 10,
      description:
        "The Alchemist is a novel by Brazilian author Paulo Coelho that was first published in 1988. Originally written in Portuguese, it became an international bestseller translated into some 70 languages as of 2016.",
      genre: "Fiction",
      isbn: "2462365155615",
      language: "English",
      year: 1988,
    },
    {
      bookId: "7",
      title: "The Da Vinci Code",
      author: "Dan Brown",
      copies: 3,
      description:
        "The Da Vinci Code is a mystery thriller novel by Dan Brown. It is Brown's second novel to include the character Robert Langdon: the first was his 2000 novel Angels & Demons. The Da Vinci Code follows symbologist Robert Langdon and cryptologist Sophie Neveu after a",
      genre: "Fiction",
      isbn: "2150766061977",
      language: "English",
      year: 2003,
    },
    {
      bookId: "8",
      author: "Dan Brown",
      title: "Angels & Demons",
      copies: 3,
      description:
        "Angels & Demons is a 2000 bestselling mystery-thriller novel written by American author Dan Brown and published by Pocket Books and then by Corgi Books. The novel introduces the character Robert Langdon, who recurs as the protagonist of Brown's subsequent novels.",
      genre: "Fiction",
      isbn: "4388204973272",
      language: "English",
      year: 2000,
    },
    {
      bookId: "9",
      genre: "Non-Fiction",
      title: "The Diary of Anne Frank",
      author: "Anne Frank",
      copies: 3,
      description:
        "The Diary of a Anne Frank is a book of the writings from the Dutch language diary kept by Anne Frank while she was in hiding for two years with her family",
      isbn: "5404569961329",
      language: "English",
      year: 1947,
    },
    {
      bookId: "10",
      genre: "Business",
      title: "Rich Dad Poor Dad",
      author: "Robert T. Kiyosaki",
      copies: 3,
      description:
        "Rich Dad Poor Dad is a 1997 book written by Robert Kiyosaki and Sharon Lechter. It advocates the importance of financial literacy, financial independence and building wealth through investing in assets, real estate investing, starting and owning businesses, as well as increasing one's financial intelligence to improve one's business and financial aptitude.",
      isbn: "8499195396225",
      language: "English",
      year: 1997,
    },
  ]);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    console.log("🌱 Seeding complete!\n");
    await postgresClient.end();
  });
