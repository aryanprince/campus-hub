import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "~/env";

import { course } from "~/server/db/schema";

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

  await db.delete(course);

  const courses = await db.insert(course).values([
    {
      id: 1,
      title: "Advanced Web Development",
      description: "Learn advanced web development",
      fee: 100,
    },
    {
      id: 2,
      title: "Advanced Mobile Development",
      description: "Learn advanced mobile development",
      fee: 150,
    },
    {
      id: 3,
      title: "Advanced Data Science",
      description: "Learn advanced data science",
      fee: 200,
    },
  ]);

  console.log("\n🌱 LOG: ", courses);
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
