export type AdminGovernanceSectionKey = 'governance' | 'moderation' | 'content-review' | 'creator-review' | 'trust' | 'audit' | 'alerts' | 'safety' | 'roles' | 'operations';

export type AdminGovernanceMetric = {
  label: string;
  value: string;
  detail: string;
  tone?: 'accent' | 'success' | 'warning' | 'neutral';
};

export type AdminModerationItem = {
  id: string;
  entity: string;
  actor: string;
  reason: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'Reviewing' | 'Approved' | 'Rejected' | 'Resolved';
  createdAt: string;
};

export type AdminContentReviewItem = {
  id: string;
  title: string;
  creator: string;
  category: string;
  reports: number;
  visibility: 'Visible' | 'Review' | 'Hidden';
  type: 'Podcast' | 'Audiobook' | 'Video' | 'Short' | 'Article' | 'Discussion';
};

export type AdminCreatorReviewItem = {
  id: string;
  identity: string;
  quality: string;
  audience: string;
  reputation: 'High' | 'Medium' | 'Watch';
  communityImpact: string;
  status: 'Review' | 'Verify' | 'Flag';
};

export type AdminTrustUser = {
  id: string;
  name: string;
  activity: string;
  reports: number;
  contributions: string;
  behavior: string;
};

export type AdminAuditEvent = {
  id: string;
  actor: string;
  action: string;
  target: string;
  time: string;
};

export type AdminPlatformAlert = {
  id: string;
  title: string;
  detail: string;
  severity: 'Low' | 'Medium' | 'High';
};

export type AdminTrustHealthMetric = {
  label: string;
  value: string;
  detail: string;
};

export type AdminRolePreview = {
  id: string;
  role: string;
  scope: string;
};

export type AdminOperationsTask = {
  id: string;
  title: string;
  detail: string;
  status: 'Pending' | 'In review' | 'Ready';
};
