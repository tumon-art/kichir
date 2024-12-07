-- DropForeignKey
ALTER TABLE "Love" DROP CONSTRAINT "Love_userId_fkey";

-- AddForeignKey
ALTER TABLE "Love" ADD CONSTRAINT "Love_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
