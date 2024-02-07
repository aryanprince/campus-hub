import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "~/env";

import { course } from "~/server/db/schema";

console.log(process.env.DATABASE_URL);

// if (!process.env.DATABASE_URL) {
//   throw new Error("DATABASE_URL is not set");
// }

// const migrationsClient = postgres(process.env.DATABASE_URL, {
//   max: 1,
// });

// const db = drizzle(migrationsClient, { logger: true });

// async function seed() {
//   console.log("Seeding db migration...");

//   const courses = await db.insert(course).values([
//     {
//       id: 1,
//       title: "Advanced Web Development",
//       description: "Learn advanced web development",
//       fee: 100,
//     },
//     {
//       id: 2,
//       title: "Advanced Mobile Development",
//       description: "Learn advanced mobile development",
//       fee: 150,
//     },
//     {
//       id: 3,
//       title: "Advanced Data Science",
//       description: "Learn advanced data science",
//       fee: 200,
//     },
//   ]);

//   console.log(courses);
// }

// seed()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   // eslint-disable-next-line @typescript-eslint/no-misused-promises
//   .finally(async () => {
//     await migrationsClient.end();
//   });
