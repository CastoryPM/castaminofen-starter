import type { CreatorActivityItem, CreatorCollectionItem, CreatorCommunityItem, CreatorContentItem, CreatorProfileData } from '../types/creatorProfile.types';

export const mockCreatorProfileData: CreatorProfileData = {
  id: 'creator-1',
  name: 'آرمان نژاد',
  username: '@arman-n',
  badge: 'Knowledge Creator',
  bio: 'سازنده‌ی برنامه‌های آموزشی درباره‌ی پادکست، هوش مصنوعی و ساختن هویت حرفه‌ای در رسانه‌های جدید.',
  category: 'پادکست و آموزش',
  location: 'تهران، ایران',
  followerCount: 18240,
  totalContent: 84,
  communityActivity: 128,
  discussionsStarted: 37,
  engagement: 94,
  reputationLevel: 'Trusted Creator',
  isFollowing: false,
  topics: ['هوش مصنوعی', 'پادکست', 'آموزش', 'مهارت‌های حرفه‌ای'],
};

export const mockCreatorContent: CreatorContentItem[] = [
  {
    id: 'content-1',
    title: 'آینده‌ی AI در پادکست‌های روزانه',
    description: 'اپیزود اختصاصی درباره‌ی مسیر رشد و تجربه‌ی شنیدن در عصر هوش مصنوعی.',
    type: 'podcast',
    meta: '۱۲ دقیقه قبل',
    accentLabel: 'Featured',
  },
  {
    id: 'content-2',
    title: 'مسیر یادگیری حرفه‌ای برای سازندگان',
    description: 'مجموعه‌ای از نکات کاربردی برای ساختن هویت و مخاطب.',
    type: 'collection',
    meta: '۱ روز قبل',
    accentLabel: 'Series',
  },
  {
    id: 'content-3',
    title: 'چرا روایت شخصی اعتماد می‌سازد',
    description: 'کوتاه و کاربردی برای کسانی که می‌خواهند صدایشان ماندگار شود.',
    type: 'short',
    meta: '۳ روز قبل',
    accentLabel: 'Popular',
  },
];

export const mockCreatorCollections: CreatorCollectionItem[] = [
  {
    id: 'collection-1',
    title: 'AI Learning Path',
    description: 'راهی برای فهم عمیق‌تر از ابزارها و کاربردهای هوش مصنوعی.',
    contentCount: 12,
    followers: 5400,
  },
  {
    id: 'collection-2',
    title: 'Best Business Podcasts',
    description: 'انتخاب‌های من برای رشد فکری و حرفه‌ای.',
    contentCount: 9,
    followers: 3200,
  },
];

export const mockCreatorCommunities: CreatorCommunityItem[] = [
  {
    id: 'community-1',
    title: 'پادکست و روایت',
    members: 1840,
    discussions: 22,
    pinned: 'چطور یک اپیزود را به‌صورت حرفه‌ای معرفی کنیم؟',
  },
  {
    id: 'community-2',
    title: 'فناوری و آموزش',
    members: 1210,
    discussions: 14,
    pinned: 'بهترین ابزارهای یادگیری در سال ۲۰۲۶',
  },
];

export const mockCreatorActivities: CreatorActivityItem[] = [
  {
    id: 'activity-1',
    title: 'منتشر شد: آینده‌ی AI در پادکست‌های روزانه',
    detail: 'یک اپیزود جدید برای مخاطبانی که دنبال روایت‌های عمیق هستند.',
    timestamp: '۱۲ دقیقه قبل',
    kind: 'published',
  },
  {
    id: 'activity-2',
    title: 'ایجاد شد: AI Learning Path',
    detail: 'مجموعه‌ای از منابع و اپیزودها برای روند یادگیری بهتر.',
    timestamp: '۱ روز قبل',
    kind: 'created',
  },
  {
    id: 'activity-3',
    title: 'پاسخ داده شد به بحث جامعه',
    detail: 'در مورد ساختن هویت صوتی برای مخاطب‌های جدید.',
    timestamp: '۳ روز قبل',
    kind: 'replied',
  },
];
