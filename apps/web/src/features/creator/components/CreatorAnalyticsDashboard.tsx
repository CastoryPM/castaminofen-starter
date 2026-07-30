'use client';

import { BarChart3, MessageCircleHeart, Sparkles, TrendingUp, Users, Volume2 } from 'lucide-react';
import { EmptyState } from '@/components/ui/empty-state';
import { MediaCard } from '@/components/design-system/media/media-card';
import type { CreatorAnalyticsData } from '../types/analytics.types';

export function CreatorAnalyticsDashboard({ data }: { data: CreatorAnalyticsData | null }) {
  if (!data) {
    return (
      <div className="space-y-4">
        <EmptyState
          eyebrow="Analytics"
          title="هنوز داده‌ای برای تحلیل وجود ندارد"
          description="برای دیدن بازخورد رشد، اولین محتوا را منتشر کنید و تعامل مخاطب را دنبال کنید."
        />
      </div>
    );
  }

  const { headline, performance, audience, community, timeline, recommendations, relationships } = data;

  return (
    <section className="space-y-6" aria-labelledby="creator-analytics-heading">
      <div className="rounded-[2rem] border border-border/80 bg-gradient-to-br from-accent/10 via-surface-secondary to-surface-card/90 p-4 shadow-soft sm:p-6 lg:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
              <Sparkles className="h-4 w-4" />
              بازخورد رشد
            </div>
            <h2 id="creator-analytics-heading" className="text-heading">
              {headline.title}
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-text-secondary">{headline.description}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {[
            { label: 'فالوورها', value: headline.followers, icon: Users },
            { label: 'کل محتوا', value: headline.totalContent, icon: Volume2 },
            { label: 'پخش‌ها', value: headline.totalPlays, icon: BarChart3 },
            { label: 'امتیاز تعامل', value: headline.engagementScore, icon: TrendingUp },
            { label: 'فعالیت جامعه', value: headline.communityActivity, icon: MessageCircleHeart },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="rounded-[1rem] border border-border/70 bg-surface-card/80 p-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-text-primary">{item.label}</span>
                  <Icon className="h-4 w-4 text-accent" />
                </div>
                <p className="mt-3 text-2xl font-semibold text-text-primary">{item.value}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-6">
          <MediaCard title="عملکرد محتوا" subtitle="درک اینکه کدام مسیرها بیشتر توجه می‌گیرند" meta="Performance">
            <div className="space-y-3">
              {performance.map((item) => (
                <div key={item.id} className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-text-primary">{item.title}</p>
                      <p className="mt-1 text-sm text-text-secondary">{item.topic} • {item.type}</p>
                    </div>
                    <div className="rounded-full border border-accent/20 bg-accent/10 px-2.5 py-1 text-[11px] font-semibold text-accent">
                      {item.trend}
                    </div>
                  </div>
                  <div className="mt-3 grid gap-2 text-sm text-text-secondary sm:grid-cols-2 lg:grid-cols-4">
                    <div><span className="font-medium text-text-primary">پخش‌ها:</span> {item.plays}</div>
                    <div><span className="font-medium text-text-primary">تکمیل:</span> {item.completionRate}</div>
                    <div><span className="font-medium text-text-primary">ذخیره:</span> {item.saves}</div>
                    <div><span className="font-medium text-text-primary">تبدیل فالوور:</span> {item.followerConversion}</div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-text-secondary">
                    <span>واکنش: {item.reactions}</span>
                    <span>•</span>
                    <span>کامنت: {item.comments}</span>
                    <span>•</span>
                    <span>اشتراک: {item.shares}</span>
                  </div>
                </div>
              ))}
            </div>
          </MediaCard>

          <MediaCard title="هوش مخاطب" subtitle="درک علاقه‌ها و رفتارهای مداوم" meta="Audience">
            <div className="space-y-3 text-sm text-text-secondary">
              <div className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                <p className="font-semibold text-text-primary">علاقه‌مندی‌ها</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {audience.interests.map((interest) => (
                    <span key={interest} className="rounded-full border border-border/70 bg-surface-card px-2.5 py-1 text-xs font-semibold text-text-primary">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                  <p className="text-xs uppercase tracking-[0.24em] text-accent">زمان اوج</p>
                  <p className="mt-2 font-semibold text-text-primary">{audience.behavior.peakTime}</p>
                </div>
                <div className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                  <p className="text-xs uppercase tracking-[0.24em] text-accent">نوع محبوب</p>
                  <p className="mt-2 font-semibold text-text-primary">{audience.behavior.favoriteType}</p>
                </div>
                <div className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                  <p className="text-xs uppercase tracking-[0.24em] text-accent">بازگشت مخاطب</p>
                  <p className="mt-2 font-semibold text-text-primary">{audience.behavior.returningAudience}</p>
                </div>
              </div>
            </div>
          </MediaCard>
        </div>

        <div className="space-y-6">
          <MediaCard title="تأثیر جامعه" subtitle="چگونه بحث‌ها و تعاملات رشد می‌دهند" meta="Community">
            <div className="space-y-3 text-sm text-text-secondary">
              <div className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                <p className="font-semibold text-text-primary">بحث‌های ساخته‌شده</p>
                <p className="mt-2 text-2xl font-semibold text-text-primary">{community.discussionsCreated}</p>
              </div>
              <div className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                <p className="font-semibold text-text-primary">کامنت‌های دریافت‌شده</p>
                <p className="mt-2 text-2xl font-semibold text-text-primary">{community.commentsReceived}</p>
              </div>
              <div className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                <p className="font-semibold text-text-primary">مشارکت جامعه</p>
                <p className="mt-2 text-2xl font-semibold text-text-primary">{community.participation}</p>
              </div>
              <div className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                <p className="font-semibold text-text-primary">موضوع‌های داغ</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {community.topics.map((topic) => (
                    <span key={topic} className="rounded-full border border-border/70 bg-surface-card px-2.5 py-1 text-xs font-semibold text-text-primary">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </MediaCard>

          <MediaCard title="خط زمانی رشد" subtitle="از اولین قدم تا مخاطب Loyal" meta="Timeline">
            <div className="flex flex-col gap-2">
              {timeline.map((step, index) => (
                <div key={step} className="flex items-center gap-3 rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3 text-sm text-text-secondary">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/10 text-xs font-semibold text-accent">
                    {index + 1}
                  </span>
                  <span className="font-medium text-text-primary">{step}</span>
                </div>
              ))}
            </div>
          </MediaCard>

          <MediaCard title="پیشنهادهای رشد" subtitle="راهنمایی برای تقویت رابطه با مخاطب" meta="Guidance">
            <div className="space-y-2">
              {recommendations.map((recommendation) => (
                <div key={recommendation} className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3 text-sm text-text-secondary">
                  {recommendation}
                </div>
              ))}
            </div>
          </MediaCard>

          <MediaCard title="کیفیت رابطه با مخاطب" subtitle="رشد از انتشار به ساختن مخاطب" meta="Relationship">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                <p className="text-xs uppercase tracking-[0.24em] text-accent">فالوورهای جدید</p>
                <p className="mt-2 text-xl font-semibold text-text-primary">{relationships.followersGained}</p>
              </div>
              <div className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                <p className="text-xs uppercase tracking-[0.24em] text-accent">مخاطب بازگشتی</p>
                <p className="mt-2 text-xl font-semibold text-text-primary">{relationships.returningAudience}</p>
              </div>
              <div className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                <p className="text-xs uppercase tracking-[0.24em] text-accent">اعضای فعال جامعه</p>
                <p className="mt-2 text-xl font-semibold text-text-primary">{relationships.activeCommunityMembers}</p>
              </div>
              <div className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                <p className="text-xs uppercase tracking-[0.24em] text-accent">مخاطب وفادار</p>
                <p className="mt-2 text-xl font-semibold text-text-primary">{relationships.loyalAudience}</p>
              </div>
            </div>
          </MediaCard>
        </div>
      </div>
    </section>
  );
}
