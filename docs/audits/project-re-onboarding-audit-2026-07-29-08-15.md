# گزارش Audit مجدد پروژه Castaminofen

## 1. تاریخ بررسی
- 2026-07-29
- ساعت تولید گزارش: 08:15

## 2. نسخه / وضعیت پروژه
- نسخه فعلی پروژه: 0.1.0
- وضعیت کلی: آماده برای MVP Release Preparation و در وضعیت اجرایی پایدار
- بر اساس مستندات و کد جاری، پروژه در مرحله‌ی تثبیت معماری و آماده‌سازی انتشار اولیه قرار دارد

## 3. خلاصه اجرایی
- پروژه بر اساس معماری Feature-Based و Monorepo پیاده‌سازی شده و با مستندات موجود هم‌راستا است.
- Frontend در مسیر apps/web با Next.js و feature folders، Backend در apps/api با NestJS و Prisma، و زیرساخت محلی با Docker Compose موجود است.
- مرزهای Feature Ownership در Auth و بخش‌هایی از Podcast/Episode/Player به‌صورت مشهود در کد و مستندات وجود دارد.
- وضعیت build و lint در زمان بررسی در وضعیت موفق بود؛ build monorepo نیز برای Frontend و Backend به‌طور کامل اجرا شد.
- مهم‌ترین ریسک‌ها بیشتر مربوط به مرزهای جزئی، drift احتمالی در برخی مسیرهای route-owned، و باقی‌ماندن برخی مسئولیت‌ها در لایه‌ی route نسبت به الگوی ایده‌آل feature-owned است.

## 4. بررسی قوانین پروژه و copilot-instructions.md
- فایل اصلی راهنمای توسعه در [.github/copilot-instructions.md](../.github/copilot-instructions.md) به‌صورت دقیق و کامل وجود دارد.
- اصول اصلی استخراج‌شده از این فایل عبارت‌اند از:
  - اولویت به Simplicity، Maintainability، Scalability، Readability و Consistency
  - استفاده از Feature-Based Architecture و جلوگیری از over-engineering
  - رعایت strict TypeScript، DRY/KISS/SOLID و جلوگیری از duplicate logic
  - تقسیم مسئولیت بین Frontend و Backend بر اساس feature ownership
  - ممنوعیت افزودن abstractionهای غیرضروری و تغییرات بدون ضرورت
  - الزامات Documentation و Reporting برای هر phase
  - عدم شروع phase جدید بدون phase report و مستندات مرتبط
- از نظر عملی، این قوانین در مستندات و ساختار فعلی به‌خوبی بازتاب یافته‌اند.

## 5. درک معماری فعلی
- معماری کلی پروژه بر پایه‌ی Monorepo با دو اپ اصلی و یک بسته‌ی مشترک طراحی شده است:
  - Frontend: apps/web
  - Backend: apps/api
  - Shared types: packages/shared-types
- الگوی معماری فعلی، ترکیبی از Foundation Layer و Feature Layer است.
- Foundation Layer در فرانت‌اند مسئول زیرساخت‌های مشترک مانند UI primitives، providers، shared infrastructure و API client است.
- Feature Layer در فرانت‌اند مسئول featureهای اصلی مانند auth، podcast، episode، player، library، playlist، settings و search است.
- در بک‌اند، ساختار فعلی بر اساس feature folders مستقیم (auth، podcasts، episodes، users، storage، rss و غیره) است و هنوز به ساختار modules/ مهاجرت نشده است؛ این موضوع با مستندات و architecture.md هم‌خوانی دارد.
- معماری فعلی برای MVP مناسب است و از بازنویسی بزرگ یا over-engineering پرهیز می‌کند.

## 6. بررسی ساختار Repository
### ساختار کلی
- apps/api: اپ بک‌اند NestJS
- apps/web: اپ فرانت‌اند Next.js
- packages/shared-types: تایپ‌های مشترک
- packages/config: پیکربندی مشترک
- docs: مستندات، phase reports، audit و changelog
- docker-compose.yml: سرویس‌های محلی PostgreSQL، Redis و MinIO

### Frontend
- مسیر اصلی: apps/web/src
- مسیرهای مهم:
  - app/: routeهای Next.js App Router
  - components/: UI و layout components
  - features/: feature-specific implementation
  - shared/: infrastructure مشترک
  - stores/: Zustand stores
  - lib/: helpers و utilities
  - providers/: provider composition

### Backend
- مسیر اصلی: apps/api/src
- مسیرهای مهم:
  - auth/
  - podcasts/
  - episodes/
  - users/
  - rss/
  - storage/
  - playlists/
  - library/
  - common/

### نتیجه
- ساختار Repository با مستندات docs/architecture.md و docs/folder-structure.md هم‌خوانی دارد و در سطح کلی drift جدی ندارد.

## 7. بررسی Technology Stack
| Area | Documented | Actual | Status |
|---|---|---|---|
| Frontend Framework | Next.js 14 + App Router | Next.js 14.2.15 | ✅ مطابق |
| Language | TypeScript | TypeScript | ✅ مطابق |
| State Management | Zustand | Zustand | ✅ مطابق |
| Data Fetching | TanStack Query | @tanstack/react-query | ✅ مطابق |
| Forms/Validation | React Hook Form + Zod | react-hook-form + zod + @hookform/resolvers | ✅ مطابق |
| Styling | Tailwind CSS | Tailwind CSS | ✅ مطابق |
| Backend Framework | NestJS | NestJS | ✅ مطابق |
| Database | PostgreSQL + Prisma | Prisma schema + PostgreSQL via docker/local setup | ✅ مطابق |
| Queue/Cache | Redis + BullMQ | Redis available in infra; BullMQ not present in current dependency set | ⚠️ جزئی |
| Auth | JWT + bcrypt + HttpOnly cookies | JWT + bcrypt + cookie-parser | ✅ مطابق |
| Storage | MinIO/S3-compatible | MinIO in docker-compose | ✅ مطابق |
| Package Manager | pnpm | pnpm | ✅ مطابق |
| Dev Infrastructure | Docker Compose | Docker Compose | ✅ مطابق |

### تحلیل تکمیلی
- اسناد و واقعیت کد در بیشتر موارد منطبق‌اند.
- تفاوت جزئی در Queue/Cache این است که مستندات به BullMQ اشاره کرده‌اند اما در بسته‌های نصب‌شده فعلی ظاهراً این dependency به‌صورت مستقیم در api/package.json دیده نمی‌شود؛ با این حال، زیرساخت Redis در محیط محلی وجود دارد.
- در سطح Frontend، next-intl و next-pwa در بسته‌های نصب‌شده فعلی دیده نمی‌شوند، اما این‌ها در docs/dependencies.md به‌عنوان planned dependencies ذکر شده‌اند، نه implemented.

## 8. بررسی Feature Ownership
### مرزهای فعلی
- Auth: مرز feature در فرانت‌اند به‌صورت واضح در apps/web/src/features/auth فعال است.
- Podcast: در feature folder apps/web/src/features/podcasts قرار دارد و routeها از این feature برای composition استفاده می‌کنند.
- Episode: feature folder موجود است ولی ownership هنوز به‌طور کامل از route layer جدا نشده و بخشی از orchestration در route باقی مانده است.
- Player: در apps/web/src/features/player به‌صورت feature-scoped پیاده‌سازی شده و state و runtime آن در این مرز نگهداری می‌شود.
- Settings: به‌عنوان feature جدیدتر با hook و persistence feature-owned اجرا شده است.
- Search/Library/Playlist: در feature folders خود مستقر شده‌اند و با استفاده از hooks و components feature-scoped کار می‌کنند.

### تحلیل مرزهای route vs feature
- برخی صفحات app/ فقط نقش composition و routing را بر عهده دارند؛ این الگو با مستندات phase 2.7.1 و phase 2.6.4 هماهنگ است.
- با این حال، در Episode و بعضی مسیرهای دیگر، هنوز بخشی از منطق فرم/submit/upload/page orchestration در route layer باقی مانده است؛ این یک نکته‌ی معماری قابل‌توجه است، نه یک انحراف بزرگ.

## 9. وضعیت Featureهای اصلی
| Feature | Status | Ownership | Risks |
|---|---|---|---|
| Auth | تکمیل‌شده و پایدار | Feature auth در Frontend + shared auth infrastructure | کم؛ مرز مشخص اما هنوز لایه‌ی shared برای session/token/API باقی مانده |
| Podcast | فعال و قابل‌استفاده | Feature-owned در Frontend و API service-driven در Backend | متوسط؛ نیاز به مراقبت برای جلوگیری از drift در UI و route orchestration |
| Episode | در حال تثبیت | Feature folder وجود دارد، اما ownership هنوز جزئی است | بالا؛ route layer هنوز بخش‌هایی از orchestration را در خود دارد |
| Player | فعال و جداشده | Feature-owned و runtime-owned | متوسط؛ coupling با UI و persistence باید نظارت شود |
| Library | فعال | Feature-owned | کم |
| Playlist | فعال | Feature-owned | کم |
| Settings | جدید و مستقل | Feature-owned | کم |
| Search | فعال | Feature-owned | کم |

## 10. بررسی Migrationهای انجام‌شده
- Migration auth boundary در فرانت‌اند به‌صورت incremental انجام شده و در docs/phase-2.7.1-auth-feature-boundary-report.md مستند شده است.
- Migrationهای feature boundary برای Podcast/Episode در مستندات مختلف مطرح شده‌اند و در برخی موارد plan-ready هستند.
- Episode ownership migration در docs/phase-2.8.0-episode-feature-ownership-migration-plan.md به‌صورت plan و آماده‌ی implementation تعریف شده است؛ در کد فعلی هنوز این migration به‌طور کامل اعمال نشده است.
- مستندات نشان می‌دهند که پروژه از یک مدل incremental migration پیروی می‌کند؛ این رویکرد با اصول معماری و MVP هم‌خوانی دارد.

## 11. بررسی Quality و استانداردهای کدنویسی
### نقاط قوت
- استفاده از TypeScript در کل پروژه
- استفاده از Tailwind، Zustand، TanStack Query و React Hook Form مطابق مستندات
- وجود feature folders و separation منطقی
- وجود tests در بخش Web Player و Backend RSS-related areas
- lint و build در زمان بررسی موفق بودند

### نقاط ضعف / ریسک‌های کیفیت
- در برخی فایل‌های بک‌اند از castings به any استفاده شده است؛ این موضوع با استاندارد strict TypeScript در تضاد نیست اما نیازمند نظارت است.
- هنوز بخشی از logic UI در صفحات app/ باقی مانده و این می‌تواند در آینده باعث drift در ownership شود.
- در Frontend، استفاده از shared layer همچنان برای برخی plumbingها ادامه دارد؛ این امر در MVP قابل قبول است، اما باید به‌صورت آگاهانه مدیریت شود تا feature boundary دچار تضعیف نشود.

## 12. ریسک‌های فعلی
### Critical
- هیچ ریسک Critical در زمان این audit شناسایی نشد.

### High
- Ownership Episode هنوز کاملاً به feature boundary منتقل نشده است و route layer همچنان مسئول orchestration زیادی است.
- اگر این وضعیت بدون برنامه‌ریزی ادامه یابد، در آینده احتمال drift و شلوغی route layer افزایش می‌یابد.

### Medium
- Player و Settings با وجود feature-owned بودن، در برخی نقاط به shared plumbing یا persistence وابسته‌اند و باید مراقب بود که این وابستگی‌ها به‌صورت کنترل‌شده باقی بمانند.
- استفاده از stateهای محلی در route layer ممکن است در آینده باعث همپوشانی با feature logic شود.

### Low
- برخی dependencyهای documented و planned هنوز در پروژه نصب نشده‌اند؛ این موضوع برای MVP مشکلی ایجاد نمی‌کند اما باید از over-engineering جلوگیری شود.
- در برخی بخش‌های Backend، لایه‌بندی feature-based مستقیم هنوز به modules/ مهاجرت نشده است؛ این موضوع در MVP قابل قبول است اما برای مقیاس‌پذیری آینده باید نظارت شود.

## 13. مواردی که نباید تغییر کنند
- ساختار کلی Monorepo و جایگاه apps/web و apps/api
- مرزهای feature-based در Frontend و Backend به‌صورت کلی
- قراردادهای عمومی API و مسیرهای فعلی routeها بدون نیاز مبرم
- مالکیت Player runtime در feature player
- مالکیت Auth به‌صورت incremental و بدون تغییر رفتار runtime
- رویکرد MVP-first و جلوگیری از اضافه‌کردن abstractions آینده‌نگر

## 14. پیشنهاد قدم بعدی
- قدم بعدی منطقی، ادامه‌ی تثبیت feature boundaries با تمرکز بر Episode است.
- این کار باید به‌صورت incremental و بدون تغییر رفتار runtime یا API انجام شود.
- پیشنهاد می‌شود در مرحله‌ی بعدی:
  1. انتقال منطق create/submit/upload episode از route layer به feature layer
  2. انتقال composition صفحه‌ی detail episode به feature-owned component/hook
  3. حفظ قرارداد API و مسیرها بدون تغییر
  4. انجام validation با lint/build و آزمون‌های مرتبط

## 15. نتیجه نهایی
- پروژه در وضعیت خوب و قابل‌استفاده برای MVP قرار دارد.
- معماری فعلی با مستندات و کد هم‌خوانی دارد و از نظر کلی پایدار است.
- مهم‌ترین مسیر برای بهبود در آینده، تکمیل migrationهای ownership، به‌ویژه در Episode و تثبیت مرزهای feature در لایه‌ی route است.
- پروژه برای ادامه‌ی توسعه و ورود به فازهای بعدی آماده است، مشروط بر اینکه تغییرات آینده در چارچوب incremental و بدون شکستن قراردادهای موجود انجام شوند.

PROJECT UNDERSTOOD: YES
READY TO CONTINUE: YES

پیشنهاد مرحله‌ی بعدی: ادامه‌ی مرحله‌ی تثبیت مرزهای Feature Ownership با تمرکز بر Episode و حفظ الزامات MVP بدون تغییر در API و مسیرهای فعلی.
