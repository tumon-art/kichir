-- DropForeignKey
ALTER TABLE "Love" DROP CONSTRAINT "Love_kichirId_fkey";

-- AddForeignKey
ALTER TABLE "Love" ADD CONSTRAINT "Love_kichirId_fkey" FOREIGN KEY ("kichirId") REFERENCES "Kichir"("id") ON DELETE CASCADE ON UPDATE CASCADE;
