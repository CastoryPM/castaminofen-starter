# گزارش Audit مجدد پروژه Castaminofen

## 1. تاریخ بررسی
- 2026-07-28 19:33

## 2. نسخه / وضعیت پروژه
- وضعیت فعلی: پروژه در محدوده MVP و در مرحله تثبیت معماری و آماده‌سازی ادامه توسعه قرار دارد.
- مستندات اخیر نشان می‌دهند که تمرکز فعلی بر روی RSS ingestion ownership، integration با Player، playlist/library experience، auth boundary و آماده‌سازی release MVP است.
- بر اساس کد موجود، پروژه از نظر ساختار اصلی در وضعیت پایدار و قابل ادامه است، با این حال چند شکاف بین مستندات برنامه‌ریزی‌شده و پیاده‌سازی واقعی هنوز باقی مانده است.

## 3. خلاصه اجرایی
- پروژه یک Monorepo است که در آن Frontend در apps/web و Backend در apps/api پیاده‌سازی شده‌اند.
- ساختار فعلی با اصول documented در .github/copilot-instructions.md و docs/architecture.md هم‌راستا است، به‌ویژه در مورد Feature-Based Architecture، TypeScript strict، استفاده از Zustand برای state جهانی، TanStack Query برای server state، React Hook Form + Zod برای فرم‌ها و NestJS + Prisma برای Backend.
- پیاده‌سازی فعلی به‌طور کلی با مستندات اصلی سازگار است، اما برخی قابلیت‌های برنامه‌ریزی‌شده هنوز در کد موجود نیستند یا فقط به‌صورت partial وجود دارند.
- از نظر ساختاری، ownership featureها در Frontend تا حد زیادی به‌صورت feature-based تثبیت شده است؛ در Backend نیز ساختار feature-oriented مستقیم در src مشاهده می‌شود و هنوز به modules/ مهاجرت نشده است که با مستندات فعلی نیز سازگار است.

## 4. بررسی قوانین پروژه و copilot-instructions.md
- قوانین اصلی پروژه بر پایه‌ی اصول زیر است:
  - ساده‌سازی و maintainability در اولویت است.
  - تغییرات باید حداقلی، هدفمند و مبتنی بر معماری موجود باشند.
  - Feature-Based Architecture الزامی است.
  - کد باید Strict TypeScript و قابل‌فهم باشد.
  - Frontend باید بر پایه Server Components به‌عنوان پیش‌فرض و Client Components فقط در موارد لازم ساخته شود.
  - Zustand فقط برای state جهانی و TanStack Query برای server state استفاده شود.
  - فرم‌ها با React Hook Form + Zod پیاده‌سازی شوند.
  - Backend باید دارای Controllers thin، Services برای منطق کسب‌وکار و DTOها برای ورودی باشد.
  - Auth باید بر اساس JWT access/refresh، HttpOnly cookies و bcrypt پیاده‌سازی شود.
  - مستندات و گزارش‌های فازی باید در repository ثبت شوند.
- این قواعد در این audit به‌صورت روشن و قابل‌استناد در کد و مستندات مشاهده شدند.
- در عمل، پروژه از این اصول پیروی می‌کند، با این حال lint API در وضعیت فعلی دارای warnings مربوط به unused imports/args است که نشان می‌دهد هنوز در برخی بخش‌ها سطح کیفیت کاملاً صفر نیست.

## 5. درک معماری فعلی
- Frontend در apps/web/src با ساختار App Router و feature-based اجرا می‌شود.
- بخش‌های مهم شامل app/، features/، components/، lib/، providers/، shared/، stores/ و styles/ است.
- Backend در apps/api/src با ساختار feature-oriented مستقیم پیاده‌سازی شده است و پوشه‌های auth، podcasts، episodes، library، playlists، rss، storage، users و common را شامل می‌شود.
- Shared packages در packages/shared-types و packages/config قرار دارند.
- زیرساخت محلی در docker-compose.yml شامل PostgreSQL، Redis و MinIO است.
- معماری فعلی به‌طور کلی بر پایه‌ی لایه‌ی Foundation + Feature Layer ساخته شده است و این مدل در کد و مستندات پشتیبانی می‌شود.

## 6. بررسی ساختار Repository
- apps/web: اپ فرانت‌اند با Next.js 14 و App Router
- apps/api: اپ بک‌اند با NestJS و Prisma
- packages/shared-types: تایپ‌های مشترک
- packages/config: پیکربندی مشترک
- docs: مستندات، گزارش‌ها، فازها و auditها
- docker-compose.yml: محیط محلی برای PostgreSQL، Redis و MinIO

### تحلیل ساختاری
- ساختار repository از نظر monorepo و تفکیک مسئولیت‌ها مطابق مستندات است.
- Frontend ownership در سطح featureها به‌خوبی قابل تشخیص است و foldersی مانند features/auth، features/podcasts، features/episodes، features/player، features/playlists، features/search وجود دارند.
- Backend نیز ساختار feature-oriented دارد، اما هنوز به شکل module-based NestJS کامل مهاجرت نکرده است؛ این موضوع با مستندات فعلی هم‌خوانی دارد و به‌عنوان یک تصمیم آگاه در معماری ثبت شده است.

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
| Database | PostgreSQL | Postgres در Docker | ✅ هم‌راستا |
| Cache/Queue | Redis + BullMQ (planned/roadmap) | Redis در Docker، BullMQ نصب نشده | ⚠️ جزئی |
| Storage | MinIO | MinIO در Docker | ✅ هم‌راستا |
| Auth | JWT + refresh + bcrypt | @nestjs/jwt + bcrypt + passport | ✅ هم‌راستا |
| i18n/RTL | next-intl planned | در کد/پکیج فعلی نصب نشده | ⚠️ برنامه‌ریزی‌شده و هنوز اجرا نشده |
| Offline storage | IndexedDB / Service Worker planned | در کد فعلی مشاهده نشد | ⚠️ برنامه‌ریزی‌شده و هنوز اجرا نشده |

## 8. بررسی Feature Ownership
- Auth: ownership feature در فرانت‌اند در apps/web/src/features/auth دیده می‌شود. در عین حال بخش‌های shared auth plumbing هنوز در لایه shared/lib و stores باقی مانده‌اند. این مدل، همان‌طور که در docs ذکر شده، incremental و قابل‌قبول برای MVP است.
- Podcasts: ownership feature در apps/web/src/features/podcasts با hooks، utils و presentation components به‌خوبی تعریف شده است. route-level pages به‌عنوان entry points باقی مانده‌اند، اما این الگو با معماری فعلی سازگار است.
- Episodes: ownership در سطح feature به‌صورت قابل‌توجهی پیاده‌سازی شده است، با components، hooks و validators. با این حال بخش‌هایی از orchestration هنوز در route سطح باقی مانده‌اند که نشان می‌دهد migration کامل هنوز انجام نشده اما در مسیر درست است.
- Player: ownership runtime به‌صورت feature-based در apps/web/src/features/player قرار دارد و state عمومی آن از Zustand می‌آید. این ساختار برای یک player سراسری مناسب است و به‌نظر می‌رسد مرز runtime در حال حاضر روشن است.
- Playlist: ownership در apps/web/src/features/playlists با hooks/components/services/types وجود دارد و integration با Player در سطح MVP برقرار است.
- Search: feature ownership در apps/web/src/features/search با route و hooks مربوط قابل مشاهده است.
- Global infrastructure: apps/web/src/shared، providers، components/layout و stores به‌عنوان لایه shared infrastructure در نظر گرفته می‌شوند.

## 9. وضعیت Featureهای اصلی

| Feature | Status | Ownership | Risks |
|---|---|---|---|
| Auth | پیاده‌سازی شده | Feature-owned در UI، shared plumbing در لایه مشترک | ریسک drift در صورت رشد جداگانه‌ی feature و shared layer |
| Podcast | پیاده‌سازی شده | Feature-owned | ریسک کم؛ route-level orchestration هنوز وجود دارد |
| Episode | در حال تثبیت | Feature-owned با بخش‌های route-level | مرز ownership هنوز به‌طور کامل شفاف نیست |
| Player | موجود و پایدار | Runtime-owned در features/player | نیاز به نگهداری دقیق برای queue/repeat/shuffle و lifecycle |
| Playlist | موجود | Feature-owned | وابستگی به Player و API باید در آینده کنترل شود |
| Search | موجود | Feature-owned | نیاز به ثبات URL/state در آینده |

## 10. بررسی Migrationهای انجام‌شده
- مستندات فازهای 2.6 تا 4.6 نشان می‌دهند که پروژه چندین مرحله مهاجرت و تثبیت boundary را پشت سر گذاشته است.
- در docs/architecture-decisions.md، تصمیم‌های مهمی درباره RSS ownership، persistence minimal برای MVP و canonical identity podcast ثبت شده‌اند.
- فازهای اخیر در docs/project-status.md نشان می‌دهند که RSS import ownership و playback integration به‌طور عملی تکمیل شده‌اند.
- این migrationها به‌صورت قابل‌قبول در کد و مستندات منعکس شده‌اند، به‌خصوص در بخش RSS و player integration.

## 11. بررسی Quality و استانداردهای کدنویسی
- TypeScript strict در Frontend و Backend در ساختار پروژه مشاهده می‌شود.
- نام‌گذاری به‌طور کلی با قواعد پروژه هم‌خوانی دارد: components و types در PascalCase، hooks و variables در camelCase، فایل‌ها در kebab-case یا patternهای موجود.
- ساختار پوشه‌بندی به‌صورت Feature-Based رعایت شده است.
- در کد، duplicate logic شدید مشاهده نشد و از shared adapters/hooks برای جلوگیری از تکرار استفاده شده است.
- ابزارهای validation و lint در سطح package تعریف شده‌اند.
- وضعیت فعلی validation:
  - Build: با موفقیت اجرا شد.
  - Lint: با warning‌های ESLint در apps/api مواجه شد؛ این warningها خطای hard نیستند اما نشان‌دهنده این هستند که سطح lint clean هنوز به‌طور کامل در همه پروژه حاصل نشده است.
  - Tests: بر اساس مستندات پروژه، tests مرتبط با frontend/backend و RSS regression موجود است، اما در این audit با اجرای build و lint به‌صورت مستقیم تأیید شد.

## 12. ریسک‌های فعلی
### Critical
- ریسک بحرانی جدیدی در ساختار فعلی دیده نشد.

### High
- ترکیب feature-owned UI با shared plumbing در auth و shared infrastructure می‌تواند در آینده باعث drift معماری شود اگر refactor یا تغییرات گسترده انجام شود.
- در صورت افزایش نیاز به background jobs و RSS processing، نبود BullMQ/queue infrastructure در حال حاضر ممکن است به محدودیت معماری منجر شود.

### Medium
- i18n/RTL و offline experience در مستندات ثبت شده‌اند اما در کد فعلی still not implemented یا only partially implemented هستند.
- مرز ownership episode هنوز کاملاً شفاف نیست و بخش‌هایی از orchestration هنوز در route باقی مانده‌اند.

### Low
- lint warnings در API و وجود چند gap بین docs و پیاده‌سازی، به‌ویژه در بخش‌های planned dependencies، در بلندمدت می‌تواند روی maintainability اثر بگذارد.

## 13. مواردی که نباید تغییر کنند
- ساختار کلی monorepo و جایگاه apps/web و apps/api نباید بدون نیاز اساسی تغییر کند.
- مرزهای feature-based و shared infrastructure باید حفظ شوند.
- اصول copilot-instructions در مورد minimal change، documentation-first و validation-before-completion باید رعایت شوند.
- docker-compose.yml به‌عنوان محیط استاندارد محلی باید بدون تغییر ناگهانی حفظ شود.
- packages/shared-types و packages/config باید برای shared abstractions و configurationها استفاده شوند و نه برای feature-specific logic.

## 14. پیشنهاد قدم بعدی
- قدم بعدی منطقی، ادامه تثبیت MVP و جلوگیری از drift در مرزهای feature ownership است.
- پیشنهاد می‌شود در فاز بعدی تمرکز روی این موارد باشد:
  - رفع warnings ESLint در backend
  - تثبیت دقیق‌تر ownership در episode و auth در صورت نیاز به refactor
  - تکمیل یا مستندسازی دقیق‌تر بخش‌های planned مثل i18n/RTL و offline storage
  - حفظ مرزهای RSS و Player بدون اضافه‌کردن abstractionهای غیرضروری
- با توجه به مستندات فعلی و کد موجود، قدم بعدی مناسب برای ادامه کار، ادامه مسیر MVP stabilization و validation است، نه شروع یک بازنویسی معماری بزرگ.

## 15. نتیجه نهایی
- پروژه درک شده و آماده ادامه است.
- معماری فعلی با مستندات اصلی و ساختار repository هم‌راستا است.
- پیاده‌سازی فعلی در محدوده MVP پایدار است، ولی برای حفظ کیفیت و جلوگیری از drift معماری، لازم است lint warnings رفع شود و مرزهای ownership در چند feature با دقت بیشتر تثبیت شوند.

PROJECT UNDERSTOOD: YES
READY TO CONTINUE: YES
