import type { LibraryListeningHistoryItem, LibrarySubscription } from '../types';

export type LibraryCollectionsSummary = {
  continueListeningCount: number;
  subscriptionsCount: number;
  historyCount: number;
  recentlyPlayedCount: number;
  favoritesComingSoon: boolean;
  savedEpisodesComingSoon: boolean;
  historyComingSoon: boolean;
  downloadsComingSoon: boolean;
  collectionsCount: number;
  episodesCount: number;
  followingCount: number;
};

export function buildLibraryCollectionsSummary(data: {
  subscriptions: LibrarySubscription[];
  continueListening: LibraryListeningHistoryItem[];
  history: LibraryListeningHistoryItem[];
}): LibraryCollectionsSummary {
  const continueListeningCount = data.continueListening.length;
  const subscriptionsCount = data.subscriptions.length;
  const historyCount = data.history.length;
  const uniqueEpisodeIds = new Set<string>([
    ...data.continueListening.map((item) => item.episodeId),
    ...data.history.map((item) => item.episodeId),
  ]);

  return {
    continueListeningCount,
    subscriptionsCount,
    historyCount,
    recentlyPlayedCount: historyCount,
    favoritesComingSoon: true,
    savedEpisodesComingSoon: true,
    historyComingSoon: historyCount === 0,
    downloadsComingSoon: true,
    collectionsCount: 4,
    episodesCount: uniqueEpisodeIds.size,
    followingCount: subscriptionsCount,
  };
}
