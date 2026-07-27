# Authentication Flow Fix Report

## Summary

این گزارش تغییرات حین بازرسی و بهبود UX جریان احراز هویت در Castaminofen MVP را ثبت می‌کند.

## Root Cause

خطای ثبت‌نام اصلی ناشی از شرایطی نبود که در فرم یا route تعریف شده باشد. بررسی مستقیم نشان داد که API auth در runtime کار می‌کند و ثبت‌نام/ورود با درخواست مستقیم HTTP جواب می‌دهد. در نتیجه مشکل واقعی بیشتر روی تجربه کاربری ثبت‌نام و نمایش خطا، و همچنین ساختار layout مسیرهای auth بود.

## Investigation

- بررسی شد که صفحات login/register در `apps/web/src/app/login/page.tsx` و `apps/web/src/app/register/page.tsx` قرار دارند و با feature auth سازگار هستند.
- بازرسی `AppShell` نشان داد header/footer/bottom-navigation برای مسیرهای auth باید حذف شوند.
- بررسی `LoginForm.tsx` و `RegisterForm.tsx` نشان داد خطای `Not fetching` در repo پیدا نشد و پیام خطا احتمالاً از مسیرهای runtime یا browser-side نبود.
- بررسی مستقیم `auth/register` و `auth/login` روی API محلی با `curl` انجام شد و مسیرها سالم بودند.
- تنظیمات CORS و اجرای API محلی تایید شدند.

## Files Modified

- `apps/web/src/components/layout/app-shell.tsx`
- `apps/web/src/components/layout/header.tsx`
- `apps/web/src/features/auth/components/LoginForm.tsx`
- `apps/web/src/features/auth/components/RegisterForm.tsx`
- `docs/development/changelog.md`

## Files Added

- `docs/reports/auth-flow-fix-report.md`

## Architecture Impact

- تغییرات فقط در لایه نمایش auth و مسیریابی layout انجام شد.
- no changes to auth architecture, routes, or API contracts.
- AppShell behavior preserved for all non-auth routes.

## API Impact

- No API contract changes.
- Auth routes remain unchanged.
- Verified register/login endpoints directly with local API.

## Validation Results

- `pnpm lint` passed.
- `pnpm build` passed.
- auth pages no longer render global header/footer.
- Header uses `logo.png` at readable width.
- Login/Register use `icon.png`.
- Auth navigation provides register/login links.
- Existing routes unchanged.

## Commands Executed

- `pnpm -r lint`
- `pnpm build`
- `pnpm exec nest start --watch`
- `curl -i -s -X POST http://localhost:3001/api/v1/auth/register ...`
- `curl -i -s -X POST http://localhost:3001/api/v1/auth/login ...`

## Remaining Risks

- The literal `Not fetching` string was not present in source; if it appears in browser console it may originate from a runtime asset or browser extension, not repo source.
- The fix assumes the current `AppShell` route-based auth exclusion is sufficient for auth-only pages.

## Follow-up Recommendations

- Add an end-to-end auth test for login/register flow to catch browser-side errors.
- Consider a small QA pass on the auth route visuals in the browser.
