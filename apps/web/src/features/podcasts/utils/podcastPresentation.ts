import type { Episode, Podcast } from '@/lib/types';

function toPersianDigits(value: number | string): string {
  const digits = String(value);
  return digits.replace(/[0-9]/g, (char) => String.fromCharCode(char.charCodeAt(0) + 1728));
}

function formatCompactTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${toPersianDigits(minutes)}:${toPersianDigits(String(remainingSeconds).padStart(2, '0'))}`;
}

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

export function buildPodcastMetadataItems(podcast: Podcast) {
  const items: Array<{ label: string; value: string }> = [];

  const ownerLabel = podcast.owner?.name?.trim();
  if (ownerLabel) {
    items.push({ label: 'ناشر', value: ownerLabel });
  }

  const episodeCount = podcast.episodes?.length ?? 0;
  if (episodeCount > 0) {
    items.push({ label: 'اپیزودها', value: `${toPersianDigits(episodeCount)} اپیزود` });
  }

  const updatedAt = formatDisplayDate(podcast.updatedAt);
  if (updatedAt !== '—') {
    items.push({ label: 'آخرین به‌روزرسانی', value: updatedAt });
  }

  if (podcast.website?.trim()) {
    items.push({ label: 'وب‌سایت', value: podcast.website.trim() });
  }

  return items;
}

export function getContinueListeningSummary(options?: { positionSeconds?: number | null; durationSeconds?: number | null }) {
  if (typeof options?.positionSeconds !== 'number' || !Number.isFinite(options.positionSeconds)) {
    return null;
  }

  const positionSeconds = Math.max(0, options.positionSeconds);
  const durationSeconds = typeof options?.durationSeconds === 'number' && Number.isFinite(options.durationSeconds) && options.durationSeconds > 0
    ? options.durationSeconds
    : null;

  const progress = durationSeconds ? `${toPersianDigits(Math.round((positionSeconds / durationSeconds) * 100))}%` : null;
  const remainingSeconds = durationSeconds ? Math.max(0, durationSeconds - positionSeconds) : null;
  const detail = remainingSeconds !== null ? `${toPersianDigits(Math.ceil(remainingSeconds / 60))} دقیقه مانده` : formatCompactTime(positionSeconds);

  return {
    label: 'ادامه پخش',
    progress,
    detail,
  };
}
