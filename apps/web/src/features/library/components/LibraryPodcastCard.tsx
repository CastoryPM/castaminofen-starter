'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePlayerState } from '@/features/player/hooks/usePlayerState';
import type { Podcast } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { getPodcastOwnerLabel, formatDisplayDate } from '@/features/podcasts/utils/podcastPresentation';
import { SubscriptionActionButton } from './SubscriptionActionButton';

export function LibraryPodcastCard({
  podcast,
  subscribedAt,
  isSubscribed,
  onSubscribe,
  onUnsubscribe,
}: {
  podcast: Podcast;
  subscribedAt?: string;
  isSubscribed: boolean;
  onSubscribe: () => void;
  onUnsubscribe: () => void;
}) {
  const artworkInitial = podcast.title.trim().charAt(0) || 'پ';
  const playerState = usePlayerState();
  const isCurrentlyPlaying = playerState.currentItem?.podcastId === podcast.id;
  const authorLabel = getPodcastOwnerLabel(podcast);

  return (
    <Card className="p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          {podcast.artworkUrl ? (
            <Image src={podcast.artworkUrl} alt={podcast.title} width={48} height={48} className="h-12 w-12 shrink-0 rounded-2xl object-cover" />
          ) : (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/25 to-accent/5 text-sm font-semibold text-accent">
              {artworkInitial}
            </div>
          )}
          <div className="min-w-0 space-y-2">
            <h3 className="text-subheading">{podcast.title}</h3>
            <p className="text-body m-0 text-sm text-text-secondary">{podcast.description || 'بدون توضیح'}</p>
            <p className="m-0 text-sm text-text-secondary">{authorLabel}</p>
            {subscribedAt ? <p className="m-0 text-xs text-text-secondary">اشتراک از {formatDisplayDate(subscribedAt)}</p> : null}
          </div>
        </div>

        <div className="flex flex-col items-stretch gap-3 sm:items-end">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-border bg-surface-secondary px-2.5 py-1 text-xs text-text-secondary">
              {isCurrentlyPlaying ? 'در حال پخش' : 'آماده برای گوش دادن'}
            </span>
            <Link href={`/podcasts/${podcast.id}`} className="inline-flex items-center text-sm font-medium text-accent">
              مشاهده پادکست
            </Link>
          </div>
          <SubscriptionActionButton isSubscribed={isSubscribed} onSubscribe={onSubscribe} onUnsubscribe={onUnsubscribe} />
        </div>
      </div>
    </Card>
  );
}
