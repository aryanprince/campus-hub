import type { Config } from "drizzle-kit";
export default {
  schema: "./src/server/db/schema.ts",
  out: "./src/server/db/migrations",
} satisfies Config;
