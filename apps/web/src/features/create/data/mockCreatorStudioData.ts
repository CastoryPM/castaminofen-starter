import type { CreatorAnalyticsSnapshot, CreatorContentType, CreatorDraft, CreatorStudioPreview } from '../types/creator.types';

export const mockContentTypes: CreatorContentType[] = [
  {
    id: 'podcast',
    title: 'پادکست',
    description: 'اشتراک‌گذاری گفت‌وگو، روایت و دانش',
    audience: 'شنوندگان علاقه‌مند به تجربه‌ی عمیق',
    format: 'آهنگ/صدا + فصل + اپیزود',
  },
  {
    id: 'audiobook',
    title: 'کتاب صوتی',
    description: 'تحویل تجربه‌ی داستانی و آموزشی در قالب صوتی',
    audience: 'کاربران در حال حرکت',
    format: 'فصل، بخش و رویداد',
  },
  {
    id: 'video',
    title: 'ویدیو',
    description: 'خلق تجربه‌ی تصویری و آموزشی برای مخاطب',
    audience: 'مخاطبان علاقه‌مند به دیده‌شدن',
    format: 'ویدیو، صحنه و زیرنویس',
  },
  {
    id: 'short',
    title: 'کوتاه',
    description: 'نسخه‌ی سریع، قابل‌اشتراک و پرانرژی',
    audience: 'مخاطب سریع و پویا',
    format: 'کپشن، CTA و زنجیره‌ی انتشار',
  },
  {
    id: 'article',
    title: 'مقاله / متن',
    description: 'ساخت دانش و روایت در قالب مدرن',
    audience: 'مخاطبان علاقه‌مند به مطالعه',
    format: 'متن، تیتر و لینک‌های مرتبط',
  },
  {
    id: 'collection',
    title: 'مجموعه',
    description: 'سازمان‌دهی تجربه‌های مرتبط در یک مسیر آموزشی',
    audience: 'مخاطبان با علاقه‌ی عمیق',
    format: 'سری، فصل و مسیر',
  },
  {
    id: 'discussion',
    title: 'بحث جامعه',
    description: 'حس کنش‌پذیری و گفتگو در کنار محتوا',
    audience: 'مخاطبان فعال و پرشور',
    format: 'موضوعات، پین‌شده و دعوت',
  },
];

export const mockDrafts: CreatorDraft[] = [
  {
    id: 'draft-1',
    title: 'فصل جدید: اصول ساختن تجربه‌ی شنیداری',
    status: 'Draft',
    updatedAt: '۲ ساعت پیش',
    type: 'پادکست',
  },
  {
    id: 'draft-2',
    title: 'اپیزود هفت: روایت از ساختن هویت سازنده',
    status: 'Processing',
    updatedAt: '۴ ساعت پیش',
    type: 'اپیزود',
  },
  {
    id: 'draft-3',
    title: 'مجموعه‌ی یادگیری AI برای شروع',
    status: 'Published',
    updatedAt: 'دیروز',
    type: 'مجموعه',
  },
];

export const mockAnalytics: CreatorAnalyticsSnapshot = {
  views: 18240,
  listeners: 10890,
  completionRate: '78%',
  engagement: '+18%',
  comments: 324,
  followersGained: 142,
};

export const mockPreviews: CreatorStudioPreview[] = [
  {
    id: 'player',
    label: 'پیش‌نمایش Player',
    description: 'نحوه‌ی تجربه‌ی شنیدن و تعامل در Player',
  },
  {
    id: 'community',
    label: 'پیش‌نمایش مخاطب',
    description: 'چشم‌انداز بحث، دنبال‌کننده و جامعه',
  },
  {
    id: 'profile',
    label: 'هویت سازنده',
    description: 'شخصی‌سازی برند و حضور در پروفایل',
  },
];
