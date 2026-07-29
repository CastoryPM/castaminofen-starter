import { useQuery } from '@tanstack/react-query';
import { getEpisodes } from '@/lib/episodes';
import { type Episode, type PaginatedResponse } from '@/lib/types';

type SearchResultsResponse = {
  podcasts: PaginatedResponse<any>;
  episodes: Episode[];
};

export function useSearchResults(query: string) {
  const normalized = query.trim();

  return useQuery({
    queryKey: ['search-results', normalized],
    enabled: Boolean(normalized),
    queryFn: async () => {
      const [podcastsResponse, episodesResponse] = await Promise.all([
        import('@/lib/podcasts').then((m) => m.getPodcasts({ search: normalized || undefined, limit: 6 })),
        normalized ? getEpisodes({ search: normalized }) : Promise.resolve([] as Episode[]),
      ]);

      return {
        podcasts: podcastsResponse,
        episodes: normalized ? (episodesResponse as Episode[]) : [],
      } satisfies SearchResultsResponse;
    },
    staleTime: 1000 * 30,
  });
}
