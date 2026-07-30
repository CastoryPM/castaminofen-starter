'use client';

import Link from 'next/link';
import { usePlayerState } from '@/features/player/hooks/usePlayerState';
import type { Podcast } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { ContentArtwork } from '@/components/design-system/media/content-artwork';
import { Tag } from '@/components/design-system/common/tag';
import { getPodcastOwnerLabel, formatDisplayDate } from '@/features/podcasts/utils/podcastPresentation';
import { SubscriptionActionButton } from './SubscriptionActionButton';

export function LibraryPodcastCard({
  podcast,
  subscribedAt,
  isSubscribed,
  onSubscribe,
  onUnsubscribe,
  isLoading = false,
  error,
}: {
  podcast: Podcast;
  subscribedAt?: string;
  isSubscribed: boolean;
  onSubscribe: () => void;
  onUnsubscribe: () => void;
  isLoading?: boolean;
  error?: string | null;
}) {
  const artworkInitial = podcast.title.trim().charAt(0) || 'پ';
  const playerState = usePlayerState();
  const isCurrentlyPlaying = playerState.currentItem?.podcastId === podcast.id;
  const authorLabel = getPodcastOwnerLabel(podcast);

  return (
    <Card className="rounded-[1.5rem] border border-border/80 bg-surface-primary/95 p-4 shadow-sm transition-all duration-200 hover:border-accent/30 hover:bg-surface-primary sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <ContentArtwork
            src={podcast.artworkUrl}
            alt={podcast.title}
            fallback={artworkInitial}
            className="h-14 w-14 shrink-0 rounded-[1.25rem] sm:h-14 sm:w-14"
          />
          <div className="min-w-0 space-y-2">
            <h3 className="text-base font-semibold text-text-primary sm:text-subheading">{podcast.title}</h3>
            <p className="m-0 line-clamp-2 text-sm leading-6 text-text-secondary">{podcast.description || 'بدون توضیح'}</p>
            <p className="m-0 text-sm text-text-secondary">{authorLabel}</p>
            {subscribedAt ? <p className="m-0 text-xs text-text-secondary">اشتراک از {formatDisplayDate(subscribedAt)}</p> : null}
          </div>
        </div>

        <div className="flex flex-col items-stretch gap-3 sm:items-end">
          <div className="flex flex-wrap items-center gap-2">
            <Tag className="border-border bg-surface-secondary text-text-secondary">
              {isCurrentlyPlaying ? 'در حال پخش' : 'آماده برای گوش دادن'}
            </Tag>
            <Link href={`/podcasts/${podcast.id}`} className="inline-flex min-h-[2.5rem] items-center text-sm font-medium text-accent">
              مشاهده پادکست
            </Link>
          </div>
          <SubscriptionActionButton isSubscribed={isSubscribed} onSubscribe={onSubscribe} onUnsubscribe={onUnsubscribe} isLoading={isLoading} error={error} />
        </div>
      </div>
    </Card>
  );
}
