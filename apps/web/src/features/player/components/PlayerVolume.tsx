'use client';

import { Volume2 } from 'lucide-react';
import { usePlayerRuntime } from '../hooks/usePlayerRuntime';
import { usePlayerState } from '../hooks/usePlayerState';

export function PlayerVolume() {
  const playerRuntime = usePlayerRuntime();
  const { volume, currentItem } = usePlayerState();
  const disabled = !currentItem?.audioUrl;

  return (
    <div className="flex items-center gap-2 rounded-full bg-surface-secondary/70 px-3 py-2 opacity-90" aria-disabled={disabled}>
      <Volume2 size={16} className="shrink-0 text-text-secondary" />
      <input
        type="range"
        min={0}
        max={1}
        step={0.05}
        value={Number.isFinite(volume) ? volume : 0.8}
        onChange={(event) => playerRuntime.setVolume(Number(event.target.value))}
        className="h-2 w-20 cursor-pointer appearance-none rounded-full bg-surface-primary/80 accent-accent"
        disabled={disabled}
        aria-label="Playback volume"
      />
    </div>
  );
}
