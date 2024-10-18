/*
  Warnings:

  - A unique constraint covering the columns `[filename]` on the table `Bill` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Bill_filename_key" ON "Bill"("filename");
