# Phase RSS.4 — Prisma Schema & Database Migration Report

## هدف

پیاده‌سازی لایه‌ی persistence برای RSS در محدودوده‌ی MVP بدون ورود به fetch، parse، sync service یا API.

## محدوده

- اضافه‌کردن مدل FeedSource به عنوان زیرساخت عملیاتی
- گسترش مدل Podcast برای نگهداری رابطه با FeedSource و منبع RSS داخلی
- گسترش مدل Episode برای فیلدهای لازم برای sync آینده
- ایجاد migration ایمن و بدون از دست رفتن داده

## کارهای انجام‌شده

- مدل FeedSource با فیلدهای عملیاتی شامل id، type، url، syncStatus، lastSyncedAt، lastError، createdAt و updatedAt اضافه شد.
- enumهای FeedSourceType و SynchronizationStatus برای محدود کردن مقادیر قابل‌استفاده در MVP تعریف شدند.
- رابطه‌ی یک‌به‌یک بین FeedSource و Podcast از طریق feedSourceId در Podcast پیاده‌سازی شد.
- فیلدهای guid، audioUrl و duration به Episode اضافه شدند تا امکان persistence برای sync آینده فراهم شود.
- ایندکس‌های لازم برای lookupهای sync، guid و podcastId اضافه شدند.
- migration Prisma با نام 20260727131752_add_feedsource_rss_persistence ایجاد و اعمال شد.

## فایل‌های تغییر کرده

- apps/api/prisma/schema.prisma
- apps/api/prisma/migrations/20260727131752_add_feedsource_rss_persistence/migration.sql

## مدل‌ها و روابط

- FeedSource: مدل عملیاتی برای نگهداری منبع RSS
- Podcast: همچنان مدل canonical کسب‌وکار و با رابطه‌ی اختیاری به FeedSource
- Episode: همچنان متعلق به Podcast و با فیلدهای sync-aware

## enums اضافه‌شده

- FeedSourceType.RSS
- SynchronizationStatus.IDLE / RUNNING / SUCCESS / FAILED

## محدودیت‌ها و فیلدهای عمدتاً حذف‌شده از MVP

- هیچ فیلد تحلیلی، transcript، recommendation، download support یا قابلیت پخش اضافه نشد.
- هیچ منطق fetch یا parse پیاده‌سازی نشد.

## دستورات اجرا شده

- pnpm prisma validate
- pnpm prisma migrate dev --name add_feedsource_rss_persistence
- pnpm prisma generate

## وضعیت اعتبارسنجی

- Prisma schema با موفقیت valid شد.
- Migration با موفقیت ایجاد و اعمال شد.
- Prisma Client با موفقیت regenerated شد.

## نکته‌ی معماری

- مالکیت تجاری در Podcast و Episode حفظ شده است.
- FeedSource فقط زیرساخت عملیاتی برای sync آینده است.
- این مرحله فقط لایه‌ی persistence را پوشش می‌دهد و خارج از محدوده‌ی MVP باقی می‌ماند.
