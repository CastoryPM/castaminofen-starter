import type { Episode, Podcast } from '@/lib/types';

export function getPodcastOwnerLabel(podcast: Podcast): string {
  return podcast.owner?.name || podcast.title;
}

export function formatDisplayDate(value?: string): string {
  if (!value) {
    return '—';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '—';
  }

  return new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).format(date);
}

export function canPlayEpisode(episode: Episode): boolean {
  return Boolean(episode.audioUrl);
}
