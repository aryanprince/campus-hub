import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "~/env";
import { financeAccount, invoice } from "./schema";

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

  await db.insert(invoice).values([
    {
      id: 1,
      amount: "100",
      dueDate: "2024-01-01",
      invoiceType: "LIBRARY_FINE",
      referenceId: "ABC123",
      studentId: "c12345678",
      updatedAt: new Date(),
    },
    {
      id: 2,
      amount: "200",
      dueDate: "2024-01-01",
      invoiceType: "LIBRARY_FINE",
      referenceId: "DEF456",
      studentId: "c23124112",
      updatedAt: new Date(),
    },
    {
      id: 3,
      amount: "300",
      dueDate: "2024-01-01",
      invoiceType: "TUITION_FEES",
      referenceId: "GHI789",
      studentId: "c12345678",
      updatedAt: new Date(),
    },
    {
      id: 4,
      amount: "400",
      dueDate: "2024-01-01",
      invoiceType: "LIBRARY_FINE",
      referenceId: "JKL101",
      studentId: "c23124112",
      updatedAt: new Date(),
    },
    {
      id: 5,
      amount: "500",
      dueDate: "2024-01-01",
      invoiceType: "TUITION_FEES",
      referenceId: "MNO111",
      studentId: "c91238923",
      updatedAt: new Date(),
    },
  ]);

  await db.insert(financeAccount).values([
    {
      id: 1,
      studentId: "c12345678",
      hasOutstandingBalance: true,
    },
    {
      id: 2,
      studentId: "c23124112",
      hasOutstandingBalance: true,
    },
    {
      id: 3,
      studentId: "c91238923",
      hasOutstandingBalance: true,
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
