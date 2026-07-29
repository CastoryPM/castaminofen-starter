# Phase Search.2 — Build Compatibility Report

## خلاصه اجرای فاز

- هدف این فاز، رفع خطای ساخت Next.js در مسیر /search بدون تغییر در رفتار جستجو و بدون وارد کردن تغییرات غیرضروری در معماری بود.
- راه‌حل اعمال‌شده، افزودن Suspense در سطح صفحه‌ی Search برای سازگاری با الزامات prerender Next.js در App Router بود.

## خلاصه تغییرات

- در [apps/web/src/app/search/page.tsx](../../apps/web/src/app/search/page.tsx)، بخش render صفحه‌ی Search داخل یک Suspense boundary قرار گرفت.
- این تغییر، بدون تغییر در منطق جستجو، URL-first behavior، نمایش نتایج و ناوبری موجود، مشکل prerender را برطرف کرد.

## Root Cause

- صفحه‌ی Search از `useSearchParams()` در یک component client-side استفاده می‌کند.
- در Next.js 14 با App Router، این hook در صفحه‌ای که هنگام prerender اجرا می‌شود باید در یک Suspense boundary قرار گیرد.
- در نتیجه، build در مرحله‌ی Generating static pages برای مسیر `/search` با خطای `useSearchParams() should be wrapped in a suspense boundary` متوقف می‌شد.

## فایل‌های تغییر کرده

- [apps/web/src/app/search/page.tsx](../../apps/web/src/app/search/page.tsx)

## تصمیم‌های معماری

- مرز feature Search بدون تغییر باقی ماند.
- هیچ تغییری در منطق جستجو، قرارداد API، state management یا رفتار URL انجام نشد.
- برای حفظ حداقل تغییر، راه‌حل Suspense در سطح route اعمال شد و از ایجاد abstraction یا refactor اضافی پرهیز شد.

## نتایج اعتبارسنجی

- دستور اجرا شده: `pnpm --filter @castaminofen/web build`
- نتیجه: موفق
- وضعیت build: Next.js production build با موفقیت تکمیل شد و مسیر `/search` نیز در خروجی build ثبت شد.

## مشکلات باقی‌مانده

- در این فاز، هیچ مشکل دیگری در رابطه با Search گزارش نشده و رفتار موجود حفظ شده است.

## پیشنهاد Conventional Commit

- `fix(web): wrap search page in suspense for next build`
