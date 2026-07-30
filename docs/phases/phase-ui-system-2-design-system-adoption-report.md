# Phase UI.SYSTEM.2 — Design System Adoption Migration Report

## هدف
ادغام لایه‌ی رسمی Design System در سطوح اصلی تجربه‌ی کاربری Home, Library, Search, Profile, Create, Player و Community بدون تغییر در مسیرها، APIها، state ownership یا منطق کسب‌وکار.

## محدوده
- مهاجرت presentation UI به primitives مشترک در apps/web
- حفظ رفتار runtime و ownership featureها
- به‌روزرسانی regression coverage برای surface‌ی Community

## کارهای انجام‌شده
- جایگزینی layout و cardهای محلی با PageContainer، MediaCard، SectionHeader، Tag و primitives shared در Discovery/Library/Search/Profile/Create/Player/Community
- به‌روزرسانی DiscussionCard برای پشتیبانی از محتوای children و استفاده‌ی مجدد در تجربه‌ی Community
- افزودن/به‌روزرسانی تست برای اطمینان از render content و استفاده از shared card surface

## فایل‌های تغییر داده‌شده
- apps/web/src/components/design-system/social/discussion-card.tsx
- apps/web/src/features/community/components/CommunityPage.tsx
- apps/web/src/features/community/components/CommunityPage.test.tsx
- apps/web/src/features/discovery/components/DiscoveryPage.tsx
- apps/web/src/features/episodes/components/EpisodeCreateForm.tsx
- apps/web/src/features/library/components/LibraryPage.tsx
- apps/web/src/features/library/components/LibraryPodcastCard.tsx
- apps/web/src/features/player/components/PlayerBar.tsx
- apps/web/src/features/player/components/PlayerInfo.tsx
- apps/web/src/features/podcasts/PodcastForm.tsx
- apps/web/src/features/profile/components/ProfilePage.tsx
- apps/web/src/features/search/SearchPage.tsx
- apps/web/src/features/search/components/SearchResultsPanel.tsx

## اعتبارسنجی
- TypeScript check: موفق
- Web tests: 33 فایل تست، 108 تست موفق
- Production build: موفق

## محدودیت‌ها و یادداشت‌ها
- در حین build، چند warning ESLint/Next مربوط به img element و unused vars باقی مانده است که رفتار runtime را تحت‌تأثیر قرار نمی‌دهند.

## قدم بعدی پیشنهادی
- ادامه‌ی پاک‌سازی remaining duplicated UI patterns در سطوح جزئی‌تر و بهبود consistency در ویژگی‌های آینده.
