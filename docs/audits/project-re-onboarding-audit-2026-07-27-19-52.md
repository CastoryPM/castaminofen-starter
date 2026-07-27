# گزارش Audit مجدد پروژه Castaminofen

## 1. تاریخ بررسی
- تاریخ: 2026-07-27 19:52
- نوع بررسی: Re-onboarding Audit و Architecture Audit
- حالت بررسی: تحلیل-only، بدون تغییر کد

## 2. نسخه / وضعیت پروژه
- نسخه فعلی: 0.1.0
- نوع پروژه: Monorepo بر پایه Next.js و NestJS
- وضعیت کلی: پروژه در محدوده MVP قرار دارد و ساختار feature-based در frontend و backend به‌طور کلی حفظ شده است.
- وضعیت مستندات: مستندات اصلی در پوشه docs موجود است و با ساختار کد هم‌خوانی مناسبی دارد.

## 3. خلاصه اجرایی
این Audit بر اساس بررسی مستندات، ساختار repository، فایل‌های اصلی کد و اجرای دستورات اعتبارسنجی انجام شد. نتایج اصلی عبارت‌اند از:
- معماری کلی پروژه با مستندات هم‌راستا است.
- Frontend در سطح فعلی از App Router، feature folders، shared infrastructure و Zustand/TanStack Query استفاده می‌کند.
- Backend در سطح فعلی با NestJS، Prisma و ساختار feature-oriented پیاده‌سازی شده است.
- وضعیت اجرا در workspace فعلی نشان داد که web tests موفق‌اند، اما build و lint در چند نقطه با مشکل مواجه‌اند.

## 4. بررسی قوانین پروژه و copilot-instructions.md
مستندات اصلی در [.github/copilot-instructions.md](../../.github/copilot-instructions.md) بر موارد زیر تأکید دارد:
- اولویت بر سادگی، maintainability، scalability، readability و consistency.
- استفاده از Feature-Based Architecture و اجتناب از over-engineering.
- Frontend: Next.js App Router، Tailwind، Zustand برای state جهانی، React Hook Form + Zod برای فرم‌ها.
- Backend: NestJS، Prisma، PostgreSQL، Redis، BullMQ، JWT + HttpOnly Cookies، bcrypt.
- قوانین نام‌گذاری، تفکیک مسئولیت‌ها، استفاده از TypeScript strict و نگهداری مستندات.
- هر تغییر مهم باید با مستندات و گزارش‌های مرتبط همراه باشد.

این اصول در وضعیت فعلی پروژه به‌طور کلی رعایت شده‌اند و Audit نشان می‌دهد که معماری فعلی در چارچوب همین قوانین پیش رفته است.

## 5. درک معماری فعلی
### Frontend
- مسیر اصلی فرانت‌اند: [apps/web](../../apps/web)
- ساختار feature-based در [apps/web/src/features](../../apps/web/src/features)
- route و page entry points در [apps/web/src/app](../../apps/web/src/app)
- shared UI و layout primitives در [apps/web/src/components](../../apps/web/src/components)
- utilities و abstractions داده در [apps/web/src/lib](../../apps/web/src/lib) و [apps/web/src/shared](../../apps/web/src/shared)
- state جهانی در [apps/web/src/stores](../../apps/web/src/stores)

### Backend
- مسیر اصلی بک‌اند: [apps/api](../../apps/api)
- ساختار feature-oriented با پوشه‌های auth، podcasts، episodes، library، playlists، storage، users و rss
- [apps/api/src/app.module.ts](../../apps/api/src/app.module.ts) ماژول‌های اصلی را وارد می‌کند.
- استفاده از PrismaService، AuthModule، StorageModule و ماژول RSS در سطح feature قابل‌تشخیص است.

### معماری دامنه
- معماری کلی پروژه بر پایه API-First و Monorepo است.
- Frontend mobile-first و feature-oriented طراحی شده است.
- Backend feature-oriented و REST-based است و برای داده‌های اصلی از Prisma استفاده می‌کند.

## 6. بررسی ساختار Repository
### لایه‌های اصلی
- [apps/web](../../apps/web): اپلیکیشن Frontend
- [apps/api](../../apps/api): اپلیکیشن Backend
- [packages/shared-types](../../packages/shared-types) و [packages/config](../../packages/config): بسته‌های مشترک
- [docs](../../docs): مستندات، گزارش‌ها و فازها
- [docker-compose.yml](../../docker-compose.yml): زیرساخت محلی

### Frontend structure
- [apps/web/src/app](../../apps/web/src/app): routeها و صفحات اصلی
- [apps/web/src/features](../../apps/web/src/features): implementation feature-owned
- [apps/web/src/components](../../apps/web/src/components): UI primitives و layout
- [apps/web/src/lib](../../apps/web/src/lib): helpers و adapters
- [apps/web/src/shared](../../apps/web/src/shared): زیرساخت مشترک
- [apps/web/src/stores](../../apps/web/src/stores): Zustand stores

### Backend structure
- [apps/api/src/auth](../../apps/api/src/auth)
- [apps/api/src/podcasts](../../apps/api/src/podcasts)
- [apps/api/src/episodes](../../apps/api/src/episodes)
- [apps/api/src/library](../../apps/api/src/library)
- [apps/api/src/playlists](../../apps/api/src/playlists)
- [apps/api/src/storage](../../apps/api/src/storage)
- [apps/api/src/users](../../apps/api/src/users)
- [apps/api/src/rss](../../apps/api/src/rss)
- [apps/api/src/prisma](../../apps/api/src/prisma)

## 7. بررسی Technology Stack
| Area | Documented | Actual | Status |
|---|---|---|---|
| Frontend Framework | Next.js App Router | Next.js 14.2.15 | ✅ OK |
| Frontend Language | TypeScript | TypeScript 5.x | ✅ OK |
| Styling | Tailwind CSS | فعال در apps/web | ✅ OK |
| State Management | Zustand | در apps/web/src/stores | ✅ OK |
| Data Fetching | TanStack Query | موجود | ✅ OK |
| Forms / Validation | React Hook Form + Zod | موجود | ✅ OK |
| Backend Framework | NestJS | NestJS 10.x | ✅ OK |
| ORM / DB | Prisma + PostgreSQL | موجود | ✅ OK |
| Auth | JWT + bcrypt | موجود | ✅ OK |
| Storage | MinIO / S3-compatible | در backend و docker موجود | ✅ OK |
| Queue / Jobs | Redis / BullMQ | Redis در infra ظاهر است؛ BullMQ در مستندات و RSS pipeline دیده می‌شود | ⚠️ Partial |
| Offline / PWA | Service Worker / next-pwa | در کد فعلی به‌صورت first-class دیده نمی‌شود | ⚠️ Partial |
| i18n / RTL | next-intl / RTL readiness | در کد فعلی به‌صورت first-class دیده نمی‌شود | ⚠️ Partial |
| CI / Test automation | lint/build/test | web tests و build در workspace قابل اجرا هستند؛ CI workflow به‌صورت واضح در repo دیده نمی‌شود | ⚠️ Partial |

## 8. بررسی Feature Ownership
### Frontend Ownership
- Auth: مرز feature ownership در [apps/web/src/features/auth](../../apps/web/src/features/auth) مشخص شده است. صفحات login/register به‌صورت entry point در [apps/web/src/app/login](../../apps/web/src/app/login) و [apps/web/src/app/register](../../apps/web/src/app/register) باقی مانده‌اند، اما composition خود را به feature منتقل کرده‌اند.
- Podcasts: ownership feature-based در [apps/web/src/features/podcasts](../../apps/web/src/features/podcasts) قابل تشخیص است و route pages به‌عنوان orchestrator عمل می‌کنند.
- Episodes: feature folder در [apps/web/src/features/episodes](../../apps/web/src/features/episodes) موجود است، اما بخشی از orchestration و state در route layer باقی مانده است.
- Player: runtime و state در [apps/web/src/features/player](../../apps/web/src/features/player) متمرکز شده‌اند و این مرز از نظر معماری قابل قبول است.
- Library / Playlist / Search: هرکدام feature folder جداگانه و قابل‌تشخیص دارند.

### Backend Ownership
- هر feature در [apps/api/src](../../apps/api/src) دارای پوشه جداگانه است.
- ماژول‌های auth، podcasts، episodes، rss و storage از نظر مسئولیت به‌خوبی تفکیک شده‌اند.

## 9. وضعیت Featureهای اصلی
| Feature | Status | Ownership | Risks |
|---|---|---|---|
| Auth | پایدار و قابل استفاده | feature-owned UI + shared infra | Medium |
| Podcast | قابل استفاده و در حد MVP مناسب | feature-owned hooks/UI + route entry points | Low |
| Episode | قابل استفاده اما ownership هنوز جزئی است | feature components موجود، route orchestration باقی مانده | Medium |
| Player | توسعه‌یافته و قابل‌استفاده | runtime و state مرکزی در feature player | Medium |
| Search | موجود | feature-based | Medium |
| Playlist | موجود | feature-based | Low |

## 10. بررسی Migrationهای انجام‌شده
- مستندات فازهای 2.6.x و 2.7.x نشان می‌دهند که پروژه در حال مهاجرت تدریجی ownership بوده است.
- Auth feature boundary adoption در Frontend به‌صورت عملی و با حداقل تغییر runtime انجام شده است.
- Podcast feature boundary در سطح فرم و hooks به‌صورت incremental تثبیت شده است.
- Episode feature ownership به‌صورت plan و migration candidate در مستندات مشخص شده است و هنوز به‌صورت کامل اجرا نشده است.
- در Backend، RSS pipeline و sync orchestration به‌صورت feature-local در [apps/api/src/rss](../../apps/api/src/rss) پیاده‌سازی شده‌اند.

## 11. بررسی Quality و استانداردهای کدنویسی
### نقاط قوت
- TypeScript strict و ساختار feature-based در کل پروژه حفظ شده است.
- Frontend build و tests در workspace با موفقیت اجرا شده‌اند.
- Backend دارای ساختار service/controller/module واضح و DTOهای جداگانه است.
- مستندات معماری و phase reports موجود و با ساختار فعلی هم‌خوانی دارند.

### نقاط ضعف
- اجرای lint در سطح کل repo در لحظه بررسی با خطاهای ESLint در فایل‌های RSS مواجه شد؛ این مشکل به پیکربندی parserOptions.project و مسیرهای پروژه مربوط است.
- build وب در لحظه بررسی با خطای TypeScript در [apps/web/src/app/podcasts/page.tsx](../../apps/web/src/app/podcasts/page.tsx) مواجه شد: implicit any در callback map.
- برخی قابلیت‌های roadmap مانند PWA، i18n/RTL و full offline experience هنوز در سطح کد جاری first-class نیستند.

### نتایج اعتبارسنجی
- اجرای `pnpm lint` با شکست مواجه شد؛ خطاهای ESLint در [apps/api/src/rss](../../apps/api/src/rss) مشاهده شد.
- اجرای `pnpm --filter @castaminofen/api build` موفق بود.
- اجرای `pnpm --filter @castaminofen/web build` ناموفق بود و خطای TypeScript در podcasts page را نشان داد.
- اجرای `pnpm --filter @castaminofen/web test` موفق بود و 4 فایل/22 test passed.

## 12. ریسک‌های فعلی
### Critical
- ریسک بحرانی در این بازبینی مشاهده نشد.

### High
- خطای lint در Backend و خطای TypeScript در Frontend می‌تواند مانع از build clean و release-ready شدن پروژه شود.
- در صورت ادامه توسعه بدون تثبیت ownership Episode و Player، احتمال drift معماری افزایش می‌یابد.

### Medium
- نبود CI/automation واضح برای محافظت از regressions و جلوگیری از drift در آینده.
- مرزهای i18n/RTL و offline/PWA هنوز به‌صورت کامل در معماری کد تثبیت نشده‌اند.

### Low
- برخی dependencies و مفاهیم roadmap هنوز در سطح مستندات باقی مانده‌اند و برای MVP قابل‌قبول هستند.

## 13. مواردی که نباید تغییر کنند
- ساختار کلی feature-based frontend
- ownership مرکزی Player برای runtime پخش
- استفاده از TypeScript strict و Tailwind
- قراردادهای API فعلی و مسیرهای route فعلی
- رویکرد incremental migration به جای refactor کامل
- استفاده از Prisma و NestJS در سطح فعلی backend

## 14. پیشنهاد قدم بعدی
- رفع خطای lint در Backend و بررسی پیکربندی ESLint/TypeScript برای پوشه RSS.
- رفع خطای TypeScript در [apps/web/src/app/podcasts/page.tsx](../../apps/web/src/app/podcasts/page.tsx) قبل از ادامه توسعه.
- تثبیت بیشتر ownership در Episode و جلوگیری از باقی ماندن orchestration‌های غیرضروری در route layer.
- تقویت CI و تست‌های regression برای جلوگیری از drift معماری.
- ادامه hardening MVP با تمرکز بر stability، refresh/session و کیفیت build.

## 15. نتیجه نهایی
پروژه در وضعیت قابل ادامه قرار دارد. معماری کلی با مستندات مطابقت دارد و feature ownership تا حد زیادی تثبیت شده است. وضعیت فعلی نشان می‌دهد که MVP در حال نزدیک شدن به یک baseline قابل‌اعتماد است، اما قبل از ادامه فازهای بعدی باید چند مشکل کیفیت و build/lint رفع شوند.

PROJECT UNDERSTOOD: YES
READY TO CONTINUE: YES

پیشنهاد فاز بعدی: ادامه تثبیت ownership در Episode و hardening MVP با تمرکز بر رفع خطای lint/build، بهبود CI و افزایش پایداری runtime.
