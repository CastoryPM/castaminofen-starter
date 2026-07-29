# گزارش Audit مجدد پروژه Castaminofen

## 1. تاریخ بررسی
- 2026-07-29 06:31

## 2. نسخه / وضعیت پروژه
- وضعیت فعلی پروژه: MVP در حال تثبیت و آماده‌سازی برای ادامه توسعه با تمرکز بر ثبات معماری، ownership feature و کیفیت validation.
- ساختار فعلی بر اساس Monorepo با دو اپ اصلی در [apps/web](../../apps/web) و [apps/api](../../apps/api) پیاده‌سازی شده است.
- بر اساس بررسی مستقیم کد و اجرای معتبر، وضعیت جاری از نظر lint، build و تست در سطح repo قابل قبول و پایدار است.

## 3. خلاصه اجرایی
- پروژه از نظر معماری با مستندات اصلی و قوانین پروژه هم‌راستا است.
- Frontend بر اساس App Router، feature-based structure و Zustand / TanStack Query پیاده‌سازی شده است.
- Backend بر اساس NestJS + Prisma با ساختار feature-oriented مستقیم در [apps/api/src](../../apps/api/src) اجرا می‌شود.
- مرزهای feature ownership در سطح زیادی روشن‌اند و در بخش‌های اصلی مانند Auth، Podcasts، Player، Playlist و Search قابل تشخیص هستند.
- مهم‌ترین نقطه فعال در وضعیت جاری، حفظ ثبات معماری و جلوگیری از drift در مرزهای feature است.

## 4. بررسی قوانین پروژه و copilot-instructions.md
- فایل [.github/copilot-instructions.md](../../.github/copilot-instructions.md) و مستندات پروژه، چارچوب اصلی توسعه را به‌صورت روشن تعریف کرده‌اند.
- اصول کلیدی استخراج‌شده از این فایل عبارت‌اند از:
  - اولویت سادگی، maintainability، scalability و readability
  - رعایت Feature-Based Architecture و جلوگیری از abstraction غیرضروری
  - استفاده از Strict TypeScript
  - استفاده از Zustand فقط برای state جهانی و TanStack Query برای server state
  - استفاده از React Hook Form + Zod برای فرم‌ها
  - حفظ مرزهای feature و shared infrastructure
  - رعایت documentation-first و verification-before-completion
- در کد واقعی، این اصول در بخش عمده‌ی پروژه رعایت شده‌اند. به‌ویژه در ساختار [apps/web/src/features](../../apps/web/src/features)، [apps/web/src/shared](../../apps/web/src/shared)، [apps/api/src](../../apps/api/src) و مستندات [docs/architecture.md](../architecture.md) و [docs/folder-structure.md](../folder-structure.md) این هم‌خوانی مشاهده می‌شود.
- این audit صرفاً برای درک و ادامه توسعه آینده تهیه شده و هیچ تغییری در کد اعمال نشده است.

## 5. درک معماری فعلی
- معماری فعلی بر پایه‌ی لایه‌ی Foundation + Feature Layer طراحی شده است.
- Frontend در [apps/web/src](../../apps/web/src) به‌صورت App Router و feature-based عمل می‌کند.
- لایه‌های اصلی Frontend عبارت‌اند از:
  - [apps/web/src/app](../../apps/web/src/app): routeها و page entry points
  - [apps/web/src/features](../../apps/web/src/features): implementation feature-specific
  - [apps/web/src/components](../../apps/web/src/components): UI primitives و layout
  - [apps/web/src/shared](../../apps/web/src/shared): shared infrastructure و utilities
  - [apps/web/src/stores](../../apps/web/src/stores): stateهای سراسری مانند auth/player
- Backend در [apps/api/src](../../apps/api/src) به‌صورت feature-oriented مستقیم پیاده‌سازی شده است و شامل پوشه‌های auth، podcasts، episodes، library، playlists، rss، storage، users و common است.
- این ساختار با مستندات فعلی هم‌راستا است و در این مرحله از پروژه مهاجرت کامل به ساختار modules/ یا بازنویسی معماری ضروری به‌نظر نمی‌رسد.

## 6. بررسی ساختار Repository
- [apps/web](../../apps/web): اپ فرانت‌اند با Next.js و React
- [apps/api](../../apps/api): اپ بک‌اند با NestJS و Prisma
- [packages/shared-types](../../packages/shared-types): تایپ‌های مشترک
- [packages/config](../../packages/config): پیکربندی مشترک
- [docs](../): مستندات، گزارش‌های فازها و فایل‌های audit
- [docker-compose.yml](../../docker-compose.yml): زیرساخت محلی شامل PostgreSQL، Redis و MinIO

### تحلیل ساختاری
- ساختار repository از نظر monorepo و جداسازی مسئولیت‌ها با مستندات هماهنگ است.
- ownership feature در Frontend در مسیرهایی مانند [apps/web/src/features/auth](../../apps/web/src/features/auth)، [apps/web/src/features/podcasts](../../apps/web/src/features/podcasts)، [apps/web/src/features/episodes](../../apps/web/src/features/episodes)، [apps/web/src/features/player](../../apps/web/src/features/player)، [apps/web/src/features/playlists](../../apps/web/src/features/playlists) و [apps/web/src/features/search](../../apps/web/src/features/search) کاملاً قابل مشاهده است.
- Backend نیز ساختار feature-oriented دارد اما هنوز به‌صورت full Nest module-based مهاجرت نشده است؛ این موضوع با مستندات فعلی سازگار است و به‌عنوان یک تصمیم آگاه پذیرفته شده است.

## 7. بررسی Technology Stack

| Area | Documented | Actual | Status |
|---|---|---|---|
| Frontend framework | Next.js App Router | Next.js 14.2.15 | ✅ هم‌راستا |
| Frontend state | Zustand | Zustand | ✅ هم‌راستا |
| Frontend data fetching | TanStack Query | @tanstack/react-query | ✅ هم‌راستا |
| Frontend forms | React Hook Form + Zod | react-hook-form + zod | ✅ هم‌راستا |
| Styling | Tailwind CSS | Tailwind CSS | ✅ هم‌راستا |
| Backend framework | NestJS | NestJS | ✅ هم‌راستا |
| ORM / DB layer | Prisma + PostgreSQL | Prisma + PostgreSQL | ✅ هم‌راستا |
| Cache / queue | Redis / BullMQ | Redis در Docker و ساختار مرتبط موجود است | ✅ هم‌راستا |
| Storage | MinIO | MinIO در Docker | ✅ هم‌راستا |
| Auth | JWT + refresh + bcrypt | @nestjs/jwt + bcrypt + passport | ✅ هم‌راستا |
| Offline / PWA | برنامه‌ریزی‌شده | در کد فعلی به‌صورت کامل مشاهده نشد | ⚠️ برنامه‌ریزی‌شده |
| RTL / i18n | برنامه‌ریزی‌شده | در کد فعلی به‌صورت کامل اجرا نشده | ⚠️ برنامه‌ریزی‌شده |

## 8. بررسی Feature Ownership

| Feature | وضعیت Ownership | توضیح |
|---|---|---|
| Auth | Feature-owned در UI + shared plumbing در لایه مشترک | مرز auth در فرانت‌اند با feature folder مشخص است و زیرساخت‌های مشترک همچنان در shared باقی مانده‌اند. |
| Podcasts | Feature-owned به‌خوبی تثبیت شده | hooks، utils و componentهای مربوط به پادکست در feature قرار گرفته‌اند؛ routeها فقط entry point‌اند. |
| Episodes | Feature-owned در سطح قابل قبول | منطق feature در [apps/web/src/features/episodes](../../apps/web/src/features/episodes) دیده می‌شود و orchestration در Entry Point محدود است. |
| Player | Runtime-owned در feature player | state سراسری player با Zustand در [apps/web/src/features/player/store/playerStore.ts](../../apps/web/src/features/player/store/playerStore.ts) پیاده‌سازی شده است و این مرز برای MVP منطقی است. |
| Library / Playlist / Search | Feature-owned | این featureها در پوشه‌های جداگانه‌ی خود قرار گرفته‌اند و با pattern فعلی سازگارند. |
| Global infrastructure | Shared-owned | [apps/web/src/shared](../../apps/web/src/shared)، [apps/web/src/providers](../../apps/web/src/providers) و [apps/web/src/components](../../apps/web/src/components) همچنان لایه‌ی shared و foundation را تشکیل می‌دهند. |

## 9. وضعیت Featureهای اصلی

| Feature | Status | Ownership | Risks |
|---|---|---|---|
| Auth | پیاده‌سازی شده | Feature UI + shared infrastructure | ریسک drift در صورت رشد جداگانه‌ی feature و shared layer |
| Podcast | پیاده‌سازی شده | Feature-owned | ریسک کم؛ بخش‌های محدود route-level باقی مانده |
| Episode | در حال تثبیت | Feature-owned با ورودی محدود از route | مرز ownership هنوز به‌طور کامل شفاف نیست |
| Player | موجود و پایدار | Runtime-owned در features/player | نیاز به مراقبت برای queue، repeat، shuffle و lifecycle |
| Playlist | موجود | Feature-owned | وابستگی به Player و API باید کنترل شود |
| Search | موجود | Feature-owned | نیاز به ثبات URL/state در آینده |

## 10. بررسی Migrationهای انجام‌شده
- مستندات فازهای مختلف در [docs](../) نشان می‌دهند که پروژه چند مرحله migration و تثبیت ownership را پشت سر گذاشته است.
- در [docs/architecture-decisions.md](../architecture-decisions.md) تصمیم‌های مهمی در مورد ownership RSS، persistence minimal برای MVP و canonical identity Podcast ثبت شده‌اند.
- فازهای اخیر در [docs/project-status.md](../project-status.md) نشان می‌دهند که RSS import ownership، playback integration و playlist/library integration در ساختار فعلی عملیاتی شده‌اند.
- این migrationها در سطح کد و مستندات به‌طور کلی هم‌راستا هستند؛ با این حال، در برخی نقاط همچنان باید مرزهای ownership با دقت بیشتری حفظ شود.

## 11. بررسی Quality و استانداردهای کدنویسی
- TypeScript strict در ساختار پروژه قابل مشاهده است.
- ساختار feature-based و folder ownership به‌طور کلی با مستندات هماهنگ است.
- از نظر lint، اجرای معتبر با دستور pnpm lint موفق بود.
- از نظر build، اجرای معتبر با دستور pnpm build موفق بود.
- از نظر tests، اجرای معتبر با دستور pnpm test موفق بود و تعداد 6 تست در Backend پاس شدند.
- جمع‌بندی کیفیت فعلی: کدنویسی، build و test در سطح کلی خوب است و پروژه برای ادامه فعالیت در محدوده MVP آماده است.

## 12. ریسک‌های فعلی

### Critical
- ریسک بحرانی جدی در ساختار فعلی دیده نشد.

### High
- اگر featureها در آینده سریع‌تر رشد کنند، ترکیب feature-owned UI با shared infrastructure و shared plumbing می‌تواند باعث drift معماری شود.
- در صورت رشد ناگهانی featureها، مرزهای ownership باید با دقت بیشتری حفظ شوند تا از پراکندگی منطق جلوگیری شود.

### Medium
- ownership Episodes و برخی route-level compositionها هنوز به‌طور کامل شفاف نیست.
- بخش‌هایی مانند i18n/RTL، offline experience و برخی جزئیات UX polish هنوز به‌طور کامل در کد جاری اعمال نشده‌اند.

### Low
- در سطح مستندات و ساختار، تفاوت‌های جزئی بین intent documented و implementation جاری وجود دارد، اما این تفاوت‌ها تهدید معماری جدی ایجاد نمی‌کنند.

## 13. مواردی که نباید تغییر کنند
- ساختار کلی Monorepo و جایگاه [apps/web](../../apps/web) و [apps/api](../../apps/api) نباید بدون نیاز اساسی تغییر کند.
- مرزهای feature-based و shared infrastructure باید حفظ شوند.
- اصول documented در [.github/copilot-instructions.md](../../.github/copilot-instructions.md) درباره minimal change، documentation-first و verification-before-completion باید رعایت شوند.
- [docker-compose.yml](../../docker-compose.yml) به‌عنوان محیط استاندارد محلی باید بدون تغییر ناگهانی حفظ شود.
- [packages/shared-types](../../packages/shared-types) و [packages/config](../../packages/config) باید برای abstractions مشترک و configuration استفاده شوند، نه برای منطق feature-specific.

## 14. پیشنهاد قدم بعدی
- قدم بعدی منطقی، ادامه تثبیت MVP و جلوگیری از drift در مرزهای feature ownership است.
- پیشنهاد می‌شود در فاز بعدی روی این موارد تمرکز شود:
  - حفظ دقیق‌تر مرزهای ownership در Episode و Auth
  - جلوگیری از رشد غیرضروری shared logic در featureها
  - حفظ ثبات build/lint/test و مستندسازی هر تغییر در [docs](../)
  - ادامه پیشبرد کارهای بعدی MVP بدون اضافه‌کردن abstractionهای غیرضروری
- این پیشنهاد بر اساس داده‌های واقعی و مستقیم کد و اجرای بررسی انجام شده است و نه بر اساس حدس.

## 15. نتیجه نهایی
- پروژه درک شده و آماده ادامه است.
- معماری فعلی با مستندات اصلی، ساختار repository و کد جاری هم‌راستا است.
- پیاده‌سازی فعلی در محدوده MVP پایدار و قابل ادامه است و برای فاز بعدی نیازمند حفظ دقیق‌تر مرزهای ownership و استمرار validation است.

PROJECT UNDERSTOOD: YES
READY TO CONTINUE: YES

پیشنهاد فاز بعدی: ادامه فاز MVP Stabilization و Quality Hardening با تمرکز بر حفظ مرزهای ownership، جلوگیری از drift معماری و تثبیت بیشتر کیفیت validation در Frontend و Backend.
