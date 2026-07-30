import type { CreatorContentItem, CreatorDraftItem, CreatorVersionItem } from '../types/publishing.types';

export const mockCreatorContentItems: CreatorContentItem[] = [
  {
    id: 'episode-12',
    title: 'اپیزود ۱۲',
    type: 'پادکست',
    status: 'published',
    updatedAt: 'امروز',
    visibility: 'public',
    summary: 'بخش تازه‌ی سری آموزش هوش مصنوعی با تمرکز بر تجربه‌ی عملی.',
    artworkLabel: 'پادکست',
    lifecycle: 'منتشر شده',
    progress: 100,
  },
  {
    id: 'season-brief',
    title: 'خلاصه فصل',
    type: 'دورهمی',
    status: 'draft',
    updatedAt: '۲ ساعت پیش',
    visibility: 'followers',
    summary: 'پیش‌نویس جمع‌بندی فصل با متن و پوستر آماده.',
    artworkLabel: 'در حال آماده‌سازی',
    lifecycle: 'پیش‌نویس',
    progress: 72,
  },
  {
    id: 'workshop',
    title: 'کارگاه زنده',
    type: 'برنامه زنده',
    status: 'published',
    updatedAt: 'فردا',
    visibility: 'public',
    summary: 'زمان‌بندی‌شده برای انتشار در ساعت ۲۰:۰۰.',
    artworkLabel: 'زمان‌بندی',
    lifecycle: 'زمان‌بندی شده',
    progress: 86,
  },
  {
    id: 'bonus-clip',
    title: 'کلیپ بونوس',
    type: 'کلیپ',
    status: 'processing',
    updatedAt: '۳ روز پیش',
    visibility: 'private',
    summary: 'در حال تبدیل به نسخه‌ی نهایی با زیرنویس.',
    artworkLabel: 'پردازش',
    lifecycle: 'در حال پردازش',
    progress: 58,
  },
  {
    id: 'season-archive',
    title: 'فصل ۱',
    type: 'سری',
    status: 'archived',
    updatedAt: 'هفته پیش',
    visibility: 'public',
    summary: 'بایگانی‌شده و قابل بازگشایی برای مخاطبان.',
    artworkLabel: 'بایگانی',
    lifecycle: 'بایگانی شده',
    progress: 100,
  },
];

export const mockCreatorDrafts: CreatorDraftItem[] = [
  {
    id: 'draft-1',
    title: 'اپیزود نیاز به پوستر دارد',
    completion: 76,
    lastSaved: '۵ دقیقه پیش',
    warning: 'توضیحات را تکمیل کن تا انتشار حرفه‌ای‌تر شود.',
  },
  {
    id: 'draft-2',
    title: 'برچسب‌های فصل هنوز تکمیل نشده‌اند',
    completion: 61,
    lastSaved: '۲۵ دقیقه پیش',
    warning: 'دسته‌بندی و متادیتا را برای انتشار کامل اضافه کن.',
  },
];

export const mockCreatorVersions: CreatorVersionItem[] = [
  {
    id: 'v1',
    label: 'نسخه ۱',
    summary: 'نسخه اصلی با صدای اولیه',
    detail: 'آپلود اولیه و ساختار روایت ساده.',
  },
  {
    id: 'v2',
    label: 'نسخه ۲',
    summary: 'بهبود کیفیت صدا',
    detail: 'مقدمه‌ی جدید و ویرایش بهتر برای تجربه‌ی شنیداری.',
  },
];
