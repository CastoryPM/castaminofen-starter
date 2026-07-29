-- CreateTable
CREATE TABLE "FavoriteEpisode" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "episodeId" TEXT NOT NULL,
    "savedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FavoriteEpisode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FavoriteEpisode_userId_savedAt_idx" ON "FavoriteEpisode"("userId", "savedAt");

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteEpisode_userId_episodeId_key" ON "FavoriteEpisode"("userId", "episodeId");

-- AddForeignKey
ALTER TABLE "FavoriteEpisode" ADD CONSTRAINT "FavoriteEpisode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteEpisode" ADD CONSTRAINT "FavoriteEpisode_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "Episode"("id") ON DELETE CASCADE ON UPDATE CASCADE;
