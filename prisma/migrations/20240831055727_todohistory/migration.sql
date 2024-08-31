-- AlterTable
ALTER TABLE "Collaborator" ADD COLUMN     "todoHistoryId" TEXT;

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "todoHistoryId" TEXT;

-- CreateTable
CREATE TABLE "TodoHistory" (
    "id" TEXT NOT NULL,
    "todoId" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "done" BOOLEAN,
    "todoColor" TEXT,
    "lastModifiedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "TodoHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TodoHistory_todoId_idx" ON "TodoHistory"("todoId");

-- AddForeignKey
ALTER TABLE "TodoHistory" ADD CONSTRAINT "TodoHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TodoHistory" ADD CONSTRAINT "TodoHistory_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "Todo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collaborator" ADD CONSTRAINT "Collaborator_todoHistoryId_fkey" FOREIGN KEY ("todoHistoryId") REFERENCES "TodoHistory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
