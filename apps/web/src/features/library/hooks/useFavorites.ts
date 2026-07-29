import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getLibraryFavorites, saveFavorite, removeFavorite, type LibraryFavoriteResponse } from '@/lib/library';

export function useFavorites() {
  return useQuery({ queryKey: ['library', 'favorites'], queryFn: getLibraryFavorites, staleTime: 1000 * 30 });
}

export function useSaveFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveFavorite,
    onSuccess: (fav: LibraryFavoriteResponse) => {
      queryClient.setQueryData<LibraryFavoriteResponse[]>(['library', 'favorites'], (current) => {
        if (!current) return [fav];
        return current.some((c) => c.episodeId === fav.episodeId) ? current : [fav, ...current];
      });
      queryClient.invalidateQueries({ queryKey: ['library', 'favorites'] });
    },
  });
}

export function useRemoveFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ episodeId }: { episodeId: string }) => removeFavorite(episodeId),
    onSuccess: (_res, vars) => {
      queryClient.setQueryData<LibraryFavoriteResponse[]>(['library', 'favorites'], (current) => {
        if (!current) return [];
        return current.filter((c) => c.episodeId !== vars.episodeId);
      });
      queryClient.invalidateQueries({ queryKey: ['library', 'favorites'] });
    },
  });
}
