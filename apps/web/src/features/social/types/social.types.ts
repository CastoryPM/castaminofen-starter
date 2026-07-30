export type SocialReactionType = 'like' | 'insightful' | 'interesting' | 'agree' | 'question' | 'love';

export type SocialCommentSortMode = 'newest' | 'most-liked' | 'most-relevant';

export type FollowState = 'not-following' | 'following' | 'pending';

export type SocialContextType = 'content' | 'player' | 'community' | 'creator';

export interface SocialAuthor {
  id: string;
  name: string;
  handle?: string;
  avatar?: string;
  verified?: boolean;
}

export interface SocialReaction {
  type: SocialReactionType;
  count: number;
  userReacted?: boolean;
}

export interface SocialReply {
  id: string;
  author: SocialAuthor;
  content: string;
  createdAt: string;
  reactions: SocialReaction[];
}

export interface SocialComment {
  id: string;
  author: SocialAuthor;
  content: string;
  createdAt: string;
  reactions: SocialReaction[];
  replies: SocialReply[];
  sortMode?: SocialCommentSortMode;
}

export interface SocialDiscussion {
  id: string;
  title: string;
  description: string;
  contextType: SocialContextType;
  participants: SocialAuthor[];
  comments: SocialComment[];
  reactions: SocialReaction[];
  relatedContent?: {
    title: string;
    subtitle?: string;
  };
}

export interface SocialNotification {
  id: string;
  type: 'social' | 'content' | 'community';
  title: string;
  description: string;
  createdAt: string;
  unread?: boolean;
}

export interface SocialContribution {
  id: string;
  label: string;
  value: string;
  detail?: string;
}
