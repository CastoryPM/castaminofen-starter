import { useMutation, useQueryClient } from '@tanstack/react-query';
import { subscribeToPodcast, type LibraryOverviewResponse, type LibrarySubscriptionResponse } from '@/lib/library';

export function useSubscribePodcast() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: subscribeToPodcast,
    onSuccess: (subscription) => {
      queryClient.setQueryData<LibrarySubscriptionResponse[]>(['library', 'subscriptions'], (current) => {
        if (!current) {
          return [subscription];
        }

        return current.some((item) => item.podcastId === subscription.podcastId)
          ? current
          : [subscription, ...current];
      });

      queryClient.setQueryData<LibraryOverviewResponse>(['library'], (current) => {
        if (!current) {
          return { subscriptions: [subscription], continueListening: [], history: [] };
        }

        return {
          ...current,
          subscriptions: current.subscriptions.some((item) => item.podcastId === subscription.podcastId)
            ? current.subscriptions
            : [subscription, ...current.subscriptions],
        };
      });

      queryClient.invalidateQueries({ queryKey: ['library', 'subscriptions'] });
      queryClient.invalidateQueries({ queryKey: ['library'] });
    },
  });
}
