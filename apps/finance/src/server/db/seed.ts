import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "~/env";
import { financeAccount, invoice } from "./schema/main-schema";

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

  await db.delete(invoice);
  await db.delete(financeAccount);
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
