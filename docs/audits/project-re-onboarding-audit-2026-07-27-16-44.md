# گزارش Audit مجدد پروژه Castaminofen

## 1. تاریخ بررسی
- تاریخ: 2026-07-27 16:44
- نوع بررسی: Re-onboarding Audit و Architecture Audit
- حالت بررسی: تحلیل-only، بدون تغییر کد

## 2. نسخه / وضعیت پروژه
- نسخه فعلی: 0.1.0
- نوع پروژه: Monorepo بر پایه Next.js و NestJS
- وضعیت کلی: پروژه در وضعیت آماده‌سازی برای MVP قرار دارد و معماری feature-based به‌طور کلی حفظ شده است.
- وضعیت مستندات: مستندات اصلی در `docs/` موجود و با ساختار فعلی هم‌خوانی مناسب دارد.

## 3. خلاصه اجرایی
این Audit بر پایه تحلیل کد و مستندات انجام شد. نتایج اصلی:
- معماری کلی پروژه در Frontend و Backend با مستندات هماهنگی دارد.
- ساختار feature-based و Foundation/shared layer در Frontend رعایت شده است.
- Backend نیز در یک ساختار feature-oriented قابل فهم و مناسب MVP قرار دارد.
- اجراهای اصلی نشان می‌دهند که وب build و تست‌ها موفق بوده‌اند.
- خطای lint در `apps/api` به دلیل پیکربندی `parserOptions.project` برای فایل‌های RSS دیده شد.

## 4. بررسی قوانین پروژه و copilot-instructions.md
مستندات اصلی `./.github/copilot-instructions.md` موارد زیر را تأکید می‌کند:
- اولویت: سادگی، نگهداری، قابل توسعه بودن، خوانایی، همسانی.
- استفاده از Feature-Based Architecture و جلوگیری از over-engineering.
- Frontend: Next.js App Router، Tailwind، Zustand برای state جهانی، React Hook Form + Zod برای فرم‌ها.
- Backend: NestJS، Prisma، PostgreSQL، Redis، BullMQ، JWT با HttpOnly cookies، bcrypt.
- قوانین نام‌گذاری، جداسازی مسئولیت‌ها، کامنت‌گذاری معنادار، و documentation mandatory.
- هر تغییر بزرگ باید با گزارش و مستند ثبت شود.

این قوانین با وضعیت فعلی پروژه هم‌راستا هستند و اجرای Audit نشان داد که معماری کلی دنبال شده است.

## 5. درک معماری فعلی
### Frontend
- مسیر اصلی فرانت‌اند: `apps/web`
- ساختار feature-based در `apps/web/src/features`
- route و page entry points در `apps/web/src/app`
- shared UI و layout primitives در `apps/web/src/components`
- utilities و API abstractions در `apps/web/src/lib` و `apps/web/src/shared`
- state جهانی در `apps/web/src/stores`

### Backend
- مسیر اصلی بک‌اند: `apps/api`
- ساختار feature-oriented با پوشه‌های `auth`, `podcasts`, `episodes`, `library`, `playlists`, `storage`, `users`, `rss`
- `AppModule` با وارد کردن ماژول‌های feature اصلی پیاده‌سازی شده است.
- استفاده از `PrismaModule`، `ConfigModule` و ماژول‌های اختصاصی feature مطابق با معماری backend است.

### معماری Domain
- معماری کلی پروژه یک طراحی API-First همراه با مونو-ریپو است.
- Frontend به‌صورت Mobile-First و feature-based طراحی شده است.
- Backend feature-oriented و RESTful با Prisma برای دسترسی به دیتابیس است.

## 6. بررسی ساختار Repository
### سطوح اصلی
- `apps/web`: اپلیکیشن Frontend
- `apps/api`: اپلیکیشن Backend
- `packages/config` و `packages/shared-types`: بسته‌های مشترک
- `docs`: مستندات و گزارش‌های فازها
- `docker-compose.yml`: زیرساخت توسعه محلی

### Frontend
- `apps/web/src/app`: routeها و صفحات اصلی
- `apps/web/src/features`: feature-owned UI و logic
- `apps/web/src/components`: UI primitives و layout
- `apps/web/src/lib`: helpers و API interface
- `apps/web/src/shared`: shared infrastructure و utilities
- `apps/web/src/stores`: Zustand stores

### Backend
- `apps/api/src/auth`
- `apps/api/src/podcasts`
- `apps/api/src/episodes`
- `apps/api/src/library`
- `apps/api/src/playlists`
- `apps/api/src/storage`
- `apps/api/src/users`
- `apps/api/src/rss`
- `apps/api/src/prisma`

## 7. بررسی Technology Stack
| Area | Documented | Actual | Status |
|---|---|---|---|
| Frontend Framework | Next.js App Router | Next.js 14.2.15 | ✅ OK |
| Frontend Language | TypeScript | TypeScript 5.x | ✅ OK |
| Styling | Tailwind CSS | فعال در `apps/web` | ✅ OK |
| State Management | Zustand | در `apps/web/src/stores` | ✅ OK |
| Data Fetching | TanStack Query | موجود | ✅ OK |
| Forms / Validation | React Hook Form + Zod | موجود | ✅ OK |
| Backend Framework | NestJS | NestJS 10.x | ✅ OK |
| ORM/DB | Prisma + PostgreSQL | موجود | ✅ OK |
| Auth | JWT + bcrypt | موجود | ✅ OK |
| Storage | MinIO / S3-compatible | پشتیبانی در backend, docker | ✅ OK |
| Queue/Jobs | Redis / BullMQ | Redis در infra، BullMQ مستند ولی not directly visible | ⚠️ Partial |
| Offline / PWA | Service Worker / next-pwa | مستند ولی در کد فعلی first-class نبود | ⚠️ Partial |
| i18n / RTL | next-intl | مستند ولی در کد فعلی first-class نبود | ⚠️ Partial |
| CI/Test | Vitest, lint | Vitest و lint وجود دارند، workflow CI مشخصاً در repo نبود | ⚠️ Partial |

## 8. بررسی Feature Ownership
### Frontend Ownership
- Auth: UI و pages در `apps/web/src/features/auth` و routeهای `/login`، `/register` و protected composition وجود دارند.
- Podcasts: feature-owned UI و hooks در `apps/web/src/features/podcasts` و route entry points در `apps/web/src/app/podcasts` قرار دارد.
- Episodes: feature-specific components در `apps/web/src/features/episodes` وجود دارد، با باقی ماندن برخی orchestrationها در route layer.
- Player: runtime و global state در `apps/web/src/features/player` متمرکز است.
- Library/Playlist/Search: هر یک feature folders دارند و ownership کلی قابل تشخیص است.

### Backend Ownership
- هر feature در `apps/api/src` یک پوشه اختصاصی دارد.
- `AppModule` به‌صورت صریح ماژول‌ها را وارد کرده است.
- کنترل‌کننده‌ها و سرویس‌ها در هر feature به‌طور منطقی جدا شده‌اند.

### ارزیابی
- Ownership به‌طور کلی حفظ شده است.
- مسیرها و featureها به‌خوبی از هم جدا شده‌اند.
- بخشی از مسئولیت Episode و route-level orchestration هنوز نیاز به تثبیت بیشتر دارد.

## 9. وضعیت Featureهای اصلی
| Feature | وضعیت | Ownership | Risks |
|---|---|---|---|
| Auth | پایداری نسبی | UI auth در feature، shared infrastructure در لایه عمومی | Medium |
| Podcast | حدوداً کامل | feature-owned UI و API abstraction | Low |
| Episode | قابل استفاده | feature-owned components، اما route orchestration هنوز هست | Medium |
| Player | توسعه‌یافته | runtime واحد در feature player | Medium-High |
| Search | موجود | feature-based اما نیاز به شفافیت بیشتر | Medium |
| Playlist | پیاده‌سازی شده | feature ownership قابل شناسایی | Low |

## 10. بررسی Migrationهای انجام‌شده
- مستندات فازهای `phase-2.7.1`, `phase-2.7.2`, `phase-2.8.0`, و گزارش‌های بعدی نشان می‌دهد که پروژه در حال مهاجرت تدریجی ownership بوده است.
- Auth feature boundary adoption کامل شده و مرزهای auth در frontend مشخص شده است.
- Podcast feature boundary plan و report نشان داده‌اند که هدف معماری حفظ route entry-point و shared infrastructure است.
- این مهاجرت‌ها عمدتاً incremental بوده‌اند و از refactor کلی اجتناب شده است.

## 11. بررسی Quality و استانداردهای کدنویسی
### نقاط قوت
- تایپ‌اسکریپت strict برقرار است.
- ساختار feature-based و folder ownership تا حد زیادی رعایت شده است.
- frontend build و web tests موفق بوده‌اند.
- مستندات معماری و راهنمای توسعه وجود دارند.

### نقاط ضعف
- root lint command در `apps/api` با خطای ESLint parser مواجه شد؛ این خطا مربوط به پیکربندی `parserOptions.project` و عدم یافتن برخی فایل‌ها در پروژه است.
- CI و تست‌های end-to-end به‌صورت آشکار در repo مشاهده نشدند.
- بعضی از قابلیت‌های roadmap مانند PWA و i18n هنوز به‌طور کامل در کد جاری فعال نشده‌اند.

### Validation
- `pnpm --filter @castaminofen/web build` ✔️
- `pnpm --filter @castaminofen/web test` ✔️ (22 passed)
- `pnpm --filter @castaminofen/api build` ✔️
- `pnpm lint` ⚠️ fail در `apps/api` به دلیل خطای پیکربندی parser

## 12. ریسک‌های فعلی
### Critical
- هیچ ریسک بحرانی کشف نشد.

### High
- احتمال drift در ownership Episode و Player در صورت ادامه‌ی پیاده‌سازی بدون نظارت.
- وجود خطای lint در `apps/api` می‌تواند نشان‌دهنده‌ی مشکلات پیکربندی TypeScript/ESLint باشد.

### Medium
- نبود CI واضح برای محافظت از regressions.
- نیاز به شفاف‌سازی بیشتر i18n و offline/PWA قبل از فازهای بعد.

### Low
- roadmap features مانند BullMQ و next-intl هنوز در وضعیت مستندات باقی مانده‌اند و برای MVP فعلاً قابل قبول‌اند.

## 13. مواردی که نباید تغییر کنند
- ساختار کلی feature-based frontend
- ownership واحد Player برای runtime پخش
- استفاده از TypeScript strict و Tailwind
- قراردادهای API فعلی و مسیرهای route موجود
- رویکرد incremental migration به جای refactor کامل

## 14. پیشنهاد قدم بعدی
- تثبیت ownership در بخش Episode و جلوگیری از انتقال بیش از حد logic به route layer.
- حل خطای lint `apps/api` و بررسی پیکربندی ESLint/TypeScript برای پوشه‌های RSS.
- تقویت CI و افزودن تست‌های پایه بیشتر (integration / regression).
- ادامه‌ی hardening پس از MVP با تمرکز بر refresh/session و stability در Player.

## 15. نتیجه نهایی
پروژه در وضعیت قابل ادامه قرار دارد. معماری کلی با مستندات مطابقت دارد و feature ownership تا حد زیادی تثبیت شده است. تنها مانع عملیاتی فعلی، خطای lint در `apps/api` است که باید قبل از توسعه‌ی گسترده‌تر رفع شود.

PROJECT UNDERSTOOD: YES
READY TO CONTINUE: YES

پیشنهاد فاز بعدی: ادامه‌ی تثبیت ownership و hardening MVP با تمرکز بر Episode/Player، refresh/session و CI/testing.
