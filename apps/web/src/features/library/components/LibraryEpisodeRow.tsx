'use client';

import Image from 'next/image';
import { Clock3, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Episode, Podcast } from '@/lib/types';
import { getProgressMetadata } from '../utils/library-mappers';

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
  const progressMetadata = getProgressMetadata(positionSeconds, durationSeconds);

  return (
    <div className="flex flex-col gap-3 rounded-[1.5rem] border border-border/80 bg-surface-primary/90 p-4 shadow-sm transition-all duration-200 hover:border-accent/30 hover:bg-surface-primary sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        {artworkUrl ? (
          <Image src={artworkUrl} alt={episode.title} width={56} height={56} className="h-14 w-14 shrink-0 rounded-[1.25rem] object-cover" />
        ) : (
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-accent/25 to-accent/5 text-sm font-semibold text-accent">
            {artworkInitial}
          </div>
        )}
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-semibold text-text-primary sm:text-base">{episode.title}</h3>
            {progressMetadata ? (
              <span className="inline-flex items-center rounded-full border border-accent/20 bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-accent">
                {progressMetadata.percent}%
              </span>
            ) : null}
          </div>
          <p className="m-0 text-sm text-text-secondary">{podcastTitle || 'پادکست'}</p>
          <p className="m-0 line-clamp-2 text-sm leading-6 text-text-secondary">{episode.description || 'بدون توضیح'}</p>
          {progressMetadata ? (
            <div className="flex flex-col gap-2 rounded-2xl border border-border/70 bg-surface-secondary/70 p-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-xs font-medium text-text-secondary">
                <Clock3 className="h-4 w-4 text-accent" aria-hidden="true" />
                <span>{progressMetadata.summary}</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-surface-primary sm:w-24">
                <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${Math.max(6, progressMetadata.percent)}%` }} />
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs ${isPlaying ? 'border-success/30 bg-success/10 text-success' : 'border-border bg-surface-secondary text-text-secondary'}`}>
          <PlayCircle className="h-3.5 w-3.5" aria-hidden="true" />
          {isPlaying ? 'در حال پخش' : 'آماده برای ادامه'}
        </span>
        <Button variant="secondary" size="sm" className="min-h-[2.5rem]" onClick={onResume} aria-label={`ادامه پخش ${episode.title}`}>
          {isPlaying ? 'ادامه پخش' : 'ادامه'}
        </Button>
      </div>
    </div>
  );
}
