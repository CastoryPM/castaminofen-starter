import type { AdminContentItem, AdminCreator, AdminDiscussion, AdminMetric, AdminReport, AdminUser } from '../types/admin.types';

export const adminSectionConfig = [
  { key: 'overview', title: 'داشبورد', description: 'نمای کلی فعالیت و سلامت پلتفرم', shortLabel: 'Overview' },
  { key: 'users', title: 'کاربران', description: 'مدیریت کاربران و وضعیت حساب‌ها', shortLabel: 'Users' },
  { key: 'creators', title: 'سازندگان', description: 'نظارت بر رشد و اعتبار سازندگان', shortLabel: 'Creators' },
  { key: 'content', title: 'محتوا', description: 'کنترل انتشار و وضعیت محتوایی', shortLabel: 'Content' },
  { key: 'community', title: 'جامعه', description: 'رصد رشد گفتگو و نشانه‌های مخاطب', shortLabel: 'Community' },
  { key: 'reports', title: 'گزارش‌ها', description: 'گردش کار بررسی و پاسخ به گزارش‌ها', shortLabel: 'Reports' },
  { key: 'analytics', title: 'تحلیل‌ها', description: 'بینش رشد، تعامل و عملکرد', shortLabel: 'Analytics' },
  { key: 'settings', title: 'تنظیمات', description: 'پیکربندی تجربه و کنترل قابلیت‌ها', shortLabel: 'Settings' },
  { key: 'system', title: 'سیستم', description: 'وضعیت عملکرد و راه‌اندازی‌های آینده', shortLabel: 'System' },
] as const;

export const adminOverviewMetrics: AdminMetric[] = [
  { label: 'کاربران', value: '128K', detail: '+12.4% رشد ماهانه', tone: 'accent' },
  { label: 'فعالیت روزانه', value: '42K', detail: 'پخش و تعامل در حال افزایش', tone: 'success' },
  { label: 'نرخ نگه‌داشت', value: '86%', detail: 'مبتنی بر بازگشت هفتگی', tone: 'accent' },
  { label: 'گزارش‌های در انتظار', value: '18', detail: 'نیازمند بررسی سریع', tone: 'warning' },
];

export const adminUsers: AdminUser[] = [
  { id: 'u1', name: 'آرمان نوری', identity: 'مخاطب پرشور', joinedAt: '۱۴۰۳/۰۸/۰۵', activity: '۳ پخش امروز', followers: 1840, contentCount: 5, status: 'verified' },
  { id: 'u2', name: 'سارا عرفانی', identity: 'سازنده تازه‌وارد', joinedAt: '۱۴۰۳/۰۹/۱۱', activity: '۲ بحث فعال', followers: 612, contentCount: 3, status: 'active' },
  { id: 'u3', name: 'مهدی معینی', identity: 'کاربر پرخطر', joinedAt: '۱۴۰۳/۰۷/۲۲', activity: '۱ گزارش باز', followers: 120, contentCount: 1, status: 'restricted' },
];

export const adminCreators: AdminCreator[] = [
  { id: 'c1', name: 'نیلوفر جاهد', level: 'Level 4', followers: 25400, contentCount: 48, engagement: '7.8%', impact: 'جامعه پررونق', status: 'verified' },
  { id: 'c2', name: 'پارسا قلی‌پور', level: 'Level 3', followers: 11800, contentCount: 24, engagement: '6.4%', impact: 'رشد مداوم', status: 'review' },
  { id: 'c3', name: 'شکیبا احمدی', level: 'Level 2', followers: 6900, contentCount: 12, engagement: '5.1%', impact: 'در حال تثبیت', status: 'pending' },
];

export const adminContent: AdminContentItem[] = [
  { id: 'm1', title: 'چرخه‌های معرفت در عصر دیجیتال', creator: 'نیلوفر جاهد', type: 'پادکست', status: 'Published', performance: '۵۶۰۰ گوش', reports: 0 },
  { id: 'm2', title: 'کتاب صوتی شب‌های روشن', creator: 'شکیبا احمدی', type: 'کتاب صوتی', status: 'Review', performance: '۲۳۴۰ گوش', reports: 1 },
  { id: 'm3', title: 'نکات اجرایی برای رشد', creator: 'پارسا قلی‌پور', type: 'ویدیو', status: 'Restricted', performance: '۱۷۸۰ بازدید', reports: 4 },
];

export const adminReports: AdminReport[] = [
  { id: 'r1', priority: 'High', reason: 'محتوای نامناسب', item: 'اپیزود رشد', reporter: 'سارا', status: 'Review' },
  { id: 'r2', priority: 'Medium', reason: 'رفتار تهاجمی', item: 'بحث جامعه', reporter: 'آرمان', status: 'Approved' },
  { id: 'r3', priority: 'Low', reason: 'تکرار محتوای مشابه', item: 'مجموعه آموزشی', reporter: 'مهدی', status: 'Resolved' },
];

export const adminDiscussions: AdminDiscussion[] = [
  { id: 'd1', title: 'بهترین مسیر برای رشد', label: 'مباحث پررونق', growth: '+18%', health: 'قوی' },
  { id: 'd2', title: 'تجربه پخش همراه', label: 'بحث‌های مداوم', growth: '+9%', health: 'سالم' },
  { id: 'd3', title: 'نقاط سرد در جامعه', label: 'نشانه‌های هشدار', growth: '-4%', health: 'نیازمند پایش' },
];
