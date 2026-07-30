'use client';

import { Bookmark, Compass, Sparkles, Users } from 'lucide-react';
import { useState } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CreatorBadge } from '@/components/design-system/identity/creator-badge';
import { MediaCard } from '@/components/design-system/media/media-card';
import { PageContainer } from '@/components/design-system/layout/page-container';
import { FollowButton } from '@/features/social/components/FollowButton';
import { UserActivityCard } from '@/features/social/components/UserActivityCard';
import { mockCreatorActivities, mockCreatorCollections, mockCreatorCommunities, mockCreatorContent, mockCreatorProfileData } from '../data/mockCreatorProfileData';
import type { CreatorContentType, CreatorMode } from '../types/creatorProfile.types';

type CreatorProfilePageProps = {
  mode?: CreatorMode;
};

function getContentTypeLabel(type: CreatorContentType) {
  const labels: Record<CreatorContentType, string> = {
    podcast: 'پادکست',
    audiobook: 'کتاب صوتی',
    video: 'ویدیو',
    short: 'کوتاه',
    article: 'مقاله',
    collection: 'مجموعه',
  };

  return labels[type];
}

export function CreatorProfilePage({ mode = 'viewer' }: CreatorProfilePageProps) {
  const [isFollowing, setIsFollowing] = useState(mockCreatorProfileData.isFollowing);

  const isOwner = mode === 'owner';
  const profile = mockCreatorProfileData;

  return (
    <main className="page-container" aria-labelledby="creator-profile-heading">
      <PageContainer>
        <section className="space-y-6">
          <div className="overflow-hidden rounded-[2rem] border border-border/80 bg-gradient-to-br from-accent/10 via-surface-secondary to-surface-card/90 shadow-soft">
            <div className="h-36 bg-[radial-gradient(circle_at_top_left,_rgba(127,86,255,0.24),_transparent_50%),linear-gradient(120deg,_rgba(255,255,255,0.04),_rgba(255,255,255,0.0))] sm:h-48" />
            <div className="px-4 pb-6 sm:px-6 lg:px-8">
              <div className="-mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                  <Avatar alt={profile.name} fallback={profile.name.charAt(0)} size="lg" className="border-4 border-surface-card" />
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <h1 id="creator-profile-heading" className="text-heading">{profile.name}</h1>
                      <CreatorBadge active>{profile.badge}</CreatorBadge>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-text-secondary">
                      <span>{profile.username}</span>
                      <span>•</span>
                      <span>{profile.category}</span>
                      <span>•</span>
                      <span>{profile.location}</span>
                    </div>
                    <p className="max-w-2xl text-sm leading-7 text-text-secondary">{profile.bio}</p>
                    <div className="flex flex-wrap gap-2">
                      {profile.topics.map((topic) => (
                        <span key={topic} className="rounded-full border border-border/70 bg-surface-card/80 px-3 py-1 text-xs font-medium text-text-secondary">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {isOwner ? (
                    <>
                      <Button type="button" variant="primary">ویرایش پروفایل</Button>
                      <Button type="button" variant="secondary">باز کردن استودیو</Button>
                      <Button type="button" variant="ghost">مدیریت محتوا</Button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => setIsFollowing((current) => !current)}
                        className="rounded-full border border-accent/30 bg-accent/10 px-3 py-2 text-sm font-semibold text-accent"
                      >
                        {isFollowing ? 'دنبال می‌کنم' : 'دنبال کردن'}
                      </button>
                      <FollowButton initialState={isFollowing ? 'following' : 'not-following'} className="rounded-full border border-border/70 bg-surface-card px-3 py-2 text-sm font-semibold text-text-primary" />
                      <Button type="button" variant="ghost">اشتراک‌گذاری</Button>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-8 grid gap-3 md:grid-cols-4">
                <MediaCard title="دنبال‌کننده" subtitle="مخاطب‌های فعال" meta="Audience" className="min-h-full">
                  <p className="text-sm font-semibold text-text-primary">{profile.followerCount.toLocaleString('fa-IR')}</p>
                </MediaCard>
                <MediaCard title="محتوای منتشرشده" subtitle="اپیزود و مجموعه" meta="Content" className="min-h-full">
                  <p className="text-sm font-semibold text-text-primary">{profile.totalContent.toLocaleString('fa-IR')}</p>
                </MediaCard>
                <MediaCard title="فعالیت جامعه" subtitle="بحث و تعامل" meta="Community" className="min-h-full">
                  <p className="text-sm font-semibold text-text-primary">{profile.communityActivity.toLocaleString('fa-IR')}</p>
                </MediaCard>
                <MediaCard title="سطح اعتماد" subtitle="در حال رشد" meta="Reputation" className="min-h-full">
                  <p className="text-sm font-semibold text-text-primary">{profile.reputationLevel}</p>
                </MediaCard>
              </div>
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-4">
              <MediaCard title="محتوای ویژه" subtitle="بخش‌های برجسته‌ی این برند" meta="Featured">
                <div className="space-y-3">
                  {mockCreatorContent.map((item) => (
                    <div key={item.id} className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-text-primary">{item.title}</p>
                          <p className="mt-1 text-sm text-text-secondary">{item.description}</p>
                        </div>
                        <div className="rounded-full border border-accent/20 bg-accent/10 px-2.5 py-1 text-[11px] font-semibold text-accent">
                          {item.accentLabel}
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-text-secondary">
                        <span>{getContentTypeLabel(item.type)}</span>
                        <span>•</span>
                        <span>{item.meta}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </MediaCard>

              <MediaCard title="مجموعه‌های سازمان‌دهی‌شده" subtitle="برای ساختن تجربه‌ی کشف بهتر" meta="Collections">
                <div className="grid gap-3 md:grid-cols-2">
                  {mockCreatorCollections.map((item) => (
                    <div key={item.id} className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                      <p className="text-sm font-semibold text-text-primary">{item.title}</p>
                      <p className="mt-1 text-sm text-text-secondary">{item.description}</p>
                      <div className="mt-3 flex items-center justify-between text-xs text-text-secondary">
                        <span>{item.contentCount} محتوا</span>
                        <span>{item.followers.toLocaleString('fa-IR')} دنبال‌کننده</span>
                      </div>
                    </div>
                  ))}
                </div>
              </MediaCard>

              <MediaCard title="فعالیت‌های اخیر" subtitle="رویدادهای عمومی برای مخاطب" meta="Activity">
                <UserActivityCard contributions={mockCreatorActivities.map((activity) => ({
                  id: activity.id,
                  label: activity.title,
                  value: activity.timestamp,
                  detail: activity.detail,
                }))} />
              </MediaCard>
            </div>

            <div className="space-y-4">
              <MediaCard title="جامعه‌ی سازنده" subtitle="فضای گفتگو و رشد" meta="Community">
                <div className="space-y-3">
                  {mockCreatorCommunities.map((community) => (
                    <div key={community.id} className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-text-primary">{community.title}</p>
                        <div className="rounded-full border border-border/70 bg-surface-card px-2.5 py-1 text-[11px] font-medium text-text-secondary">
                          {community.members.toLocaleString('fa-IR')} عضو
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-text-secondary">{community.pinned}</p>
                      <div className="mt-3 flex items-center justify-between text-xs text-text-secondary">
                        <span>{community.discussions} بحث</span>
                        <span className="inline-flex items-center gap-1 text-accent">
                          <Users className="h-3.5 w-3.5" />
                          فعال
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </MediaCard>

              <MediaCard title="نکات کلیدی" subtitle="درک سریع از این هویت" meta="Topics">
                <div className="flex flex-wrap gap-2">
                  {profile.topics.map((topic) => (
                    <span key={topic} className="rounded-full border border-border/70 bg-surface-secondary/80 px-3 py-1 text-xs font-medium text-text-secondary">
                      {topic}
                    </span>
                  ))}
                </div>
              </MediaCard>

              <MediaCard title="امکانات دنبال‌کردن" subtitle="برای رشد رابطه با مخاطب" meta="Follow">
                <div className="space-y-3">
                  <div className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                      <Compass className="h-4 w-4 text-accent" />
                      اعلان هنگام انتشار جدید
                    </div>
                    <p className="mt-2 text-sm text-text-secondary">مخاطب می‌تواند از اپیزودها، بحث‌ها و مجموعه‌ها باخبر شود.</p>
                  </div>
                  <div className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                      <Bookmark className="h-4 w-4 text-accent" />
                      تجربه‌ی دنبال‌کردن با حفظ هویت
                    </div>
                    <p className="mt-2 text-sm text-text-secondary">فقط برای نمایش، بدون قرارداد بک‌اند و بدون تغییر در runtime پخش.</p>
                  </div>
                </div>
              </MediaCard>

              <MediaCard title="پیش‌نمایش مخاطب" subtitle="چگونه تجربه‌ی صفحه دیده می‌شود" meta="Preview">
                <div className="rounded-[1rem] border border-dashed border-border/70 bg-surface-secondary/70 p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-accent/10 p-2 text-accent">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">صفحه‌ی عمومی سازنده</p>
                      <p className="mt-1 text-sm text-text-secondary">پروفایل، محتوا، جامعه و فعالیت در یک تجربه‌ی یکپارچه.</p>
                    </div>
                  </div>
                </div>
              </MediaCard>
            </div>
          </div>

          <div className="rounded-[2rem] border border-border/80 bg-surface-secondary/70 p-4 shadow-soft sm:p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-caption">تجربه‌ی عمومی سازنده</p>
                <h2 className="text-heading text-lg">هویت، دانش، جامعه و رشد در یک صفحه</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button type="button" variant="secondary">مشاهده‌ی صفحه‌ی عمومی</Button>
                <Button type="button" variant="ghost">پیوستن به جامعه</Button>
              </div>
            </div>
          </div>
        </section>
      </PageContainer>
    </main>
  );
}

export default CreatorProfilePage;
