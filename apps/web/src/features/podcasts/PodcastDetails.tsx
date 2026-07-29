'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Play, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SubscriptionActionButton } from '@/features/library/components/SubscriptionActionButton';
import { useContinueListening } from '@/features/library/hooks/useContinueListening';
import { useLibrarySubscriptions } from '@/features/library/hooks/useLibrarySubscriptions';
import { useSubscribePodcast } from '@/features/library/hooks/useSubscribePodcast';
import { useUnsubscribePodcast } from '@/features/library/hooks/useUnsubscribePodcast';
import { usePlayerRuntime, usePlayerState } from '@/features/player';
import { mapEpisodeToPlayableItem } from '@/features/player/adapters/episodeToPlayable';
import type { Episode, Podcast } from '@/lib/types';
import { buildPodcastMetadataItems, canPlayEpisode, formatDisplayDate, getContinueListeningSummary, getPodcastOwnerLabel } from './utils/podcastPresentation';

export type PodcastDetailsProps = {
  podcast: Podcast;
  canManage?: boolean;
  isDeleting?: boolean;
  onDelete?: () => void;
};

export function PodcastDetailsSkeleton() {
  return (
    <section className="space-y-6" aria-busy="true" aria-live="polite">
      <div className="overflow-hidden rounded-[2rem] border border-border/80 bg-surface-secondary/70 shadow-soft">
        <div className="grid gap-6 p-5 sm:p-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.95fr)] lg:p-10">
          <div className="space-y-4">
            <div className="h-8 w-32 animate-pulse rounded-full bg-surface-primary" />
            <div className="space-y-2">
              <div className="h-10 w-3/4 animate-pulse rounded-2xl bg-surface-primary" />
              <div className="h-5 w-1/2 animate-pulse rounded-2xl bg-surface-primary" />
              <div className="h-4 w-full animate-pulse rounded-2xl bg-surface-primary" />
              <div className="h-4 w-5/6 animate-pulse rounded-2xl bg-surface-primary" />
            </div>
            <div className="flex gap-3">
              <div className="h-12 w-36 animate-pulse rounded-2xl bg-surface-primary" />
              <div className="h-12 w-24 animate-pulse rounded-2xl bg-surface-primary" />
            </div>
          </div>
          <div className="h-72 animate-pulse rounded-[1.5rem] bg-surface-primary sm:h-80" />
        </div>
      </div>
      <div className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="h-56 animate-pulse rounded-[1.75rem] bg-surface-secondary/70" />
        <div className="space-y-3">
          <div className="h-28 animate-pulse rounded-[1.75rem] bg-surface-secondary/70" />
          <div className="h-28 animate-pulse rounded-[1.75rem] bg-surface-secondary/70" />
        </div>
      </div>
    </section>
  );
}

export function PodcastDetails({ podcast, canManage = false, isDeleting = false, onDelete }: PodcastDetailsProps) {
  const playerRuntime = usePlayerRuntime();
  const playerState = usePlayerState();
  const continueListeningQuery = useContinueListening();
  const subscriptionsQuery = useLibrarySubscriptions();
  const subscribeMutation = useSubscribePodcast();
  const unsubscribeMutation = useUnsubscribePodcast();
  const metadataItems = buildPodcastMetadataItems(podcast);

  const handlePlayEpisode = async (episode: Episode) => {
    if (!canPlayEpisode(episode)) {
      return;
    }

    await playerRuntime.loadItem(mapEpisodeToPlayableItem(episode));
  };

  const latestEpisode = podcast.episodes?.[0];
  const heroSummary = podcast.description?.trim() || 'توضیحی برای این پادکست ثبت نشده است.';
  const isSubscribed = subscriptionsQuery.data?.some((item) => item.podcastId === podcast.id) ?? false;
  const continueListeningEntries = new Map((continueListeningQuery.data ?? []).map((item) => [item.episodeId, item]));

  return (
    <section className="space-y-6" aria-labelledby="podcast-detail-heading">
      <div className="overflow-hidden rounded-[2rem] border border-border/80 bg-surface-secondary/70 shadow-soft">
        <div className="grid gap-6 p-5 sm:p-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.95fr)] lg:p-10">
          <div className="flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                تجربه پادکست
              </div>
              <div className="space-y-3">
                <h1 id="podcast-detail-heading" className="text-heading leading-tight">
                  {podcast.title}
                </h1>
                <p className="text-base font-medium text-text-secondary">{getPodcastOwnerLabel(podcast)}</p>
                <p className="max-w-2xl text-base leading-8 text-text-secondary">{heroSummary}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                type="button"
                variant="primary"
                onClick={() => latestEpisode && void handlePlayEpisode(latestEpisode)}
                disabled={!latestEpisode || !canPlayEpisode(latestEpisode)}
                className="min-h-[3rem]"
                aria-label="پخش آخرین اپیزود این پادکست"
              >
                <span className="flex items-center gap-2">
                  <Play className="h-4 w-4" aria-hidden="true" />
                  {latestEpisode ? 'پخش آخرین اپیزود' : 'پخش در دسترس نیست'}
                </span>
              </Button>
              <SubscriptionActionButton
                isSubscribed={isSubscribed}
                onSubscribe={() => void subscribeMutation.mutateAsync(podcast.id)}
                onUnsubscribe={() => void unsubscribeMutation.mutateAsync(podcast.id)}
              />
              {canManage ? (
                <div className="flex flex-wrap gap-2">
                  <Link href={`/podcasts/${podcast.id}/edit`} className="button button-secondary min-h-[3rem]">
                    ویرایش
                  </Link>
                  <Button variant="secondary" onClick={onDelete} disabled={isDeleting} className="min-h-[3rem]">
                    {isDeleting ? 'در حال حذف…' : 'حذف'}
                  </Button>
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-[320px] rounded-[2rem] border border-border/80 bg-surface-primary/90 p-3 shadow-soft sm:p-4">
              {podcast.artworkUrl ? (
                <Image
                  src={podcast.artworkUrl}
                  alt={`${podcast.title} artwork`}
                  width={640}
                  height={640}
                  className="h-72 w-full rounded-[1.5rem] object-cover sm:h-80"
                  unoptimized
                />
              ) : (
                <div className="flex h-72 w-full items-center justify-center rounded-[1.5rem] border border-dashed border-border bg-surface-secondary text-center text-sm text-text-secondary sm:h-80">
                  این پادکست هنوز artwork ندارد.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <Card className="space-y-4 rounded-[1.75rem] border border-border/80 bg-surface-secondary/70 p-5 shadow-sm sm:p-6">
          <div className="space-y-2">
            <h2 className="text-subheading">اطلاعات پادکست</h2>
            <p className="text-sm text-text-secondary">جزئیات اصلی این پادکست در یک نگاه.</p>
          </div>
          {metadataItems.length ? (
            <dl className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              {metadataItems.map((item) => (
                <div key={item.label} className="rounded-2xl border border-border/70 bg-surface-primary/80 p-3">
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-text-secondary">{item.label}</dt>
                  <dd className="mt-1 text-sm font-medium text-text-primary">{item.value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="text-sm text-text-secondary">هنوز اطلاعات تکمیلی برای این پادکست موجود نیست.</p>
          )}
        </Card>

        <Card className="rounded-[1.75rem] border border-border/80 bg-surface-secondary/70 p-5 shadow-sm sm:p-6" aria-labelledby="episodes-heading">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 id="episodes-heading" className="text-subheading">اپیزودها</h2>
              <p className="text-sm text-text-secondary">از میان اپیزودهای این پادکست، پخش را شروع کنید.</p>
            </div>
            {podcast.episodes?.length ? <span className="rounded-full border border-border bg-surface-primary px-3 py-1 text-sm text-text-secondary">{podcast.episodes.length} اپیزود</span> : null}
          </div>

          {podcast.episodes?.length ? (
            <div className="space-y-3">
              {podcast.episodes.map((episode: Episode) => {
                const continueListeningEntry = continueListeningEntries.get(episode.id);
                const isCurrentEpisode = playerState.currentItem?.id === episode.id;
                const continueListeningSummary = getContinueListeningSummary({
                  positionSeconds: continueListeningEntry?.positionSeconds ?? (isCurrentEpisode ? playerState.currentPosition : undefined),
                  durationSeconds: isCurrentEpisode ? playerState.duration : undefined,
                });
                const playbackLabel = isCurrentEpisode
                  ? playerState.playbackStatus === 'playing'
                    ? 'در حال پخش'
                    : playerState.playbackStatus === 'paused'
                      ? 'متوقف شده'
                      : 'در حال آماده‌سازی'
                  : canPlayEpisode(episode)
                    ? 'پخش'
                    : 'پخش در دسترس نیست';

                return (
                  <article key={episode.id} className="rounded-[1.5rem] border border-border/80 bg-surface-primary/90 p-4 shadow-sm">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0 space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-sm font-semibold text-text-primary">{episode.title}</h3>
                          {continueListeningSummary ? (
                            <span className="rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">{continueListeningSummary.label}</span>
                          ) : null}
                        </div>
                        <p className="text-sm leading-7 text-text-secondary">{episode.description?.trim() || 'توضیحی برای این اپیزود ثبت نشده است.'}</p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2 text-sm text-text-secondary">
                        <span>{formatDisplayDate(episode.publishedAt)}</span>
                        {canPlayEpisode(episode) ? <span className="text-accent">•</span> : null}
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => void handlePlayEpisode(episode)}
                        disabled={!canPlayEpisode(episode)}
                        className="min-h-[2.75rem]"
                        aria-label={`پخش اپیزود ${episode.title}`}
                      >
                        {playbackLabel}
                      </Button>
                      <Link href={`/episodes/${episode.id}`} className="button button-secondary min-h-[2.75rem] justify-center">
                        مشاهده اپیزود
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-[1.5rem] border border-dashed border-border bg-surface-primary/70 p-6 text-center">
              <p className="text-base font-semibold text-text-primary">هنوز اپیزودی در این پادکست وجود ندارد.</p>
              <p className="mt-2 text-sm text-text-secondary">این پادکست در حال آماده‌سازی اپیزودهای جدید است.</p>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
}
