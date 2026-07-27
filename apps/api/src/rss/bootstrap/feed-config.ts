import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { FeedSourceType } from '@prisma/client';

export interface PredefinedFeedSourceConfig {
  url: string;
  type: FeedSourceType;
}

export const predefinedFeedSources: PredefinedFeedSourceConfig[] = [
  {
    url: 'https://feeds.npr.org/510289/podcast.xml',
    type: FeedSourceType.RSS,
  },
  {
    url: 'https://feeds.simplecast.com/54nAGcIl',
    type: FeedSourceType.RSS,
  },
  {
    url: 'https://rss.art19.com/the-daily',
    type: FeedSourceType.RSS,
  },
];

export function readRssFeedUrlsFromFile(filePath = path.resolve(__dirname, '../../../../../rss-feeds.txt')): string[] {
  if (!existsSync(filePath)) {
    return [];
  }

  return readFileSync(filePath, 'utf8')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith('#'));
}

export function buildBootstrapFeedSources(feedSources: PredefinedFeedSourceConfig[] = predefinedFeedSources): PredefinedFeedSourceConfig[] {
  const seen = new Set<string>();
  const merged: PredefinedFeedSourceConfig[] = [];

  for (const feedSource of [...feedSources, ...readRssFeedUrlsFromFile().map((url) => ({ url, type: FeedSourceType.RSS }))]) {
    if (seen.has(feedSource.url)) {
      continue;
    }

    seen.add(feedSource.url);
    merged.push(feedSource);
  }

  return merged;
}
