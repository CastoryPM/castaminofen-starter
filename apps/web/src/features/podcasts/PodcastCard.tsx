import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import type { Podcast } from '@/lib/types';
import { getPodcastOwnerLabel } from './utils/podcastPresentation';

export function PodcastCard({ podcast }: { podcast: Podcast }) {
  return (
    <Card className="flex flex-col gap-4">
      <div className="space-y-2">
        {podcast.artworkUrl ? (
          <Image
            src={podcast.artworkUrl}
            alt={`${podcast.title} artwork`}
            width={480}
            height={270}
            className="h-36 w-full rounded-xl object-cover"
            unoptimized
          />
        ) : null}
        <h2 className="text-subheading">{podcast.title}</h2>
        <p className="text-sm font-medium text-text-secondary">{getPodcastOwnerLabel(podcast)}</p>
        <p className="text-body m-0 line-clamp-3">{podcast.description || 'توضیحی برای این پادکست ثبت نشده است.'}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Link href={`/podcasts/${podcast.id}`} className="button button-secondary flex-1 justify-center">
          مشاهده
        </Link>
        <Link href={`/podcasts/${podcast.id}/edit`} className="button button-secondary justify-center">
          ویرایش
        </Link>
      </div>
    </Card>
  );
}
