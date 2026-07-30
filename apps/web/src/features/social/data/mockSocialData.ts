import type { SocialComment, SocialDiscussion, SocialNotification, SocialReaction } from '../types/social.types';

export const mockReactionOptions: SocialReaction[] = [
  { type: 'like', count: 24, userReacted: true },
  { type: 'insightful', count: 8 },
  { type: 'interesting', count: 6 },
  { type: 'agree', count: 5 },
  { type: 'question', count: 3 },
  { type: 'love', count: 2 },
];

export const mockComments: SocialComment[] = [
  {
    id: 'comment-1',
    author: { id: 'u-1', name: 'سارا', handle: '@sara' },
    content: 'این لحظه برای من خیلی الهام‌بخش بود، مخصوصاً وقتی به نقش شنیدن در زندگی روزمره فکر می‌کنم.',
    createdAt: 'همین الان',
    reactions: mockReactionOptions,
    replies: [
      {
        id: 'reply-1',
        author: { id: 'u-2', name: 'نیلو', handle: '@nilo' },
        content: 'کاملاً درست؛ این نوع روایت، حس پیوستگی ایجاد می‌کند.',
        createdAt: '۵ دقیقه پیش',
        reactions: [{ type: 'like', count: 4, userReacted: true }],
      },
    ],
    sortMode: 'newest',
  },
  {
    id: 'comment-2',
    author: { id: 'u-3', name: 'مهراد', handle: '@mehrad' },
    content: 'برای من این بخش به‌خوبی نشان می‌دهد چه زمانی یک پادکست می‌تواند تبدیل به تجربه‌ی شخصی شود.',
    createdAt: '۱۰ دقیقه پیش',
    reactions: [{ type: 'like', count: 12, userReacted: false }],
    replies: [],
    sortMode: 'most-liked',
  },
];

export const mockDiscussions: SocialDiscussion[] = [
  {
    id: 'discussion-1',
    title: 'بحث لحظه‌ای در این بخش',
    description: 'جمعی از شنوندگان درگیر این روایت و برداشت‌های مختلف از آن هستند.',
    contextType: 'player',
    participants: [
      { id: 'u-1', name: 'سارا' },
      { id: 'u-2', name: 'نیلو' },
      { id: 'u-3', name: 'مهراد' },
    ],
    comments: mockComments,
    reactions: mockReactionOptions,
    relatedContent: { title: 'The Quiet Hour', subtitle: 'پادکست مشارکتی' },
  },
];

export const mockNotifications: SocialNotification[] = [
  {
    id: 'notification-1',
    type: 'social',
    title: 'پاسخ جدید',
    description: 'نیلو روی پاسخ شما در بحث لحظه‌ای نظر داد.',
    createdAt: '۳ دقیقه پیش',
    unread: true,
  },
  {
    id: 'notification-2',
    type: 'community',
    title: 'به‌روزرسانی بحث',
    description: 'بحثی که دنبال می‌کنید در حال حاضر فعالیت جدیدی دارد.',
    createdAt: '۱۲ دقیقه پیش',
  },
];

export const mockContributions = [
  { id: 'contrib-1', label: 'بحث‌های مشارکتی', value: '۴' },
  { id: 'contrib-2', label: 'نکات ذخیره‌شده', value: '۷' },
  { id: 'contrib-3', label: 'پاسخ‌های مفید', value: '۱۲' },
];
