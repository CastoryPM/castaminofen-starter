'use client';

import { useFavorites } from '../hooks/useFavorites';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNowStrict } from 'date-fns';
import { FavoriteActionButton } from './FavoriteActionButton';
import type { LibraryFavoriteResponse } from '@/lib/library';

export function LibraryFavoritesSection() {
  const query = useFavorites();

  if (query.isLoading) {
    return (
      <div className="space-y-3">
        <div className="h-24 animate-pulse rounded-2xl bg-surface-secondary/70" />
        <div className="h-24 animate-pulse rounded-2xl bg-surface-secondary/70" />
      </div>
    );
  }

  if (query.isError) {
    return (
      <div className="rounded-2xl border border-warning/40 bg-surface-secondary/70 p-4">
        <p className="text-sm text-text-primary">Unable to load saved episodes.</p>
        <Button variant="secondary" onClick={() => void query.refetch()}>Retry</Button>
      </div>
    );
  }

  const items: LibraryFavoriteResponse[] = query.data ?? [];

  if (!items.length) {
    return (
      <div className="rounded-[1.5rem] border border-border/80 bg-surface-primary/90 p-6 text-center">
        <p className="text-sm font-semibold text-text-primary">Your favorite episodes will appear here.</p>
        <p className="mt-2 text-sm text-text-secondary">Save episodes you love and return to them anytime.</p>
        <div className="mt-4">
          <Link href="/search" className="inline-flex">
            <Button variant="secondary">Explore podcasts</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section id="favorites" className="space-y-3">
      <h3 className="text-subheading">❤️ Favorites</h3>
      <p className="text-sm text-text-secondary">Saved episodes you want to return to.</p>
      <div className="space-y-3">
        {items.map((item) => (
          <article key={item.id} className="flex items-center gap-3 rounded-[1.25rem] border border-border/80 bg-surface-primary/90 p-3">
            {item.episode.podcast?.artworkUrl ? (
              <Image src={item.episode.podcast.artworkUrl} alt={item.episode.title} width={64} height={64} className="h-14 w-14 rounded-lg object-cover" />
            ) : (
              <div className="h-14 w-14 rounded-lg bg-surface-secondary" />
            )}

            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-semibold text-text-primary line-clamp-2">{item.episode.title}</h4>
              <p className="text-xs text-text-secondary">{item.episode.podcast?.title}</p>
              <p className="text-xs text-text-secondary">Saved {formatDistanceToNowStrict(new Date(item.savedAt))} ago</p>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="secondary" onClick={() => { /* play handled by Player elsewhere */ }} aria-label={`Play ${item.episode.title}`}>
                ▶ Play
              </Button>
              <FavoriteActionButton episodeId={item.episodeId} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
