/*
  Warnings:

  - A unique constraint covering the columns `[feedSourceId]` on the table `Podcast` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "FeedSourceType" AS ENUM ('RSS');

-- CreateEnum
CREATE TYPE "SynchronizationStatus" AS ENUM ('IDLE', 'RUNNING', 'SUCCESS', 'FAILED');

-- DropForeignKey
ALTER TABLE "ListeningHistory" DROP CONSTRAINT "ListeningHistory_episode_fkey";

-- DropForeignKey
ALTER TABLE "ListeningHistory" DROP CONSTRAINT "ListeningHistory_user_fkey";

-- DropForeignKey
ALTER TABLE "UserSubscription" DROP CONSTRAINT "UserSubscription_podcast_fkey";

-- DropForeignKey
ALTER TABLE "UserSubscription" DROP CONSTRAINT "UserSubscription_user_fkey";

-- AlterTable
ALTER TABLE "Episode" ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "guid" TEXT;

-- AlterTable
ALTER TABLE "Podcast" ADD COLUMN     "feedSourceId" TEXT;

-- CreateTable
CREATE TABLE "FeedSource" (
    "id" TEXT NOT NULL,
    "type" "FeedSourceType" NOT NULL DEFAULT 'RSS',
    "url" TEXT NOT NULL,
    "syncStatus" "SynchronizationStatus" NOT NULL DEFAULT 'IDLE',
    "lastSyncedAt" TIMESTAMP(3),
    "lastError" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FeedSource_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FeedSource_url_key" ON "FeedSource"("url");

-- CreateIndex
CREATE INDEX "FeedSource_syncStatus_idx" ON "FeedSource"("syncStatus");

-- CreateIndex
CREATE INDEX "FeedSource_lastSyncedAt_idx" ON "FeedSource"("lastSyncedAt");

-- CreateIndex
CREATE INDEX "Episode_podcastId_idx" ON "Episode"("podcastId");

-- CreateIndex
CREATE INDEX "Episode_guid_idx" ON "Episode"("guid");

-- CreateIndex
CREATE INDEX "Episode_podcastId_publishedAt_idx" ON "Episode"("podcastId", "publishedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Podcast_feedSourceId_key" ON "Podcast"("feedSourceId");

-- CreateIndex
CREATE INDEX "Podcast_ownerId_idx" ON "Podcast"("ownerId");

-- CreateIndex
CREATE INDEX "Podcast_feedSourceId_idx" ON "Podcast"("feedSourceId");

-- AddForeignKey
ALTER TABLE "Podcast" ADD CONSTRAINT "Podcast_feedSourceId_fkey" FOREIGN KEY ("feedSourceId") REFERENCES "FeedSource"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSubscription" ADD CONSTRAINT "UserSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSubscription" ADD CONSTRAINT "UserSubscription_podcastId_fkey" FOREIGN KEY ("podcastId") REFERENCES "Podcast"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListeningHistory" ADD CONSTRAINT "ListeningHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListeningHistory" ADD CONSTRAINT "ListeningHistory_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "Episode"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "ListeningHistory_user_episode_unique" RENAME TO "ListeningHistory_userId_episodeId_key";

-- RenameIndex
ALTER INDEX "ListeningHistory_user_lastPlayedAt_idx" RENAME TO "ListeningHistory_userId_lastPlayedAt_idx";

-- RenameIndex
ALTER INDEX "UserSubscription_podcast_idx" RENAME TO "UserSubscription_podcastId_idx";

-- RenameIndex
ALTER INDEX "UserSubscription_user_idx" RENAME TO "UserSubscription_userId_idx";

-- RenameIndex
ALTER INDEX "UserSubscription_user_podcast_unique" RENAME TO "UserSubscription_userId_podcastId_key";
