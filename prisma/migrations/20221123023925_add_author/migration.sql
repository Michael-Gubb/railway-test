-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "createdBy" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "creatorId" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "text" SET DEFAULT '',
ALTER COLUMN "completed" SET DEFAULT false;