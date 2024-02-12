import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

import { env } from "~/env";

config();

const migrateDb = async () => {
  if (!env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const sql = postgres(env.DATABASE_URL, { max: 1, onnotice: () => {} });
  const db = drizzle(sql);

  await migrate(db, { migrationsFolder: "./src/server/db/migrations" });
  await sql.end();

  console.info("💦 Database migrated successfully");
};

void migrateDb();
