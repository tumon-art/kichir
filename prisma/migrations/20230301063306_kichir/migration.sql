-- CreateTable
CREATE TABLE "Categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoriesToHashTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoriesToHashTags_AB_unique" ON "_CategoriesToHashTags"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoriesToHashTags_B_index" ON "_CategoriesToHashTags"("B");

-- AddForeignKey
ALTER TABLE "_CategoriesToHashTags" ADD CONSTRAINT "_CategoriesToHashTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoriesToHashTags" ADD CONSTRAINT "_CategoriesToHashTags_B_fkey" FOREIGN KEY ("B") REFERENCES "HashTags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
