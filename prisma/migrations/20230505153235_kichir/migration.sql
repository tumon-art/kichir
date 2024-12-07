-- DropForeignKey
ALTER TABLE "Kichir" DROP CONSTRAINT "Kichir_authorId_fkey";

-- AddForeignKey
ALTER TABLE "Kichir" ADD CONSTRAINT "Kichir_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
