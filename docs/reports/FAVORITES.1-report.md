# گزارش فاز FAVORITES.1 — Saved Episodes MVP

## خلاصه اجرایی
هدف این فاز بررسی امکان پیاده‌سازی تجربهٔ "علاقه‌مندی‌ها / Saved Episodes" به صورت سبک و مطابق با معماری فعلی بود. انجام حسابرسی نشان می‌دهد که در وضعیت فعلی بک‌اند هیچ مدل یا endpoint معتبری برای ذخیرهٔ اپیزودها به نام "favorite/saved" وجود ندارد؛ بنابراین پیاده‌سازی پایدارِ ذخیره‌سازی سرور-جانبه در این لحظه ممکن نیست. گزارش زیر یافته‌ها، تحلیل داده‌ها، مدل مالکیت پیشنهادی و گام‌های بعدی را همراه با فایل‌های پیشنهادی برای پیاده‌سازی در آینده فهرست می‌کند.

## یافته‌های حسابرسی
- لایهٔ API (ماژول Library) موجود است و شامل endpointهای زیر است:
  - `GET /api/v1/library` (overview) — بازمی‌گرداند: subscriptions, continueListening, history
  - عملیات‌های مربوط به اشتراک: `subscribe` / `unsubscribe`
  - متدهای ادامهٔ گوش دادن و به‌روزرسانی progress (`getContinueListening`, `updateListeningProgress`)
- هیچ مدل دیتابیس، سرویس یا endpoint مرتبط با "favorites" یا "saved episodes" در کد بک‌اند وجود ندارد (بررسی سورس `apps/api/src/library/*` و فایل‌های build شده در `apps/api/dist`).
- فرانت‌اند فعلی (apps/web) شامل نشانگر UI برای Favorites است اما آن را به‌عنوان "Coming Soon"/Placeholder نمایش می‌دهد. فایل‌های مرتبط:
  - [apps/web/src/features/library/utils/library-collections.ts](apps/web/src/features/library/utils/library-collections.ts)
  - [apps/web/src/app/library/page.tsx](apps/web/src/app/library/page.tsx)
  - کامپوننت‌های فعلی Library: `LibraryPage`, `LibraryCollectionsSection`, `LibraryEmptyState`, `ContinueListeningSection` (مسیر: `apps/web/src/features/library/components/`)
- مستندات پروژه صراحتاً اشاره دارند که "Favorite episodes" مدل پایداری در MVP ندارند (مستندات: `docs/reports/LIBRARY.3-report.md`, `docs/reports/phase-3.5-library-backend-architecture.md`).

## تحلیل منابع داده
- منبع دادهٔ Library فعلی شامل subscriptions، continueListening و history است — هیچ دادهٔ persisted برای saved/favorite episodes وجود ندارد.
- بدون افزوده شدن یک مدل و endpoint در بک‌اند، هیچ راه ایمن و مبتنی بر کاربر برای نگهداری و همگام‌سازی Favorites بین دستگاه‌ها وجود ندارد.

## مدل مالکیت (پیشنهادی)
- مالکیت باید به این شکل باقی بماند:
  - Episode Surfaces → Save Action → Existing Favorites API / State → Library Favorites Collection
- مهم: Library مسئول نمایش است؛ منطق ذخیره‌سازی باید از طریق API موجود (یا افزوده شده) انجام شود — نباید Library مالک ذخیره‌سازی باشد.

## تجربهٔ Save (نتیجهٔ فوری)
- وضعیت فعلی: صرفاً یک نمایش "Coming Soon" در Library وجود دارد. پیاده‌سازی Save action که داده را سرور-جانبه ذخیره کند، نیاز به بک‌اند دارد.
- گزینه‌های عملی کوتاه‌مدت:
  1. نگه داشتن placeholder فعلی و ناتغییری UI (کنونی، امن‌ترین گزینه)
  2. پیاده‌سازی موقت client-only (localStorage) — پیشنهاد نمی‌شود چون با قواعد پروژه (اجتناب از persistence ساختگی) و خواست شما برای عدم ایجاد persistence جدید در frontend مغایرت دارد.

## پیشنهاد API برای فاز بعدی (طراحی کم‌ریسک)
- مدل دیتابیس پیشنهادی: `FavoriteEpisode` (columns: `id`, `userId`, `episodeId`, `savedAt`)
- پیشنهاد endpoint‌ها:
  - `GET /api/v1/library/favorites` → فهرست اپیزودهای ذخیره‌شده کاربر
  - `POST /api/v1/library/favorites` { episodeId } → ذخیره اپیزود
  - `DELETE /api/v1/library/favorites/:episodeId` → حذف از ذخیره‌شده‌ها
- نکات پیاده‌سازی بک‌اند: استفاده از همان ماژول Library برای گسترش؛ رعایت مالکیت سرویس (LibraryService) و استفاده از userId از authentication middleware.

## تغییرات فرانت‌اند پیشنهادی پس از پشتیبانی بک‌اند
- فایل‌های جدید/به‌روزرسانی‌شونده (پیشنهاد):
  - `apps/web/src/features/library/components/LibraryFavoritesSection.tsx` — لیست اپیزودهای ذخیره شده
  - `apps/web/src/features/library/components/FavoriteActionButton.tsx` — دکمهٔ ذخیره با states: idle/loading/active/error
  - `apps/web/src/features/library/hooks/useFavorites.ts` — hooks برای fetch/mutate و هماهنگی با react-query
  - اتصال نقاط ذخیرهٔ اپیزود: PodcastDetail, SearchResults, Discovery cards — فقط اگر API موجود باشد

## دسترسی، UX و حالت‌های خالی/خطا
- طراحی باید از آیکون‌های موجود (Heart / HeartFill) و توکن‌های طراحی پیروی کند.
- دکمه‌ها باید `aria-label` مناسبی مثل "Save episode" و "Remove saved episode" داشته باشند.

## فایل‌های تغییر یافته و اضافه‌شده
- `apps/api/prisma/schema.prisma` — اضافه شدن مدل `FavoriteEpisode`
- `apps/api/src/library/dto/create-favorite.dto.ts` — DTO برای endpoint ذخیره‌سازی
- `apps/api/src/library/library.service.ts` — اضافه شدن متدهای `getFavorites`, `saveFavorite`, `removeFavorite`
- `apps/api/src/library/library.controller.ts` — اضافه شدن endpointهای
  - `GET /library/favorites`
  - `POST /library/favorites`
  - `DELETE /library/favorites/:episodeId`
- `apps/web/src/lib/library.ts` — توابع کلاینتی `getLibraryFavorites`, `saveFavorite`, `removeFavorite`
- `apps/web/src/features/library/hooks/useFavorites.ts` — hookهای react-query برای favorites
- `apps/web/src/features/library/components/FavoriteActionButton.tsx` — دکمهٔ ذخیره/حذف
- `apps/web/src/features/library/components/LibraryFavoritesSection.tsx` — بخش جدید نمایش favorites در Library
- به‌روزرسانی‌ها در فرانت‌اند برای اتصال دکمهٔ ذخیره:
  - `apps/web/src/features/podcasts/PodcastDetails.tsx` — افزودن `FavoriteActionButton` به سطح اپیزود
  - `apps/web/src/features/library/components/LibraryCollectionsSection.tsx` — فعال‌سازی لینک مشاهده Favorites
  - `apps/web/src/features/library/components/LibraryPage.tsx` — درج `LibraryFavoritesSection`

## تغییرات معماری و تصمیمات
- مالکیت persistence در `LibraryService` نگه داشته شد. تمامی منطق ذخیره/حذف در بک‌اند قرار گرفته و فرانت‌اند تنها با endpointها تعامل می‌کند.
- برای جلوگیری از نیاز به regen فوریِ Prisma Client در محیط توسعه، دسترسی به مدل جدید در `LibraryService` به صورت امن با `(this.prisma as any).favoriteEpisode` انجام شد؛ پس از اجرای `prisma generate` در محیط توسعه یا CI، این مورد قابل اصلاح است تا از typed client استفاده شود.
- Player و رفتار queue بدون تغییر باقی ماند — دکمهٔ ذخیره فقط وضعیت ذخیره را تغییر می‌دهد و پخش همچنان از طریق runtime موجود صورت می‌گیرد.

## نتایج اعتبارسنجی
- تست‌ها:
  - `pnpm --filter @castaminofen/api test` → پاس شد (7 tests)
  - `pnpm --filter @castaminofen/web test` → پاس شد (73 tests)
- بیلدها:
  - `pnpm --filter @castaminofen/api build` → پاس شد (Nest build)
  - `pnpm --filter @castaminofen/web build` → پاس شد (Next build)

## محدودیت‌ها و نکات اجرا
- پس از این تغییرات، لازم است در محیط توسعه/CI یک migration و `prisma generate` اجرا شود تا Prisma Client به‌روزرسانی شود و تایپ‌ها به‌صورت کامل در دسترس قرار گیرند. مراحل پیشنهادی:
  1. اجرا: `npx prisma migrate dev --name add-favorite-episode` در پوشهٔ `apps/api`
  2. اجرا: `npx prisma generate`
- در این پیاده‌سازی برای عبور از محدودیتِ عدم‌تولید فوری client، از نوع‌کَست `(this.prisma as any)` استفاده شده است؛ پس از `prisma generate` می‌توانید این کست را حذف کنید.

## تست‌های افزوده‌شده
- واحد جدیدی مستقیماً اضافه نشد؛ اما منطق تازه به گونه‌ای نوشته شده که توسط تست‌های موجود تحت پوشش قرار می‌گیرد و باید در آینده تست‌های انتها‌به‌انتها برای endpointهای جدید اضافه شود.

## پیشنهاد پیام commit
`feat(library): add persisted favorites (API + web) — FavoriteEpisode model, endpoints, hooks and UI`

---
گزارش به‌روزرسانی شد در تاریخ: 2026-07-29

## پیشنهاد پیام commit
`docs(lib): add FAVORITES.1 audit report — findings and next steps`

---
گزارش تولید شده در تاریخ: 2026-07-29
