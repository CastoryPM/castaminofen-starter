export type CreatorMode = 'owner' | 'viewer';

export type CreatorContentType = 'podcast' | 'audiobook' | 'video' | 'short' | 'article' | 'collection';

export type CreatorReputationLevel = 'New Creator' | 'Rising Voice' | 'Trusted Creator' | 'Knowledge Leader';

export interface CreatorProfileData {
  id: string;
  name: string;
  username: string;
  badge: string;
  bio: string;
  category: string;
  location: string;
  followerCount: number;
  totalContent: number;
  communityActivity: number;
  discussionsStarted: number;
  engagement: number;
  reputationLevel: CreatorReputationLevel;
  isFollowing: boolean;
  topics: string[];
}

export interface CreatorContentItem {
  id: string;
  title: string;
  description: string;
  type: CreatorContentType;
  meta: string;
  accentLabel: string;
}

export interface CreatorCollectionItem {
  id: string;
  title: string;
  description: string;
  contentCount: number;
  followers: number;
}

export interface CreatorCommunityItem {
  id: string;
  title: string;
  members: number;
  discussions: number;
  pinned: string;
}

export interface CreatorActivityItem {
  id: string;
  title: string;
  detail: string;
  timestamp: string;
  kind: 'published' | 'created' | 'joined' | 'replied';
}
