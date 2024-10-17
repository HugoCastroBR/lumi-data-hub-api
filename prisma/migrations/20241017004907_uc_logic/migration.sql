/*
  Warnings:

  - You are about to drop the column `clientUC` on the `Client` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Client_clientUC_key";

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "clientUC";

-- CreateTable
CREATE TABLE "UC" (
    "id" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "UC_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UC_id_key" ON "UC"("id");

-- AddForeignKey
ALTER TABLE "UC" ADD CONSTRAINT "UC_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
