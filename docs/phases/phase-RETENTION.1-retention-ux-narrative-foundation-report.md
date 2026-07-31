# Phase RETENTION.1 — Retention UX Narrative Foundation Report

## Objective

تقویت لایه‌ی روایت بازگشت، حافظه‌ی شخصی و انگیزه‌ی مشارکت در مسیرهای فعلی محصول بدون افزودن قرارداد API، پایگاه داده، زیرساخت جدید یا مسیرهای محصول جدید. تمرکز روی افزایش حس «ادامه‌ی مسیر» و «بازگشت به تجربه‌ی قبلی» در سطوح موجود UI بود.

## Scope

### Included
- بازطراحی محتوای copy در مسیرهای Discovery، Library، Profile، Community، Create و Search
- تأکید بیشتر بر حافظه، بازگشت، شناخت شخصی و مشارکت در سطوح قابل مشاهده‌ی کاربر
- اضافه کردن یک regression lock برای زبان انگیزه‌ی Creator Growth در Creator Studio
- تأیید نهایی روی گیت‌های build، lint، typecheck و test برای سطح فرانت‌اند

### Explicitly Out of Scope
- تغییر قراردادهای backend
- تغییر schema یا migration
- تغییر مالکیت runtime Player
- افزودن feature جدید یا dependency جدید

## Completed Work

### 1. Discovery / Library / Profile memory framing
- مسیر Discovery با روایت «ادامه‌ی مسیر» و کشف شخصی‌سازی‌شده بازنویسی شد.
- Library به عنوان فضای حافظه و بازگشت کاربر بازتعریف شد.
- ProfileHero و ProfileKnowledgeSection از زبان «حافظه‌ی شخصی»، «بازگشت به لحظه‌ها» و «هویت مشارکتی» استفاده کردند.

### 2. Creator Studio motivation layer
- نسخه‌ی آزمایشگاهی و UI سمت create به لایه‌ی بازخورد مخاطب و رشد سازنده نزدیک شد.
- این تغییر در همان feature boundary Creator Studio باقی ماند و وابستگی جدیدی به runtime یا API نداشت.

### 3. Search and Community continuity guidance
- Search در حالت خالی، مسیر بعدی کاربر را با پیامِ راهنما و تداوم تجربه بهتر نشان داد.
- Community به‌شکل یک فضای مشارکت و بازگشت داستانی بازطراحی شد تا حس حضور و ادامه‌ی تعامل بیشتر شود.

### 4. Regression protection
- تست هدفمند Creator Studio برای ثابت‌سازی عبارت‌های رشد سازنده و بازخورد مخاطب به‌روزرسانی شد.
- تست Profile Knowledge به لایه‌ی نام‌گذاری حافظه‌ی شخصی بازگشت و با عنوان فارسی درست دوباره سازگار شد.

## Files Changed

- `apps/web/src/features/discovery/components/DiscoveryPage.tsx`
- `apps/web/src/features/library/components/LibraryPage.tsx`
- `apps/web/src/features/profile/components/ProfileHero.tsx`
- `apps/web/src/features/profile/components/ProfileKnowledgeSection.tsx`
- `apps/web/src/features/community/components/CommunityHome.tsx`
- `apps/web/src/features/create/components/CreatorStudioHome.tsx`
- `apps/web/src/features/search/components/SearchResultsPanel.tsx`
- `apps/web/src/features/create/components/CreatorStudioHome.test.tsx`
- `apps/web/src/features/profile/components/ProfileExperience.test.tsx`

## Backend / API / Frontend Impact

### Backend
- هیچ تغییر API، DTO، Prisma schema، controller یا service در این فاز انجام نشد.

### Frontend
- تنها سطوح presentation و copy در feature-owned UI به‌روزرسانی شدند.
- مالکیت runtime، state و routeها در مرزهای موجود حفظ شد.

## Validation Evidence

### Commands Run
1. `cd /workspaces/castaminofen-starter && pnpm --filter @castaminofen/web exec tsc --noEmit`
2. `cd /workspaces/castaminofen-starter && pnpm --filter @castaminofen/web build`
3. `cd /workspaces/castaminofen-starter && pnpm --filter @castaminofen/web test`
4. `cd /workspaces/castaminofen-starter && pnpm --filter @castaminofen/web lint`

### Results
- TypeScript compile gate: passed
- Production build: passed; Next.js compiled successfully and emitted prerendered routes
- Test suite: 45/45 test files passed and 153/153 tests passed
- Lint: completed with existing warnings only; no blocking errors were introduced by this phase

## Known Limitations

- برخی warnings موجود lint/Next.js در repository همچنان باقی مانده‌اند و به‌عنوان warning غیرمسدود شناخته می‌شوند.
- این فاز به‌صورت presentation-only باقی ماند و هیچ تصمیم معماری جدید یا اشتراک‌گذاری داده‌ای اضافه نکرد.

## Next Recommended Step

در مرحله‌ی بعد، برای حفظ کیفیت release، توصیه می‌شود همان warnings غیرمسدود موجود در repo به‌صورت هدفمند و جداگانه پاک‌سازی شوند تا گیت‌های static validation برای صفحه‌های feature-owned همچنان کاملاً شفاف بمانند.
