# گزارش Audit مجدد پروژه Castaminofen

## 1. تاریخ بررسی
- 2026-07-27 11:28
- نوع بررسی: Re-onboarding Audit و Architecture Audit
- حالت بررسی: تحلیل-only، بدون تغییر کد

## 2. نسخه / وضعیت پروژه
- نسخه فعلی: 0.1.0
- نوع پروژه: Monorepo مبتنی بر Next.js و NestJS
- وضعیت کلی: پروژه در وضعیت MVP-ready و در حال تثبیت مرزهای feature و پایداری runtime قرار دارد
- شواهد موجود:
  - Frontend بر پایه Next.js 14، TypeScript، Tailwind، React Query، Zustand، React Hook Form و Zod
  - Backend بر پایه NestJS، Prisma و PostgreSQL
  - زیرساخت محلی با Docker Compose برای PostgreSQL، Redis و MinIO
  - Featureهای اصلی Auth، Podcasts، Episodes، Library، Playlists، Player و Search در ساختار فعلی قابل مشاهده‌اند

## 3. خلاصه اجرایی
این بازبینی بر اساس مستندات پروژه، ساختار واقعی ریپو و اجرای مستقیم بررسی صحت build/lint/test انجام شد. نتیجه‌ی کلی این است که پروژه از نظر معماری و ساختار فعلی در وضعیت قابل قبول و قابل ادامه‌ی توسعه قرار دارد. مهم‌ترین نکته این است که معماری feature-based و foundation-based در کد و مستندات به‌خوبی حفظ شده است، اما در چند نقطه همچنان مسئولیت‌های route-level و feature-level در کنار هم دیده می‌شوند؛ این موضوع بیشتر یک وضعیت تدریجی و قابل کنترل است تا یک انحراف معماری جدی.

بر اساس شواهد驗ری، خروجی‌های زیر با موفقیت تأیید شدند:
- lint: موفق
- build: موفق
- tests وب: موفق (22 test)

## 4. بررسی قوانین پروژه و copilot-instructions.md
مستند اصلی راهنمای توسعه در [.github/copilot-instructions.md](../../.github/copilot-instructions.md) بر اصول زیر تأکید دارد:
- سادگی، maintainability و scalability
- معماری feature-first و MVP-first
- استفاده از TypeScript strict و اجتناب از abstractions غیرضروری
- حفظ ساختار feature boundaries
- پرهیز از duplicated logic و over-engineering
- اهمیت documentation، changelog و verification قبل از تکمیل کار

این قوانین با ساختار فعلی پروژه هم‌راستا هستند. مستندات اصلی نیز در [docs/architecture.md](../architecture.md)، [docs/folder-structure.md](../folder-structure.md)، [docs/tech-stack.md](../tech-stack.md) و [docs/project-status.md](../project-status.md) بازتاب داده شده‌اند.

### جمع‌بندی مهم از قوانین پروژه
- Frontend باید بر اساس structure feature-based و App Router ساخته شود.
- Shared infrastructure باید در لایه‌ی shared/foundation نگه داشته شود و logic feature-specific در feature خود باقی بماند.
- Backend برای MVP باید ساده و feature-oriented باشد و از over-engineering پرهیز کند.
- قبل از تکمیل phaseها، validation و documentation باید انجام شود.

## 5. درک معماری فعلی
معماری فعلی پروژه بر پایه‌ی اصول زیر شکل گرفته است:
- Mobile First
- Feature-Based Frontend
- API-First برای آینده
- Foundation Layer برای shared infrastructure و Feature Layer برای قابلیت‌های MVP

### معماری فرانت‌اند
- routeها و page-level composition در [apps/web/src/app](../../apps/web/src/app) قرار دارند.
- UI و layout shared در [apps/web/src/components](../../apps/web/src/components) نگهداری می‌شوند.
- featureهای اصلی در [apps/web/src/features](../../apps/web/src/features) قرار دارند.
- shared infrastructure و utilities در [apps/web/src/shared](../../apps/web/src/shared) و [apps/web/src/lib](../../apps/web/src/lib) مستقر شده‌اند.
- stateهای جهانی در [apps/web/src/stores](../../apps/web/src/stores) نگهداری می‌شوند.

### معماری بک‌اند
- بک‌اند در [apps/api/src](../../apps/api/src) با ساختار feature-oriented مستقیم پیاده‌سازی شده است.
- پوشه‌های اصلی شامل auth، podcasts، episodes، users، storage، library، playlists و prisma هستند.
- ساختار فعلی برای MVP مناسب است و به‌صورت مستقیم بر اساس feature folders قابل فهم است.

### نکته کلیدی درباره ownership
در سطح فعلی، ownership هنوز یک مدل تدریجی است؛ به‌ویژه در صفحه‌ی جزئیات اپیزود، بعضی مسئولیت‌های orchestration و data-loading هنوز نزدیک به route باقی مانده‌اند، در حالی که componentهای feature-owned و hookهای feature-local در [apps/web/src/features/episodes](../../apps/web/src/features/episodes) حضور دارند.

## 6. بررسی ساختار Repository
### ساختار اصلی
- Frontend: [apps/web](../../apps/web)
- Backend: [apps/api](../../apps/api)
- Shared packages: [packages/config](../../packages/config) و [packages/shared-types](../../packages/shared-types)
- Infrastructure: [docker-compose.yml](../../docker-compose.yml)
- Documentation: [docs](../)

### ساختار فرانت‌اند
- [apps/web/src/app](../../apps/web/src/app): routeها و صفحات
- [apps/web/src/features](../../apps/web/src/features): feature-owned UI و logic
- [apps/web/src/lib](../../apps/web/src/lib): helpers و utilities مرتبط با API
- [apps/web/src/shared](../../apps/web/src/shared): زیرساخت‌های مشترک
- [apps/web/src/stores](../../apps/web/src/stores): Zustand stores

### ساختار بک‌اند
- [apps/api/src/auth](../../apps/api/src/auth)
- [apps/api/src/podcasts](../../apps/api/src/podcasts)
- [apps/api/src/episodes](../../apps/api/src/episodes)
- [apps/api/src/library](../../apps/api/src/library)
- [apps/api/src/playlists](../../apps/api/src/playlists)
- [apps/api/src/storage](../../apps/api/src/storage)
- [apps/api/src/users](../../apps/api/src/users)
- [apps/api/src/prisma](../../apps/api/src/prisma)

## 7. بررسی Technology Stack

| حوزه | مستند شده | وضعیت واقعی | نتیجه |
|---|---|---|---|
| Frontend Framework | Next.js App Router | Next.js 14.2.15 | ✅ سازگار |
| زبان Frontend | TypeScript | TypeScript 5.x | ✅ سازگار |
| Styling | Tailwind CSS | پیکربندی و استفاده شده | ✅ سازگار |
| State Management | Zustand | در storeهای عمومی و player استفاده شده | ✅ سازگار |
| Data Fetching | TanStack Query | در پروژه فعال است | ✅ سازگار |
| Forms & Validation | React Hook Form + Zod | در فرم‌های feature استفاده شده | ✅ سازگار |
| Backend Framework | NestJS | NestJS 10.x | ✅ سازگار |
| Database / ORM | PostgreSQL + Prisma | schema و Prisma client موجود | ✅ سازگار |
| Auth | JWT + bcrypt | در بک‌اند و فرانت‌اند قابل تشخیص است | ✅ سازگار |
| Storage | MinIO / S3-compatible | در Docker و storage module موجود | ✅ سازگار |
| Queue / Background Jobs | Redis + BullMQ | Redis در محیط محلی قابل‌تشخیص است؛ BullMQ در سطح کد و runtime فعلی به‌صورت روشن دیده نمی‌شود | ⚠️ جزئی |
| PWA / Offline | next-pwa / Service Worker | در ساختار فعلی به‌صورت کامل دیده نمی‌شود | ⚠️ جزئی |
| i18n / RTL | next-intl | در ساختار فعلی به‌صورت first-class دیده نمی‌شود | ⚠️ جزئی |
| CI / Test Automation | مستند در roadmap و reports | Vitest موجود و اجرا می‌شود؛ workflow CI به‌صورت واضح در ریپو دیده نمی‌شود | ⚠️ جزئی |

## 8. بررسی Feature Ownership
### الگوی فعلی مالکیت
- routeها به‌عنوان entry point در [apps/web/src/app](../../apps/web/src/app) باقی مانده‌اند.
- UI و منطق feature-specific در [apps/web/src/features](../../apps/web/src/features) نگهداری می‌شوند.
- زیرساخت‌های عمومی در [apps/web/src/components](../../apps/web/src/components)، [apps/web/src/shared](../../apps/web/src/shared)، [apps/web/src/lib](../../apps/web/src/lib) و [apps/web/src/stores](../../apps/web/src/stores) باقی مانده‌اند.

### Ownership در سطح Frontend
- Auth: UI و composition auth در feature auth قرار دارد؛ زیرساخت سشن و transport در لایه‌ی shared باقی مانده است.
- Podcasts: routeها و composition سطح صفحه در app وجود دارد، اما منطق feature-related در feature podcast نگهداری شده است.
- Episodes: componentهای اختصاصی episode در [apps/web/src/features/episodes](../../apps/web/src/features/episodes) وجود دارند؛ با این حال، صفحه‌ی جزئیات اپیزود در [apps/web/src/app/episodes/[id]/page.tsx](../../apps/web/src/app/episodes/[id]/page.tsx) هنوز مسئولیت‌هایی مانند fetch، orchestration و upload mutation را نزدیک به route نگه داشته است.
- Player: runtime و state پخش در [apps/web/src/features/player](../../apps/web/src/features/player) متمرکز است و به‌صورت واضح مالک runtime واحد محسوب می‌شود.
- Library / Playlist / Search: این featureها در ساختار فعلی به‌صورت feature-owned قابل تشخیص‌اند و از ownership Player به‌صورت مستقل استفاده می‌کنند.

### Ownership در سطح Backend
- لایه‌ی backend بر اساس feature folders در [apps/api/src](../../apps/api/src) سازماندهی شده است.
- Controllers نسبتاً سبک‌اند و منطق کسب‌وکار در service layer قرار دارد.
- این ساختار با مسیر MVP سازگار است، اما هنوز به‌صورت کامل به module-based nested structure مهاجرت نشده است.

## 9. وضعیت Featureهای اصلی

| Feature | وضعیت | مالکیت | ریسک |
|---|---|---|---|
| Auth | پایدار و ساختاریافته | UI auth در feature، shared infrastructure در لایه‌ی عمومی | متوسط |
| Podcast | فعال و نسبتاً سالم | feature-owned UI و route entry point | کم |
| Episode | در حال تثبیت | component و hookهای episode در feature، با بعضی orchestration‌های route-level | متوسط |
| Player | پیشرفته‌تر از فازهای اولیه | runtime و state توسط Player feature کنترل می‌شود | متوسط تا بالا |
| Search | موجود اما مرز آن نسبت به featureهای دیگر هنوز شفاف‌تر نشده است | ترکیبی از route و transport feature-based | متوسط |

## 10. بررسی Migrationهای انجام‌شده
مستندات فازهای قبلی نشان می‌دهند که پروژه از چند مرحله‌ی مهاجرت تدریجی عبور کرده است، از جمله:
- Auth Feature Boundary Adoption
- Podcast Feature Boundary Adoption
- Episode Feature Boundary Adoption
- Episode Create Flow Migration
- Episode Detail Logic Extraction
- Player Feature Foundation و Runtime Foundation
- Playlist feature ownership و integration با Player
- Library feature ownership و integration با Player

این مهاجرت‌ها عمدتاً بدون تغییر routeهای اصلی، قرارداد API یا رفتار runtime انجام شده‌اند. این رویکرد با اصول MVP و incremental migration سازگار است.

## 11. بررسی Quality و استانداردهای کدنویسی
### نقاط قوت
- TypeScript strict در ساختار پروژه وجود دارد.
- ساختار feature-based در فرانت‌اند به‌خوبی رعایت شده است.
- lint/build برای وب و API با موفقیت اجرا شده‌اند.
- تست‌های وب با Vitest در حال اجرا و موفق‌اند.

### نقاط ضعف / چالش‌ها
- در چند بخش، به‌ویژه Episode Detail، مسئولیت‌های route-level هنوز به‌طور کامل به feature boundary منتقل نشده‌اند.
- ساختار backend هنوز به‌صورت کامل به module-based nested pattern نزدیک نشده است.
- CI و تست‌های end-to-end به‌صورت رسمی و گسترده در ریپو به‌وضوح دیده نمی‌شوند.
- برخی از قابلیت‌های مستند شده مانند PWA، next-intl و BullMQ هنوز به‌صورت first-class در کد اجرا نشده‌اند.

### شواهد validation
- اجرای lint پروژه با موفقیت انجام شد.
- اجرای build پروژه با موفقیت انجام شد.
- اجرای test وب با موفقیت انجام شد و 22 test عبور کردند.

## 12. ریسک‌های فعلی
### Critical
- هیچ ریسک بحرانی در این بازبینی مشاهده نشد.

### High
- اگر مرزهای ownership در Episode و Search بدون discipline ادامه یابد، احتمال coupling بیشتر در آینده وجود دارد.
- اگر Player به‌عنوان runtime واحد دچار drift یا duplicate ownership شود، پایداری محصول کاهش می‌یابد.

### Medium
- بعضی مسئولیت‌های route-level در صفحه‌ی اپیزود هنوز در لایه‌ی entry-point باقی مانده‌اند و ممکن است در آینده باعث رشد غیرضروری abstraction شوند.
- نبود CI و تست‌های broader برای محافظت از regressions آینده یک ریسک عملیاتی است.

### Low
- بعضی قابلیت‌های مستند شده مثل PWA و i18n هنوز به‌صورت کامل در کد فعلی دیده نمی‌شوند و برای MVP قابل قبول‌اند.

## 13. مواردی که نباید تغییر کنند
در این مرحله بهتر است این موارد بدون تغییر اساسی باقی بمانند:
- ساختار کلی feature-based frontend
- الگوی route entry-point با composition در app
- مالکیت واحد Player برای runtime پخش
- استفاده از TypeScript strict و linting استاندارد
- رویکرد incremental migration به جای بازنویسی کامل
- قراردادهای موجود API و ساختار Prisma برای MVP

این موارد بخشی از هویت معماری پروژه هستند و نباید بدون نیاز بنیادین تغییر کنند.

## 14. پیشنهاد قدم بعدی
قدم بعدی منطقی و قابل استناد بر اساس شواهد موجود این است:
1. ادامه‌ی تثبیت ownership featureها بدون انجام بازنویسی بزرگ
2. حفظ مرز بین Player و Episode و جلوگیری از coupling اضافی
3. تقویت CI و تست‌های پایه برای محافظت از تغییرات آینده
4. ادامه‌ی hardening پس از MVP با تمرکز بر refresh/session، پایداری media و validation‌های بیشتر

به‌صورت خلاصه، پروژه در این لحظه برای ادامه‌ی توسعه با رویکرد incremental و کنترل‌شده آماده است.

## 15. نتیجه نهایی
پروژه در وضعیت قابل قبول و قابل ادامه‌ی توسعه قرار دارد. درک معماری، ساختار feature-based، و وضعیت فعلی implementation با مستندات و واقعیت کد هم‌خوانی مناسبی دارد. مهم‌ترین اولویت فعلی، حفظ مرزهای feature و جلوگیری از رشد coupling در بخش‌های Episode، Player و Search است. همچنین تقویت CI و تست‌های پایه برای ثبات آینده توصیه می‌شود.

PROJECT UNDERSTOOD: YES
READY TO CONTINUE: YES

پیشنهاد فاز بعدی: ادامه‌ی فازهای تثبیت ownership و hardening پس از MVP با تمرکز بر Episode/Player، refresh/session در وب و تقویت CI و تست‌های regression، بدون انجام بازنویسی‌های گسترده یا تغییر قراردادهای موجود.
