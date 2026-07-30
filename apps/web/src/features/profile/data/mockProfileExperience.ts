import type { ProfileExperienceData } from '../types/profile.types';

export const mockProfileExperience: ProfileExperienceData = {
  profile: {
    id: 'profile-1',
    displayName: 'علی محمدی',
    username: '@ali.mohammadi',
    bio: 'به دنبال ایده‌های روشن، پادکست‌های عمیق و لحظه‌های یادماندنی در مسیر یادگیری.',
    verified: true,
    status: 'Voices of thoughtful listening',
    followers: 1840,
    following: 322,
    contributionLevel: 'Insightful Member',
    favoriteTopics: ['فناوری', 'روانشناسی', 'کارآفرینی', 'تاریخ'],
    joinedAt: '2023-01-15T00:00:00.000Z',
    isFollowing: false,
  },
  stats: [
    { id: 'hours', label: 'ساعت گوش دادن', value: '128h', detail: 'در مسیر یادگیری' },
    { id: 'completed', label: 'محتوای تکمیل‌شده', value: '47', detail: 'از تجربه‌های مورد علاقه' },
    { id: 'moments', label: 'لحظه‌های ذخیره‌شده', value: '21', detail: 'برای بازبینی بعدی' },
    { id: 'discussions', label: 'بحث‌های عضو شده', value: '14', detail: 'در جوامع فعال' },
    { id: 'bookmarks', label: 'نشانک‌ها', value: '89', detail: 'از یادداشت‌های ارزشمند' },
    { id: 'highlights', label: 'هایلایت‌ها', value: '36', detail: 'در مسیر شناخت' },
  ],
  memories: [
    { id: 'moment-1', title: 'لحظه‌ی یادماندنی از Atomic Habits', detail: '۱:۴۲ بعد از شروع', kind: 'moment' },
    { id: 'moment-2', title: 'هایلایت از گفتگوی AI Trends', detail: 'نکته‌ی کلیدی برای آینده', kind: 'highlight' },
    { id: 'moment-3', title: 'یادداشت شخصی درباره‌ی کارآفرینی', detail: 'برای مرور در پایان هفته', kind: 'note' },
  ],
  collections: [
    { id: 'collection-1', title: 'کتاب‌هایی که ذهنم را تغییر دادند', description: 'مجموعه‌ی یادگیری عمیق', count: 8, accent: 'from-accent/20 to-accent/5' },
    { id: 'collection-2', title: 'پادکست‌های مورد علاقه', description: 'برای گوش دادن دوباره', count: 12, accent: 'from-surface-secondary to-surface-card' },
    { id: 'collection-3', title: 'نقشه‌ی یادگیری', description: 'برنامه‌ی رشد شخصی', count: 5, accent: 'from-success/15 to-transparent' },
  ],
  activities: [
    { id: 'activity-1', label: 'لحظه‌ای از Atomic Habits ذخیره شد', value: 'امروز', detail: 'برای بازبینی بعدی' },
    { id: 'activity-2', label: 'در بحث AI Trends شرکت کرد', value: 'دیروز', detail: '۵ نظر ثبت شد' },
    { id: 'activity-3', label: 'یک پادکست جدید دنبال شد', value: '۳ روز پیش', detail: 'از یک خالق مورد علاقه' },
  ],
  contributions: [
    { id: 'contrib-1', label: 'بحث‌های شروع‌شده', description: '۳ بحث فعال و ارزشمند' },
    { id: 'contrib-2', label: 'نظرات مفید', description: '۲۴ بازخورد در جوامع' },
    { id: 'contrib-3', label: 'پاسخ‌های کمک‌کننده', description: '۱۲ واکنش مثبت از دیگران' },
  ],
  socialGroups: [
    { id: 'people', title: 'افراد', items: ['سعید', 'نازنین', 'آرمان'] },
    { id: 'creators', title: 'سازندگان', items: ['James Clear', 'Lex Fridman'] },
    { id: 'topics', title: 'موضوعات', items: ['هوش مصنوعی', 'روانشناسی', 'توسعه شخصی'] },
  ],
  interests: ['فناوری', 'روانشناسی', 'کارآفرینی', 'تاریخ', 'علوم'],
  content: [
    { id: 'content-1', title: 'اخیراً پخش شده', subtitle: 'Atomic Habits', meta: '۲۹ دقیقه' },
    { id: 'content-2', title: 'سازندگان مورد علاقه', subtitle: 'James Clear', meta: 'پادکست‌ساز' },
    { id: 'content-3', title: 'دسته‌بندی‌های محبوب', subtitle: 'توسعه شخصی', meta: '۳۲ درصد' },
  ],
};
