import Link from 'next/link';
import { Card } from '@/components/ui/card';
import type { Podcast } from '@/lib/types';

export function PodcastCard({ podcast }: { podcast: Podcast }) {
  return (
    <Card className="flex flex-col gap-4">
      <div className="space-y-2">
        <h2 className="text-subheading">{podcast.title}</h2>
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
