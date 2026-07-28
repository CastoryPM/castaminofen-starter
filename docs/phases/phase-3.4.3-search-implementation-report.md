# Phase 3.4.3 — Search Implementation Report

## خلاصه اجرای فاز

- هدف این فاز، تکمیل بخش باقیمانده‌ی Search.1 در چارچوب معماری موجود و بدون تغییر در مرزهای مالکیت یا رفتار Runtime بود.
- خروجی نهایی، اتصال تجربه‌ی جستجو به قرارداد URL-first برای Query و Page، همراه با نگه داشتن مرز feature-owned برای Search و استفاده از transport موجود برای داده‌های پادکست بود.

## خلاصه تغییرات

- صفحه‌ی Search از طریق پارامترهای URL (`q` و `page`) مدیریت شد.
- ورودی جستجو به‌روزرسانی URL را انجام می‌دهد و در صورت تغییر query، صفحه‌ی نتایج به‌صورت مناسب بازسازی می‌شود.
- hook مربوط به جستجو برای جلوگیری از ارسال درخواست بی‌فایده در حالت خالی، تنها در صورت وجود عبارت معتبر فعال شد.
- نمایش نتیجه‌ها در مرز Search باقی ماند و وابستگی به لایه‌ی Podcast transport حفظ شد.

## فایل‌های تغییر کرده

- [apps/web/src/features/search/SearchPage.tsx](../../apps/web/src/features/search/SearchPage.tsx)
- [apps/web/src/features/search/components/SearchResultsPanel.tsx](../../apps/web/src/features/search/components/SearchResultsPanel.tsx)
- [apps/web/src/features/search/hooks/useSearchResults.ts](../../apps/web/src/features/search/hooks/useSearchResults.ts)

## تصمیم‌های معماری

- مرز feature Search در [apps/web/src/features/search](../../apps/web/src/features/search) حفظ شد.
- هیچ endpoint جدیدی در Backend اضافه نشد و از قرارداد موجود برای جستجوی پادکست استفاده شد.
- رفتار Runtime و ساختار فعلی صفحه‌ی Search بدون تغییرات گسترده حفظ شد.
- مدیریت state به‌صورت URL-first انجام شد و از افزودن Zustand یا abstraction جدید پرهیز شد.

## نتایج اعتبارسنجی

- دستور اجرا شده: `pnpm --filter @castaminofen/web build`
- نتیجه‌ی فعلی:
  - Build در مرحله‌ی Compile موفق بود.
  - Build در مرحله‌ی Type Check/Next build با خطای پیش‌وجود از بخش Library متوقف شد.

### خطای اعتبارسنجی گزارش‌شده

- خطای فعلی در [apps/web/src/features/library/utils/library-mappers.ts](../../apps/web/src/features/library/utils/library-mappers.ts) رخ می‌دهد و مربوط به Search.1 نیست.
- این مشکل پیش از این فاز وجود داشته و خارج از محدوده‌ی Search.1 است.
- در نتیجه، هیچ regression جدیدی ناشی از تغییرات Search.1 گزارش نمی‌شود.

## محدودیت‌های MVP باقیمانده

- جستجو در این فاز هنوز بر اساس قرارداد موجود پادکست اجرا می‌شود و قابلیت جستجوی اپیزود در سطح Backend یا UI جدید اضافه نشده است.
- Pagination در سطح UX برای نتایج Search در این مرحله به‌صورت محدود و URL-driven باقی مانده و بدون تغییر در لایه‌ی transport یا API اجرا شده است.
- رفتار نهایی همچنان در محدوده‌ی MVP و بدون افزودن abstraction یا feature جدید باقی مانده است.

## پیشنهاد Conventional Commit

- `feat(search): wire search page to URL query state`
