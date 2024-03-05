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
  console.log("🌱 RUNNING SEED SCRIPT (seed.ts)");

  console.log("🌱 Deleting all data...\n");

  const start = Date.now();

  // First deletes all books from the database
  await db.delete(book);

  console.log("\n🌱 Deleted all data successfully...");

  console.log("🌱 Starting seeding process...\n");

  // Inserts 10 books into the database
  await db.insert(book).values([
    {
      bookId: "1",
      title: "Atomic Habits",
      author: "James Clear",
      description:
        "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones is a 2018 self-help book by James Clear. The book delves into practical strategies that can help individuals form good habits, eliminate bad ones, and master the tiny behaviors that lead to remarkable results.",
      copies: 2,
      genre: "Non-Fiction",
      isbn: "9781847941848",
      language: "English",
      year: 2018,
      image:
        "https://is5-ssl.mzstatic.com/image/thumb/Publication116/v4/a6/cb/fc/a6cbfc7d-3c6a-d9f1-b83c-c24cbd61ef77/9780735211308.d.jpg/100000x100000-999.jpg",
    },
    {
      bookId: "2",
      title: "The Subtle Art of Not Giving a F*ck",
      author: "Mark Manson",
      copies: 3,
      description:
        "The Subtle Art of Not Giving a F*ck: A Counterintuitive Approach to Living a Good Life is the second book by blogger and author Mark Manson. It was published under the imprint of HarperOne, a division of HarperCollins Publishers, and was released on September 13, 2016. The book is a reaction to the self-help industry and a response to the question of what Manson saw as a culture of mindless positivity that isn't practical or helpful for most people.",
      genre: "Non-Fiction",
      isbn: "9780062457714",
      language: "English",
      year: 2016,
      image:
        "https://is5-ssl.mzstatic.com/image/thumb/Publication114/v4/32/d5/2a/32d52aff-9c35-c7dc-d2f0-2c64930e0edd/9780062457738.jpg/100000x100000-999.jpg",
    },
    {
      bookId: "3",
      title: "The 7 Habits of Highly Effective People",
      author: "Stephen R. Covey",
      copies: 7,
      description:
        "The 7 Habits of Highly Effective People is a self-help book written by Stephen R. Covey. It was first published in 1989. The book is a business and self-help book that aims to provide readers with the tools to improve their personal and professional lives.",
      genre: "Self-Help",
      isbn: "9838455853566",
      language: "English",
      year: 1949,
      image:
        "https://is5-ssl.mzstatic.com/image/thumb/Publication122/v4/84/d6/1c/84d61ca4-1128-a292-ac88-2ffb19cdae28/9781633533103_FC.jpg/100000x100000-999.jpg",
    },
    {
      bookId: "4",
      title: "How to Win Friends and Influence People",
      author: "Dale Carnegie",
      copies: 6,
      description:
        "How to Win Friends and Influence People is a self-help book written by Dale Carnegie, published in 1936. Over 30 million copies have been sold worldwide, making it one of the best-selling books of all time. In 2011, it was number 19 on Time Magazine's list of the 100 most influential books. Carnegie had been conducting business education courses in New York since 1912.",
      genre: "Self-Help",
      isbn: "9780671027032",
      language: "English",
      year: 1936,
      image:
        "https://is5-ssl.mzstatic.com/image/thumb/Publication114/v4/fd/e1/c5/fde1c545-9584-d49f-4f31-d337fc11f24b/HTWF_IP.png/100000x100000-999.jpg",
    },
    {
      bookId: "5",
      title: "Rich Dad Poor Dad",
      author: "Robert T. Kiyosaki",
      copies: 8,
      description:
        "Rich Dad Poor Dad is a 1997 book written by Robert Kiyosaki and Sharon Lechter. It advocates the importance of financial literacy, financial independence and building wealth through investing in assets, real estate investing, starting and owning businesses, as well as increasing one's financial intelligence to improve one's business and financial aptitude.",
      genre: "Business",
      isbn: "3773221091069",
      language: "English",
      year: 1997,
      image:
        "https://is5-ssl.mzstatic.com/image/thumb/Publication123/v4/fc/64/ab/fc64ab95-ec6e-e9d4-c3f3-9280a7863b86/9781612680163.jpg/100000x100000-999.jpg",
    },
    {
      bookId: "6",
      title: "Think and Grow Rich",
      author: "Napoleon Hill",
      copies: 10,
      description:
        "Think and Grow Rich was written by Napoleon Hill in 1937 and promoted as a personal development and self-improvement book. He claimed to be inspired by a suggestion from business magnate and later-philanthropist Andrew Carnegie.",
      genre: "Business",
      isbn: "9781585424337",
      language: "English",
      year: 1937,
      image:
        "https://is5-ssl.mzstatic.com/image/thumb/Publication/25/88/bc/mzi.bybaubsm.jpg/100000x100000-999.jpg",
    },
    {
      bookId: "7",
      title: "The 4 Hour Work Week",
      author: "Timothy Ferriss",
      copies: 3,
      description:
        "The 4-Hour Workweek: Escape 9-5, Live Anywhere, and Join the New Rich is a self-help book by Timothy Ferriss, an American writer, educational activist, and entrepreneur. The book has spent more than four years on The New York Times Best Seller List, has been translated into 40 languages and has sold more than 2.1 million copies worldwide.",
      genre: "Business",
      isbn: "9780307465351",
      language: "English",
      year: 2007,
      image:
        "https://is5-ssl.mzstatic.com/image/thumb/Publication69/v4/80/23/56/8023566b-e8dc-53ae-5044-b547e7c298dc/9780307591166.jpg/100000x100000-999.jpg",
    },
    {
      bookId: "8",
      author: "The Lean Startup",
      title: "Eric Ries",
      copies: 3,
      description:
        "The Lean Startup: How Today's Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses is a book by Eric Ries describing his proposed lean startup strategy for startup companies.",
      genre: "Business",
      isbn: "9780307887894",
      language: "English",
      year: 2011,
      image:
        "https://is5-ssl.mzstatic.com/image/thumb/Publication2/v4/09/25/78/092578c0-202d-85a4-15f8-671efbb82f8e/9780307887917.jpg/100000x100000-999.jpg",
    },
    {
      bookId: "9",
      title: "The 48 Laws of Power",
      author: "Robert Greene",
      copies: 3,
      description:
        "The 48 Laws of Power is a practical guide for anyone who wants power, observes power, or wants to arm themselves against power. It has sold over 1.2 million copies in the United States and has been translated into 24 languages.",
      genre: "Business",
      isbn: "9788176490306",
      language: "English",
      year: 1998,
      image:
        "https://is5-ssl.mzstatic.com/image/thumb/Publication126/v4/08/56/ca/0856caa6-327e-cb20-dd39-16b699c02084/9781101042458.d.jpg/100000x100000-999.jpg",
    },
    {
      bookId: "10",
      title: "Zero to One",
      author: "Peter Thiel",
      genre: "Business",
      copies: 3,
      description:
        "Zero to One: Notes on Startups, or How to Build the Future is a 2014 book by the American entrepreneur and investor Peter Thiel co-written with Blake Masters. It is a condensed and updated version of a highly popular set of online notes taken by Masters for the CS183 class on startups",
      isbn: "8499195396225",
      language: "English",
      year: 2014,
      image:
        "https://is5-ssl.mzstatic.com/image/thumb/Publication1/v4/01/41/16/014116ee-83b7-6ca1-c838-2840371a7aea/9780804139304.jpg/100000x100000-999.jpg",
    },
  ]);

  console.log("\n🌱 Finished seeding process...");

  const end = Date.now();
  console.log(`\n✅ Seeding complete & took ${end - start}ms`);
}

seed()
  .catch((e) => {
    console.error("\n❌ Seeding failed");
    console.error(e);
    process.exit(1);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await postgresClient.end();
  });
