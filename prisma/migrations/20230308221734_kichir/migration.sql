/*
  Warnings:

  - You are about to drop the column `likes` on the `Kichir` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Kichir" DROP COLUMN "likes",
ADD COLUMN     "lovedById" TEXT;

-- AddForeignKey
ALTER TABLE "Kichir" ADD CONSTRAINT "Kichir_lovedById_fkey" FOREIGN KEY ("lovedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
