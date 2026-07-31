'use client';

import { Compass, Sparkles, TrendingUp, Users, BookOpen, MessageCircleHeart, Flame, Bookmark, Share2, Plus, ChevronRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import { PageContainer } from '@/components/design-system/layout/page-container';
import { MediaCard } from '@/components/design-system/media/media-card';
import { DiscussionCard } from '@/components/design-system/social/discussion-card';
import { Tag } from '@/components/design-system/common/tag';
import { Avatar } from '@/components/design-system/identity/avatar';
import { usePlayerState } from '@/features/player/hooks/usePlayerState';
import { FollowButton } from '@/features/social/components/FollowButton';
import { ReactionBar } from '@/features/social/components/ReactionBar';
import { UserActivityCard } from '@/features/social/components/UserActivityCard';
import { mockCommunityContributions, mockCommunityCreators, mockCommunityDiscussions, mockCommunityTopics } from '../data/mockCommunityData';
import type { CommunityFeedMode, CommunityDiscussion } from '../types/community.types';

const feedTabs: Array<{ id: CommunityFeedMode; label: string; icon: React.ComponentType<{ className?: string }> }> = [
  { id: 'for-you', label: 'برای شما', icon: Sparkles },
  { id: 'trending', label: 'داغ', icon: Flame },
  { id: 'following', label: 'دنبال می‌کنم', icon: Users },
  { id: 'latest', label: 'جدیدترین', icon: Compass },
];

function getDiscussionFeedItems(mode: CommunityFeedMode, items: CommunityDiscussion[]) {
  if (mode === 'trending') {
    return items.filter((item) => item.feedMode.includes('trending'));
  }

  if (mode === 'following') {
    return items.filter((item) => item.feedMode.includes('following'));
  }

  if (mode === 'latest') {
    return items.filter((item) => item.feedMode.includes('latest'));
  }

  return items.filter((item) => item.feedMode.includes('for-you'));
}

export function CommunityHome() {
  const { currentItem } = usePlayerState();
  const [activeFeed, setActiveFeed] = useState<CommunityFeedMode>('for-you');

  const visibleDiscussions = useMemo(() => getDiscussionFeedItems(activeFeed, mockCommunityDiscussions), [activeFeed]);

  return (
    <main className="page-container" aria-labelledby="community-heading">
      <PageContainer>
        <section className="rounded-[2rem] border border-border/80 bg-gradient-to-br from-accent/10 via-surface-secondary to-surface-card/90 p-4 shadow-soft sm:p-6 lg:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-3">
              <Tag className="w-fit border-accent/20 bg-accent/10 text-accent">
                <Users className="ml-1 h-4 w-4" aria-hidden="true" />
                اجتماع
              </Tag>
              <h1 id="community-heading" className="text-heading">
                یک تجربه‌ی اجتماعی برای ادامه‌ی مسیر، مشارکت و بازگشت دوباره
              </h1>
              <p className="m-0 text-body">
                از لحظه‌های پخش تا موضوعات داغ، اینجا می‌توانید در کنار دیگران درباره‌ی ایده‌ها، صداها و تجربه‌ها هم‌فکری کنید و هویت مشارکتی خود را بسازید.
              </p>
            </div>
            <Tag className="w-fit border-border bg-surface-secondary/80 text-text-secondary">
              <Sparkles className="ml-1 h-4 w-4 text-accent" aria-hidden="true" />
              تجربه‌ی Premium
            </Tag>
          </div>

          <div className="mt-8 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-4">
              <div className="rounded-[1.35rem] border border-border/80 bg-surface-card/85 p-4 shadow-soft">
                <div className="flex flex-wrap items-center gap-2">
                  {feedTabs.map((tab) => {
                    const Icon = tab.icon;
                    const active = activeFeed === tab.id;

                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveFeed(tab.id)}
                        className={active ? 'rounded-full bg-accent/10 px-3 py-2 text-sm font-semibold text-accent' : 'rounded-full border border-border/70 px-3 py-2 text-sm text-text-secondary'}
                      >
                        <span className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          {tab.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-4 space-y-3">
                  {visibleDiscussions.map((discussion) => (
                    <DiscussionCard
                      key={discussion.id}
                      title={
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-text-primary">{discussion.title}</p>
                            <p className="mt-1 text-sm text-text-secondary">{discussion.description}</p>
                          </div>
                          <Tag className="w-fit border-border/70 bg-surface-secondary/70 text-text-secondary">{discussion.contextLabel}</Tag>
                        </div>
                      }
                      body={
                        <div className="space-y-3">
                          <div className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="text-sm font-semibold text-text-primary">{discussion.contentTitle}</p>
                                <p className="mt-1 text-sm text-text-secondary">{discussion.contentSubtitle}</p>
                              </div>
                              <div className="rounded-full border border-border/70 bg-surface-card px-2.5 py-1 text-[11px] font-medium text-text-secondary">
                                {discussion.activity}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            {discussion.tags.map((tag) => (
                              <Tag key={tag} className="border-border/70 bg-surface-secondary/70 text-text-secondary">
                                {tag}
                              </Tag>
                            ))}
                          </div>
                          <div className="flex items-center justify-between gap-3 rounded-[1rem] border border-border/70 bg-surface-card/70 p-3">
                            <div className="flex items-center gap-3">
                              <Avatar alt={discussion.authorName} fallback={discussion.authorName.charAt(0)} size="sm" />
                              <div>
                                <p className="text-sm font-semibold text-text-primary">{discussion.authorName}</p>
                                <p className="text-xs text-text-secondary">{discussion.creatorName}</p>
                              </div>
                            </div>
                            <FollowButton initialState={discussion.isJoined ? 'following' : 'not-following'} />
                          </div>
                        </div>
                      }
                      actions={
                        <div className="flex flex-wrap items-center gap-2">
                          <ReactionBar reactions={discussion.reactions} selectedType="like" className="flex-1" />
                          <button type="button" className="rounded-full border border-border/70 bg-surface-secondary/80 p-2 text-text-secondary">
                            <Bookmark className="h-4 w-4" />
                          </button>
                          <button type="button" className="rounded-full border border-border/70 bg-surface-secondary/80 p-2 text-text-secondary">
                            <Share2 className="h-4 w-4" />
                          </button>
                        </div>
                      }
                    >
                      <div className="space-y-3 rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <MessageCircleHeart className="h-4 w-4 text-accent" />
                            <span className="text-sm font-semibold text-text-primary">{discussion.commentsCount} نظر</span>
                          </div>
                          <span className="text-sm text-text-secondary">{discussion.participants.length} شرکت‌کننده</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {discussion.participants.map((participant) => (
                            <div key={participant.id} className="flex items-center gap-2 rounded-full border border-border/70 bg-surface-card px-2.5 py-1 text-xs text-text-secondary">
                              <Users className="h-3.5 w-3.5" />
                              {participant.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    </DiscussionCard>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <MediaCard title="لحظه‌ی فعلی پخش" subtitle={currentItem?.title ?? 'در حال انتخاب'} meta="اتصال به Player">
                <div className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                    <TrendingUp className="h-4 w-4 text-accent" />
                    به‌روزرسانی لحظه‌ی بحث برای این محتوا
                  </div>
                  <p className="mt-2 text-sm text-text-secondary">
                    اگر در این لحظه در Player توقف کرده باشید، می‌توانید از همین بخش وارد گفتگوی مرتبط با زمان فعلی شوید.
                  </p>
                </div>
              </MediaCard>

              <DiscussionCard title="موضوعات پرطرفدار" body="موضوعات جالبی که در جامعه رشد می‌کنند" actions={<Tag className="border-border bg-surface-secondary/80 text-text-secondary">کشف موضوعات</Tag>}>
                <div className="space-y-2">
                  {mockCommunityTopics.map((topic) => (
                    <div key={topic.id} className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-text-primary">{topic.title}</p>
                          <p className="mt-1 text-xs text-text-secondary">{topic.activeDiscussions}</p>
                        </div>
                        <Tag className="border-accent/20 bg-accent/10 text-accent">{topic.trendLabel}</Tag>
                      </div>
                      <div className="mt-2 flex items-center justify-between gap-3 text-xs text-text-secondary">
                        <span>{topic.followers} دنبال‌کننده</span>
                        <span>{topic.creators.join(' • ')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </DiscussionCard>

              <DiscussionCard title="سازندگان محبوب" body="کسانی که با بحث‌های خود، جامعه را زنده می‌کنند" actions={<Tag className="border-border bg-surface-secondary/80 text-text-secondary">Creator Communities</Tag>}>
                <div className="space-y-2">
                  {mockCommunityCreators.map((creator) => (
                    <div key={creator.id} className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <Avatar alt={creator.name} fallback={creator.name.charAt(0)} size="sm" />
                          <div>
                            <p className="text-sm font-semibold text-text-primary">{creator.name}</p>
                            <p className="text-xs text-text-secondary">{creator.handle}</p>
                          </div>
                        </div>
                        <FollowButton initialState="not-following" />
                      </div>
                      <p className="mt-2 text-sm text-text-secondary">{creator.focus}</p>
                      <div className="mt-2 flex items-center justify-between gap-2 text-xs text-text-secondary">
                        <span>{creator.followers} دنبال‌کننده</span>
                        <span>{creator.featuredDiscussion}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </DiscussionCard>

              <DiscussionCard title="چرا مشارکت کنیم؟" body="با دیدن ارزش مشارکت، مسیرهای کوتاه و قابل فهم برای بازگشت به بحث‌های فعال و موضوعات داغ مشخص می‌شود." actions={<Tag className="border-border bg-surface-secondary/80 text-text-secondary">Retention</Tag>}>
                <div className="space-y-3 rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                  <p className="text-sm font-semibold text-text-primary">مشارکت در جامعه، در واقع بازگشت به مسیرهای الهام‌بخش و دانشی است.</p>
                  <p className="text-sm text-text-secondary">در هر بار ورود، یک سؤال تازه، یک موضوع داغ یا یک نگاه حرفه‌ای برای رشد شما در دسترس است و به شما نشان می‌دهد که حضور شما در Castaminofen به‌مرور شکل می‌گیرد.</p>
                </div>
              </DiscussionCard>

              <DiscussionCard title="سهم شما در جامعه" body="نشان‌دهنده‌ی مشارکت و رشد شما" actions={<Tag className="border-border bg-surface-secondary/80 text-text-secondary">مشارکت</Tag>}>
                <UserActivityCard contributions={mockCommunityContributions} />
              </DiscussionCard>
            </div>
          </div>

          <div className="mt-6 rounded-[1.35rem] border border-border/80 bg-surface-card/85 p-4 shadow-soft">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-text-primary">مشاهده‌ی تجربه‌ی آینده‌ی Community</p>
                <p className="mt-1 text-sm text-text-secondary">یادداشت‌ها، خلاصه‌های جمعی، و مجموعه‌های موضوعی برای مرحله‌ی بعد آماده‌اند.</p>
              </div>
              <button type="button" className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface-secondary/80 px-3 py-2 text-sm font-semibold text-text-secondary">
                <Plus className="h-4 w-4" />
                ایجاد بحث جدید
              </button>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {[
                { title: 'Community Notes', body: 'یادداشت‌های مشترک حول محتوا' },
                { title: 'Discussion Highlights', body: 'نکات ارزشمند از نظرات' },
                { title: 'Collections', body: 'مجموعه‌های موضوعی برای کشف' },
              ].map((item) => (
                <div key={item.title} className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                    <BookOpen className="h-4 w-4 text-accent" />
                    {item.title}
                  </div>
                  <p className="mt-2 text-sm text-text-secondary">{item.body}</p>
                  <button type="button" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                    مطالعه بیشتر <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </PageContainer>
    </main>
  );
}
