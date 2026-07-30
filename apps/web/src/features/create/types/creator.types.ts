export type ContentTypeId = 'podcast' | 'audiobook' | 'video' | 'short' | 'article' | 'collection' | 'discussion';

export type CreatorContentType = {
  id: ContentTypeId;
  title: string;
  description: string;
  audience: string;
  format: string;
};

export type CreatorDraftStatus = 'Draft' | 'Processing' | 'Published' | 'Archived';

export type CreatorDraft = {
  id: string;
  title: string;
  status: CreatorDraftStatus;
  updatedAt: string;
  type: string;
};

export type CreatorAnalyticsSnapshot = {
  views: number;
  listeners: number;
  completionRate: string;
  engagement: string;
  comments: number;
  followersGained: number;
};

export type CreatorStudioPreview = {
  id: string;
  label: string;
  description: string;
};
