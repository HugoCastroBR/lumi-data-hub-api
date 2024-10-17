/*
  Warnings:

  - A unique constraint covering the columns `[registerN]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[registerN]` on the table `UC` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Client_registerN_key" ON "Client"("registerN");

-- CreateIndex
CREATE UNIQUE INDEX "UC_registerN_key" ON "UC"("registerN");
