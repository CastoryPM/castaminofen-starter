export type ProfileMode = 'owner' | 'viewer';

export interface ProfileIdentity {
  id: string;
  displayName: string;
  username: string;
  bio: string;
  verified: boolean;
  status: string;
  followers: number;
  following: number;
  contributionLevel: string;
  favoriteTopics: string[];
  joinedAt: string;
  isFollowing?: boolean;
}

export interface ProfileMetric {
  id: string;
  label: string;
  value: string;
  detail: string;
}

export interface ProfileMemory {
  id: string;
  title: string;
  detail: string;
  kind: 'moment' | 'highlight' | 'note' | 'bookmark';
}

export interface ProfileCollection {
  id: string;
  title: string;
  description: string;
  count: number;
  accent: string;
}

export interface ProfileActivityItem {
  id: string;
  label: string;
  value: string;
  detail: string;
}

export interface ProfileContributionItem {
  id: string;
  label: string;
  description: string;
}

export interface ProfileSocialGroup {
  id: string;
  title: string;
  items: string[];
}

export interface ProfileContentItem {
  id: string;
  title: string;
  subtitle: string;
  meta: string;
}

export interface ProfileExperienceData {
  profile: ProfileIdentity;
  stats: ProfileMetric[];
  memories: ProfileMemory[];
  collections: ProfileCollection[];
  activities: ProfileActivityItem[];
  contributions: ProfileContributionItem[];
  socialGroups: ProfileSocialGroup[];
  interests: string[];
  content: ProfileContentItem[];
}
