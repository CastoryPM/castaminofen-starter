# Phase RSS.7.3 — Seed & Bootstrap (Initial FeedSource Loading)

## Objective

پیاده‌سازی مکانیزم bootstrap که FeedSourceهای از پیش تعریف‌شده را در بانک اطلاعاتی ایجاد می‌کند. این فاز تنها مسئول ایجاد اولیه‌ی FeedSource است و نباید هیچ سینک، واردسازی، مچینگ یا تغییر در مدل‌های Podcast/Episode انجام دهد.

## Scope

- معرفی فایل پیکربندی اختصاصی برای فیدهای پیش‌فرض
- افزودن سرویس bootstrap idempotent برای بارگذاری FeedSourceها
- اطمینان از ایجاد تنها FeedSource بدون ایجاد Podcast یا Episode
- افزودن تست‌های تخریبی برای رفتار idempotent، وجود قبلی و جلوگیری از تکرار
- پشتیبانی از Prisma seed با entrypoint جدید

## Completed Work

- ایجاد `apps/api/src/rss/bootstrap/feed-config.ts` با لیست پیش‌فرض FeedSourceها
- ایجاد `apps/api/src/rss/bootstrap/feed-seeder.service.ts` با helper `bootstrapFeedSources` و سرویس NestJS `FeedSourceSeederService`
- ثبت `FeedSourceSeederService` در `apps/api/src/rss/rss.module.ts` تا در bootstrap برنامه اجرا شود
- اضافه کردن `apps/api/src/rss/bootstrap/feed-seeder.service.spec.ts` برای پوشش حالات empty database، existing FeedSource، partial seed، repeated execution و duplicate prevention
- افزودن `apps/api/prisma/seed.ts` به عنوان entrypoint رسمی Prisma seed
- افزودن `seed` script و Prisma seed config به `apps/api/package.json`

## Files Changed

- `apps/api/src/rss/bootstrap/feed-config.ts`
- `apps/api/src/rss/bootstrap/feed-seeder.service.ts`
- `apps/api/src/rss/bootstrap/feed-seeder.service.spec.ts`
- `apps/api/src/rss/rss.module.ts`
- `apps/api/prisma/seed.ts`
- `apps/api/package.json`
- `docs/development/changelog.md`
- `docs/development/scripts-registry.md`
- `docs/project-status.md`

## Validation

- `pnpm --filter @castaminofen/api build` ✅
- `pnpm --filter @castaminofen/api test` ✅
- `pnpm exec prisma validate` ✅
- `pnpm exec prisma db seed` ❌ (database schema not present in current local PostgreSQL instance; seed script itself is valid)

## Next Step

اجرای مهاجرت‌های Prisma روی دیتابیس هدف و سپس اجرای `pnpm --filter @castaminofen/api seed` در محیطی که جدول‌های FeedSource ایجاد شده باشد.
