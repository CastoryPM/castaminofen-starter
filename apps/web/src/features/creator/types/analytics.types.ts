export interface CreatorAnalyticsHeadline {
  title: string;
  description: string;
  followers: string;
  totalContent: string;
  totalPlays: string;
  engagementScore: string;
  communityActivity: string;
}

export interface CreatorPerformanceItem {
  id: string;
  title: string;
  type: string;
  plays: string;
  completionRate: string;
  saves: string;
  reactions: string;
  comments: string;
  shares: string;
  followerConversion: string;
  trend: string;
  topic: string;
}

export interface CreatorAudienceData {
  interests: string[];
  behavior: {
    peakTime: string;
    favoriteType: string;
    returningAudience: string;
  };
}

export interface CreatorCommunityData {
  discussionsCreated: string;
  commentsReceived: string;
  participation: string;
  topics: string[];
  questions: string[];
}

export interface CreatorRelationshipData {
  followersGained: string;
  returningAudience: string;
  activeCommunityMembers: string;
  loyalAudience: string;
}

export interface CreatorAnalyticsData {
  headline: CreatorAnalyticsHeadline;
  performance: CreatorPerformanceItem[];
  audience: CreatorAudienceData;
  community: CreatorCommunityData;
  timeline: string[];
  recommendations: string[];
  relationships: CreatorRelationshipData;
}
