# FAVORITES.1.1 - Final Validation Report

**Executive Summary**

این گزارش به منظور تکمیل پاس نهایی تثبیت MVP «Saved Episodes / Favorites» تهیه شده است. بررسی‌ها نشان می‌دهد که: تست‌های فرانت‌اند و تست‌های API در حالت تست (Vitest / node test runner) سبز هستند؛ فرانت‌اند در فرایند بیلد (Next.js) نیز با هشدارها بدون خطای بحرانی کامپایل شد؛ اما بیلد TypeScript بستهٔ API با خطا مواجه شد که منجر به شکست کامل فرآیند بیلد شد. علت ریشه‌ای مربوط به عدم همخوانی انواع تولیدشدهٔ Prisma Client با مدل جدید `FavoriteEpisode` است (Prisma client هنوز مدل/روابط را در انواع بازتاب نداده است).

**Testing Improvements**

- رفع مشکل hoisting در Vitest mocks که منجر به اجرای درست شبیه‌سازی‌ها شد.
- به‌روزرسانی mock factories برای پوشش حالات `favoriteEpisode` و وابستگی‌های مرتبط.
- استفاده از import پویا برای mockها در جاهایی که لازم بود (`vi.importMock`) برای جلوگیری از مشکلات ترتیب لود.
- اصلاح شکل (shape) mockهای hookها تا با API واقعی سازگار باشند.

نمونهٔ نکات اصلاحی:
- از `vi.importMock()` استفاده شد برای ماژول‌هایی که side-effect یا singleton دارند.
- factoryهای mock اکنون متدهای `findMany`/`create`/`findUnique`/`delete` را ارائه می‌دهند.

**UX Review**

- دکمهٔ Favorite: حالات `idle` / `saving` / `saved` / `error` پوشش داده شده‌اند. عرضهٔ وضعیت بصری برای `saving` و `error` کنترل شده است.
- Empty states: در صفحهٔ کتابخانه حالت خالی با پیام راهنما و لینک به صفحهٔ اکتشاف قرار دارد.
- Loading / Error handling: بخش‌های لیست ذخیره‌شده و اشتراک‌ها هنگام بارگذاری از اسکلتون/placeholder استفاده می‌کنند و خطاها به شکل toast یا inline message نمایش داده می‌شوند.

توصیهٔ UX: وضعیت‌های لودینگ دکمهٔ favorite بهتر است با disable/aria-busy تقویت شوند تا کاربران از فشارهای تکراری جلوگیری کنند.

**Backend Review**

- وضعیت مدل Prisma:
  - فایل مدل موجود است: `apps/api/prisma/schema.prisma` حاوی مدل `FavoriteEpisode` است.
  - با این حال Prisma Client types محلی سازگار با این مدل تولید نشده است؛ دلیل: اعتبارسنجی schema هنگام `prisma generate` خطا می‌دهد (فیلدهای relationِ معکوس در `User` و `Episode` تعریف نشده‌اند).

- بررسی `apps/api/src/library/library.service.ts`:
  - این فایل از `this.prisma.favoriteEpisode` به‌صورت typed استفاده می‌کند (بدون cast به `any`).
  - در زمان اجرای تست‌های واحد، کد با mockهای داخلی کار می‌کند؛ اما بیلد TypeScript شکست می‌خورد زیرا `@prisma/client` محلی انواع مورد انتظار را ندارد.

- نتایج اجرای دستورات (دقیق):

Commands and Results

- Web tests

```bash
pnpm --filter @castaminofen/web test
```

Result summary:
- Test Files  23 passed (23)
- Tests  81 passed (81)
- Duration  24.08s

- Web build

```bash
pnpm --filter @castaminofen/web build
```

Result summary:
- Next.js compiled successfully (✓ Compiled successfully)
- Lint/type warnings present (unused vars, next/image img usage suggestions, react-hooks warnings)
- Build produced prerendered routes and shared chunk sizes.

- API tests

```bash
pnpm --filter @castaminofen/api test
```

Result summary:
- tests 13
- pass 13

- API build

```bash
pnpm --filter @castaminofen/api build
```

Result: FAILED — TypeScript errors (excerpt):

```
src/library/library.service.ts:13:24 - error TS2339: Property 'favoriteEpisode' does not exist on type 'PrismaService'.

13     return this.prisma.favoriteEpisode.findMany({
                          ~~~~~~~~~~~~~~~
...
Found 4 error(s).
```

و تلاش برای regenerate Prisma client با دستور زیر:

```bash
pnpm --filter @castaminofen/api exec prisma generate
```

خطا در زمان validation schema (excerpt):

```
Error: Prisma schema validation - (get-dmmf wasm)
error: Error validating field `user` in model `FavoriteEpisode`: The relation field `user` on model `FavoriteEpisode` is missing an opposite relation field on the model `User`. Either run `prisma format` or add it manually.
...
error: Error validating field `episode` in model `FavoriteEpisode`: The relation field `episode` on model `FavoriteEpisode` is missing an opposite relation field on the model `Episode`.

Validation Error Count: 2
```

توضیح فنی: Prisma برای هر relation خواستار وجود relation معکوس در مدل مرتبط است (مثلاً در `User` باید یک فیلد `favoriteEpisodes FavoriteEpisode[]` داشته باشد و به‌صورت مشابه در `Episode`). بدیهی است که schema فعلی `FavoriteEpisode` را تعریف کرده ولی فیلدهای معکوس را در دو مدل بالا اضافه نکرده است، پس `prisma generate` شکست می‌خورد و انواع client به‌روز نمی‌شوند.

**Files Modified**

- این فاز فقط بازبینی و مستندسازی است؛ هیچ فایل کدی تغییر نکرد. فایل گزارش ایجاد شد:
  - `docs/reports/FAVORITES.1.1-report.md`

(فایلهای کد بررسی‌شده — تغییر نیافته):
- `apps/api/src/library/library.service.ts`
- `apps/api/prisma/schema.prisma` (خوانده‌شد اما تغییر داده نشده)

**Validation Results**

خلاصهٔ وضعیت مطابق چک‌لیست درخواست‌شده:
- Web tests pass: ✅ (81 tests pass)
- API tests pass: ✅ (13 tests pass)
- Web build passes: ✅ (Next.js compiled successfully, with non-blocking warnings)
- API build passes: ❌ (TypeScript errors due to missing Prisma client types for FavoriteEpisode)
- TypeScript validation: ❌ (fails for API package during `nest build`)
- Player regression: ❌ Not observed — no runtime changes made to Player; automated tests and web build did not surface player regressions.
- Library regression: ❌ Not observed in tests; API build type error prevents full verification via build artifacts.
- Route regression: ❌ Not observed — Next.js build produced expected routes.

**Remaining Recommendations**

1. Regenerate Prisma Client (resolve schema validation):
   - Option A (recommended): Update `apps/api/prisma/schema.prisma` to add inverse relation fields and run `prisma format` + `prisma generate` in CI/dev:

     - Add in `User` model:
       ```prisma
       favoriteEpisodes FavoriteEpisode[]
       ```
     - Add in `Episode` model:
       ```prisma
       favoriteEpisodes FavoriteEpisode[]
       ```

     سپس اجرا کنید:
     ```bash
     pnpm --filter @castaminofen/api exec prisma format
     pnpm --filter @castaminofen/api exec prisma generate
     pnpm --filter @castaminofen/api build
     ```

   - Option B: If modifying schema is undesirable in this phase, keep using safe `any`-casts in `LibraryService` (e.g., `(this.prisma as any).favoriteEpisode`) until CI/dev environment runs `prisma generate`. سپس در مرحلهٔ بعدی types را اصلاح کنید. این راهکار موقتی است و توصیه نمی‌شود برای طولانی‌مدت.

2. CI: Ensure `prisma generate` runs in CI before TypeScript build for the API package. Add an explicit step in the `apps/api` build pipeline.

3. Developer DX: Document the requirement to run `pnpm --filter @castaminofen/api exec prisma generate` after local schema changes in `README` or developer onboarding docs.

4. After Prisma client is regenerated: re-run `pnpm --filter @castaminofen/api build` and then re-run integration checks if available.

---

امضاء و خلاصهٔ نهایی:
- من بررسی کامل کد `LibraryService` را انجام دادم و تست‌ها و بیلد فرانت‌اند را اجرا و تایید کردم؛ شکست در بیلد API به دلیل عدم تولید انواع Prisma Client برای مدل `FavoriteEpisode` رخ داده است. برای حل نهایی نیاز به اجرای `prisma generate` پس از اصلاح schema یا افزودن فیلدهای inverse در مدل‌های `User` و `Episode` وجود دارد.

- مسیر گزارش فاز: `docs/reports/FAVORITES.1.1-report.md`

اگر می‌خواهید، می‌توانم در همان‌فاز: 1) پیشنهادی برای اصلاح `schema.prisma` و اجرای `prisma format` + `generate` پیاده‌سازی کنم (و سپس بیلد API را تکمیل کنم)، یا 2) به‌صورت موقت `LibraryService` را به حالت ایمن با cast `(this.prisma as any).favoriteEpisode` برگردانم تا بیلد عبور کند و پس از آن PR جداگانه‌ای برای تولید client و برداشتن cast باز کنیم. لطفاً انتخاب کنید کدام گزینه را ترجیح می‌دهید.
