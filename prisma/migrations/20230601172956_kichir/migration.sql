/*
  Warnings:

  - You are about to drop the column `darkMode` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "darkMode";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "darkMode" BOOLEAN;
