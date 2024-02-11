import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

import { env } from "~/env";

// eslint-disable-next-line @typescript-eslint/no-empty-function
const sql = postgres(env.DATABASE_URL, { max: 1, onnotice: () => {} });
const db = drizzle(sql);

await migrate(db, { migrationsFolder: "./src/server/db/migrations" });

await sql.end();

console.log("💦 Database migrated successfully");
