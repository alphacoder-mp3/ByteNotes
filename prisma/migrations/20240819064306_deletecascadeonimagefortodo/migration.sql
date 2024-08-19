-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_todoId_fkey";

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "Todo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
