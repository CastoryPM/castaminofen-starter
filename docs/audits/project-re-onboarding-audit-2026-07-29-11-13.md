# گزارش Audit مجدد پروژه Castaminofen

## 1. تاریخ بررسی
- تاریخ: 2026-07-29
- ساعت تولید گزارش: 11:13
- نوع بررسی: Re-onboarding Audit و ارزیابی معماری

## 2. نسخه / وضعیت پروژه
- نسخه فعلی پروژه: 0.1.0
- وضعیت کلی: آماده برای تکمیل فاز MVP Release Preparation و ادامه توسعه‌ی افزایشی
- وضعیت معماری: پایدار، با مرزهای feature-based مشخص و مستندات نزدیک به واقعیت کد

## 3. خلاصه اجرایی
- پروژه در قالب Monorepo با دو اپ اصلی و یک بسته‌ی مشترک پیاده‌سازی شده است.
- Frontend در [apps/web](../../apps/web) با Next.js و ساختار feature-based فعال است و Backend در [apps/api](../../apps/api) با NestJS و Prisma در حال اجرا است.
- مستندات پروژه، به‌ویژه [.github/copilot-instructions.md](../../.github/copilot-instructions.md)، [docs/architecture.md](../architecture.md) و [docs/folder-structure.md](../folder-structure.md)، با ساختار فعلی کد هم‌راستا هستند.
- مهم‌ترین نقطه‌ی معماری در حال حاضر، تثبیت مرزهای ownership در Featureهای اصلی است، به‌ویژه در Episode و بخش‌هایی از route layer.
- پروژه از نظر معماری برای ادامه‌ی توسعه و ورود به فازهای بعدی آماده است، مشروط بر اینکه تغییرات آینده incremental و بدون شکستن قراردادهای موجود انجام شوند.

## 4. بررسی قوانین پروژه و copilot-instructions.md
فایل اصلی راهنمای توسعه در [.github/copilot-instructions.md](../../.github/copilot-instructions.md) به‌صورت کامل و قابل‌استفاده وجود دارد. اصول اصلی استخراج‌شده از این فایل عبارت‌اند از:

- اولویت به Simplicity، Maintainability، Scalability، Readability و Consistency
- استفاده از Feature-Based Architecture و پرهیز از over-engineering
- رعایت strict TypeScript، DRY/KISS/SOLID و جلوگیری از duplicate logic
- تقسیم مسئولیت بین Frontend و Backend بر اساس feature ownership
- ممنوعیت افزودن abstractionهای غیرضروری و تغییرات بدون نیاز روشن
- الزامات Documentation و Reporting برای هر phase
- عدم شروع phase جدید بدون phase report و مستندات مرتبط

### جمع‌بندی
- این قوانین در ساختار فعلی و مستندات پروژه بازتاب یافته‌اند.
- در عمل، پروژه سعی کرده است به‌جای بازنویسی بزرگ، با incremental migration و حفظ ثبات runtime پیش برود.

## 5. درک معماری فعلی
معماری فعلی پروژه بر پایه‌ی چند اصل اصلی شکل گرفته است:

- Monorepo با دو اپ اصلی:
  - Frontend: [apps/web](../../apps/web)
  - Backend: [apps/api](../../apps/api)
  - Shared package: [packages/shared-types](../../packages/shared-types)
- الگوی کلی، ترکیبی از Foundation Layer و Feature Layer در Frontend است.
- در Backend، ساختار فعلی بر اساس feature folders مستقیم است و هنوز به ساختار modules/ مهاجرت نشده است؛ این موضوع با مستندات موجود هم‌خوانی دارد.
- در Frontend، routeهای Next.js در [apps/web/src/app](../../apps/web/src/app) بیشتر نقش composition و routing را دارند و featureهای اصلی در [apps/web/src/features](../../apps/web/src/features) مستقر شده‌اند.

### نتیجه‌گیری معماری
- معماری فعلی برای MVP مناسب است.
- از بازنویسی بزرگ یا طراحی‌های آینده‌نگر بیش از حد پرهیز شده است.
- تمرکز فعلی بر تثبیت مرزهای ownership و جلوگیری از drift است.

## 6. بررسی ساختار Repository
### ساختار کلی
- [apps/api](../../apps/api): اپ بک‌اند NestJS
- [apps/web](../../apps/web): اپ فرانت‌اند Next.js
- [packages/shared-types](../../packages/shared-types): تایپ‌های مشترک
- [packages/config](../../packages/config): پیکربندی مشترک
- [docs](../): مستندات، گزارش‌ها، auditها و phase reports
- [docker-compose.yml](../../docker-compose.yml): سرویس‌های محلی PostgreSQL، Redis و MinIO

### Frontend
مسیر اصلی فرانت‌اند در [apps/web/src](../../apps/web/src) قرار دارد و شامل شاخه‌های زیر است:
- [apps/web/src/app](../../apps/web/src/app): routeها و pages
- [apps/web/src/components](../../apps/web/src/components): components UI و layout
- [apps/web/src/features](../../apps/web/src/features): feature implementations
- [apps/web/src/shared](../../apps/web/src/shared): shared infrastructure و utilities
- [apps/web/src/stores](../../apps/web/src/stores): Zustand stores
- [apps/web/src/providers](../../apps/web/src/providers): provider composition

### Backend
مسیر اصلی بک‌اند در [apps/api/src](../../apps/api/src) قرار دارد و شامل موارد زیر است:
- [apps/api/src/auth](../../apps/api/src/auth)
- [apps/api/src/podcasts](../../apps/api/src/podcasts)
- [apps/api/src/episodes](../../apps/api/src/episodes)
- [apps/api/src/users](../../apps/api/src/users)
- [apps/api/src/rss](../../apps/api/src/rss)
- [apps/api/src/storage](../../apps/api/src/storage)
- [apps/api/src/playlists](../../apps/api/src/playlists)
- [apps/api/src/library](../../apps/api/src/library)

### نتیجه
ساختار Repository با [docs/architecture.md](../architecture.md) و [docs/folder-structure.md](../folder-structure.md) هم‌خوانی دارد و در سطح کلی drift جدی مشاهده نمی‌شود.

## 7. بررسی Technology Stack
| Area | Documented | Actual | Status |
|---|---|---|---|
| Frontend Framework | Next.js 14 + App Router | Next.js 14.2.15 | ✅ مطابق |
| Language | TypeScript | TypeScript | ✅ مطابق |
| State Management | Zustand | Zustand | ✅ مطابق |
| Data Fetching | TanStack Query | @tanstack/react-query | ✅ مطابق |
| Forms / Validation | React Hook Form + Zod | react-hook-form + zod + @hookform/resolvers | ✅ مطابق |
| Styling | Tailwind CSS | Tailwind CSS | ✅ مطابق |
| Backend Framework | NestJS | NestJS | ✅ مطابق |
| Database | PostgreSQL + Prisma | Prisma schema + PostgreSQL در محیط محلی | ✅ مطابق |
| Cache / Queue | Redis + BullMQ | Redis در زیرساخت محلی موجود؛ BullMQ به‌صورت مستقیم در dependencyها دیده نمی‌شود | ⚠️ جزئی |
| Auth | JWT + bcrypt + HttpOnly cookies | JWT + bcrypt + cookie-parser | ✅ مطابق |
| Storage | MinIO / S3-compatible | MinIO در docker-compose | ✅ مطابق |
| Package Manager | pnpm | pnpm | ✅ مطابق |
| Infrastructure | Docker Compose | Docker Compose | ✅ مطابق |

### تحلیل تکمیلی
- تطابق میان مستندات و کد در سطح کلی بسیار خوب است.
- تفاوت جزئی در Queue/Cache به‌معنای عدم تطابق اساسی نیست، اما در آینده باید در نظر گرفته شود که اگر پردازش background jobها در مقیاس بیشتر اهمیت پیدا کند، BullMQ یا جایگزین معادل بهتر به‌صورت روشن در معماری ثبت شود.
- dependencyهای مثل next-intl یا next-pwa در بسته‌های نصب‌شده‌ی فعلی دیده نمی‌شوند، اما این موارد در مستندات به‌عنوان planned یا future-oriented مطرح شده‌اند و برای MVP فعلی مشکلی ایجاد نمی‌کنند.

## 8. بررسی Feature Ownership
### مرزهای فعلی
- Auth: در Frontend به‌صورت feature-owned در [apps/web/src/features/auth](../../apps/web/src/features/auth) قابل‌مشاهده است.
- Podcast: در [apps/web/src/features/podcasts](../../apps/web/src/features/podcasts) قرار دارد و routeها از این feature برای composition استفاده می‌کنند.
- Episode: feature folder وجود دارد، اما ownership هنوز به‌طور کامل از route layer جدا نشده است.
- Player: در [apps/web/src/features/player](../../apps/web/src/features/player) به‌صورت feature-scoped پیاده‌سازی شده و runtime آن در این مرز نگهداری می‌شود.
- Library / Playlist / Search / Settings: در feature folders خود مستقر شده‌اند و در سطح کلی با الگوی فعلی سازگارند.

### تحلیل مرز route vs feature
- برخی صفحات در [apps/web/src/app](../../apps/web/src/app) نقش composition و routing را بر عهده دارند و این رویکرد با مستندات phaseهای قبل هم‌خوانی دارد.
- با این حال، در Episode و بخش‌هایی از فرم/submit/upload/page orchestration، هنوز بخشی از منطق در لایه‌ی route باقی مانده است. این موضوع یک ریسک معماری است، نه یک شکست جدی.

## 9. وضعیت Featureهای اصلی
| Feature | Status | Ownership | Risks |
|---|---|---|---|
| Auth | پایدار و قابل‌استفاده | Frontend feature-owned + shared auth infrastructure | کم |
| Podcast | فعال و قابل‌استفاده | Feature-owned در Frontend و Backend service-driven | متوسط |
| Episode | در حال تثبیت | Feature folder موجود، اما ownership هنوز جزئی | بالا |
| Player | فعال و جداشده | Feature-owned و runtime-owned | متوسط |
| Library | فعال | Feature-owned | کم |
| Playlist | فعال | Feature-owned | کم |
| Settings | جدید و مستقل | Feature-owned | کم |
| Search | فعال | Feature-owned | کم |

## 10. بررسی Migrationهای انجام‌شده
- Migration Auth boundary در Frontend به‌صورت incremental انجام شده و در مستندات phaseهای قبلی ثبت شده است.
- Feature boundary برای Podcast و قسمت‌هایی از Episode و Player در کد و مستندات قابل‌تشخیص است.
- مستندات مربوط به Episode ownership migration در [docs/phase-2.8.0-episode-feature-ownership-migration-plan.md](../phase-2.8.0-episode-feature-ownership-migration-plan.md) وجود دارد؛ این migration در کد فعلی به‌طور کامل اعمال نشده، اما وضعیت فعلی همچنان قابل‌قبول و سازگار با رویکرد incremental است.
- پروژه از مدل incremental migration پیروی می‌کند، که با اصول MVP و جلوگیری از over-engineering هم‌راستاست.

## 11. بررسی Quality و استانداردهای کدنویسی
### نقاط قوت
- استفاده از TypeScript در کل پروژه
- وجود feature folders و separation منطقی
- استفاده از Tailwind، Zustand، TanStack Query و React Hook Form مطابق مستندات
- وجود testها در بخش‌های Web و برخی بخش‌های Backend/RSS-related
- وجود ساختار lint/build و اسکریپت‌های قابل‌استفاده در [package.json](../../package.json)

### نقاط ضعف / ریسک‌های کیفیت
- در برخی بخش‌ها، منطق UI یا orchestration در route layer باقی مانده است.
- در برخی فایل‌های Backend، استفاده از castingها و patterns نزدیک به any در سطح محدود وجود دارد؛ این موضوع با strict TypeScript در تضاد مستقیم نیست، اما نیازمند نظارت است.
- اگر ownership migration ادامه نیابد، احتمال drift و شلوغی route layer در آینده افزایش می‌یابد.

## 12. ریسک‌های فعلی
### Critical
- ریسک Critical در این بازبینی شناسایی نشد.

### High
- Ownership Episode هنوز به‌طور کامل به feature boundary منتقل نشده است و route layer همچنان مسئول بخش‌هایی از orchestration است.
- اگر این وضعیت بدون برنامه‌ریزی ادامه یابد، drift در آینده احتمال بیشتری پیدا می‌کند.

### Medium
- Player و Settings با وجود feature-owned بودن، در برخی نقاط به shared plumbing یا persistence وابسته‌اند و باید نظارت شوند تا وابستگی‌ها کنترل‌شده باقی بمانند.
- در برخی مسیرهای route-owned، state یا logic محلی می‌تواند با feature logic هم‌پوشانی ایجاد کند.

### Low
- برخی dependencyهای documented و planned هنوز در پروژه نصب نشده‌اند و این موضوع برای MVP مشکلی ایجاد نمی‌کند.
- Backend هنوز به ساختار modules/ مهاجرت نشده است؛ این موضوع برای MVP قابل‌قبول است اما برای آینده باید با دقت مدیریت شود.

## 13. مواردی که نباید تغییر کنند
- ساختار کلی Monorepo و جایگاه [apps/web](../../apps/web) و [apps/api](../../apps/api)
- الگوی feature-based در Frontend و Backend به‌صورت کلی
- قراردادهای عمومی API و ساختار مسیرهای فعلی بدون نیاز مبرم
- مالکیت runtime Player در feature player
- رویکرد MVP-first و جلوگیری از اضافه‌کردن abstractions آینده‌نگر
- رویکرد incremental migration به جای بازنویسی بزرگ

## 14. پیشنهاد قدم بعدی
قدم بعدی منطقی، ادامه‌ی تثبیت Feature Ownership با تمرکز بر Episode است. این کار باید به‌صورت incremental و بدون تغییر رفتار runtime یا قرارداد API انجام شود.

پیشنهاد اجرایی:
1. انتقال منطق create/submit/upload episode از route layer به feature layer
2. تثبیت composition صفحه‌ی detail episode در سطح feature-owned component/hook
3. حفظ مسیرهای فعلی و قرارداد API بدون تغییر غیرضروری
4. اجرای lint/build و تست‌های مرتبط پس از هر تغییر کوچک

## 15. نتیجه نهایی
- پروژه در وضعیت خوب و قابل‌استفاده برای MVP قرار دارد.
- معماری فعلی با مستندات و کد هم‌خوانی دارد و از نظر کلی پایدار است.
- مهم‌ترین مسیر بهبود در آینده، تکمیل migrationهای ownership، به‌ویژه در Episode، و تثبیت مرزهای feature در لایه‌ی route است.
- پروژه برای ادامه‌ی توسعه و ورود به فازهای بعدی آماده است، مشروط بر اینکه تغییرات آینده در چارچوب incremental و بدون شکستن قراردادهای موجود انجام شوند.

PROJECT UNDERSTOOD: YES
READY TO CONTINUE: YES

پیشنهاد مرحله‌ی بعدی: ادامه‌ی مرحله‌ی تثبیت Feature Ownership با تمرکز بر Episode و حفظ الزامات MVP بدون تغییر در API و مسیرهای فعلی.
