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
    <Card className="card card-compact">
      <div className="card-header">
        <h3>{episode.title}</h3>
        <p>{episode.description || 'No description provided.'}</p>
      </div>
      <div className="card-footer flex flex-wrap gap-2">
        <Button type="button" variant="secondary" onClick={() => void handlePlay()}>
          Play
        </Button>
        <Link href={`/episodes/${episode.id}`} className="button button-secondary">
          View Episode
        </Link>
      </div>
    </Card>
  );
}
