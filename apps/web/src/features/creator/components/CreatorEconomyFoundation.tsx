'use client';

import { ArrowUpRight, BadgeCheck, Crown, Gift, HeartHandshake, Sparkles, Star, Trophy, WalletCards } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MediaCard } from '@/components/design-system/media/media-card';

const revenueMetrics = [
  { label: 'درآمد تخمینی', value: '۲۴٫۸K تومان', detail: 'از حمایت و اشتراک‌های مداوم', icon: WalletCards },
  { label: 'حمایت دریافتی', value: '۳۴۸', detail: 'سازندگان و هواداران فعال', icon: HeartHandshake },
  { label: 'عملکرد محتوای Premium', value: '۸۷%', detail: 'نرخ تبدیل به حمایت‌های ویژه', icon: Crown },
  { label: 'ارزش جامعه', value: '۴.۹/۵', detail: 'امتیاز اعتماد و مشارکت', icon: Star },
];

const supportPrograms = [
  {
    title: 'Patreon-style Support',
    subtitle: 'سطح‌های حمایتی با دسترسی به محتوای خاص',
    cta: 'حمایت از سازنده',
    accent: 'from-accent/20 to-transparent',
  },
  {
    title: 'YouTube Membership',
    subtitle: 'عضویت‌های ویژه برای مخاطبان وفادار',
    cta: 'عضو شدن',
    accent: 'from-success/20 to-transparent',
  },
  {
    title: 'Spotify Fan Support',
    subtitle: 'پشتیبانی مستقیم با تجربه‌ی ساده و سریع',
    cta: 'پشتیبانی هدیه',
    accent: 'from-warning/20 to-transparent',
  },
];

const contentTiers = [
  { title: 'Free', description: 'محتوای عمومی برای دسترسی کامل', badge: 'در دسترس همه' },
  { title: 'Premium', description: 'نسخه‌ی عمیق‌تر با تحلیل و تجربه‌ی ویژه', badge: 'برای اعضای ویژه' },
  { title: 'Supporter only', description: 'محتوای اختصاصی برای حامیان و جامعه‌ی وفادار', badge: 'فقط برای حامیان' },
];

const membershipBenefits = [
  'جلسات بحث اختصاصی با سازنده',
  'مجموعه‌های ویژه و دسترسی زودهنگام',
  'اعلان‌های پیش‌رفته درباره‌ی انتشارهای بعدی',
];

const rewards = [
  { milestone: '۱۰۰ دنبال‌کننده', level: 'Community Builder', detail: 'شروع ساخت جامعه‌ی پرشور' },
  { milestone: '۵۰۰ عضو فعال', level: 'Trusted Creator', detail: 'اعتماد و مشارکت مداوم' },
  { milestone: '۱۰۰۰ مشارکت', level: 'Knowledge Leader', detail: 'رهبری محتوایی و ارزش‌آفرینی' },
];

const collaborations = [
  { title: 'همکاری‌های سازنده', detail: 'مشارکت با دیگر تولیدکنندگان در پروژه‌های مشترک' },
  { title: 'شراکت‌های برند', detail: 'هم‌افزایی با برندهای مرتبط با موضوعات ارزش‌مند' },
  { title: 'سازندگان برجسته', detail: 'معرفی و تقویت مسیر رشد در شبکه‌ی حرفه‌ای' },
];

export function CreatorEconomyFoundation() {
  return (
    <section className="space-y-6" aria-labelledby="creator-economy-heading">
      <div className="rounded-[2rem] border border-border/80 bg-gradient-to-br from-success/10 via-surface-secondary to-surface-card/90 p-4 shadow-soft sm:p-6 lg:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-success/20 bg-success/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-success">
              <Sparkles className="h-4 w-4" />
              اقتصاد سازنده
            </div>
            <h2 id="creator-economy-heading" className="text-heading">
              داشبورد درآمد سازنده و پایه‌ی مدل‌های حمایتی
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-text-secondary">
              برای آینده‌ی درآمدی، بدون نیاز به پرداخت واقعی، مدل‌های حمایت، عضویت و پاداش آماده شده‌اند تا تجربه‌ی رشد و اقتصاد سازنده شفاف‌تر شود.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {revenueMetrics.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="rounded-[1rem] border border-border/70 bg-surface-card/80 p-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-text-primary">{item.label}</span>
                  <Icon className="h-4 w-4 text-success" />
                </div>
                <p className="mt-3 text-2xl font-semibold text-text-primary">{item.value}</p>
                <p className="mt-2 text-sm text-text-secondary">{item.detail}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <MediaCard title="حمایت و مشارکت" subtitle="از Patreon تا عضویت هواداران" meta="Support">
            <div className="space-y-3">
              {supportPrograms.map((item) => (
                <div key={item.title} className={`rounded-[1rem] border border-border/70 bg-gradient-to-r ${item.accent} p-3`}>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-text-primary">{item.title}</p>
                      <p className="mt-1 text-sm text-text-secondary">{item.subtitle}</p>
                    </div>
                    <Button type="button" size="sm" variant="secondary">
                      {item.cta}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </MediaCard>

          <MediaCard title="مدل محتوای Premium" subtitle="آماده برای آینده‌ی درآمدی" meta="Content Types">
            <div className="grid gap-3 sm:grid-cols-3">
              {contentTiers.map((tier) => (
                <div key={tier.title} className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-text-primary">{tier.title}</p>
                    <BadgeCheck className="h-4 w-4 text-accent" />
                  </div>
                  <p className="mt-2 text-sm text-text-secondary">{tier.description}</p>
                  <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">{tier.badge}</p>
                </div>
              ))}
            </div>
          </MediaCard>

          <MediaCard title="پاداش‌ها و سطح‌بندی" subtitle="مراحل رشد و افتخار سازنده" meta="Rewards">
            <div className="space-y-3">
              {rewards.map((reward) => (
                <div key={reward.level} className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-text-primary">{reward.milestone}</p>
                      <p className="mt-1 text-sm text-text-secondary">{reward.detail}</p>
                    </div>
                    <div className="flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-2.5 py-1 text-[11px] font-semibold text-accent">
                      <Trophy className="h-3.5 w-3.5" />
                      {reward.level}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </MediaCard>
        </div>

        <div className="space-y-6">
          <MediaCard title="عضویت ویژه سازنده" subtitle="راهی برای ساخت جامعه‌ی وفادار" meta="Membership">
            <div className="space-y-3">
              <div className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                  <Gift className="h-4 w-4 text-accent" />
                  Join Creator Community
                </div>
                <p className="mt-2 text-sm text-text-secondary">
                  دسترسی به بحث‌های اختصاصی، مجموعه‌های ویژه و محتوای زودهنگام برای اعضای ثابت جامعه.
                </p>
              </div>
              <div className="space-y-2">
                {membershipBenefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2 rounded-[1rem] border border-border/70 bg-surface-card/80 px-3 py-2 text-sm text-text-secondary">
                    <BadgeCheck className="h-4 w-4 text-success" />
                    {benefit}
                  </div>
                ))}
              </div>
              <Button type="button" className="w-full justify-center" variant="primary">
                دسترسی به عضویت ویژه
              </Button>
            </div>
          </MediaCard>

          <MediaCard title="پایه‌ی همکاری برند" subtitle="آماده برای مشارکت‌های بعدی" meta="Collaboration">
            <div className="space-y-3">
              {collaborations.map((item) => (
                <div key={item.title} className="rounded-[1rem] border border-border/70 bg-surface-secondary/70 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-text-primary">{item.title}</p>
                      <p className="mt-1 text-sm text-text-secondary">{item.detail}</p>
                    </div>
                    <ArrowUpRight className="mt-0.5 h-4 w-4 text-accent" />
                  </div>
                </div>
              ))}
            </div>
          </MediaCard>
        </div>
      </div>
    </section>
  );
}
