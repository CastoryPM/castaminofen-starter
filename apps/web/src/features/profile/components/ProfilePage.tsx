'use client';

import { useRouter } from 'next/navigation';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuthStore } from '@/stores/authStore';

function formatAccountDate(value?: string) {
  if (!value) {
    return '—';
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return '—';
  }

  return parsedDate.toLocaleDateString('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function ProfilePage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  const displayName = user?.name?.trim() || user?.email?.split('@')[0] || 'کاربر';
  const initials = displayName.charAt(0).toUpperCase();

  return (
    <main className="page-container">
      <section className="space-y-6">
        <div className="rounded-2xl border border-border/80 bg-surface-secondary/70 p-4 shadow-soft sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Avatar alt={displayName} fallback={initials} size="lg" />
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-heading">پروفایل کاربر</h1>
                  <Badge variant="success">ورود شده</Badge>
                </div>
                <p className="text-body m-0">به حساب کاربری خود در کستامینوفن خوش آمدید.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="secondary" onClick={() => router.push('/')}>
                بازگشت به خانه
              </Button>
              <Button type="button" variant="ghost" onClick={() => router.push('/library')}>
                کتابخانه
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
          <Card className="space-y-4 p-4 sm:p-6">
            <div className="space-y-1">
              <p className="text-caption">اطلاعات حساب</p>
              <h2 className="text-heading text-lg">جزئیات کاربری</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
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
              <p className="text-caption">وضعیت حساب</p>
              <h2 className="text-heading text-lg">امکانات MVP</h2>
            </div>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>• دسترسی به صفحه پروفایل</li>
              <li>• مشاهده اطلاعات حساب کاربری</li>
              <li>• ادامه استفاده از کتابخانه و پخش</li>
            </ul>
          </Card>
        </div>
      </section>
    </main>
  );
}

export default ProfilePage;
