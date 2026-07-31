'use client';

import { useMemo, useState } from 'react';
import { AlertTriangle, BarChart3, BellRing, Blocks, Compass, Layers3, ShieldCheck, Sparkles, Users2 } from 'lucide-react';
import { PageContainer } from '@/components/design-system/layout/page-container';
import { SectionHeader } from '@/components/design-system/layout/section-header';
import { MediaCard } from '@/components/design-system/media/media-card';
import { Avatar } from '@/components/design-system/identity/avatar';
import { Tag } from '@/components/design-system/common/tag';
import { Button } from '@/components/ui/button';
import { PageState } from '@/components/ui/page-state';
import { adminContent, adminCreators, adminDiscussions, adminOverviewMetrics, adminReports, adminSectionConfig, adminUsers } from '../data/mockAdminData';
import { AdminAIAssistant } from './AdminAIAssistant';
import { AdminConfigurationCenter } from './AdminConfigurationCenter';
import { AdminGovernanceDashboard } from './AdminGovernanceDashboard';
import { AdminIntelligenceDashboard } from './AdminIntelligenceDashboard';
import { AdminRolesPreview } from './AdminRolesPreview';
import { AuditActivityTimeline } from './AuditActivityTimeline';
import { ContentReviewPanel } from './ContentReviewPanel';
import { CreatorReviewPanel } from './CreatorReviewPanel';
import { ModerationQueue } from './ModerationQueue';
import { OperationsDashboard } from './OperationsDashboard';
import { PlatformAlerts } from './PlatformAlerts';
import { TrustSafetyOverview } from './TrustSafetyOverview';
import { UserTrustPanel } from './UserTrustPanel';
import type { AdminSectionKey } from '../types/admin.types';

const sectionComponents: Record<AdminSectionKey, { title: string; description: string }> = {
  overview: { title: 'نمای کلی پلتفرم', description: 'حس کلی از سلامت، رشد و وضعیت اکوسیستم' },
  governance: { title: 'Governance Workspace', description: 'مرکز عملیاتی برای اعتماد، نظارت و سلامت اکوسیستم' },
  moderation: { title: 'Moderation Queue', description: 'فضای بررسی محتوا، جامعه و گزارش‌ها' },
  'content-review': { title: 'Content Review System', description: 'مرکز تصمیم‌گیری برای محتوا و دیده‌شدن' },
  'creator-review': { title: 'Creator Governance', description: 'بررسی درخواست‌ها و وضعیت اعتبار سازندگان' },
  trust: { title: 'User Trust Management', description: 'نظارت بر رفتار کاربران و سطح اعتماد' },
  audit: { title: 'Audit Timeline', description: 'رویدادهای مدیریتی و فعالیت‌های ثبت‌شده' },
  alerts: { title: 'Platform Alerts', description: 'هشدارهای رشد، رویداد و گزارش' },
  safety: { title: 'Trust & Safety Overview', description: 'خلاصه‌ی سلامت و اعتماد اکوسیستم' },
  roles: { title: 'Admin Roles Preview', description: 'پیش‌نمایش نقش‌های مدیریتی و دامنه‌ی آنها' },
  operations: { title: 'Operations Dashboard', description: 'فضای کاری روزانه برای مدیران و تیم' },
  users: { title: 'مدیریت کاربران', description: 'مرکز کنترل برای وضعیت حساب‌ها و مشارکت' },
  creators: { title: 'مدیریت سازندگان', description: 'تجربه‌ای برای نظارت روی اعتبار و رشد' },
  content: { title: 'مدیریت محتوا', description: 'کنترل انتشار، بررسی و محدودسازی' },
  community: { title: 'مدیریت جامعه', description: 'نظارت روی بحث‌ها و سلامت تعامل' },
  reports: { title: 'مرکز گزارش‌ها', description: 'گردش کار بررسی و تصمیم گیری' },
  analytics: { title: 'مرکز هوش پلتفرم', description: 'درک رشد، محبوبیت و رفتار مخاطب' },
  assistant: { title: 'AI Executive Assistant', description: 'دستیار اجرایی برای درک سلامت، ریسک و فرصت‌های پلتفرم' },
  settings: { title: 'تنظیمات پلتفرم', description: 'پیکربندی تجربه و قابلیت‌های آینده' },
  system: { title: 'وضعیت سیستم', description: 'مرکز کنترل راه‌اندازی و پشتیبانی' },
};

const iconMap = {
  overview: Compass,
  governance: ShieldCheck,
  moderation: AlertTriangle,
  'content-review': Layers3,
  'creator-review': Sparkles,
  trust: Users2,
  audit: BarChart3,
  alerts: BellRing,
  safety: ShieldCheck,
  roles: Blocks,
  operations: Compass,
  users: Users2,
  creators: Sparkles,
  content: Layers3,
  community: BellRing,
  reports: ShieldCheck,
  analytics: BarChart3,
  assistant: Sparkles,
  settings: Blocks,
  system: AlertTriangle,
};

export function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<AdminSectionKey>('overview');

  const ActiveIcon = iconMap[activeSection];

  const sectionContent = useMemo(() => {
    switch (activeSection) {
      case 'governance':
        return <AdminGovernanceDashboard />;
      case 'moderation':
        return <ModerationQueue />;
      case 'content-review':
        return <ContentReviewPanel />;
      case 'creator-review':
        return <CreatorReviewPanel />;
      case 'trust':
        return <UserTrustPanel />;
      case 'audit':
        return <AuditActivityTimeline />;
      case 'alerts':
        return <PlatformAlerts />;
      case 'safety':
        return <TrustSafetyOverview />;
      case 'roles':
        return <AdminRolesPreview />;
      case 'operations':
        return <OperationsDashboard />;
      case 'users':
        return (
          <div className="space-y-4">
            {adminUsers.map((user) => (
              <div key={user.id} className="rounded-[1.2rem] border border-border/80 bg-surface-secondary/70 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <Avatar alt={user.name} fallback={user.name.charAt(0)} size="md" />
                    <div>
                      <p className="font-semibold text-text-primary">{user.name}</p>
                      <p className="text-sm text-text-secondary">{user.identity}</p>
                      <p className="mt-1 text-xs text-text-secondary">ثبت‌نام: {user.joinedAt}</p>
                    </div>
                  </div>
                  <Tag className="border-accent/20 bg-accent/10 text-accent">{user.status}</Tag>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-border/70 bg-surface-card/80 p-3">
                    <p className="text-xs text-text-secondary">فعالیت</p>
                    <p className="font-semibold text-text-primary">{user.activity}</p>
                  </div>
                  <div className="rounded-2xl border border-border/70 bg-surface-card/80 p-3">
                    <p className="text-xs text-text-secondary">دنبال‌کننده</p>
                    <p className="font-semibold text-text-primary">{user.followers}</p>
                  </div>
                  <div className="rounded-2xl border border-border/70 bg-surface-card/80 p-3">
                    <p className="text-xs text-text-secondary">محتوا</p>
                    <p className="font-semibold text-text-primary">{user.contentCount}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case 'creators':
        return (
          <div className="grid gap-4 lg:grid-cols-2">
            {adminCreators.map((creator) => (
              <MediaCard key={creator.id} title={creator.name} subtitle={creator.level} meta={creator.status} className="space-y-3">
                <div className="space-y-2 text-sm text-text-secondary">
                  <p>دنبال‌کننده: {creator.followers}</p>
                  <p>تعداد محتوا: {creator.contentCount}</p>
                  <p> engagement: {creator.engagement}</p>
                  <p>تأثیر جامعه: {creator.impact}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="primary">تأیید سازنده</Button>
                  <Button size="sm" variant="secondary">مرور پروفایل</Button>
                </div>
              </MediaCard>
            ))}
          </div>
        );
      case 'content':
        return (
          <div className="grid gap-4 lg:grid-cols-2">
            {adminContent.map((item) => (
              <MediaCard key={item.id} title={item.title} subtitle={item.creator} meta={item.status} className="space-y-3">
                <div className="flex flex-wrap gap-2 text-sm text-text-secondary">
                  <Tag>{item.type}</Tag>
                  <Tag>{item.performance}</Tag>
                  <Tag>{item.reports} گزارش</Tag>
                </div>
              </MediaCard>
            ))}
          </div>
        );
      case 'community':
        return (
          <div className="grid gap-4 lg:grid-cols-2">
            {adminDiscussions.map((discussion) => (
              <MediaCard key={discussion.id} title={discussion.title} subtitle={discussion.label} meta={discussion.health} className="space-y-3">
                <p className="text-sm text-text-secondary">رشد: {discussion.growth}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary">مرور گفتگو</Button>
                  <Button size="sm" variant="ghost">نمونه هشدار</Button>
                </div>
              </MediaCard>
            ))}
          </div>
        );
      case 'reports':
        return (
          <div className="space-y-4">
            {adminReports.map((report) => (
              <div key={report.id} className="rounded-[1.2rem] border border-border/80 bg-surface-secondary/70 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-text-primary">{report.item}</p>
                    <p className="text-sm text-text-secondary">دلیل: {report.reason}</p>
                  </div>
                  <Tag>{report.priority}</Tag>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-text-secondary">
                  <span>گزارش‌دهنده: {report.reporter}</span>
                  <span>•</span>
                  <span>وضعیت: {report.status}</span>
                </div>
              </div>
            ))}
          </div>
        );
      case 'analytics':
        return <AdminIntelligenceDashboard />;
      case 'assistant':
        return <AdminAIAssistant />;
      case 'settings':
        return <AdminConfigurationCenter />;
      case 'system':
        return (
          <div className="grid gap-4 lg:grid-cols-2">
            <MediaCard title="وضعیت پشتیبانی" subtitle="سامانه‌های حیاتی و هشدارها" meta="Stable" className="space-y-3">
              <p className="text-sm text-text-secondary">شبکه، storage و پخش در شرایط عادی هستند.</p>
            </MediaCard>
            <MediaCard title="فضای آینده" subtitle="سازگاری با رشد و ادغام‌های بعدی" meta="Future" className="space-y-3">
              <p className="text-sm text-text-secondary">این بخش به‌صورت UI آماده است و در مراحل بعدی به API متصل می‌شود.</p>
            </MediaCard>
          </div>
        );
      case 'overview':
      default:
        return (
          <div className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
              {adminOverviewMetrics.map((metric) => (
                <MediaCard key={metric.label} title={metric.label} subtitle={metric.detail} meta={metric.value} className="space-y-2" />
              ))}
            </div>
            <MediaCard title="خلاصه‌ی فعالیت" subtitle="برداشت سریع از اکوسیستم" meta="Story" className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-border/70 bg-surface-secondary/70 p-3">
                  <p className="text-xs text-text-secondary">رشد</p>
                  <p className="font-semibold text-text-primary">+14% ماهانه</p>
                </div>
                <div className="rounded-2xl border border-border/70 bg-surface-secondary/70 p-3">
                  <p className="text-xs text-text-secondary">درگیری</p>
                  <p className="font-semibold text-text-primary">۷.۲% افزایش</p>
                </div>
                <div className="rounded-2xl border border-border/70 bg-surface-secondary/70 p-3">
                  <p className="text-xs text-text-secondary">فعالیت جامعه</p>
                  <p className="font-semibold text-text-primary">قوی</p>
                </div>
              </div>
            </MediaCard>
          </div>
        );
    }
  }, [activeSection]);

  return (
    <PageContainer className="space-y-6">
      <SectionHeader
        title="Platform Control Center"
        description="فضای مدیریتی برای کنترل، نظارت و رشد پلتفرم"
        actions={<Tag className="border-accent/20 bg-accent/10 text-accent">Governance Mission Control</Tag>}
      />

      <div className="grid gap-4 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="space-y-3 rounded-[1.6rem] border border-border/80 bg-surface-card/80 p-3 shadow-soft">
          <div className="rounded-[1.1rem] border border-border/70 bg-surface-secondary/70 p-3">
            <p className="text-sm font-semibold text-text-primary">Control Center</p>
            <p className="text-sm text-text-secondary">پلتفرم، جامعه و رشد</p>
          </div>
          <nav className="space-y-2" aria-label="Admin sections">
            {adminSectionConfig.map((section) => {
              const isActive = section.key === activeSection;
              return (
                <button
                  key={section.key}
                  type="button"
                  onClick={() => setActiveSection(section.key)}
                  className={`flex w-full items-center justify-between rounded-[1rem] border px-3 py-3 text-right text-sm transition ${isActive ? 'border-accent/40 bg-accent/10 text-accent' : 'border-transparent bg-transparent text-text-secondary hover:border-border/80 hover:bg-surface-secondary/70'}`}
                >
                  <span>{section.title}</span>
                  <span className="text-xs opacity-70">{section.shortLabel}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        <section className="space-y-4">
          <div className="rounded-[1.6rem] border border-border/80 bg-surface-card/90 p-4 shadow-soft sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="rounded-2xl border border-border/70 bg-surface-secondary/70 p-2">
                    <ActiveIcon className="h-5 w-5 text-accent" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-text-primary">{sectionComponents[activeSection].title}</h2>
                    <p className="text-sm text-text-secondary">{sectionComponents[activeSection].description}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="secondary">View insights</Button>
                <Button size="sm" variant="primary">Export report</Button>
              </div>
            </div>
          </div>

          {sectionContent}

          {activeSection === 'overview' ? (
            <div className="grid gap-4 lg:grid-cols-2">
              <MediaCard title="Empty states" subtitle="برای بخش‌های خالی و اسکریپت‌های آینده" meta="Ready" className="space-y-3">
                <PageState variant="empty" title="No pending reviews" description="این بخش برای نمایش وضعیت خالی و ساختار آینده آماده است." />
              </MediaCard>
              <MediaCard title="Loading states" subtitle="برای اتصال به داده‌های واقعی" meta="Ready" className="space-y-3">
                <PageState variant="loading" title="Loading operational data" description="در حال آماده‌سازی داده‌های مدیریتی" />
              </MediaCard>
            </div>
          ) : null}
        </section>
      </div>
    </PageContainer>
  );
}

export default AdminDashboard;
