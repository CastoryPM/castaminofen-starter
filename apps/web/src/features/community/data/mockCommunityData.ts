import type { CommunityContribution, CommunityCreator, CommunityDiscussion, CommunityTopic } from '../types/community.types';

export const mockCommunityDiscussions: CommunityDiscussion[] = [
  {
    id: 'discussion-1',
    title: 'بحث داغ درباره‌ی لحظه‌ی 42:35',
    description: 'شنوندگان در این لحظه درباره‌ی روایت، پیام و تاثیر روایت بر تجربه‌ی شنیدن تبادل نظر می‌کنند.',
    contextLabel: 'اپیزود جامعه',
    contentTitle: 'The Future of Listening',
    contentSubtitle: 'نویسنده و تهیه‌کننده',
    creatorName: 'آرمان نژاد',
    authorName: 'سارا مهدوی',
    participants: [{ id: 'p1', name: 'نیلوفر' }, { id: 'p2', name: 'امیر' }, { id: 'p3', name: 'مینا' }],
    commentsCount: 152,
    reactions: [
      { type: 'like', count: 84, userReacted: true },
      { type: 'insightful', count: 42 },
      { type: 'question', count: 26 },
    ],
    activity: '۵ دقیقه قبل',
    tags: ['پادکست', 'تجربه', 'لحظه'],
    isJoined: true,
    isSaved: true,
    contextType: 'episode',
    feedMode: ['for-you', 'trending', 'latest'],
  },
  {
    id: 'discussion-2',
    title: 'فصل‌های داغ کتاب برای گفت‌وگوی مشترک',
    description: 'این بحث برای کسانی است که می‌خواهند از یک فصل، ایده و تجربه‌ی خواندن هم‌فکری کنند.',
    contextLabel: 'بحث فصل',
    contentTitle: 'The Long View',
    contentSubtitle: 'فصل ۶ • کتاب',
    creatorName: 'مریم طلایی',
    authorName: 'رضا احمدی',
    participants: [{ id: 'p4', name: 'پریسا' }, { id: 'p5', name: 'آرین' }],
    commentsCount: 79,
    reactions: [
      { type: 'agree', count: 54 },
      { type: 'love', count: 27 },
      { type: 'interesting', count: 18 },
    ],
    activity: '۲۳ دقیقه قبل',
    tags: ['کتاب', 'آموزش', 'فصل'],
    contextType: 'book',
    feedMode: ['for-you', 'following', 'latest'],
  },
  {
    id: 'discussion-3',
    title: 'جمع‌بندی سریع از ویدیوهای آموزشی',
    description: 'در این بحث، نکات کلیدی و سوال‌های پرتکرار حول ویدیوهای آموزشی به اشتراک گذاشته می‌شود.',
    contextLabel: 'گفتگوی ویدیو',
    contentTitle: 'Designing Better Stories',
    contentSubtitle: 'ویدیو آموزشی',
    creatorName: 'لیلا کوهستانی',
    authorName: 'هومن شریفی',
    participants: [{ id: 'p6', name: 'النا' }, { id: 'p7', name: 'کیا' }],
    commentsCount: 41,
    reactions: [
      { type: 'insightful', count: 33 },
      { type: 'question', count: 21 },
    ],
    activity: '۱ ساعت قبل',
    tags: ['ویدیو', 'آموزش', 'یادگیری'],
    contextType: 'video',
    feedMode: ['trending', 'following', 'latest'],
  },
];

export const mockCommunityTopics: CommunityTopic[] = [
  {
    id: 'topic-1',
    title: 'فناوری',
    followers: '۱۲k',
    activeDiscussions: '۳۳ بحث فعال',
    trendLabel: 'در حال رشد',
    creators: ['Ali Chen', 'Niloofar'],
  },
  {
    id: 'topic-2',
    title: 'علم',
    followers: '۸.4k',
    activeDiscussions: '۲۱ بحث فعال',
    trendLabel: 'پرطرفدار',
    creators: ['Dr. Mina', 'Samir'],
  },
  {
    id: 'topic-3',
    title: 'کتاب',
    followers: '۶.7k',
    activeDiscussions: '۱۷ بحث فعال',
    trendLabel: 'در حال رشد',
    creators: ['Mona', 'Armin'],
  },
];

export const mockCommunityCreators: CommunityCreator[] = [
  {
    id: 'creator-1',
    name: 'آرمان نژاد',
    handle: '@arman',
    focus: 'پادکست و روایت',
    followers: '۲۳k',
    featuredDiscussion: 'بحث لحظه‌ی 42:35',
  },
  {
    id: 'creator-2',
    name: 'لیلا کوهستانی',
    handle: '@lila',
    focus: 'آموزش و ویدیو',
    followers: '۱۲k',
    featuredDiscussion: 'گفتگوی ویدیوهای آموزشی',
  },
];

export const mockCommunityContributions: CommunityContribution[] = [
  { id: 'contrib-1', label: 'بحث‌های ایجادشده', value: '۱۴', detail: 'در ۳۰ روز اخیر' },
  { id: 'contrib-2', label: 'نظرات نوشته‌شده', value: '۱۲۰', detail: 'در مباحث فعال' },
  { id: 'contrib-3', label: 'پاسخ‌های مفید', value: '۳۶', detail: 'به‌عنوان Insightful' },
];
