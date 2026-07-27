import { Injectable } from '@nestjs/common';
import { NormalizedEpisodeInput, NormalizedFeed, ParsedFeed } from '../types';

@Injectable()
export class NormalizerService {
  normalize(parsedFeed: ParsedFeed, sourceUrl?: string): NormalizedFeed {
    const podcast = {
      title: this.normalizeText(parsedFeed.podcast.title) || 'Untitled Podcast',
      description: this.normalizeOptionalText(parsedFeed.podcast.description),
      author: this.normalizeOptionalText(parsedFeed.podcast.author),
      artworkUrl: this.normalizeOptionalText(parsedFeed.podcast.image),
      website: this.normalizeOptionalText(parsedFeed.podcast.link),
      rssUrl: this.normalizeOptionalText(sourceUrl),
    };

    const episodes = parsedFeed.episodes
      .map((episode) => this.normalizeEpisode(episode))
      .filter((episode): episode is NormalizedEpisodeInput => Boolean(episode.title || episode.audioUrl || episode.guid));

    return { podcast, episodes };
  }

  private normalizeEpisode(episode: { title?: string; description?: string; guid?: string; audioUrl?: string; duration?: string; publishedAt?: string }): NormalizedEpisodeInput {
    return {
      title: this.normalizeText(episode.title) || 'Untitled Episode',
      description: this.normalizeOptionalText(episode.description),
      guid: this.normalizeOptionalText(episode.guid),
      audioUrl: this.normalizeOptionalText(episode.audioUrl),
      duration: this.normalizeDuration(episode.duration),
      publishedAt: this.normalizeDate(episode.publishedAt),
    };
  }

  private normalizeText(value?: string): string | undefined {
    if (!value) {
      return undefined;
    }

    return value.replace(/\s+/g, ' ').trim();
  }

  private normalizeOptionalText(value?: string): string | null | undefined {
    const normalized = this.normalizeText(value);
    return normalized ? normalized : null;
  }

  private normalizeDuration(value?: string): number | null {
    if (!value) {
      return null;
    }

    const trimmed = value.trim();
    if (/^\d+$/.test(trimmed)) {
      return Number(trimmed);
    }

    const parts = trimmed.split(':').map((part) => Number(part)).filter((part) => !Number.isNaN(part));
    if (parts.length === 0) {
      return null;
    }

    if (parts.length === 1) {
      return parts[0];
    }

    if (parts.length === 2) {
      return parts[0] * 60 + parts[1];
    }

    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }

  private normalizeDate(value?: string): Date | null {
    if (!value) {
      return null;
    }

    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }
}
