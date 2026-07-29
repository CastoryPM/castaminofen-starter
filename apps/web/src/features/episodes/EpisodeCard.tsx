'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { usePlayerRuntime } from '@/features/player';
import { mapEpisodeToPlayableItem } from '@/features/player/adapters/episodeToPlayable';
import type { Episode } from '@/lib/types';

export function EpisodeCard({ episode }: { episode: Episode }) {
  const playerRuntime = usePlayerRuntime();

  const handlePlay = async () => {
    await playerRuntime.loadItem(mapEpisodeToPlayableItem(episode));
  };

  return (
    <Card className="flex flex-col gap-4 rounded-3xl border border-border/80 bg-surface-primary/95 p-4 shadow-sm sm:p-5">
      <div className="space-y-2">
        <h3 className="text-base font-semibold text-text-primary">{episode.title}</h3>
        <p className="m-0 text-sm leading-6 text-text-secondary sm:text-base">
          {episode.description || 'No description provided.'}
        </p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Button type="button" variant="secondary" className="min-h-[2.75rem] w-full justify-center sm:w-auto" onClick={() => void handlePlay()}>
          Play
        </Button>
        <Link href={`/episodes/${episode.id}`} className="button button-secondary min-h-[2.75rem] w-full justify-center sm:w-auto">
          View Episode
        </Link>
      </div>
    </Card>
  );
}
