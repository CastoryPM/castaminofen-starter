# Phase Mobile Shell Consolidation Report

تاریخ: 2026-07-30

## هدف

یکپارچه‌سازی شل موبایل در کل اپلیکیشن Castaminofen بر اساس طراحی Home به‌عنوان مرجع، با حفظ هویت برند و بدون تغییر در route، API، store یا منطق کسب‌وکار.

## Scope

- یکپارچه‌سازی Header موبایل
- یکپارچه‌سازی Bottom Navigation
- استخراج اجزای مشترک برای شل موبایل
- اعمال شل یکپارچه بر صفحه Library بدون تغییر محتوای خاص آن
- حفظ استفاده از tokenها، spacing، radius و motion موجود در پروژه

## کارهای انجام‌شده

### 1) ایجاد اجزای مشترک شل موبایل
- ساخت فایل [apps/web/src/components/layout/app-shell-config.ts](../../apps/web/src/components/layout/app-shell-config.ts) برای تعریف itemهای ناوبری و پیکربندی header بر اساس pathname.
- ساخت فایل [apps/web/src/components/layout/mobile-header.tsx](../../apps/web/src/components/layout/mobile-header.tsx) برای Header موبایل یکسان در کل اپلیکیشن.
- به‌روزرسانی [apps/web/src/components/layout/bottom-navigation.tsx](../../apps/web/src/components/layout/bottom-navigation.tsx) برای استفاده از سبک یکپارچه، active state، spacing یکنواخت و safe-area پشتیبانی‌شده.

### 2) ادغام شل در App Shell
- به‌روزرسانی [apps/web/src/components/layout/app-shell.tsx](../../apps/web/src/components/layout/app-shell.tsx) تا از Header و Bottom Navigation مشترک استفاده کند.
- بهبود سبک‌های کلیدی در [apps/web/src/app/globals.css](../../apps/web/src/app/globals.css) برای ایجاد تجربه موبایل منسجم با motion نرم‌تر و spacing یکپارچه.

### 3) اعمال روی صفحه Library
- به‌روزرسانی [apps/web/src/features/library/components/LibraryPage.tsx](../../apps/web/src/features/library/components/LibraryPage.tsx) تا زیر شل یکپارچه قرار گیرد و حس جداگانه بودن صفحه از بین برود.

### 4) تست و پوشش رگرسیون
- اضافه شدن تست [apps/web/src/components/layout/app-shell-config.test.ts](../../apps/web/src/components/layout/app-shell-config.test.ts) برای اطمینان از رفتار ناوبری و پیکربندی header.

## فایل‌های تغییر یافته

- [apps/web/src/components/layout/app-shell.tsx](../../apps/web/src/components/layout/app-shell.tsx)
- [apps/web/src/components/layout/app-shell-config.ts](../../apps/web/src/components/layout/app-shell-config.ts)
- [apps/web/src/components/layout/app-shell-config.test.ts](../../apps/web/src/components/layout/app-shell-config.test.ts)
- [apps/web/src/components/layout/bottom-navigation.tsx](../../apps/web/src/components/layout/bottom-navigation.tsx)
- [apps/web/src/components/layout/header.tsx](../../apps/web/src/components/layout/header.tsx)
- [apps/web/src/components/layout/mobile-header.tsx](../../apps/web/src/components/layout/mobile-header.tsx)
- [apps/web/src/app/globals.css](../../apps/web/src/app/globals.css)
- [apps/web/src/features/library/components/LibraryPage.tsx](../../apps/web/src/features/library/components/LibraryPage.tsx)

## نتایج اعتبارسنجی

- تست‌ها: 30 فایل تست، 101 تست موفق
- Build: موفق در Next.js production build

## نتیجه نهایی

شِل موبایل در کل اپلیکیشن اکنون یکپارچه، هماهنگ و مبتنی بر هویت Castaminofen است و صفحه Library از نظر Header، Bottom Navigation و تجربه‌ی کلی موبایل با بقیه‌ی اپلیکیشن یک‌دست شده است.
