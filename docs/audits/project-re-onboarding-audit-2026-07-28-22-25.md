# گزارش Audit مجدد پروژه Castaminofen

## 1. تاریخ بررسی
- 2026-07-28 22:25

## 2. نسخه / وضعیت پروژه
- وضعیت فعلی: پروژه در محدوده MVP قرار دارد و در مرحله تثبیت معماری، تثبیت ownership feature و آماده‌سازی ادامه توسعه است.
- بر اساس مستندات موجود، تمرکز فعلی روی RSS ingestion ownership، integration با Player، تجربه Playlist/Library، boundary Auth و آماده‌سازی release MVP قرار دارد.
- بر اساس بررسی مستقیم کد و اجرای معتبر، وضعیت فعلی در بخش کیفیت کدنویسی هنوز کاملاً سبز نیست: lint و build هر دو با مشکلات مشخص در repo مواجه شده‌اند.

## 3. خلاصه اجرایی
- پروژه یک Monorepo است که Frontend در [apps/web](../../apps/web) و Backend در [apps/api](../../apps/api) پیاده‌سازی شده است.
- ساختار فعلی با اصول مستند شده در [.github/copilot-instructions.md](../../.github/copilot-instructions.md) و [docs/architecture.md](../architecture.md) هم‌راستا است؛ به‌ویژه در موضوع Feature-Based Architecture، TypeScript strict، Zustand برای state جهانی، TanStack Query برای server state و NestJS + Prisma برای Backend.
- پیاده‌سازی فعلی از نظر معماری و ownership به‌طور کلی قابل قبول است، اما در کیفیت validation هنوز چند شکاف واقعی وجود دارد.
- مهم‌ترین شکاف‌های فعلی در lint و build قابل مشاهده‌اند و باید در فاز بعدی با اولویت کنترل شوند.

## 4. بررسی قوانین پروژه و copilot-instructions.md
- قوانین اصلی پروژه بر پایه‌ی اصول زیر است:
  - سادگی و maintainability در اولویت هستند.
  - تغییرات باید حداقلی، هدفمند و مبتنی بر معماری موجود باشند.
  - Feature-Based Architecture الزامی است.
  - کد باید Strict TypeScript و قابل‌فهم باشد.
  - Zustand فقط برای state جهانی و TanStack Query برای server state استفاده شود.
  - فرم‌ها با React Hook Form + Zod پیاده‌سازی شوند.
  - Backend باید Controllerهای باریک، Serviceهای مسئول منطق کسب‌وکار و DTOهای معتبر برای ورودی داشته باشد.
  - Auth باید بر پایه JWT access/refresh، HttpOnly cookies و bcrypt اجرا شود.
  - مستندات و گزارش‌های فازی باید در repository ثبت شوند.
- این قواعد در مستندات و کد مشاهده می‌شوند.
- در عمل، معماری فعلی تا حد زیادی این اصول را رعایت می‌کند. با این حال، در وضعیت فعلی lint و build هنوز دارای مشکل واقعی هستند که نشان می‌دهد رعایت Quality Gate در سطح repo به‌طور کامل تثبیت نشده است.

## 5. درک معماری فعلی
- Frontend در [apps/web/src](../../apps/web/src) بر اساس App Router و ساختار feature-based اجرا می‌شود.
- بخش‌های اصلی شامل [apps/web/src/app](../../apps/web/src/app)، [apps/web/src/features](../../apps/web/src/features)، [apps/web/src/components](../../apps/web/src/components)، [apps/web/src/lib](../../apps/web/src/lib)، [apps/web/src/providers](../../apps/web/src/providers)، [apps/web/src/shared](../../apps/web/src/shared)، [apps/web/src/stores](../../apps/web/src/stores) و [apps/web/src/styles](../../apps/web/src/styles) است.
- Backend در [apps/api/src](../../apps/api/src) بر اساس ساختار feature-oriented مستقیم پیاده‌سازی شده است و پوشه‌های auth، podcasts، episodes، library، playlists، rss، storage، users و common را شامل می‌شود.
- Shared packages در [packages/shared-types](../../packages/shared-types) و [packages/config](../../packages/config) قرار دارند.
- زیرساخت محلی در [docker-compose.yml](../../docker-compose.yml) شامل PostgreSQL، Redis و MinIO است.
- معماری فعلی بر پایه‌ی لایه‌ی Foundation + Feature Layer طراحی شده و این مدل در کد و مستندات پشتیبانی می‌شود.

## 6. بررسی ساختار Repository
- [apps/web](../../apps/web): اپ فرانت‌اند با Next.js 14 و App Router
- [apps/api](../../apps/api): اپ بک‌اند با NestJS و Prisma
- [packages/shared-types](../../packages/shared-types): تایپ‌های مشترک
- [packages/config](../../packages/config): پیکربندی مشترک
- [docs](../): مستندات، گزارش‌ها، فازها و auditها
- [docker-compose.yml](../../docker-compose.yml): محیط محلی برای PostgreSQL، Redis و MinIO

### تحلیل ساختاری
- ساختار Repository از نظر Monorepo و تفکیک مسئولیت‌ها با مستندات هماهنگ است.
- ownership feature در Frontend در foldersی مانند [apps/web/src/features/auth](../../apps/web/src/features/auth)، [apps/web/src/features/podcasts](../../apps/web/src/features/podcasts)، [apps/web/src/features/episodes](../../apps/web/src/features/episodes)، [apps/web/src/features/player](../../apps/web/src/features/player)، [apps/web/src/features/playlists](../../apps/web/src/features/playlists) و [apps/web/src/features/search](../../apps/web/src/features/search) به‌خوبی دیده می‌شود.
- Backend نیز ساختار feature-oriented دارد، اما هنوز به‌صورت full Nest module-based مهاجرت نشده است؛ این موضوع با مستندات فعلی سازگار است و در این فاز به‌عنوان یک تصمیم آگاه پذیرفته شده است.

## 7. بررسی Technology Stack

| Area | Documented | Actual | Status |
|---|---|---|---|
| Frontend framework | Next.js 14 App Router | Next.js 14.2.15 | ✅ هم‌راستا |
| Frontend state | Zustand | Zustand | ✅ هم‌راستا |
| Frontend data fetching | TanStack Query | @tanstack/react-query | ✅ هم‌راستا |
| Frontend forms | React Hook Form + Zod | react-hook-form + zod | ✅ هم‌راستا |
| Styling | Tailwind CSS | Tailwind CSS | ✅ هم‌راستا |
| Backend framework | NestJS | NestJS | ✅ هم‌راستا |
| Backend ORM | Prisma | Prisma | ✅ هم‌راستا |
| Database | PostgreSQL | PostgreSQL در Docker | ✅ هم‌راستا |
| Cache/Queue | Redis + BullMQ | Redis در Docker، BullMQ در کد/مستندات به‌صورت partial دیده می‌شود | ⚠️ جزئی |
| Storage | MinIO | MinIO در Docker | ✅ هم‌راستا |
| Auth | JWT + refresh + bcrypt | @nestjs/jwt + bcrypt + passport | ✅ هم‌راستا |
| i18n/RTL | next-intl / RTL plan | در کد فعلی به‌صورت کامل اجرا نشده | ⚠️ برنامه‌ریزی‌شده |
| Offline storage | IndexedDB / Service Worker | در کد فعلی مشاهده نشد | ⚠️ برنامه‌ریزی‌شده |

## 8. بررسی Feature Ownership
- Auth: ownership فرانت‌اند در [apps/web/src/features/auth](../../apps/web/src/features/auth) دیده می‌شود. بخش‌های shared auth plumbing همچنان در [apps/web/src/lib](../../apps/web/src/lib) و [apps/web/src/stores](../../apps/web/src/stores) باقی مانده‌اند که با مدل incremental documented سازگار است.
- Podcasts: ownership feature در [apps/web/src/features/podcasts](../../apps/web/src/features/podcasts) با hooks، utils و presentation components روشن است. route-level pages به‌عنوان entry points باقی مانده‌اند و این موضوع با معماری فعلی سازگار است.
- Episodes: ownership در سطح feature به‌طور قابل‌توجهی در [apps/web/src/features/episodes](../../apps/web/src/features/episodes) دیده می‌شود، اما بخشی از orchestration و route-level composition هنوز در لایه entry point باقی مانده‌اند.
- Player: ownership runtime در [apps/web/src/features/player](../../apps/web/src/features/player) متمرکز است و state سراسری آن با Zustand پیاده‌سازی شده است. این مرز برای MVP منطقی و پایدار به‌نظر می‌رسد.
- Playlist: ownership در [apps/web/src/features/playlists](../../apps/web/src/features/playlists) مشخص است و integration با Player از طریق runtime surface انجام شده است.
- Search: ownership در [apps/web/src/features/search](../../apps/web/src/features/search) قابل تشخیص است و با الگوی feature-based هماهنگ است.
- Global infrastructure: [apps/web/src/shared](../../apps/web/src/shared)، [apps/web/src/providers](../../apps/web/src/providers) و [apps/web/src/components](../../apps/web/src/components) به‌عنوان لایه shared infrastructure و foundation باقی مانده‌اند.

## 9. وضعیت Featureهای اصلی

| Feature | Status | Ownership | Risks |
|---|---|---|---|
| Auth | پیاده‌سازی شده | Feature-owned در UI، shared plumbing در لایه مشترک | ریسک drift در صورت رشد جداگانه‌ی feature و shared layer |
| Podcast | پیاده‌سازی شده | Feature-owned | ریسک کم؛ route-level orchestration در بخش‌های محدود باقی مانده |
| Episode | در حال تثبیت | Feature-owned با بخش‌های route-level | مرز ownership هنوز به‌طور کامل شفاف نیست |
| Player | موجود و پایدار | Runtime-owned در features/player | نیاز به نگهداری دقیق برای queue، repeat، shuffle و lifecycle |
| Playlist | موجود | Feature-owned | وابستگی به Player و API باید در آینده کنترل شود |
| Search | موجود | Feature-owned | نیاز به ثبات URL/state در آینده |

## 10. بررسی Migrationهای انجام‌شده
- مستندات فازهای 2.6 تا 4.6 نشان می‌دهند که پروژه چند مرحله migration و تثبیت ownership را پشت سر گذاشته است.
- در [docs/architecture-decisions.md](../architecture-decisions.md) تصمیم‌های مهمی درباره RSS ownership، persistence minimal برای MVP و canonical identity Podcast ثبت شده است.
- فازهای اخیر در [docs/project-status.md](../project-status.md) نشان می‌دهند که RSS import ownership و playback integration عملیاتی شده‌اند.
- این migrationها در سطح کد و مستندات به‌طور کلی هم‌راستا هستند، اگرچه هنوز در quality validation با مشکلاتی روبه‌رو هستیم.

## 11. بررسی Quality و استانداردهای کدنویسی
- TypeScript strict در Frontend و Backend در ساختار پروژه قابل مشاهده است.
- نام‌گذاری و ساختار پوشه‌بندی به‌طور کلی با قواعد پروژه هم‌خوانی دارد.
- ساختار feature-based رعایت شده و duplicate logic در سطح قابل‌قبول دیده نمی‌شود.
- وضعیت validation در زمان بررسی:
  - lint: ناموفق — 2 warning در [apps/api/src/rss/rss.module.ts](../../apps/api/src/rss/rss.module.ts)
  - build: ناموفق — TypeScript error در [apps/web/src/features/library/utils/library-mappers.ts](../../apps/web/src/features/library/utils/library-mappers.ts)
- این دو مشکل، هرچند از نوع warning/error در سطح lint/build متفاوت‌اند، اما نشان‌دهنده این هستند که repo هنوز به‌طور کامل از Quality Gate عبور نکرده است.

## 12. ریسک‌های فعلی
### Critical
- ریسک بحرانی جدیدی در ساختار فعلی دیده نشد.

### High
- در صورت ادامه رشد featureها، ترکیب feature-owned UI با shared plumbing در auth و shared infrastructure می‌تواند باعث drift معماری شود.
- عدم عبور build و lint در زمان فعلی، اگرچه به‌صورت blocking نیست، اما به‌عنوان نشانه‌ای از عدم تثبیت کامل quality gate در نظر گرفته می‌شود.

### Medium
- ownership Episode هنوز کاملاً شفاف نیست و بخش‌هایی از orchestration در لایه entry point باقی مانده‌اند.
- بخش‌های planned مانند i18n/RTL و offline experience هنوز کامل در کد پیاده‌سازی نشده‌اند.

### Low
- برخی gaps بین مستندات برنامه‌ریزی‌شده و پیاده‌سازی واقعی هنوز در سطح جزئی باقی مانده‌اند.

## 13. مواردی که نباید تغییر کنند
- ساختار کلی Monorepo و جایگاه [apps/web](../../apps/web) و [apps/api](../../apps/api) نباید بدون نیاز اساسی تغییر کند.
- مرزهای feature-based و shared infrastructure باید حفظ شوند.
- اصول documented در [.github/copilot-instructions.md](../../.github/copilot-instructions.md) درباره minimal change، documentation-first و validation-before-completion باید رعایت شوند.
- [docker-compose.yml](../../docker-compose.yml) به‌عنوان محیط استاندارد محلی باید بدون تغییر ناگهانی حفظ شود.
- [packages/shared-types](../../packages/shared-types) و [packages/config](../../packages/config) باید برای shared abstractions و configuration استفاده شوند، نه برای feature-specific logic.

## 14. پیشنهاد قدم بعدی
- قدم بعدی منطقی، ادامه تثبیت MVP و جلوگیری از drift در مرزهای feature ownership است.
- پیشنهاد می‌شود در فاز بعدی روی این موارد تمرکز شود:
  - رفع مشکلات lint/build با اولویت بالا
  - تثبیت دقیق‌تر ownership در Episode و Auth در صورت نیاز به refactor
  - تکمیل یا مستندسازی دقیق‌تر بخش‌های planned مانند i18n/RTL و offline storage
  - حفظ مرزهای RSS و Player بدون اضافه‌کردن abstractionهای غیرضروری
- با توجه به مستندات و کد موجود، قدم بعدی مناسب ادامه مسیر MVP stabilization و quality hardening است، نه شروع بازنویسی معماری بزرگ.

## 15. نتیجه نهایی
- پروژه درک شده و آماده ادامه است.
- معماری فعلی با مستندات اصلی و ساختار repository هم‌راستا است.
- پیاده‌سازی فعلی در محدوده MVP پایدار است، اما برای حفظ کیفیت و جلوگیری از drift معماری، لازم است lint/build issues با اولویت رفع شوند و مرزهای ownership در چند feature با دقت بیشتر تثبیت شوند.

PROJECT UNDERSTOOD: YES
READY TO CONTINUE: YES

پیشنهاد فاز بعدی: ادامه فاز MVP Stabilization و Quality Hardening با تمرکز بر رفع مشکلات lint/build و تثبیت بیشتر مرزهای ownership در Episode و Auth.
