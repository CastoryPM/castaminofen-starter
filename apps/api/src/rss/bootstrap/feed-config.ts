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
