# Phase 3.4.3 — Search Implementation Report

## خلاصه اجرای فاز

- هدف این فاز، تکمیل بخش باقیمانده‌ی Search.1 در چارچوب معماری موجود و بدون تغییر در مرزهای مالکیت یا رفتار Runtime بود.
- خروجی نهایی، تکمیل هم‌زمان جستجوی پادکست و اپیزود با حفظ مرز feature-owned برای Search و استفاده از قرارداد موجود برای داده‌های اپیزود و پادکست بود.

## خلاصه تغییرات

- صفحه‌ی Search از طریق پارامترهای URL (`q` و `page`) مدیریت شد.
- ورودی جستجو به‌روزرسانی URL را انجام می‌دهد و در صورت تغییر query، صفحه‌ی نتایج به‌صورت مناسب بازسازی می‌شود.
- جستجوی اپیزود از طریق قرارداد موجود API به‌صورت مستقیم پشتیبانی شد و نتیجه‌ها در بخش جداگانه‌ی اپیزودها نمایش داده شدند.
- هر نتیجه‌ی اپیزود شامل عنوان اپیزود، عنوان پادکست مرتبط و Artwork مربوطه شد.
- هر نتیجه‌ی اپیزود به صفحه‌ی موجود جزئیات اپیزود در مسیر [apps/web/src/app/episodes/[id]/page.tsx](../../apps/web/src/app/episodes/[id]/page.tsx) متصل شد.
- رفتار مرتبط با پادکست بدون تغییر در مسیر و UX قبلی حفظ شد.

## فایل‌های تغییر کرده

- [apps/web/src/features/search/SearchPage.tsx](../../apps/web/src/features/search/SearchPage.tsx)
- [apps/web/src/features/search/components/SearchResultsPanel.tsx](../../apps/web/src/features/search/components/SearchResultsPanel.tsx)
- [apps/web/src/features/search/hooks/useSearchResults.ts](../../apps/web/src/features/search/hooks/useSearchResults.ts)
- [packages/shared-types/src/index.ts](../../packages/shared-types/src/index.ts)
- [packages/shared-types/dist/index.d.ts](../../packages/shared-types/dist/index.d.ts)

## تصمیم‌های معماری

- مرز feature Search در [apps/web/src/features/search](../../apps/web/src/features/search) حفظ شد.
- از قرارداد موجود برای جستجوی اپیزود استفاده شد و هیچ endpoint جدیدی در Backend اضافه نشد.
- رفتار Runtime و ساختار فعلی صفحه‌ی Search بدون تغییرات گسترده حفظ شد.
- مدیریت state به‌صورت URL-first انجام شد و از افزودن Zustand یا abstraction جدید پرهیز شد.

## نتایج اعتبارسنجی

- دستور اجرا شده: `pnpm --filter @castaminofen/web build`
- نتیجه‌ی فعلی:
  - Build در مرحله‌ی Compile موفق بود.
  - Build در مرحله‌ی Type Check/Next build با خطای پیش‌وجود در [apps/web/src/features/library/utils/library-mappers.ts](../../apps/web/src/features/library/utils/library-mappers.ts) متوقف شد.

### خطای اعتبارسنجی گزارش‌شده

- خطای فعلی در [apps/web/src/features/library/utils/library-mappers.ts](../../apps/web/src/features/library/utils/library-mappers.ts) رخ می‌دهد و مربوط به Search.1 نیست.
- این مشکل پیش از این فاز وجود داشته و خارج از محدوده‌ی Search.1 است.
- در نتیجه، هیچ regression جدیدی ناشی از تغییرات Search.1 گزارش نمی‌شود.

## وضعیت نهایی Search.1

- جستجوی پادکست: تکمیل شد.
- جستجوی اپیزود: تکمیل شد.
- پشتیبانی API برای جستجوی اپیزود: با استفاده از قرارداد موجود [apps/web/src/lib/episodes.ts](../../apps/web/src/lib/episodes.ts) و [apps/api/src/episodes/episodes.service.ts](../../apps/api/src/episodes/episodes.service.ts) محقق شد.
- بخش نتایج اپیزود: تکمیل شد.
- Artwork اپیزود/پادکست مرتبط: در کارت‌های نتایج ارائه شد.
- ناوبری به صفحه‌ی جزئیات اپیزود: تکمیل شد.

## پیشنهاد Conventional Commit

- `feat(search): complete podcast and episode search results`
