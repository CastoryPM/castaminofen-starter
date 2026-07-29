import { Sparkles, Compass, Radio, Layers3, Library, TrendingUp, Mic2 } from 'lucide-react';
import type { Episode, Podcast } from '@/lib/types';

export type DiscoverySectionMode = 'podcasts' | 'episodes' | 'continue-listening' | 'placeholder' | 'categories';

export type DiscoverySectionDefinition = {
  id: string;
  title: string;
  description: string;
  mode: DiscoverySectionMode;
  eyebrow?: string;
  icon: typeof Sparkles;
  items?: Array<Podcast | Episode | { id: string; title: string; description: string }>;
  placeholder?: string;
  actionLabel?: string;
};

const categorySeed = [
  { id: 'technology', title: 'Technology', description: 'Ideas, founders, and product stories.' },
  { id: 'business', title: 'Business', description: 'Strategy, growth, and modern leadership.' },
  { id: 'education', title: 'Education', description: 'Learning, research, and curious minds.' },
  { id: 'science', title: 'Science', description: 'The latest in discovery and experimentation.' },
  { id: 'comedy', title: 'Comedy', description: 'Stories, conversations, and lighter moments.' },
  { id: 'history', title: 'History', description: 'The people and turning points behind the world.' },
  { id: 'news', title: 'News', description: 'Current conversations and daily context.' },
  { id: 'health', title: 'Health', description: 'Wellness, habits, and mindful living.' },
  { id: 'culture', title: 'Culture', description: 'Arts, media, and the wider conversation.' },
];

export function buildDiscoverySections({
  podcasts,
  episodes,
  continueListeningCount,
  isAuthenticated,
}: {
  podcasts: Podcast[];
  episodes: Episode[];
  continueListeningCount: number;
  isAuthenticated: boolean;
}) {
  const featuredPodcasts = podcasts.slice(0, 3);
  const newestEpisodes = episodes.slice(0, 3);

  const sections: DiscoverySectionDefinition[] = [
    {
      id: 'featured-podcasts',
      title: 'Featured Podcasts',
      description: 'A premium editorial starter set built from the podcasts already available in the app.',
      mode: featuredPodcasts.length ? 'podcasts' : 'placeholder',
      eyebrow: 'Editorial Focus',
      icon: Radio,
      items: featuredPodcasts,
      placeholder: 'Featured podcasts will appear here as the catalog grows.',
      actionLabel: 'Browse all podcasts',
    },
    {
      id: 'trending-now',
      title: 'Trending Now',
      description: 'Fresh conversations and new voices worth a first listen.',
      mode: featuredPodcasts.length ? 'podcasts' : 'placeholder',
      eyebrow: 'Trending',
      icon: TrendingUp,
      items: featuredPodcasts,
      placeholder: 'Trending lists will be surfaced here as content volume grows.',
    },
    {
      id: 'continue-listening',
      title: 'Continue Listening',
      description: 'Resume the episodes you already started without leaving the discovery flow.',
      mode: continueListeningCount > 0 ? 'continue-listening' : 'placeholder',
      eyebrow: 'Library',
      icon: Library,
      items: [],
      placeholder: continueListeningCount > 0 ? 'Your recent listening history is ready to resume.' : 'Continue listening will appear here as soon as you pick up an episode.',
    },
    {
      id: 'recommended-for-you',
      title: 'Recommended For You',
      description: isAuthenticated
        ? 'Personalized recommendations will appear here as your listening history grows.'
        : 'Personalized recommendations will appear here as your listening history grows.',
      mode: 'placeholder',
      eyebrow: 'Coming Soon',
      icon: Compass,
      placeholder: 'Recommendations will appear here as your listening history grows.',
    },
    {
      id: 'browse-categories',
      title: 'Browse Categories',
      description: 'Lightweight category cards keep the browsing experience calm and editorial.',
      mode: 'categories',
      eyebrow: 'Browse',
      icon: Layers3,
      items: categorySeed,
      placeholder: 'More categories will be available soon.',
    },
    {
      id: 'new-releases',
      title: 'New Releases',
      description: 'Freshly added episodes that are ready to discover.',
      mode: newestEpisodes.length ? 'episodes' : 'placeholder',
      eyebrow: 'New',
      icon: Mic2,
      items: newestEpisodes,
      placeholder: 'New releases will show up here as the episode catalog grows.',
    },
  ];

  return sections;
}
