# Phase ADMIN.4 — Platform Configuration, Feature Management & System Control Center

## Objective

تبدیل فضای Admin از یک مرکز هوشمند و شفاف به یک Workspace کنترل و پیکربندی پلتفرم برای مدیریت وضعیت اکوسیستم، قابلیت‌ها، تنظیمات محتوا، ناوبری، هویت برند، سیاست‌های جامعه، تجربه‌ی پخش و ترجیحات سیستم به‌صورت UI-only و mock-backed.

## Scope

- افزودن داشبورد اصلی Configuration Workspace در مرز feature Admin.
- حفظ مسیرهای فعلی، auth flow، ownership Admin، مرزهای Design System، Creator/Community/Social و Player runtime.
- عدم اضافه کردن API واقعی، دیتابیس، permission engine، feature flag backend یا mutation runtime.
- استفاده از داده‌های typed mock و کامپوننت‌های موجود shared UI.

## Completed Work

- ساخت داشبورد اصلی Configuration Workspace با بخش‌های Platform Status و Quick Controls.
- پیاده‌سازی Feature Management Center برای stateهای enabled/disabled و impact preview.
- افزودن Content Configuration برای انواع محتوا و سیاست‌های نمایش/انتشار.
- افزودن Category & Topic Management با حالت‌های Create/Edit/Archive به‌صورت preview.
- اضافه کردن Navigation Configuration برای ناوبری موبایل و دسکتاپ و پیش‌نمایش همان دید کاربر.
- پیاده‌سازی Creator Platform Settings، Community Configuration، Player Configuration، Notification Configuration، Brand & Theme Configuration و System Preferences.
- اضافه کردن empty/loading state preview برای موقعیت‌های آماده‌ی آینده.
- افزودن تست‌های رگرسیونی برای render داشبورد configuration، feature management، navigation، content، creator، community، player و stateهای خالی/بارگذاری.

## Files Changed

- apps/web/src/features/admin/components/AdminConfigurationCenter.tsx
- apps/web/src/features/admin/components/AdminConfigurationCenter.test.tsx
- apps/web/src/features/admin/components/AdminDashboard.tsx
- apps/web/src/features/admin/data/mockAdminConfigurationData.ts
- apps/web/src/features/admin/index.ts
- apps/web/src/features/admin/types/configuration.types.ts
- docs/development/changelog.md
- docs/development/scripts.md
- docs/project-status.md
- docs/architecture-decisions.md

## DB/API/Frontend Changes

- DB: هیچ تغییر schema، migration یا migration runner اضافه نشد.
- API: هیچ endpoint یا contract جدید برای تنظیمات اضافه نشد.
- Frontend: افزوده شدن یک Workspace کنتراست‌محور برای Configuration در مرز Admin و اتصال آن به بخش settings در داشبورد Admin.

## Commands Run

- pnpm exec tsc -p apps/web/tsconfig.json --noEmit
- pnpm --filter @castaminofen/web test
- pnpm build

## Validation Results

- Type check: passed via pnpm exec tsc -p apps/web/tsconfig.json --noEmit
- Web test suite: passed via pnpm --filter @castaminofen/web test
- Repository build: passed via pnpm build
- Build evidence: Next.js production build completed successfully and generated static routes across the app shell.

## Known Limitations

- این فاز صرفاً UI و preview است و هیچ مسیر mutation واقعی برای تنظیمات، feature flags یا permissions ندارد.
- هیچ اتصال به backend یا persistence runtime برای configuration در این فاز ایجاد نشده است.
- نمایش‌ها از داده‌های mock typed استفاده می‌کنند تا مرز admin بدون drift باقی بماند.

## Next Step

- در فازهای بعدی، اتصال این Workspace به یک API تنظیمات mock-first یا backend-ready با قرارداد typed و permission-aware ممکن است انجام شود، اما در این فاز هیچ تصمیم غیرضروری برای runtime architecture یا database schema اتخاذ نشده است.
