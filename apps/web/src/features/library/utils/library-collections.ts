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
  history?: LibraryListeningHistoryItem[];
}): LibraryCollectionsSummary {
  const continueListening = data.continueListening ?? [];
  const subscriptions = data.subscriptions ?? [];
  const history = data.history ?? [];

  const continueListeningCount = continueListening.length;
  const subscriptionsCount = subscriptions.length;
  const historyCount = history.length;
  const uniqueEpisodeIds = new Set<string>([...continueListening.map((item) => item.episodeId), ...history.map((item) => item.episodeId)]);

  return {
    continueListeningCount,
    subscriptionsCount,
    historyCount,
    recentlyPlayedCount: historyCount || continueListeningCount,
    favoritesComingSoon: true,
    savedEpisodesComingSoon: true,
    historyComingSoon: historyCount === 0,
    downloadsComingSoon: true,
    collectionsCount: 4,
    episodesCount: uniqueEpisodeIds.size,
    followingCount: subscriptionsCount,
  };
}
