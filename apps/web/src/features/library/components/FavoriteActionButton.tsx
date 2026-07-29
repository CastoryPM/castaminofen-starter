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
  const isProcessing = saveMutation.isPending || removeMutation.isPending;
  const mutationError = saveMutation.error?.message ?? removeMutation.error?.message ?? null;
  const errorMessage = localError ?? mutationError;

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
    <div className="space-y-1">
      <Button
        type="button"
        variant={isSaved ? 'ghost' : 'secondary'}
        onClick={() => void handleToggle()}
        aria-pressed={isSaved}
        aria-label={isSaved ? 'Remove saved episode' : 'Save episode'}
        aria-busy={isProcessing || undefined}
        loading={isProcessing}
        disabled={isProcessing}
        className={isSaved ? 'text-accent' : ''}
      >
        <Heart className={`h-4 w-4 ${isSaved ? 'fill-accent text-accent' : ''}`} aria-hidden="true" />
      </Button>
      {errorMessage ? <p className="text-xs text-destructive">{errorMessage}</p> : null}
    </div>
  );
}
