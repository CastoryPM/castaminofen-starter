import { describe, expect, it } from 'vitest';
import type { Episode, Podcast } from '@/lib/types';
import type { LibraryListeningHistoryItem, LibrarySubscription } from '../types';
import { buildLibraryCollectionsSummary } from './library-collections';

describe('buildLibraryCollectionsSummary', () => {
  it('derives collection counts from existing library data', () => {
    const podcast = {
      id: 'pod-1',
      title: 'My Podcast',
      rssUrl: 'https://example.com/feed.xml',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    } as Podcast;

    const episode = {
      id: 'ep-1',
      podcastId: 'pod-1',
      title: 'Episode One',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    } as Episode;

    const historyItem = {
      id: 'history-1',
      userId: 'user-1',
      episodeId: 'ep-1',
      positionSeconds: 600,
      completed: false,
      lastPlayedAt: '2024-01-02T00:00:00.000Z',
      episode: {
        ...episode,
        podcast: {
          ...podcast,
          artworkUrl: null,
        },
      },
    } as unknown as LibraryListeningHistoryItem;

    const subscription = {
      id: 'sub-1',
      userId: 'user-1',
      podcastId: 'pod-1',
      subscribedAt: '2024-01-01T00:00:00.000Z',
      podcast,
    } as LibrarySubscription;

    const summary = buildLibraryCollectionsSummary({
      subscriptions: [subscription],
      continueListening: [historyItem],
    });

    expect(summary.continueListeningCount).toBe(1);
    expect(summary.subscriptionsCount).toBe(1);
    expect(summary.recentlyPlayedCount).toBe(1);
    expect(summary.favoritesComingSoon).toBe(true);
    expect(summary.savedEpisodesComingSoon).toBe(true);
    expect(summary.historyComingSoon).toBe(true);
    expect(summary.downloadsComingSoon).toBe(true);
  });
});
