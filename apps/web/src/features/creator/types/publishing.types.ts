export type CreatorContentTab = 'all' | 'published' | 'drafts' | 'scheduled' | 'processing' | 'archived';

export type CreatorContentStatus = 'idea' | 'draft' | 'review' | 'processing' | 'published' | 'updated' | 'archived';

export type CreatorVisibility = 'public' | 'followers' | 'private';

export interface CreatorContentItem {
  id: string;
  title: string;
  type: string;
  status: CreatorContentStatus;
  updatedAt: string;
  visibility: CreatorVisibility;
  summary: string;
  artworkLabel: string;
  lifecycle: string;
  progress?: number;
}

export interface CreatorDraftItem {
  id: string;
  title: string;
  completion: number;
  lastSaved: string;
  warning: string;
}

export interface CreatorVersionItem {
  id: string;
  label: string;
  summary: string;
  detail: string;
}
