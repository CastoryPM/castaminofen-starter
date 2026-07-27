import { Injectable } from '@nestjs/common';
import { NormalizedEpisodeInput, NormalizedPodcastInput } from '../types';

export type MatchingResult =
  | { kind: 'ExistingPodcast'; matchedBy: 'rssUrl' }
  | { kind: 'NewPodcast' }
  | { kind: 'ExistingEpisode'; matchedBy: 'guid' | 'audioUrl' | 'titleAndPublishedAt' }
  | { kind: 'NewEpisode'; matchedBy: 'guid' | 'audioUrl' | 'titleAndPublishedAt' }
  | { kind: 'Ignored'; reason: 'insufficient-identity' | 'missing-required-metadata' | 'impossible-ownership' };

@Injectable()
export class MatchingService {
  matchPodcast(podcast: Pick<NormalizedPodcastInput, 'rssUrl'>, existingPodcasts: Array<Pick<NormalizedPodcastInput, 'rssUrl'>>): MatchingResult {
    if (!this.hasMeaningfulValue(podcast.rssUrl)) {
      return { kind: 'Ignored', reason: 'insufficient-identity' };
    }

    const normalizedRssUrl = this.normalizeValue(podcast.rssUrl);
    const existing = existingPodcasts.find((candidate) => this.normalizeValue(candidate.rssUrl) === normalizedRssUrl);

    return existing ? { kind: 'ExistingPodcast', matchedBy: 'rssUrl' } : { kind: 'NewPodcast' };
  }

  matchEpisode(
    episode: Pick<NormalizedEpisodeInput, 'guid' | 'audioUrl' | 'title' | 'publishedAt'>,
    existingEpisodes: Array<Pick<NormalizedEpisodeInput, 'guid' | 'audioUrl' | 'title' | 'publishedAt'>>,
  ): MatchingResult {
    if (this.hasMeaningfulValue(episode.guid)) {
      const existing = existingEpisodes.find((candidate) => this.normalizeValue(candidate.guid) === this.normalizeValue(episode.guid));
      return existing ? { kind: 'ExistingEpisode', matchedBy: 'guid' } : { kind: 'NewEpisode', matchedBy: 'guid' };
    }

    if (this.hasMeaningfulValue(episode.audioUrl)) {
      const existing = existingEpisodes.find((candidate) => this.normalizeValue(candidate.audioUrl) === this.normalizeValue(episode.audioUrl));
      return existing ? { kind: 'ExistingEpisode', matchedBy: 'audioUrl' } : { kind: 'NewEpisode', matchedBy: 'audioUrl' };
    }

    if (this.hasMeaningfulValue(episode.title) && episode.publishedAt instanceof Date && !Number.isNaN(episode.publishedAt.getTime())) {
      const existing = existingEpisodes.find(
        (candidate) =>
          this.hasMeaningfulValue(candidate.title) &&
          this.hasMeaningfulValue(candidate.publishedAt) &&
          this.normalizeValue(candidate.title) === this.normalizeValue(episode.title) &&
          this.sameDate(candidate.publishedAt, episode.publishedAt),
      );
      return existing ? { kind: 'ExistingEpisode', matchedBy: 'titleAndPublishedAt' } : { kind: 'NewEpisode', matchedBy: 'titleAndPublishedAt' };
    }

    return { kind: 'Ignored', reason: 'insufficient-identity' };
  }

  private hasMeaningfulValue(value: string | Date | null | undefined): value is string | Date {
    if (value === null || value === undefined) {
      return false;
    }

    if (value instanceof Date) {
      return !Number.isNaN(value.getTime());
    }

    return value.trim().length > 0;
  }

  private normalizeValue(value: string | null | undefined): string {
    return value?.trim().toLowerCase() ?? '';
  }

  private sameDate(a: Date | null | undefined, b: Date | null | undefined): boolean {
    if (!this.hasMeaningfulValue(a) || !this.hasMeaningfulValue(b)) {
      return false;
    }

    return a.getTime() === b.getTime();
  }
}
