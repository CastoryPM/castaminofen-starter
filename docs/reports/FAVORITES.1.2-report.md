# FAVORITES.1.2 - Prisma Schema Stabilization & Full Validation

## Summary

در این فاز، مشکل تایید نهایی FAVORITES.1.1 را با تثبیت schema Prisma و تولید مجدد Prisma Client رفع کردیم. روابط معکوس `FavoriteEpisode` به مدل‌های `User` و `Episode` اضافه شدند، migration جدید ساخته و اعمال شد، و سپس تمام اعتبارسنجی‌های API و وب بدون خطا اجرا شدند.

## What was fixed

- افزودن فیلد inverse relation `favoriteEpisodes FavoriteEpisode[]` به مدل `User`.
- افزودن فیلد inverse relation `favoriteEpisodes FavoriteEpisode[]` به مدل `Episode`.
- قالب‌بندی مجدد schema با `prisma format`.
- تولید مجدد Prisma Client با `prisma generate`.
- ایجاد و اعمال migration جدید `20260729194107_add_favorite_episode`.
- تایید Build و Test برای API و وب.

## Root Cause

خطای build API از اینجا نشأت می‌گرفت که مدل جدید `FavoriteEpisode` روابط `user` و `episode` را تعریف کرده بود اما فیلدهای معکوس متناظر را در مدل‌های `User` و `Episode` نداشت. به همین دلیل Prisma schema validation شکست خورد، Prisma Client تولید نشد و `this.prisma.favoriteEpisode` در `LibraryService` تایپ نشده باقی ماند.

## Prisma Changes

- `apps/api/prisma/schema.prisma`
  - اضافه شدن `favoriteEpisodes FavoriteEpisode[]` به مدل `User`.
  - اضافه شدن `favoriteEpisodes FavoriteEpisode[]` به مدل `Episode`.
- `apps/api/prisma/migrations/20260729194107_add_favorite_episode`
  - migration جدید ایجاد شد و به پایگاه داده محلی اعمال شد.

## Validation Results

- API tests: PASS (`pnpm --filter @castaminofen/api test`)
- API build: SUCCESS (`pnpm --filter @castaminofen/api build`)
- Web tests: PASS (`pnpm --filter @castaminofen/web test`)
- Web build: SUCCESS (`pnpm --filter @castaminofen/web build`)
- TypeScript status: ✅ no errors in API and web builds

## Regression Check

- Player: unchanged
- Queue: unchanged
- Library ownership: unchanged (persistence remains در `LibraryService`)
- Favorites UX: unchanged
- No new product behavior added.

## Remaining Recommendations

- در CI، اطمینان حاصل شود که `pnpm --filter @castaminofen/api exec prisma generate` قبل از build API اجرا می‌شود.
- در صورت تغییر آینده‌ی schema، `prisma migrate dev --name <name>` و `prisma generate` باید هم‌زمان در گردش کاری توسعه اجرا شوند.
