import type {
  AdminCategoryItem,
  AdminCommunityConfiguration,
  AdminConfigurationStatus,
  AdminContentConfiguration,
  AdminCreatorConfiguration,
  AdminFeatureVisibility,
  AdminNavigationProfile,
  AdminNotificationSetting,
  AdminPlayerConfiguration,
  AdminSystemPreference,
  AdminThemePreview,
} from '../types/configuration.types';

export const adminConfigurationStatus: AdminConfigurationStatus = {
  environment: 'Production-ready preview',
  enabledFeatures: 8,
  activeConfigurations: 12,
  healthSummary: 'Stable core surfaces, growth controls present, no runtime mutation hooks attached',
};

export const adminFeatureVisibility: AdminFeatureVisibility[] = [
  { id: 'home', name: 'Home', enabled: true, description: 'Homepage discovery and editorial entrypoint.', impact: 'Higher conversion and full awareness on launch' },
  { id: 'library', name: 'Library', enabled: true, description: 'Saved history, favorites, and progress overview.', impact: 'Improves repeat engagement and listening continuity' },
  { id: 'community', name: 'Community', enabled: true, description: 'Discussions, reactions, and social participation.', impact: 'Strengthens audience affinity and creator discovery' },
  { id: 'creator-studio', name: 'Creator Studio', enabled: true, description: 'Publishing and creator-first management.', impact: 'Supports scalable creator onboarding and publishing depth' },
  { id: 'player-experience', name: 'Player Experience', enabled: true, description: 'Immersive playback and queue-aware listening.', impact: 'Keeps playback friction low throughout the product journey' },
  { id: 'social-features', name: 'Social Features', enabled: true, description: 'Follows, reactions, comments, and profile interactions.', impact: 'Amplifies reach and user-to-user discovery loops' },
  { id: 'collections', name: 'Collections', enabled: false, description: 'Curated collections and editorial bundles.', impact: 'Adds merchandising depth but is not active in this preview' },
  { id: 'discovery', name: 'Discovery', enabled: true, description: 'Search-driven browsing and content discovery.', impact: 'Boosts new-listener conversion and exploration' },
];

export const adminContentConfiguration: AdminContentConfiguration[] = [
  {
    type: 'Podcast',
    allowedCategories: ['Technology', 'Education', 'Culture'],
    visibilityDefault: 'Public',
    publishingRules: 'Moderation queue required for new creator submissions',
    discoveryPreference: 'Featured discovery lanes and editor picks',
  },
  {
    type: 'Audiobook',
    allowedCategories: ['Education', 'Culture', 'Science'],
    visibilityDefault: 'Members',
    publishingRules: 'Creator self-serve approval with audit trail review',
    discoveryPreference: 'Library-first indexing and collections',
  },
  {
    type: 'Video',
    allowedCategories: ['Entertainment', 'Technology', 'Culture'],
    visibilityDefault: 'Public',
    publishingRules: 'Premium creator review for flagged content',
    discoveryPreference: 'Homepage carousel and creator spotlight',
  },
  {
    type: 'Short',
    allowedCategories: ['Entertainment', 'Science', 'Culture'],
    visibilityDefault: 'Public',
    publishingRules: 'Auto-queue with safe-mode filters',
    discoveryPreference: 'Trending topic feed and community momentum',
  },
  {
    type: 'Article',
    allowedCategories: ['Education', 'Science', 'Technology'],
    visibilityDefault: 'Creator-only',
    publishingRules: 'Editorial review for long-form publishing',
    discoveryPreference: 'Topic-led recommendations and archive visibility',
  },
];

export const adminCategoryItems: AdminCategoryItem[] = [
  { id: 'cat-1', name: 'Technology', type: 'Category', status: 'Active' },
  { id: 'cat-2', name: 'Education', type: 'Category', status: 'Featured' },
  { id: 'cat-3', name: 'Entertainment', type: 'Category', status: 'Active' },
  { id: 'cat-4', name: 'Science', type: 'Category', status: 'Community' },
  { id: 'cat-5', name: 'Culture', type: 'Category', status: 'Featured' },
  { id: 'topic-1', name: 'Trending topics', type: 'Topic', status: 'Active' },
  { id: 'topic-2', name: 'Featured topics', type: 'Topic', status: 'Featured' },
  { id: 'topic-3', name: 'Community topics', type: 'Topic', status: 'Community' },
];

export const adminNavigationProfiles: AdminNavigationProfile[] = [
  {
    id: 'mobile',
    name: 'Mobile navigation',
    lanes: ['Home', 'Library', 'Create', 'Search', 'Community', 'Profile'],
  },
  {
    id: 'desktop',
    name: 'Desktop navigation',
    lanes: ['Discover', 'Library', 'Creator Studio', 'Community', 'Collections', 'Profile'],
  },
];

export const adminCreatorConfiguration: AdminCreatorConfiguration = {
  publishingAccess: 'Open for verified creators',
  verificationVisibility: 'Visible on creator identity surfaces',
  monetizationPreview: 'Sponsor, premium drops, and creator subscriptions preview',
  onboarding: 'Guided onboarding across identity, RSS import, and publishing setup',
};

export const adminCommunityConfiguration: AdminCommunityConfiguration = {
  commentingAvailability: 'Enabled for selected creator and community channels',
  reactionTypes: ['Like', 'Spark', 'Insight'],
  visibility: 'Community-visible by default with moderation controls',
  featuredDiscussions: ['Editorial debates', 'Creator circles', 'Public listening rooms'],
};

export const adminPlayerConfiguration = {
  defaultPlaybackSpeed: '1.0x',
  autoplay: 'Enabled for related content when queue is exhausted',
  queueBehavior: 'Queue preview keeps the latest session order',
  immersivePlayer: 'Available in premium listening mode',
  transcriptAvailability: 'On by default for premium and creator content',
} satisfies AdminPlayerConfiguration;

export const adminNotificationSettings: AdminNotificationSetting[] = [
  { category: 'Social', items: ['Follows', 'Comments', 'Mentions'] },
  { category: 'Content', items: ['New releases', 'Recommendations'] },
  { category: 'Creator', items: ['Publishing updates'] },
];

export const adminThemePreview: AdminThemePreview = {
  logo: 'Castaminofen Union Mark',
  typography: 'Premium editorial sans with robust display hierarchy',
  surfaces: 'Dark canvas with translucent surfaces and elevated cards',
  accentIdentity: 'Warm accent with controlled high-contrast focus states',
};

export const adminSystemPreferences: AdminSystemPreference = {
  language: 'Persian + English support',
  region: 'Global default, region-indexed discovery controls',
  maintenanceModePreview: 'Preview state only — no runtime mutation in this phase',
  systemMessage: 'Platform status remains stable for discovery, creator, and social operations',
};
