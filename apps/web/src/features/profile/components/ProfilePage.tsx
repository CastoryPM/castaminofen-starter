'use client';

import { useRouter } from 'next/navigation';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { logoutUser } from '@/lib/auth';
import { useAuthStore } from '@/stores/authStore';

export function formatAccountDate(value?: string) {
  if (!value) {
    return '—';
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return '—';
  }

  return parsedDate.toLocaleDateString('fa-IR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
}

export function ProfilePage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  const displayName = user?.name?.trim() || user?.email?.split('@')[0] || 'کاربر';
  const initials = displayName.charAt(0).toUpperCase();
  const isAuthenticated = Boolean(user);

  async function handleLogout() {
    await logoutUser();
    router.push('/login');
  }

  const quickActions = [
    { label: 'ویرایش پروفایل', description: 'به‌روزرسانی اطلاعات حساب', variant: 'primary' as const, disabled: true },
    { label: 'کتابخانه', description: 'مشاهده پادکست‌های ذخیره‌شده', variant: 'secondary' as const, disabled: false, href: '/library' },
    { label: 'علاقه‌مندی‌ها', description: 'به‌زودی در دسترس', variant: 'ghost' as const, disabled: true },
    { label: 'ادامه listening', description: 'به‌زودی در دسترس', variant: 'ghost' as const, disabled: true },
    { label: 'دانلودها', description: 'به‌زودی در دسترس', variant: 'ghost' as const, disabled: true },
    { label: 'تنظیمات', description: 'به‌زودی در دسترس', variant: 'ghost' as const, disabled: true },
  ];

  return (
    <main className="page-container">
      <section className="space-y-6">
        <div className="rounded-2xl border border-border/80 bg-surface-secondary/70 p-4 shadow-soft sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-center gap-4">
              <Avatar alt={displayName} fallback={initials} size="lg" />
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-heading">پروفایل کاربر</h1>
                  <Badge variant={isAuthenticated ? 'success' : 'default'}>
                    {isAuthenticated ? 'ورود شده' : 'در انتظار ورود'}
                  </Badge>
                </div>
                <p className="text-body m-0">به حساب کاربری خود در کستامینوفن خوش آمدید.</p>
                <div className="flex flex-wrap gap-3 text-sm text-text-secondary">
                  <span>{user?.email ?? '—'}</span>
                  <span>•</span>
                  <span>{formatAccountDate(user?.createdAt)}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="secondary" onClick={() => router.push('/')}>
                بازگشت به خانه
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
          <Card className="space-y-4 p-4 sm:p-6">
            <div className="space-y-1">
              <p className="text-caption">دسترسی سریع</p>
              <h2 className="text-heading text-lg">عملیات MVP</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {quickActions.map((action) => (
                <Button
                  key={action.label}
                  type="button"
                  variant={action.variant}
                  disabled={action.disabled}
                  onClick={() => {
                    if (action.href) {
                      router.push(action.href);
                    }
                  }}
                  className="min-h-24 flex-col items-start justify-start text-right"
                >
                  <span className="mb-1 block w-full font-medium">{action.label}</span>
                  <span className="text-xs opacity-80">{action.description}</span>
                  {action.disabled ? <span className="mt-2 text-[11px] text-text-secondary">Coming Soon</span> : null}
                </Button>
              ))}
            </div>
          </Card>

          <div className="space-y-4">
            <Card className="space-y-4 p-4 sm:p-6">
              <div className="space-y-1">
                <p className="text-caption">اطلاعات حساب</p>
                <h2 className="text-heading text-lg">جزئیات کاربری</h2>
              </div>
              <div className="space-y-3">
                <div className="rounded-2xl border border-border bg-surface-secondary/70 p-3">
                  <p className="text-caption">نام</p>
                  <p className="text-body m-0 font-medium">{displayName}</p>
                </div>
                <div className="rounded-2xl border border-border bg-surface-secondary/70 p-3">
                  <p className="text-caption">ایمیل</p>
                  <p className="text-body m-0 font-medium">{user?.email ?? '—'}</p>
                </div>
                <div className="rounded-2xl border border-border bg-surface-secondary/70 p-3">
                  <p className="text-caption">شناسه کاربری</p>
                  <p className="text-body m-0 font-medium">{user?.id ?? '—'}</p>
                </div>
                <div className="rounded-2xl border border-border bg-surface-secondary/70 p-3">
                  <p className="text-caption">تاریخ عضویت</p>
                  <p className="text-body m-0 font-medium">{formatAccountDate(user?.createdAt)}</p>
                </div>
              </div>
            </Card>

            <Card className="space-y-4 p-4 sm:p-6">
              <div className="space-y-1">
                <p className="text-caption">حساب کاربری</p>
                <h2 className="text-heading text-lg">وضعیت و خروج</h2>
              </div>
              <div className="space-y-3">
                <div className="rounded-2xl border border-border bg-surface-secondary/70 p-3">
                  <p className="text-caption">وضعیت احراز هویت</p>
                  <p className="text-body m-0 font-medium">{isAuthenticated ? 'Authenticated' : 'Not authenticated'}</p>
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleLogout}
                  className="w-full"
                  disabled={!isAuthenticated}
                >
                  خروج
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProfilePage;
