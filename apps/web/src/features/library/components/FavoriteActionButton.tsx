'use client';

import { Heart } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useFavorites, useSaveFavorite, useRemoveFavorite } from '../hooks/useFavorites';

export function FavoriteActionButton({ episodeId }: { episodeId: string }) {
  const { data: favorites } = useFavorites();
  const saveMutation = useSaveFavorite();
  const removeMutation = useRemoveFavorite();
  const [localError, setLocalError] = useState<string | null>(null);

  const isSaved = !!favorites?.some((f) => f.episodeId === episodeId);
  const isLoading = saveMutation.isPending || removeMutation.isPending;

  const handleToggle = async () => {
    setLocalError(null);
    try {
      if (isSaved) {
        await removeMutation.mutateAsync({ episodeId });
      } else {
        await saveMutation.mutateAsync({ episodeId });
      }
    } catch (e: any) {
      setLocalError(e?.message ?? 'خطا در انجام عملیات');
    }
  };

  return (
    <div>
      <Button
        variant={isSaved ? 'ghost' : 'secondary'}
        onClick={() => void handleToggle()}
        aria-pressed={isSaved}
        aria-label={isSaved ? 'Remove saved episode' : 'Save episode'}
        disabled={isLoading}
        className={isSaved ? 'text-accent' : ''}
      >
        <Heart className={`h-4 w-4 ${isSaved ? 'fill-accent text-accent' : ''}`} aria-hidden="true" />
      </Button>
      {localError ? <p className="mt-1 text-xs text-destructive">{localError}</p> : null}
    </div>
  );
}
