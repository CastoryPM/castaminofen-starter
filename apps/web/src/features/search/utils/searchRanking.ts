import type { Episode, Podcast } from '@/lib/types';

const normalizeText = (value?: string | null) => value?.toLowerCase().trim() ?? '';

const getMatchScore = (query: string, title?: string | null, secondary?: string | null, description?: string | null) => {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) {
    return 0;
  }

  const normalizedTitle = normalizeText(title);
  const normalizedSecondary = normalizeText(secondary);
  const normalizedDescription = normalizeText(description);

  if (normalizedTitle === normalizedQuery) {
    return 100;
  }

  if (normalizedTitle.includes(normalizedQuery)) {
    return 80;
  }

  if (normalizedSecondary.includes(normalizedQuery)) {
    return 60;
  }

  if (normalizedDescription.includes(normalizedQuery)) {
    return 40;
  }

  return 0;
};

export function rankPodcastResults(podcasts: Podcast[], query: string) {
  return podcasts
    .map((podcast, index) => ({ podcast, index, score: getMatchScore(query, podcast.title, podcast.owner?.name, podcast.description) }))
    .sort((left, right) => {
      if (left.score !== right.score) {
        return right.score - left.score;
      }

      return left.index - right.index;
    })
    .map(({ podcast }) => podcast);
}

export function rankEpisodeResults(episodes: Episode[], query: string) {
  return episodes
    .map((episode, index) => ({ episode, index, score: getMatchScore(query, episode.title, episode.podcast?.title, episode.description) }))
    .sort((left, right) => {
      if (left.score !== right.score) {
        return right.score - left.score;
      }

      return left.index - right.index;
    })
    .map(({ episode }) => episode);
}
