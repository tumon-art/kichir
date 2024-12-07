/*
  Warnings:

  - You are about to drop the column `lovedById` on the `Kichir` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Kichir" DROP CONSTRAINT "Kichir_lovedById_fkey";

-- AlterTable
ALTER TABLE "Kichir" DROP COLUMN "lovedById";

-- CreateTable
CREATE TABLE "_KichirToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_KichirToUser_AB_unique" ON "_KichirToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_KichirToUser_B_index" ON "_KichirToUser"("B");

-- AddForeignKey
ALTER TABLE "_KichirToUser" ADD CONSTRAINT "_KichirToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Kichir"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KichirToUser" ADD CONSTRAINT "_KichirToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
