/*
  Warnings:

  - You are about to drop the `_KichirToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_KichirToUser" DROP CONSTRAINT "_KichirToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_KichirToUser" DROP CONSTRAINT "_KichirToUser_B_fkey";

-- DropTable
DROP TABLE "_KichirToUser";

-- CreateTable
CREATE TABLE "Love" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "kichirId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Love_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Love" ADD CONSTRAINT "Love_kichirId_fkey" FOREIGN KEY ("kichirId") REFERENCES "Kichir"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Love" ADD CONSTRAINT "Love_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
