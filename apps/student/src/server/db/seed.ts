import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "~/env";
import { course, student } from "~/server/db/schema";

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
  await db.delete(student);

  await db.insert(course).values([
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
      title: "Data Science",
      description: "Learn advanced data science",
      fee: 200,
    },
    {
      id: 4,
      title: "Machine Learning",
      description: "Learn advanced machine learning",
      fee: 250,
    },
    {
      id: 5,
      title: "Artificial Intelligence",
      description: "Learn advanced artificial intelligence",
      fee: 300,
    },
  ]);

  await db.insert(student).values([
    {
      id: 1,
      studentId: "c12345678",
      firstName: "John",
      lastName: "Doe",
    },
    {
      id: 2,
      studentId: "c23124112",
      firstName: "Jane",
      lastName: "Doe",
    },
    {
      id: 3,
      studentId: "c12345679",
      firstName: "John",
      lastName: "Smith",
    },
    {
      id: 4,
      studentId: "c23124113",
      firstName: "Jane",
      lastName: "Smith",
    },
    {
      id: 5,
      studentId: "c91238923",
      firstName: "John",
      lastName: "Johnson",
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
