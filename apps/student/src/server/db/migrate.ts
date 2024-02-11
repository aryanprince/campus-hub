import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

import { env } from "~/env";

// eslint-disable-next-line @typescript-eslint/no-empty-function
const sql = postgres(env.DATABASE_URL, { max: 1, onnotice: () => {} });
const db = drizzle(sql);

async function main() {
  console.log("💦 Migrating database...");

  await migrate(db, { migrationsFolder: "./src/server/db/migrations" });
  console.log("💦 Database migrated successfully");

  await sql.end();
  console.log("💦 Connection closed successfully");

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
