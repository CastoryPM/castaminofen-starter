import type { SocialReaction } from '@/features/social/types/social.types';

export type CommunityFeedMode = 'for-you' | 'trending' | 'following' | 'latest';

export type CommunityDiscussionContext = 'episode' | 'chapter' | 'video' | 'book' | 'short';

export interface CommunityDiscussion {
  id: string;
  title: string;
  description: string;
  contextLabel: string;
  contentTitle: string;
  contentSubtitle?: string;
  creatorName: string;
  authorName: string;
  participants: Array<{ id: string; name: string }>;
  commentsCount: number;
  reactions: SocialReaction[];
  activity: string;
  tags: string[];
  isJoined?: boolean;
  isSaved?: boolean;
  contextType: CommunityDiscussionContext;
  feedMode: CommunityFeedMode[];
}

export interface CommunityTopic {
  id: string;
  title: string;
  followers: string;
  activeDiscussions: string;
  trendLabel: string;
  creators: string[];
}

export interface CommunityCreator {
  id: string;
  name: string;
  handle: string;
  focus: string;
  followers: string;
  featuredDiscussion: string;
}

export interface CommunityContribution {
  id: string;
  label: string;
  value: string;
  detail: string;
}
