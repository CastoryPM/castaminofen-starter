export type AdminSectionKey = 'overview' | 'governance' | 'moderation' | 'content-review' | 'creator-review' | 'trust' | 'audit' | 'alerts' | 'safety' | 'roles' | 'operations' | 'users' | 'creators' | 'content' | 'community' | 'reports' | 'analytics' | 'settings' | 'system';

export type AdminMetric = {
  label: string;
  value: string;
  detail: string;
  tone?: 'accent' | 'success' | 'warning' | 'neutral';
};

export type AdminUser = {
  id: string;
  name: string;
  identity: string;
  joinedAt: string;
  activity: string;
  followers: number;
  contentCount: number;
  status: 'active' | 'restricted' | 'suspended' | 'verified';
};

export type AdminCreator = {
  id: string;
  name: string;
  level: string;
  followers: number;
  contentCount: number;
  engagement: string;
  impact: string;
  status: 'verified' | 'review' | 'pending';
};

export type AdminContentItem = {
  id: string;
  title: string;
  creator: string;
  type: 'پادکست' | 'کتاب صوتی' | 'ویدیو' | 'شورت' | 'مقاله' | 'مجموعه';
  status: 'Draft' | 'Review' | 'Published' | 'Restricted' | 'Archived';
  performance: string;
  reports: number;
};

export type AdminReport = {
  id: string;
  priority: 'High' | 'Medium' | 'Low';
  reason: string;
  item: string;
  reporter: string;
  status: 'Review' | 'Approved' | 'Rejected' | 'Resolved';
};

export type AdminDiscussion = {
  id: string;
  title: string;
  label: string;
  growth: string;
  health: string;
};

export type AdminSectionConfig = {
  key: AdminSectionKey;
  title: string;
  description: string;
  shortLabel: string;
};
