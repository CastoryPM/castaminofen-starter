'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { logoutUser } from '@/lib/auth';
import { apiFetch } from '@/lib/api';
import type { UserProfile } from '@/lib/types';
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
    month: '2-digit',
    day: '2-digit',
  });
}

export function normalizeProfileName(rawValue: string) {
  return rawValue.trim();
}

export function ProfilePage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const displayName = useMemo(
    () => user?.name?.trim() || user?.email?.split('@')[0] || 'کاربر',
    [user],
  );
  const initials = displayName.charAt(0).toUpperCase();
  const isAuthenticated = Boolean(user);

  const updateProfileMutation = useMutation({
    mutationFn: async (name: string) =>
      apiFetch<UserProfile>('users/me', { method: 'PUT', body: { name } }),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData<UserProfile | null>(['session'], (current) => {
        if (!current) {
          return updatedUser;
        }

        return { ...current, ...updatedUser };
      });

      const authStore = useAuthStore.getState();
      authStore.setUser(updatedUser);
      setFeedback({
        type: 'success',
        message: 'پروفایل با موفقیت به‌روزرسانی شد.',
      });
      setIsEditing(false);
    },
    onError: (error) => {
      setFeedback({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'به‌روزرسانی پروفایل با مشکل مواجه شد.',
      });
    },
  });

  async function handleLogout() {
    await logoutUser();
    router.push('/login');
  }

  function resetEditState() {
    setIsEditing(false);
    setNameInput(user?.name?.trim() ?? '');
    setFeedback(null);
  }

  function handleEditStart() {
    setFeedback(null);
    setNameInput(user?.name?.trim() ?? '');
    setIsEditing(true);
  }

  function handleSave() {
    const normalizedName = normalizeProfileName(nameInput);

    if (!normalizedName) {
      setFeedback({ type: 'error', message: 'نام نمی‌تواند خالی باشد.' });
      return;
    }

    setFeedback(null);
    updateProfileMutation.mutate(normalizedName);
  }

  const quickActions = [
    {
      label: 'ویرایش پروفایل',
      description: 'به‌روزرسانی اطلاعات حساب',
      variant: 'primary' as const,
      disabled: true,
    },
    {
      label: 'کتابخانه',
      description: 'مشاهده پادکست‌های ذخیره‌شده',
      variant: 'secondary' as const,
      disabled: false,
      href: '/library',
    },
    {
      label: 'علاقه‌مندی‌ها',
      description: 'به‌زودی در دسترس',
      variant: 'ghost' as const,
      disabled: true,
    },
    {
      label: 'ادامه listening',
      description: 'به‌زودی در دسترس',
      variant: 'ghost' as const,
      disabled: true,
    },
    {
      label: 'دانلودها',
      description: 'به‌زودی در دسترس',
      variant: 'ghost' as const,
      disabled: true,
    },
    {
      label: 'تنظیمات',
      description: 'به‌زودی در دسترس',
      variant: 'ghost' as const,
      disabled: true,
    },
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
                <p className="text-body m-0">
                  به حساب کاربری خود در کستامینوفن خوش آمدید.
                </p>
                <div className="flex flex-wrap gap-3 text-sm text-text-secondary">
                  <span>{user?.email ?? '—'}</span>
                  <span>•</span>
                  <span>{formatAccountDate(user?.createdAt)}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() => router.push('/')}
              >
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
                  <span className="mb-1 block w-full font-medium">
                    {action.label}
                  </span>
                  <span className="text-xs opacity-80">
                    {action.description}
                  </span>
                  {action.disabled ? (
                    <span className="mt-2 text-[11px] text-text-secondary">
                      Coming Soon
                    </span>
                  ) : null}
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
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <p className="text-caption">نام</p>
                    {!isEditing ? (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleEditStart}
                      >
                        ویرایش
                      </Button>
                    ) : null}
                  </div>
                  {isEditing ? (
                    <div className="space-y-3">
                      <Input
                        value={nameInput}
                        onChange={(event) => setNameInput(event.target.value)}
                        placeholder="نام کامل"
                        aria-label="نام کامل"
                      />
                      <div className="flex flex-wrap gap-2">
                        <Button
                          type="button"
                          variant="primary"
                          onClick={handleSave}
                          disabled={updateProfileMutation.isPending}
                        >
                          {updateProfileMutation.isPending
                            ? 'در حال ذخیره...'
                            : 'ذخیره'}
                        </Button>
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={resetEditState}
                          disabled={updateProfileMutation.isPending}
                        >
                          انصراف
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-body m-0 font-medium">{displayName}</p>
                  )}
                </div>
                {feedback ? (
                  <div
                    className={`rounded-2xl border p-3 text-sm ${feedback.type === 'success' ? 'border-success/30 bg-success/10 text-success' : 'border-error/30 bg-error/10 text-error'}`}
                  >
                    {feedback.message}
                  </div>
                ) : null}
                <div className="rounded-2xl border border-border bg-surface-secondary/70 p-3">
                  <p className="text-caption">ایمیل</p>
                  <p className="text-body m-0 font-medium">
                    {user?.email ?? '—'}
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-surface-secondary/70 p-3">
                  <p className="text-caption">شناسه کاربری</p>
                  <p className="text-body m-0 font-medium">{user?.id ?? '—'}</p>
                </div>
                <div className="rounded-2xl border border-border bg-surface-secondary/70 p-3">
                  <p className="text-caption">تاریخ عضویت</p>
                  <p className="text-body m-0 font-medium">
                    {formatAccountDate(user?.createdAt)}
                  </p>
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
                  <p className="text-body m-0 font-medium">
                    {isAuthenticated ? 'Authenticated' : 'Not authenticated'}
                  </p>
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
