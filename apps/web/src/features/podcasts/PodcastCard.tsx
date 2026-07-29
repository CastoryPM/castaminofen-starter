import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import type { Podcast } from '@/lib/types';
import { getPodcastOwnerLabel } from './utils/podcastPresentation';

export function PodcastCard({ podcast }: { podcast: Podcast }) {
  return (
    <Card className="flex flex-col gap-3 rounded-3xl border border-border/80 bg-surface-primary/95 p-4 shadow-sm sm:gap-4 sm:p-5">
      <div className="space-y-3">
        {podcast.artworkUrl ? (
          <Image
            src={podcast.artworkUrl}
            alt={`${podcast.title} artwork`}
            width={480}
            height={270}
            className="h-36 w-full rounded-2xl object-cover sm:h-40"
            unoptimized
          />
        ) : null}
        <div className="space-y-2">
          <h2 className="text-base font-semibold text-text-primary sm:text-subheading">{podcast.title}</h2>
          <p className="text-sm font-medium text-text-secondary">{getPodcastOwnerLabel(podcast)}</p>
          <p className="text-body m-0 line-clamp-3 text-sm sm:text-base">{podcast.description || 'توضیحی برای این پادکست ثبت نشده است.'}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Link href={`/podcasts/${podcast.id}`} className="button button-secondary min-h-[2.75rem] w-full justify-center sm:flex-1">
          مشاهده
        </Link>
        <Link href={`/podcasts/${podcast.id}/edit`} className="button button-secondary min-h-[2.75rem] justify-center">
          ویرایش
        </Link>
      </div>
    </Card>
  );
}
