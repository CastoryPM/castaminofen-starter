import { useMutation, useQueryClient } from '@tanstack/react-query';
import { unsubscribeFromPodcast, type LibraryOverviewResponse, type LibrarySubscriptionResponse } from '@/lib/library';

export function useUnsubscribePodcast() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unsubscribeFromPodcast,
    onSuccess: (_response, podcastId) => {
      queryClient.setQueryData<LibrarySubscriptionResponse[]>(['library', 'subscriptions'], (current) => {
        if (!current) {
          return [];
        }

        return current.filter((item) => item.podcastId !== podcastId);
      });

      queryClient.setQueryData<LibraryOverviewResponse>(['library'], (current) => {
        if (!current) {
          return { subscriptions: [], continueListening: [] };
        }

        return {
          ...current,
          subscriptions: current.subscriptions.filter((item) => item.podcastId !== podcastId),
        };
      });

      queryClient.invalidateQueries({ queryKey: ['library', 'subscriptions'] });
      queryClient.invalidateQueries({ queryKey: ['library'] });
    },
  });
}
