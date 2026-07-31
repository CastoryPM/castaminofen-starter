export type AdminConfigurationStatus = {
  environment: string;
  enabledFeatures: number;
  activeConfigurations: number;
  healthSummary: string;
};

export type AdminFeatureVisibility = {
  id: string;
  name: string;
  enabled: boolean;
  description: string;
  impact: string;
};

export type AdminContentType = 'Podcast' | 'Audiobook' | 'Video' | 'Short' | 'Article';

export type AdminContentConfiguration = {
  type: AdminContentType;
  allowedCategories: string[];
  visibilityDefault: 'Public' | 'Members' | 'Creator-only';
  publishingRules: string;
  discoveryPreference: string;
};

export type AdminCategoryItem = {
  id: string;
  name: string;
  type: 'Category' | 'Topic';
  status: 'Active' | 'Featured' | 'Community';
};

export type AdminNavigationProfile = {
  id: string;
  name: string;
  lanes: string[];
};

export type AdminCreatorConfiguration = {
  publishingAccess: string;
  verificationVisibility: string;
  monetizationPreview: string;
  onboarding: string;
};

export type AdminCommunityConfiguration = {
  commentingAvailability: string;
  reactionTypes: string[];
  visibility: string;
  featuredDiscussions: string[];
};

export type AdminPlayerConfiguration = {
  defaultPlaybackSpeed: string;
  autoplay: string;
  queueBehavior: string;
  immersivePlayer: string;
  transcriptAvailability: string;
};

export type AdminNotificationSetting = {
  category: string;
  items: string[];
};

export type AdminThemePreview = {
  logo: string;
  typography: string;
  surfaces: string;
  accentIdentity: string;
};

export type AdminSystemPreference = {
  language: string;
  region: string;
  maintenanceModePreview: string;
  systemMessage: string;
};
