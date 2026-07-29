import type { LibraryListeningHistoryItem, LibrarySubscription } from '../types';

export type LibraryCollectionsSummary = {
  continueListeningCount: number;
  subscriptionsCount: number;
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
}): LibraryCollectionsSummary {
  const continueListeningCount = data.continueListening.length;
  const subscriptionsCount = data.subscriptions.length;

  return {
    continueListeningCount,
    subscriptionsCount,
    recentlyPlayedCount: continueListeningCount,
    favoritesComingSoon: true,
    savedEpisodesComingSoon: true,
    historyComingSoon: true,
    downloadsComingSoon: true,
    collectionsCount: 4,
    episodesCount: continueListeningCount,
    followingCount: subscriptionsCount,
  };
}
