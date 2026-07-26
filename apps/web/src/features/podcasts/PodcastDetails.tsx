import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { Episode, Podcast } from '@/lib/types';

export type PodcastDetailsProps = {
  podcast: Podcast;
  canManage?: boolean;
  isDeleting?: boolean;
  onDelete?: () => void;
};

export function PodcastDetails({ podcast, canManage = false, isDeleting = false, onDelete }: PodcastDetailsProps) {
  return (
    <section className="card space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-2">
          <h1 className="text-heading">{podcast.title}</h1>
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
            <p><span className="font-semibold text-text-primary">RSS URL:</span> {podcast.rssUrl}</p>
            <p><span className="font-semibold text-text-primary">وب‌سایت:</span> {podcast.website || '—'}</p>
            <p><span className="font-semibold text-text-primary">مالک:</span> {podcast.ownerId || '—'}</p>
          </div>
        </Card>

        <Card className="space-y-4">
          <h2 className="text-subheading">اپیزودها</h2>
          {podcast.episodes?.length ? (
            <div className="space-y-3">
              {podcast.episodes.map((episode: Episode) => (
                <div key={episode.id} className="rounded-2xl border border-border/80 bg-surface-primary/70 p-4">
                  <h3 className="text-sm font-semibold text-text-primary">{episode.title}</h3>
                  <p className="mt-2 text-sm text-text-secondary">{episode.description || 'بدون توضیح'}</p>
                  <Link href={`/episodes/${episode.id}`} className="button button-secondary mt-3 justify-center">
                    مشاهده اپیزود
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-body m-0">هنوز اپیزودی در این پادکست وجود ندارد. پس از همگام‌سازی، اپیزودها در اینجا ظاهر می‌شوند.</p>
          )}
        </Card>
      </div>
    </section>
  );
}
