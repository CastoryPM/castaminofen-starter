DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'ListeningHistory') THEN
    ALTER TABLE "ListeningHistory" DROP CONSTRAINT IF EXISTS "ListeningHistory_episode_fkey";
    ALTER TABLE "ListeningHistory" DROP CONSTRAINT IF EXISTS "ListeningHistory_user_fkey";
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'UserSubscription') THEN
    ALTER TABLE "UserSubscription" DROP CONSTRAINT IF EXISTS "UserSubscription_podcast_fkey";
    ALTER TABLE "UserSubscription" DROP CONSTRAINT IF EXISTS "UserSubscription_user_fkey";
  END IF;
END $$;

-- CreateTable
CREATE TABLE IF NOT EXISTS "Playlist" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Playlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "PlaylistItem" (
    "id" TEXT NOT NULL,
    "playlistId" TEXT NOT NULL,
    "episodeId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlaylistItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX IF NOT EXISTS "Playlist_userId_updatedAt_idx" ON "Playlist"("userId", "updatedAt");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "Playlist_isPublic_updatedAt_idx" ON "Playlist"("isPublic", "updatedAt");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "PlaylistItem_playlistId_position_idx" ON "PlaylistItem"("playlistId", "position");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "PlaylistItem_episodeId_idx" ON "PlaylistItem"("episodeId");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "PlaylistItem_playlistId_episodeId_key" ON "PlaylistItem"("playlistId", "episodeId");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "PlaylistItem_playlistId_position_key" ON "PlaylistItem"("playlistId", "position");

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaylistItem" ADD CONSTRAINT "PlaylistItem_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaylistItem" ADD CONSTRAINT "PlaylistItem_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "Episode"("id") ON DELETE CASCADE ON UPDATE CASCADE;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'UserSubscription') THEN
    ALTER TABLE "UserSubscription" ADD CONSTRAINT "UserSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    ALTER TABLE "UserSubscription" ADD CONSTRAINT "UserSubscription_podcastId_fkey" FOREIGN KEY ("podcastId") REFERENCES "Podcast"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'ListeningHistory') THEN
    ALTER TABLE "ListeningHistory" ADD CONSTRAINT "ListeningHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    ALTER TABLE "ListeningHistory" ADD CONSTRAINT "ListeningHistory_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "Episode"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_indexes WHERE schemaname = 'public' AND indexname = 'ListeningHistory_user_episode_unique')
     AND NOT EXISTS (SELECT 1 FROM pg_indexes WHERE schemaname = 'public' AND indexname = 'ListeningHistory_userId_episodeId_key') THEN
    ALTER INDEX "ListeningHistory_user_episode_unique" RENAME TO "ListeningHistory_userId_episodeId_key";
  END IF;

  IF EXISTS (SELECT 1 FROM pg_indexes WHERE schemaname = 'public' AND indexname = 'ListeningHistory_user_lastPlayedAt_idx')
     AND NOT EXISTS (SELECT 1 FROM pg_indexes WHERE schemaname = 'public' AND indexname = 'ListeningHistory_userId_lastPlayedAt_idx') THEN
    ALTER INDEX "ListeningHistory_user_lastPlayedAt_idx" RENAME TO "ListeningHistory_userId_lastPlayedAt_idx";
  END IF;

  IF EXISTS (SELECT 1 FROM pg_indexes WHERE schemaname = 'public' AND indexname = 'UserSubscription_podcast_idx')
     AND NOT EXISTS (SELECT 1 FROM pg_indexes WHERE schemaname = 'public' AND indexname = 'UserSubscription_podcastId_idx') THEN
    ALTER INDEX "UserSubscription_podcast_idx" RENAME TO "UserSubscription_podcastId_idx";
  END IF;

  IF EXISTS (SELECT 1 FROM pg_indexes WHERE schemaname = 'public' AND indexname = 'UserSubscription_user_idx')
     AND NOT EXISTS (SELECT 1 FROM pg_indexes WHERE schemaname = 'public' AND indexname = 'UserSubscription_userId_idx') THEN
    ALTER INDEX "UserSubscription_user_idx" RENAME TO "UserSubscription_userId_idx";
  END IF;

  IF EXISTS (SELECT 1 FROM pg_indexes WHERE schemaname = 'public' AND indexname = 'UserSubscription_user_podcast_unique')
     AND NOT EXISTS (SELECT 1 FROM pg_indexes WHERE schemaname = 'public' AND indexname = 'UserSubscription_userId_podcastId_key') THEN
    ALTER INDEX "UserSubscription_user_podcast_unique" RENAME TO "UserSubscription_userId_podcastId_key";
  END IF;
END $$;
