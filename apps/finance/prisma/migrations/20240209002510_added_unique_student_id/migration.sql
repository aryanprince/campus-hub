/*
  Warnings:

  - A unique constraint covering the columns `[studentId]` on the table `FinanceAccount` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FinanceAccount_studentId_key" ON "FinanceAccount"("studentId");
