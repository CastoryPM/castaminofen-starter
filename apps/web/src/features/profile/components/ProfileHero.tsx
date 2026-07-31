import { useState } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { UserBadge } from '@/components/design-system/identity/user-badge';
import { MediaCard } from '@/components/design-system/media/media-card';
import type { ProfileIdentity, ProfileMode } from '../types/profile.types';
import { FollowButton } from '@/features/social/components/FollowButton';

type ProfileHeroProps = {
  profile: ProfileIdentity;
  mode?: ProfileMode;
};

export function ProfileHero({ profile, mode = 'owner' }: ProfileHeroProps) {
  const [isFollowing, setIsFollowing] = useState(profile.isFollowing ?? false);
  const initials = profile.displayName
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="rounded-[2rem] border border-border/80 bg-gradient-to-br from-accent/10 via-surface-secondary to-surface-card/90 p-4 shadow-soft sm:p-6 lg:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <Avatar alt={profile.displayName} fallback={initials} size="lg" />
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-heading">{profile.displayName}</h1>
              {profile.verified ? <UserBadge tone="success">تأیید شده</UserBadge> : null}
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm text-text-secondary">
              <span>{profile.username}</span>
              <span>•</span>
              <span>{profile.status}</span>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-text-secondary">{profile.bio}</p>
            <div className="flex flex-wrap gap-2">
              {profile.favoriteTopics.map((topic) => (
                <span key={topic} className="rounded-full border border-border/70 bg-surface-card/80 px-3 py-1 text-xs font-medium text-text-secondary">
                  {topic}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
              <span>{profile.followers.toLocaleString('fa-IR')} دنبال‌کننده</span>
              <span>{profile.following.toLocaleString('fa-IR')} دنبال‌شونده</span>
              <span>سطح مشارکت: {profile.contributionLevel}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {mode === 'owner' ? (
            <>
              <Button type="button" variant="primary">ویرایش پروفایل</Button>
              <Button type="button" variant="secondary">مدیریت تنظیمات</Button>
              <Button type="button" variant="ghost">تقویت هویت</Button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="rounded-full border border-accent/30 bg-accent/10 px-3 py-2 text-sm font-semibold text-accent"
                onClick={() => setIsFollowing((current) => !current)}
              >
                {isFollowing ? 'دنبال می‌کنم' : 'دنبال کردن'}
              </button>
              <FollowButton initialState={profile.isFollowing ? 'following' : 'not-following'} className="rounded-full border border-border/70 bg-surface-card px-3 py-2 text-sm font-semibold text-text-primary" />
              <Button type="button" variant="ghost">اشتراک‌گذاری</Button>
            </>
          )}
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <MediaCard title="My Knowledge" subtitle="دانش و مسیر رشد شما" meta="Knowledge" className="min-h-full">
          <p className="text-sm text-text-secondary">مجموعه‌ای از لحظه‌ها، هایلایت‌ها و یادداشت‌هایی که هویت شنیداری شما را شکل می‌دهند.</p>
        </MediaCard>
        <MediaCard title="Community Presence" subtitle="حضور فعال در بحث‌ها و موضوعات" meta="Social" className="min-h-full">
          <p className="text-sm text-text-secondary">تجربه‌ی شما در بحث‌ها، نظرات و تعاملات، بخش مهمی از هویت و مشارکت شما در Castaminofen است.</p>
        </MediaCard>
        <MediaCard title="Replay Memory" subtitle="بازگشت به لحظه‌های مهم" meta="Player" className="min-h-full">
          <p className="text-sm text-text-secondary">از لحظه‌ها و زمان‌بندی‌های ذخیره‌شده برای بازگشت سریع و حفظ حس تداوم استفاده کن.</p>
        </MediaCard>
      </div>
    </div>
  );
}
