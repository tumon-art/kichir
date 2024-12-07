/*
  Warnings:

  - A unique constraint covering the columns `[kichirId,userId]` on the table `Love` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Love_kichirId_userId_key" ON "Love"("kichirId", "userId");
