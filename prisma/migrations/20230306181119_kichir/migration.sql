-- AlterTable
ALTER TABLE "Categories" ADD COLUMN     "kichirId" INTEGER;

-- CreateTable
CREATE TABLE "Kichir" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "body" TEXT NOT NULL,
    "likes" INTEGER NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Kichir_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Kichir" ADD CONSTRAINT "Kichir_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categories" ADD CONSTRAINT "Categories_kichirId_fkey" FOREIGN KEY ("kichirId") REFERENCES "Kichir"("id") ON DELETE SET NULL ON UPDATE CASCADE;
