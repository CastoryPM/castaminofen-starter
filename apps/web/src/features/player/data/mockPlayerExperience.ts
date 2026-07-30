import type { TimelineMarkerItem } from '../components/TimelineMarkers';
import type { PlayableItem } from '../types';

export type DiscussionSortMode = 'newest' | 'most-liked';

export interface DiscussionReply {
  id: string;
  author: string;
  role: 'listener' | 'creator';
  body: string;
  timestampLabel: string;
  likes: number;
  isCreatorResponse?: boolean;
}

export interface DiscussionThreadEntry {
  id: string;
  author: string;
  role: 'listener' | 'creator';
  body: string;
  timestampLabel: string;
  likes: number;
  replies: DiscussionReply[];
  createdAtLabel: string;
  participationLabel: string;
  isCreatorResponse?: boolean;
}

export interface BookmarkEntry {
  id: string;
  timestamp: number;
  note: string;
  createdAtLabel: string;
}

export interface HighlightEntry {
  id: string;
  title: string;
  quote?: string;
  note?: string;
  timestamp: number;
  sourceLabel: string;
}

export interface PersonalNoteEntry {
  id: string;
  title: string;
  body: string;
  pinned: boolean;
  updatedAtLabel: string;
}

export interface TranscriptSegment {
  id: string;
  time: number;
  text: string;
}

export interface MemoryCollectionItem {
  title: string;
  subtitle: string;
  count: number;
  accent: 'bookmark' | 'highlight' | 'note' | 'resume';
}

export interface PlayerExperienceViewModel {
  markers: TimelineMarkerItem[];
  discussionThreads: DiscussionThreadEntry[];
  bookmarks: BookmarkEntry[];
  highlights: HighlightEntry[];
  notes: PersonalNoteEntry[];
  transcriptSegments: TranscriptSegment[];
  creatorProfile: {
    name: string;
    subtitle: string;
    badge: string;
    followState: string;
    communityActivity: string;
    latestDiscussion: string;
    upcomingRelease: string;
    creatorNote: string;
  };
  relatedItems: Array<{
    title: string;
    subtitle: string;
    badge: string;
  }>;
  queueSuggestions: PlayableItem[];
}

function createTimelineMarkers(currentTimestamp: number): TimelineMarkerItem[] {
  return [
    { id: 'intro', label: 'معرفی', timestamp: 0, type: 'chapter', colorToken: 'accent', description: 'پیش‌زمینه و روایت کلی' },
    { id: 'idea', label: 'ایده اصلی', timestamp: 320, type: 'discussion', colorToken: 'sky', selected: currentTimestamp >= 320 && currentTimestamp < 640, description: 'بحث لحظه‌ای و مشارکت' },
    { id: 'bookmark', label: 'نکته کلیدی', timestamp: 1120, type: 'bookmark', colorToken: 'violet', description: 'نشانک شخصی برای بازگشت' },
    { id: 'highlight', label: 'هایلایت', timestamp: 1460, type: 'highlight', colorToken: 'amber', description: 'نقل‌قول مهم' },
    { id: 'recommendation', label: 'پیشنهاد بعدی', timestamp: 1880, type: 'recommendation', colorToken: 'emerald', description: 'محتوای مرتبط' },
  ];
}

export function getPlayerExperienceViewModel(currentTimestamp = 320): PlayerExperienceViewModel {
  return {
    markers: createTimelineMarkers(currentTimestamp),
    discussionThreads: [
      {
        id: 'thread-1',
        author: 'سارا رضایی',
        role: 'creator',
        body: 'این لحظه برای درک مسیر آموزشی خیلی مهم است؛ پیشنهاد می‌کنم قبل از ادامه، چند دقیقه رویش توقف کنید.',
        timestampLabel: '24:35',
        likes: 18,
        createdAtLabel: '۵ دقیقه قبل',
        participationLabel: '۲۱ نفر در این لحظه پاسخ دادند',
        isCreatorResponse: true,
        replies: [
          { id: 'reply-1', author: 'نیما', role: 'listener', body: 'خیلی دقیق بود، برای من نقطه‌ی عطفی بود.', timestampLabel: '۲ دقیقه قبل', likes: 4 },
          { id: 'reply-2', author: 'سارا رضایی', role: 'creator', body: 'ممنون، در نسخه‌ی بعدی این بخش به‌صورت خلاصه‌ی صوتی هم در دسترس می‌شود.', timestampLabel: '۱ دقیقه قبل', likes: 6, isCreatorResponse: true },
        ],
      },
      {
        id: 'thread-2',
        author: 'مریم',
        role: 'listener',
        body: 'به نظرم این مثال برای کارهای آینده کمک زیادی می‌کند؛ در حافظه‌ی شخصی هم ذخیره‌اش می‌کنم.',
        timestampLabel: '24:40',
        likes: 11,
        createdAtLabel: '۲ دقیقه قبل',
        participationLabel: '۱۲ نفر در این لحظه مشارکت کردند',
        replies: [
          { id: 'reply-3', author: 'آرمان', role: 'listener', body: 'من هم همین حس را داشتم.', timestampLabel: '۱ دقیقه قبل', likes: 2 },
        ],
      },
    ],
    bookmarks: [
      { id: 'bookmark-1', timestamp: 320, note: 'نکته‌ی مهم برای بازگشت', createdAtLabel: 'امروز' },
      { id: 'bookmark-2', timestamp: 1120, note: 'مثال کاربردی برای مطالعه‌ی بعدی', createdAtLabel: '۳ روز قبل' },
    ],
    highlights: [
      { id: 'highlight-1', title: 'نکته‌ی اصلی', quote: 'هر لحظه‌ی مهم، باید در حافظه‌ی شخصی ثبت شود.', timestamp: 320, sourceLabel: 'پادکست آموزشی', note: 'برای مرور بعدی' },
      { id: 'highlight-2', title: 'استراتژی بازگشت', quote: 'بازگشت سریع به تجربه، ارزش یادگیری را دوچندان می‌کند.', timestamp: 1460, sourceLabel: 'کتاب صوتی', note: 'برای خلاصه' },
    ],
    notes: [
      { id: 'note-1', title: 'یادداشت شخصی', body: 'در این بخش، از مثال‌های عملی برای ساختن نسخه‌ی بعدی استفاده کن.', pinned: true, updatedAtLabel: '۵ دقیقه قبل' },
      { id: 'note-2', title: 'نکته‌ی مرور', body: 'پس از اتمام، این لحظه را در لیست بازگشت‌ها نگه دار.', pinned: false, updatedAtLabel: '۲ ساعت قبل' },
    ],
    transcriptSegments: [
      { id: 's1', time: 0, text: 'معرفی و زمینه‌ی کلی این بخش برای بازسازی تجربه‌ی کاربر.' },
      { id: 's2', time: 320, text: 'در این لحظه، ایده‌ی اصلی درباره‌ی مشارکت و یادگیری لحظه‌ای مطرح می‌شود.' },
      { id: 's3', time: 1120, text: 'نکته‌ی پایانی برای حفظ و پیگیری بعدی در حافظه‌ی شخصی.' },
      { id: 's4', time: 1460, text: 'این بخش به‌عنوان هایلایت قابل‌یادآوری در فضای کاربر نگه‌داری می‌شود.' },
    ],
    creatorProfile: {
      name: 'سارا رضایی',
      subtitle: 'پادکست و آموزش',
      badge: 'دنبال می‌کنید',
      followState: '۱۸۳ دنبال‌کننده‌ی فعال',
      communityActivity: '۱۲۶ فعالیت اخیر',
      latestDiscussion: '۸ بحث تازه',
      upcomingRelease: 'سه‌شنبه ۲۰:۰۰',
      creatorNote: 'این لحظه برای درک کلی موضوع خیلی مهم است و در نسخه‌ی بعدی به‌صورت قابل‌پخش مستقیم در timeline درمی‌آید.',
    },
    relatedItems: [
      { title: 'جلسه‌ی آموزشی', subtitle: 'دنباله‌ی همین موضوع', badge: 'پیشنهاد' },
      { title: 'بحث جامعه', subtitle: 'گفت‌وگوی لحظه‌ای', badge: 'Community' },
      { title: 'مجموعه‌ی سازنده', subtitle: 'انتشارهای مرتبط', badge: 'Creator' },
    ],
    queueSuggestions: [
      { id: 'ep-2', title: 'جلسه‌ی بعدی', subtitle: 'پیشنهاد مرتبط', sourceType: 'episode' },
      { id: 'ep-3', title: 'بازخورد اجتماعی', subtitle: 'گفت‌وگو در جامعه', sourceType: 'episode' },
    ],
  };
}

export function getPlayerMemoryCollections(): MemoryCollectionItem[] {
  return [
    { title: 'نشانک‌ها', subtitle: 'لحظه‌های ذخیره‌شده برای بازگشت', count: 2, accent: 'bookmark' },
    { title: 'هایلایت‌ها', subtitle: 'نقل‌قول‌های مهم و قابل‌مرور', count: 2, accent: 'highlight' },
    { title: 'یادداشت‌ها', subtitle: 'نکات شخصی و یادآوری‌های خصوصی', count: 2, accent: 'note' },
    { title: 'ادامه‌ی پخش', subtitle: 'از ۱۸:۴۰ ادامه بده', count: 1, accent: 'resume' },
  ];
}
