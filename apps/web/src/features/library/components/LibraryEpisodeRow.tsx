'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import type { Episode, Podcast } from '@/lib/types';
import { formatProgressSummary } from '../utils/library-mappers';

export function LibraryEpisodeRow({
  episode,
  podcastTitle,
  positionSeconds,
  durationSeconds,
  onResume,
  isPlaying,
}: {
  episode: Episode;
  podcastTitle?: string;
  positionSeconds?: number | null;
  durationSeconds?: number | null;
  onResume: () => void;
  isPlaying: boolean;
}) {
  const artworkInitial = episode.title.trim().charAt(0) || 'پ';
  const artworkUrl = (episode as Episode & { podcast?: Podcast | null }).podcast?.artworkUrl;
  const progressSummary = formatProgressSummary(positionSeconds, durationSeconds);

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border/80 bg-surface-primary/70 p-4 shadow-sm transition hover:border-accent/30 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        {artworkUrl ? (
          <Image src={artworkUrl} alt={episode.title} width={56} height={56} className="h-14 w-14 shrink-0 rounded-2xl object-cover" />
        ) : (
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/25 to-accent/5 text-sm font-semibold text-accent">
            {artworkInitial}
          </div>
        )}
        <div className="min-w-0 space-y-1">
          <h3 className="text-sm font-semibold text-text-primary sm:text-base">{episode.title}</h3>
          <p className="m-0 text-sm text-text-secondary">{podcastTitle || 'پادکست'}</p>
          <p className="m-0 text-sm leading-6 text-text-secondary">{episode.description || 'بدون توضیح'}</p>
          <p className="m-0 text-xs text-text-secondary">{progressSummary}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
        <span className="inline-flex items-center rounded-full border border-border bg-surface-secondary px-2.5 py-1 text-xs text-text-secondary">
          {isPlaying ? 'در حال پخش' : 'آماده برای ادامه'}
        </span>
        <Button variant="secondary" size="sm" className="min-h-[2.5rem]" onClick={onResume} aria-label={`ادامه پخش ${episode.title}`}>
          {isPlaying ? 'ادامه پخش' : 'ادامه'}
        </Button>
      </div>
    </div>
  );
}
