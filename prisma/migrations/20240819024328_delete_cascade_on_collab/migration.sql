-- DropForeignKey
ALTER TABLE "Collaborator" DROP CONSTRAINT "Collaborator_todoId_fkey";

-- AddForeignKey
ALTER TABLE "Collaborator" ADD CONSTRAINT "Collaborator_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "Todo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
