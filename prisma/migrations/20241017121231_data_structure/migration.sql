/*
  Warnings:

  - You are about to drop the column `clientId` on the `Bill` table. All the data in the column will be lost.
  - Added the required column `ucId` to the `Bill` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bill" DROP CONSTRAINT "Bill_clientId_fkey";

-- AlterTable
ALTER TABLE "Bill" DROP COLUMN "clientId",
ADD COLUMN     "ucId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Bill" ADD CONSTRAINT "Bill_ucId_fkey" FOREIGN KEY ("ucId") REFERENCES "UC"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
