import type { LibraryListeningHistoryItem, LibrarySubscription } from '../types';

export type LibraryCollectionsSummary = {
  continueListeningCount: number;
  subscriptionsCount: number;
  recentlyPlayedCount: number;
  favoritesComingSoon: boolean;
  savedEpisodesComingSoon: boolean;
  historyComingSoon: boolean;
  downloadsComingSoon: boolean;
};

export function buildLibraryCollectionsSummary(data: {
  subscriptions: LibrarySubscription[];
  continueListening: LibraryListeningHistoryItem[];
}): LibraryCollectionsSummary {
  return {
    continueListeningCount: data.continueListening.length,
    subscriptionsCount: data.subscriptions.length,
    recentlyPlayedCount: data.continueListening.length,
    favoritesComingSoon: true,
    savedEpisodesComingSoon: true,
    historyComingSoon: true,
    downloadsComingSoon: true,
  };
}
