export interface ParsedPodcast {
  title?: string;
  description?: string;
  author?: string;
  image?: string;
  link?: string;
}

export interface ParsedEpisode {
  title?: string;
  description?: string;
  guid?: string;
  audioUrl?: string;
  duration?: string;
  publishedAt?: string;
}

export interface ParsedFeed {
  podcast: ParsedPodcast;
  episodes: ParsedEpisode[];
}

export interface NormalizedPodcastInput {
  title: string;
  description?: string | null;
  author?: string | null;
  artworkUrl?: string | null;
  website?: string | null;
  rssUrl?: string | null;
}

export interface NormalizedEpisodeInput {
  title: string;
  description?: string | null;
  guid?: string | null;
  audioUrl?: string | null;
  duration?: number | null;
  publishedAt?: Date | null;
}

export interface NormalizedFeed {
  podcast: NormalizedPodcastInput;
  episodes: NormalizedEpisodeInput[];
}
