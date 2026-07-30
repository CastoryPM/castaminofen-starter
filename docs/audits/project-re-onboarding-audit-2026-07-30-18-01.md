# گزارش Audit مجدد پروژه Castaminofen

## 1. تاریخ بررسی
- 2026-07-30 18:01:12
- محیط بررسی: Linux / Dev Container
- روش بررسی: مطالعه مستندات پروژه، ساختار ریپو، پکیج‌ها، مسیرهای فرانت‌اند/بک‌اند و اجرای مستقیم lint / build / test

## 2. نسخه / وضعیت پروژه
- نسخه فعلی در ریپو: 0.1.0
- وضعیت کلی: آماده برای MVP / Release Candidate با تمرکز بر تثبیت مرزهای feature و stabilization تجربه کاربری
- وضعیت فعلی بر اساس شواهد اجرایی:
  - lint: موفق با warningها
  - build: موفق برای web و api
  - tests وب: موفق، 39 فایل و 126 تست پاس شد

## 3. خلاصه اجرایی
- پروژه بر اساس معماری feature-based و MVP-first در حال اجرا است و ساختار فعلی در سطح وسیع با مستندات هماهنگ است.
- مرزهای feature در فرانت‌اند به‌صورت تدریجی تثبیت شده‌اند، به‌ویژه برای Auth و بخش‌های UI مشترک.
- ساختار بک‌اند هنوز در قالب feature folders مستقیم پیاده‌سازی شده و به‌صورت کامل به modules/ مهاجرت نشده است؛ این موضوع برای MVP قابل‌قبول است اما برای رشد آینده یک ریسک معماری محسوب می‌شود.
- از نظر کیفیت، پروژه در وضعیت قابل‌قبول و قابل ادامه است، با warningهای lint و چند ریسک طراحی در لایه‌های Player/Search/Profile که نیاز به نظارت دارند.

## 4. بررسی قوانین پروژه و copilot-instructions.md
- مستندات و معیارهای پروژه از فایل copilot-instructions.md و docs/ به‌عنوان منبع اصلی تطابق و راهنمای تصمیم‌گیری استفاده می‌شوند.
- اصول اصلی استخراج‌شده:
  - اولویت به Simplicity, Maintainability, Scalability, Readability
  - Feature-Based Architecture و MVP-first
  - تایپ‌اسکریپت strict، اجتناب از over-engineering و dependency بی‌دلیل
  - احترام به folder ownership و جلوگیری از duplicate logic
  - build/lint/type check/test قبل از اعلام تکمیل فاز
- این اصول در ساختار فعلی به‌طور کلی رعایت شده‌اند. نقطه قوت اصلی این است که تغییرات جدید در پروژه عمدتاً در مرز feature و با حداقل تغییر runtime انجام شده‌اند.
- محدودیت مهمی که در عمل دیده می‌شود این است که مستندات گاهی از “planned” و “roadmap” برای پکیج‌هایی مثل next-intl، BullMQ و next-pwa استفاده می‌کنند در حالی که در package.json فعلی نسخه‌ی اجرایی آن‌ها وجود ندارد.

## 5. درک معماری فعلی
- معماری فعلی بر پایه‌ی یک monorepo با دو اپ اصلی طراحی شده است:
  - Frontend در apps/web با Next.js App Router
  - Backend در apps/api با NestJS و Prisma
- ساختار کلی برای MVP به‌صورت زیر قابل‌درک است:
  - Foundation layer: زیرساخت UI، design system، providers، shared infrastructure
  - Feature layer: auth, podcasts, episodes, library, playlists, search, profile, player, settings
- این مدل از نظر معماری منطقی است، چون اجازه می‌دهد featureها مستقل رشد کنند بدون اینکه کل اپ بازنویسی شود.
- در عمل، مرز مالکیت هنوز “incremental” است؛ یعنی برخی featureها کاملاً feature-owned شده‌اند، اما زیرساخت‌های مشترک مانند session/auth state، API client و stateهای سراسری هنوز در لایه shared/ یا stores/ باقی مانده‌اند.

## 6. بررسی ساختار Repository
- ساختار اصلی ریپو به‌صورت زیر است:
  - apps/api: بک‌اند NestJS
  - apps/web: فرانت‌اند Next.js
  - packages/shared-types و packages/config: کد و تنظیمات مشترک
  - docs: مستندات، گزارش فازها، phase reports و audits
  - docker-compose.yml: سرویس‌های محلی PostgreSQL، Redis و MinIO
- تحلیل ساختار فرانت‌اند:
  - apps/web/src/app: routeها و page entry points
  - apps/web/src/features: feature-specific UI و منطق مرتبط با feature
  - apps/web/src/components: componentهای UI و layout عمومی
  - apps/web/src/shared: infrastructure مشترک مثل API client و utilities
  - apps/web/src/stores: Zustand stores سراسری
- تحلیل ساختار بک‌اند:
  - apps/api/src/auth, podcasts, episodes, users, storage, rss, playlists, library
  - ساختار فعلی feature-based و مستقیم است، نه به‌صورت modules/ کامل.

## 7. بررسی Technology Stack

| Area | Documented | Actual | Status |
|---|---|---|---|
| Frontend Framework | Next.js 14 App Router | Next.js 14.2.15 | ✅ Match |
| Language | TypeScript | TypeScript در web/api | ✅ Match |
| Styling | Tailwind CSS | tailwindcss در web | ✅ Match |
| State Management | Zustand | zustand در web | ✅ Match |
| Data Fetching | TanStack Query | @tanstack/react-query در web | ✅ Match |
| Forms | React Hook Form + Zod | react-hook-form + zod در web | ✅ Match |
| Auth Frontend | JWT/session plumbing | auth state و token handling در shared/lib و stores | ✅ Partial Match |
| Backend Framework | NestJS | @nestjs/* در api | ✅ Match |
| Database / ORM | PostgreSQL + Prisma | Prisma + postgres service در docker-compose | ✅ Match |
| Cache / Queue | Redis + BullMQ | Redis service در docker-compose، BullMQ در package.json نیست | ⚠️ Partial |
| Storage | MinIO / S3-compatible | MinIO در docker-compose و @aws-sdk/client-s3 | ✅ Match |
| Package Manager | pnpm workspace | pnpm workspace و pnpm-lock موجود | ✅ Match |
| Testing | Vitest / test infra | Vitest در web و test runner در api | ✅ Match |

### جمع‌بندی تکنولوژی
- استک اصلی مطابق مستندات و نیاز MVP پیاده‌سازی شده است.
- تفاوت مهم فقط در بخش Queue/Background Jobs است: Redis در محیط محلی وجود دارد، اما BullMQ و ابزارهای queue-centric به‌طور کامل در package.json دیده نمی‌شوند. این مورد بیشتر یک “roadmap/next phase” است تا یک مشکل فعلی.

## 8. بررسی Feature Ownership

| Layer | Ownership فعلی | توضیح |
|---|---|---|
| Route ownership | apps/web/src/app | routeها و page composition سطح بالا را نگه می‌دارند؛ در این لایه صفحه‌ها معمولاً فقط feature view را mount می‌کنند |
| Feature ownership | apps/web/src/features/* | auth, podcasts, episodes, library, player, search, profile, settings و سایر featureها در این لایه قرار دارند |
| Shared ownership | apps/web/src/components و apps/web/src/shared | componentهای عمومی UI، infrastructure مشترک، API client، utilities و providers |
| Global infrastructure | apps/web/src/providers و apps/web/src/stores | stateهای سراسری، provider composition و plumbing عمومی |

### تحلیل مالکیت
- Auth به‌عنوان نمونه‌ی موفق‌تری از boundary adoption دیده می‌شود: صفحه‌های login/register از feature-owned views استفاده می‌کنند، در حالی که session/token plumbing در shared infrastructure باقی مانده است.
- Podcasts و Episodes نیز در سطح feature-owned components و hooks قرار دارند، اما هنوز با shared utilities و API abstraction در تعامل هستند.
- Player در حال حاضر یک feature با ownership واضح برای runtime و UI است؛ این مرز برای آینده مناسب است، اما ریسک آن در افزایش coupling با stateهای سراسری و UI-rich surfaces است.

## 9. وضعیت Featureهای اصلی

| Feature | Status | Ownership | Risks |
|---|---|---|---|
| Auth | Stable / partially migrated | UI composition در feature، session/token plumbing در shared | اگر رشد کند، risk drift بین feature UI و shared auth infra افزایش می‌یابد |
| Podcast | Stable | feature-owned presentation و form logic | هنوز به shared API/client و shared UI متکی است |
| Episode | Stable | feature-owned cards/forms/presentation | در آینده نیاز به کاهش coupling با shared presentation/metadata دارد |
| Player | Stable / premium UI expansion | runtime و UI در feature Player | ریسک بالا در صورت اضافه‌شدن stateهای بیشتر به shared layer یا چندین surface UI |
| Search | Stable | feature-level UI و results panel | استفاده از useSearchParams و stateهای محاسباتی در component می‌تواند آینده را سخت‌تر کند |
| Library | Stable | feature-level page و section components | وابستگی به shared UI و player integrations باید کنترل شود |
| Settings | Stable | feature-owned preferences و persistence | بهتر است این ownership به‌صورت ثابت و محدود باقی بماند |

## 10. بررسی Migrationهای انجام‌شده
- Migration Auth Boundary: مهم‌ترین migration انجام‌شده در فرانت‌اند، با تثبیت مالکیت auth در feature boundary.
- Migration Design System Adoption: UIهای اصلی به لایه Design System مهاجرت شده‌اند بدون تغییر در business logic یا API contracts.
- Migration RSS Ownership Freeze: مرزهای RSS در بک‌اند و فرانت‌اند به‌صورت تعریف‌شده و با پنهان‌سازی فیلدهای عملیاتی RSS از model عمومی تثبیت شده است.
- Migration Player UI Expansion: تجربه‌ی Player به سمت experience-rich ارتقا یافته اما ownership runtime بدون تغییر باقی مانده است.
- Migration Settings Ownership: ترجیحات کاربر در مرز Feature Settings نگهداری شده است.

### نتیجه‌ی این مهاجرت‌ها
- مهاجرت‌ها عمدتاً “safe” و “incremental” بوده‌اند.
- هدف اصلی از این مهاجرت‌ها کاهش drift و جلوگیری از ایجاد ownership ambiguity بوده است.
- هنوز مهاجرت کامل به ساختار modules/ در بک‌اند یا full feature ownership برای همه featureها انجام نشده است، که برای MVP منطقی است.

## 11. بررسی Quality و استانداردهای کدنویسی
### TypeScript و ساختار کد
- TypeScript در فرانت‌اند و بک‌اند در حال اجرا است و build موفق انجام شده است.
- ساختار feature-based در فرانت‌اند به‌طور واضح دیده می‌شود و با فلسفه پروژه هم‌راستا است.
- folder naming و ownership در سطح کلان سازگار است.

### Quality Evidence
- lint موفق بود، اما با warningهای قابل‌توجه در چند component، از جمله:
  - unused vars در Profile / Library / Player
  - react-hooks/exhaustive-deps در SearchResultsPanel
  - no-img-element warnings برای چند component design-system
- این warningها عملیاتی نیستند، اما نشانه‌ی این هستند که cleanup و polish در سطح code quality هنوز ادامه دارد.

### Dependency و Build System
- package manager: pnpm
- workspace: monorepo با apps/api و apps/web
- scripts اصلی در root:
  - pnpm lint
  - pnpm build
  - pnpm --filter @castaminofen/web test
- این تنظیمات مناسب و قابل‌استفاده‌اند.

### Validation اجراشده
- pnpm lint: موفق با warningها
- pnpm build: موفق
- pnpm --filter @castaminofen/web test: موفق، 39 فایل و 126 تست پاس

## 12. ریسک‌های فعلی

### Critical
- هیچ blocker بحرانی برای ادامه‌ی توسعه‌ی MVP در زمان بررسی فعلی دیده نشد.

### High
- ریسک drift در ownership برای Player و Auth در صورت رشد بیشتر featureها و اضافه‌شدن state یا UI surface‌های جدید.
- ریسک coupling میان shared infrastructure و feature UI اگر featureها بیش از این به shared utilities و global stores وابسته شوند.

### Medium
- بک‌اند هنوز به‌صورت مستقیم feature-based است و نه به‌صورت modules/ کامل؛ این موضوع برای MVP قابل‌قبول است، اما برای آینده می‌تواند به پیچیدگی و افزایش dependency بین featureها منجر شود.
- برخی componentها هنوز در لایه‌های shared/components قرار دارند که شاید در آینده نیاز به بازآرایی برای جلوگیری از “shared overgrowth” داشته باشند.

### Low
- مستندات و package manifests در چند بخش با هم هم‌پوشانی کامل ندارند، به‌ویژه در مورد dependencies آتی مثل BullMQ/next-intl/next-pwa.
- warningهای lint و چند warning Next.js نشانه‌ی polish backlog هستند، نه خرابی.

## 13. مواردی که نباید تغییر کنند
- ساختار feature-based فعلی در فرانت‌اند
- مرز مالکیت Auth و Settings که به‌صورت incremental تثبیت شده‌اند
- Runtime ownership Player و رفتار queue/repeat/shuffle در سطح فعلی
- قراردادهای عمومی API برای Podcast و Episode در سطح domain
- routeهای اصلی و تجربه‌ی کاربری MVP که در مستندات و گزارش‌های قبلی تثبیت شده‌اند

## 14. پیشنهاد قدم بعدی
- قدم بعدی مناسب، ادامه‌ی “stabilization phase” است نه بازنویسی بزرگ.
- پیشنهاد اصلی:
  1. تثبیت بیشتر مرز feature در Player/Search/Profile بدون تغییر رفتار runtime
  2. پاک‌سازی warningهای lint و warningهای Next.js
  3. نگه‌داشتن ساختار فعلی feature-based و جلوگیری از اضافه‌کردن abstraction غیرضروری
  4. در صورت نیاز، در مرحله بعدی فقط یک incremental backend refactor برای نزدیک‌تر کردن ساختار به modules/ انجام شود

## 15. نتیجه نهایی
- پروژه در وضعیت قابل‌قبول و قابل ادامه است.
- درک معماری فعلی به‌طور کلی درست است و با مستندات و کد هماهنگ است.
- هیچ نیاز فوری به بازنویسی یا تغییر ساختار بزرگ وجود ندارد.
- بهترین مسیر برای ادامه، حفظ الگوی فعلی، تثبیت مرزهای feature، و کاهش warningها و driftهای آینده است.

PROJECT UNDERSTOOD: YES
READY TO CONTINUE: YES

فاز پیشنهادی بعدی: ادامه‌ی تثبیت مرزهای feature در سطح Player/Search/Profile و پاک‌سازی warningهای lint/quality بدون تغییر در runtime یا قراردادهای API.
