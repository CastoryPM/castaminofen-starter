export type AdminAnalyticsTone = 'accent' | 'success' | 'warning' | 'neutral';

export type AdminAnalyticsKpi = {
  id: string;
  label: string;
  value: string;
  delta: string;
  detail: string;
  tone: AdminAnalyticsTone;
};

export type AdminGrowthSignal = {
  id: string;
  label: string;
  value: string;
  change: string;
  note: string;
};

export type AdminContentPerformance = {
  id: string;
  title: string;
  creator: string;
  type: 'پادکست' | 'کتاب صوتی' | 'ویدیو' | 'شورت' | 'مقاله';
  plays: string;
  completionRate: string;
  saves: string;
  shares: string;
  comments: string;
  communityActivity: string;
  status: 'Rising' | 'Stable' | 'Needs attention';
};

export type AdminCreatorInsight = {
  id: string;
  name: string;
  audienceGrowth: string;
  contentImpact: string;
  engagement: string;
  health: 'Growing' | 'Stable' | 'Needs support';
};

export type AdminCommunitySignal = {
  id: string;
  label: string;
  value: string;
  delta: string;
  note: string;
};

export type AdminRetentionStage = {
  id: string;
  stage: string;
  users: string;
  drop: string;
  note: string;
};

export type AdminTrendSignal = {
  id: string;
  title: string;
  signal: 'Fast growth' | 'High engagement' | 'Community impact';
  detail: string;
  focus: string;
};

export type AdminRecommendation = {
  id: string;
  title: string;
  detail: string;
  basis: string[];
};

export type AdminForecastItem = {
  id: string;
  label: string;
  value: string;
  note: string;
};
