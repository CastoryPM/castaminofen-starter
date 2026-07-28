'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { usePlayerRuntime } from '@/features/player';
import { mapEpisodeToPlayableItem } from '@/features/player/adapters/episodeToPlayable';
import type { Episode, Podcast } from '@/lib/types';
import { canPlayEpisode, formatDisplayDate, getPodcastOwnerLabel } from './utils/podcastPresentation';

export type PodcastDetailsProps = {
  podcast: Podcast;
  canManage?: boolean;
  isDeleting?: boolean;
  onDelete?: () => void;
};

export function PodcastDetails({ podcast, canManage = false, isDeleting = false, onDelete }: PodcastDetailsProps) {
  const playerRuntime = usePlayerRuntime();

  const handlePlayEpisode = async (episode: Episode) => {
    if (!canPlayEpisode(episode)) {
      return;
    }

    await playerRuntime.loadItem(mapEpisodeToPlayableItem(episode));
  };

  return (
    <section className="card space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-2">
          <h1 className="text-heading">{podcast.title}</h1>
          <p className="text-sm font-medium text-text-secondary">{getPodcastOwnerLabel(podcast)}</p>
          <p className="text-body m-0">{podcast.description || 'توضیحی برای این پادکست ثبت نشده است.'}</p>
        </div>
        {canManage ? (
          <div className="flex flex-wrap gap-2">
            <Link href={`/podcasts/${podcast.id}/edit`} className="button button-secondary">
              ویرایش
            </Link>
            <Button variant="secondary" onClick={onDelete} disabled={isDeleting}>
              {isDeleting ? 'در حال حذف…' : 'حذف'}
            </Button>
          </div>
        ) : null}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="space-y-4">
          {podcast.artworkUrl ? (
            <Image
              src={podcast.artworkUrl}
              alt={`${podcast.title} artwork`}
              width={640}
              height={360}
              className="mb-4 h-56 w-full rounded-2xl object-cover"
              unoptimized
            />
          ) : null}
          <div className="space-y-2 text-sm text-text-secondary">
            <p><span className="font-semibold text-text-primary">وب‌سایت:</span> {podcast.website || '—'}</p>
            <p><span className="font-semibold text-text-primary">حساب:</span> {getPodcastOwnerLabel(podcast)}</p>
          </div>
        </Card>

        <Card className="space-y-4">
          <h2 className="text-subheading">اپیزودها</h2>
          {podcast.episodes?.length ? (
            <div className="space-y-3">
              {podcast.episodes.map((episode: Episode) => (
                <div key={episode.id} className="rounded-2xl border border-border/80 bg-surface-primary/70 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold text-text-primary">{episode.title}</h3>
                    <span className="text-xs text-text-secondary">{formatDisplayDate(episode.publishedAt)}</span>
                  </div>
                  <p className="mt-2 text-sm text-text-secondary">{episode.description || 'بدون توضیح'}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => void handlePlayEpisode(episode)}
                      disabled={!canPlayEpisode(episode)}
                    >
                      {canPlayEpisode(episode) ? 'پخش' : 'پخش در دسترس نیست'}
                    </Button>
                    <Link href={`/episodes/${episode.id}`} className="button button-secondary justify-center">
                      مشاهده اپیزود
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-body m-0">هنوز اپیزودی در این پادکست وجود ندارد.</p>
          )}
        </Card>
      </div>
    </section>
  );
}
