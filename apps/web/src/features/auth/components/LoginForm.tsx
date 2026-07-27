'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { fetchProfile, loginUser } from '@/lib/auth';
import { Form, FormField, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { getErrorMessage } from '@/shared/lib/errors';

const loginSchema = z.object({
  email: z.string().trim().min(1, 'ایمیل الزامی است.').email('لطفاً یک ایمیل معتبر وارد کنید.'),
  password: z.string().trim().min(6, 'رمز عبور باید حداقل 6 کاراکتر باشد.'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginPageView() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  async function onSubmit(values: LoginFormValues) {
    setError(null);
    try {
      await loginUser(values);
      const profile = await fetchProfile();
      useAuthStore.getState().setUser(profile);
      useAuthStore.getState().setHydrated(true);
      router.replace('/profile');
    } catch (err) {
      setError(getErrorMessage(err, 'ورود با مشکل مواجه شد. لطفاً دوباره تلاش کنید.'));
    }
  }

  return (
    <main className="page-container">
      <section className="card mx-auto w-full max-w-xl space-y-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <Image src="/branding/icon.png" alt="Castaminofen" width={64} height={64} className="h-16 w-16 rounded-2xl" />
          <div className="space-y-2">
            <p className="text-caption">ورود</p>
            <h1 className="text-heading">به حساب کاربری خود دسترسی پیدا کنید</h1>
            <p className="text-body m-0">برای ادامه پخش و دسترسی به کتابخانه، اطلاعات حساب خود را وارد کنید.</p>
          </div>
        </div>
        <Form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField>
            <FormLabel htmlFor="email">ایمیل</FormLabel>
            <Input id="email" type="email" autoComplete="email" placeholder="your@email.com" {...form.register('email')} aria-invalid={form.formState.errors.email ? 'true' : undefined} />
            {form.formState.errors.email ? <p className="error-text">{form.formState.errors.email.message}</p> : null}
          </FormField>
          <FormField>
            <FormLabel htmlFor="password">رمز عبور</FormLabel>
            <Input id="password" type="password" autoComplete="current-password" placeholder="حداقل 6 کاراکتر" {...form.register('password')} aria-invalid={form.formState.errors.password ? 'true' : undefined} />
            {form.formState.errors.password ? <p className="error-text">{form.formState.errors.password.message}</p> : null}
          </FormField>
          {error ? (
            <div className="rounded-2xl border border-error/30 bg-error/5 p-3" role="alert">
              <p className="error-text m-0">{error}</p>
            </div>
          ) : null}
          <Button type="submit" className="w-full justify-center" loading={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'در حال ورود...' : 'ورود'}
          </Button>
        </Form>
        <div className="rounded-2xl border border-border bg-surface-secondary/80 p-4 text-center">
          <p className="text-sm text-text-secondary">حساب کاربری ندارید؟</p>
          <Link href="/register" className="mt-3 inline-flex items-center justify-center rounded-2xl border border-border bg-surface-primary px-4 py-2 text-sm font-semibold text-primary transition hover:bg-surface-tertiary">
            ثبت‌نام کنید
          </Link>
        </div>
      </section>
    </main>
  );
}

export default LoginPageView;
