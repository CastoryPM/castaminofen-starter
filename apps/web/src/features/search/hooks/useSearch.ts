import { useQuery } from '@tanstack/react-query';
import type { Podcast } from '@/lib/types';

type UseSearchParams = {
  q?: string;
  page?: number;
  limit?: number;
  offline?: boolean;
};

export function useSearch(params: UseSearchParams) {
  const page = params.page ?? 1;
  const limit = params.limit ?? 12;

  return useQuery({
    queryKey: ['search', params.offline ? 'offline' : params.q ?? '', page, limit, params.offline ? 'offline' : 'online'],
    queryFn: async () => {
      if (params.offline) {
        // Minimal offline search: use library subscriptions as proxy for offline items.
        const subs = await import('@/lib/library').then((m) => m.getLibrarySubscriptions());
        const podcasts = subs.map((s) => s.podcast);
        const q = (params.q ?? '').trim().toLowerCase();
        const filtered = q
          ? podcasts.filter((p) => {
              return (
                (p.title ?? '').toLowerCase().includes(q) ||
                (p.description ?? '').toLowerCase().includes(q)
              );
            })
          : podcasts;

        return {
          data: filtered as Podcast[],
          pagination: {
            total: filtered.length,
            totalPages: 1,
            page: 1,
            limit,
          },
        } as { data: Podcast[]; pagination: { total: number; totalPages: number; page: number; limit: number } };
      }

      return import('@/lib/podcasts').then((m) => m.getPodcasts({ search: params.q, page, limit }));
    },
    staleTime: 1000 * 30,
  });
}
