/* eslint-disable @typescript-eslint/no-empty-function */
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

import { env } from "~/env";

async function runMigrate() {
  const sql = postgres(env.DATABASE_URL, { max: 1, onnotice: () => {} });
  const db = drizzle(sql, { logger: true });

  console.log("⏳ Running migrations...\n");
  const start = Date.now();

  await migrate(db, { migrationsFolder: "./src/server/db/migrations" });

  await sql.end();
  const end = Date.now();
  console.log(`\n✅ Migration successful & took ${end - start}ms`);
}

runMigrate().catch((err) => {
  console.error("\n❌ Migration failed");
  console.error(err);
  process.exit(1);
});
