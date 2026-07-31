# گزارش Audit مجدد پروژه Castaminofen

## 1. تاریخ بررسی
- تاریخ اجرا: 2026-07-31
- زمان گزارش: 2026-07-31 02:22
- روش بررسی: تحلیل فقط، بدون هیچ تغییر کد یا تغییر ساختار

## 2. نسخه / وضعیت پروژه
- نسخه فعلی در سطح مخزن: `v0.1.0`
- وضعیت مستندات و کد: در سطح MVP آماده و در حال تثبیت
- وضعیت فعلی بر اساس Evidence: build، lint و تست‌های موجود قابل اجرا هستند و در این بررسی پاس شدند.
- وضعیت پروژه در مستندات: Ready for Release / Ready for MVP release preparation
- وضعیت واقعی در این Audit: پروژه از نظر ساختار CLI و runtime baseline به‌صورت قابل‌قبول پایدار است، اما همچنان لایه‌های آینده مانند RSS/queue/offline/PWA و i18n/RTL به‌صورت کامل در کد جاری تعبیه نشده‌اند.

## 3. خلاصه اجرایی
- پروژه بر اساس همان الگوی documented architecture و feature-first ownership عمل می‌کند.
- ساختار فعلی در frontend در سطح `apps/web/src/app` + `apps/web/src/features` + `shared` + `stores` و در backend در سطح مستقیم feature folders تحت `apps/api/src/{auth,podcasts,episodes,...}` قرار دارد.
- مستندات مالکیت featureها و migrationهای گذشته با وضعیت فعلی در اکثر بخش‌ها هم‌راستا هستند.
- اجرای واقعی ابزارهای اعتبارسنجی نشان می‌دهد که این ریپو در سطح فعلی، build و lint و تست‌های موجود را با موفقیت عبور می‌کند.
- مهم‌ترین اختلاف میان مستندات و واقعیت، نبود کامل برخی زیرساخت‌های آینده و drift جزئی در مسیرهای ownership است.

## 4. بررسی قوانین پروژه و copilot-instructions.md

### قواعد اصلی استخراج‌شده
1. معماری باید ساده، maintainable، scalable و feature-first باشد.
2. فرانت‌اند باید بر پایه‌ی `Next.js App Router` و `feature boundary` ساخته شود.
3. بک‌اند باید بر پایه‌ی `NestJS` و `Prisma` و `PostgreSQL` باشد.
4. مالکیت feature در frontend باید بر اساس feature folders و نه ساختار فایل‌محور باشد.
5. `Zustand` فقط برای stateهای global UI مثل Player و Auth استفاده شود و `TanStack Query` برای data fetching و cache استفاده شود.
6. `React Hook Form + Zod` برای فرم‌ها و validation اجباری است.
7. Styling باید `Tailwind` باشد و textها باید از i18n/RTL مناسب عبور کنند.
8. برای API، `REST` و نسخه‌بندی‌شده `/api/v1` باید حفظ شود.
9. backend باید DTO، validation، service layer و سرویس‌های Prisma + Redis + Job Queue به‌صورت explicit داشته باشد.
10. هیچ feature جدیدی نباید بدون نیاز MVP یا بدون دلیل واقعی به ساختار اضافه شود.

### قوانین ممنوع
- duplication logic
- اضافه‌کردن abstraction یا dependency غیرضروری
- ایجاد folder یا component غیرضروری
- disabling TypeScript / ESLint
- تغییر رفتار runtime بدون مستندات قبلی
- حذف boundary featureها بدون نسخه‌ی تصمیم‌یافته

### استانداردهای تست و validation
- تعریف Done در مستندات: build، lint، type check، تست مرتبط، runtime verification.
- در عمل، این Audit نشان داد که build، lint و تست‌های فعلی اجرا می‌شوند، اما runtime verification end-to-end در این session به‌صورت کامل انجام نشده است.

## 5. درک معماری فعلی

### معماری کلان
- frontend در `apps/web` روی `Next.js 14` و App Router اجرا می‌شود.
- backend در `apps/api` با `NestJS` و `Prisma` اجرا می‌شود.
- shared types در `packages/shared-types` نگهداری می‌شوند.
- دسترسی به دیتابیس و storage در محیط محلی через Docker Compose انجام می‌شود.

### لایه‌بندی فعلی
- `Foundation Layer` در frontend بیشتر شامل UI primitives، design tokens، layout، providers و shared infrastructure است.
- `Feature Layer` در frontend شامل `auth`, `podcasts`, `episodes`, `library`, `playlists`, `player`, `search`, `settings`, `profile`, `creator`, `community`, `admin` است.
- backend هنوز بیشتر در ساختار feature-based مستقیم و نه `modules/` قرار دارد؛ این موضوع با مستندات `folder-structure.md` و `architecture.md` هم‌راستا است و به‌عنوان یک وضعیت incremental شناخته می‌شود.

### مدل فعلی ownership
- Auth در frontend دارای boundary feature به‌صورت واضح است و مسیر `login`, `register`, `ProtectedRoute` در feature layer به‌صورت feature-owned حفظ شده‌اند.
- Podcast و Episode در لایه‌ی feature به‌صورت partial-owned قرار دارند؛ بخش‌های زیادی از composition و UI در feature boundary هستند، اما route-level orchestration در بعضی مسیرها هنوز باقی مانده است.
- Player به‌عنوان runtime owner مستقل برای پخش، queue، repeat، shuffle، progress و lifecycle پخش در مسیر فعلی باقی مانده است.
- RSS در backend به‌عنوان `rss` module با services و orchestration وجود دارد، اما در این بررسی، این phần در UI و architecture به‌صورت fully adopted به feature layer منتقل نشده است.

## 6. بررسی ساختار Repository

### پروژه در سطح مخزن
- `apps/web`: frontend
- `apps/api`: backend
- `packages/shared-types` و `packages/config`: shared packages
- `docs`: مستندات، phase reports، audits و گزارش‌های validation
- `docker-compose.yml`: سرویس‌های local infra

### ساختار frontend واقعی
- `apps/web/src/app` برای route و page entry
- `apps/web/src/features` برای feature-specific ownership
- `apps/web/src/components` برای shared UI و design-system primitives
- `apps/web/src/shared` برای shared infrastructure
- `apps/web/src/providers` برای provider composition
- `apps/web/src/stores` برای Zustand globals
- `apps/web/src/styles` برای tokens و styling پایه

### ساختار backend واقعی
- `apps/api/src/auth`
- `apps/api/src/podcasts`
- `apps/api/src/episodes`
- `apps/api/src/library`
- `apps/api/src/playlists`
- `apps/api/src/rss`
- `apps/api/src/storage`
- `apps/api/src/users`
- `apps/api/src/prisma`

### نتیجه
- ساختار monorepo و تقسیم application/shared/debugging sources به‌صورت اصلی درست است.
- drift اصلی در backend به صورت direct feature folders باقی مانده است، نه به‌صورت modules-based کاملاً formal.

## 7. بررسی Technology Stack

| Area | Documented | Actual | Status |
|---|---|---|---|
| Frontend Framework | Next.js App Router | Next.js 14.2.15 | ✅ |
| Language | TypeScript | TypeScript 5.7.2 | ✅ |
| Styling | Tailwind CSS | Tailwind CSS 3.4.17 | ✅ |
| State Management | Zustand | Zustand 5.0.14 | ✅ |
| Data Fetching | TanStack Query | `@tanstack/react-query` | ✅ |
| Forms/Validation | React Hook Form + Zod | `react-hook-form` + `zod` | ✅ |
| Internationalization | next-intl | Not present in workspace deps | ⚠️ جزئی |
| Offline/PWA | Workbox / next-pwa / IndexedDB | Not visible in deps or repo app code | ⚠️ جزئی |
| Backend Framework | NestJS | NestJS 10.4.8 | ✅ |
| Database / ORM | PostgreSQL + Prisma | PostgreSQL + Prisma | ✅ |
| Queue / Background Jobs | Redis + BullMQ | Redis exists; BullMQ not installed | ⚠️ جزئی |
| Auth | JWT + bcrypt + HttpOnly Cookies | JWT + bcrypt + cookie parser | ✅ |
| Storage | MinIO / S3-compatible | MinIO in Docker Compose | ✅ |
| RSS Parsing | rss-parser / fast-xml-parser | RSS module exists in backend, but those packages are not in dependency manifest | ⚠️ جزئی |
| Security Layer | helmet / throttler | Not visible | ⚠️ جزئی |
| Infra | Docker Compose + Postgres + Redis + MinIO | Docker Compose includes postgres, redis, minio | ✅ |
| Reverse Proxy | Nginx | Not present in `docker-compose.yml` | ⚠️ جزئی |

## 8. بررسی Feature Ownership

### مرزها و مالکیت فعلی

| لایه | مالک فعلی | تحلیل |
|---|---|---|
| Auth | Feature auth + shared session infrastructure | Auth در frontend از feature ownership استفاده می‌کند؛ اما token/session plumbing همچنان در shared infrastructure حفظ شده است. |
| Podcast | Feature podcasts + shared API adapter | UI و hooks اصلی در feature نگهداری می‌شوند؛ route composition باقی مانده است. |
| Episode | Feature episodes + shared API adapter | boundary feature برای page composition و widgetها در حال رشد است؛ route layer هنوز بخشی از orchestration را نگه داشته است. |
| Search | Feature search + shared API/query abstraction | page در App Router و `SearchPage` feature-owned است؛ نیاز به stable boundary بیشتر در future دارد. |
| Player | Feature player runtime + shared compatibility re-export | Player runtime به‌صورت dedicated boundary و state store دارد؛ کامپونت‌های UI و panelهای rich نیز در feature قرار گرفته‌اند. |
| Library | Feature library + API/shared hooks | ownership نسبتاً روشن و پایدار است. |
| Playlist | Feature playlists | ownership به‌صورت feature boundary مستقر شده است. |
| Profile | Feature profile | page/edit-profile flow در boundary feature باقی مانده است. |

### نتیجه Ownership Audit
- در سطح MVP، ownership به‌طور کلی قابل قبول است.
- migrationهای feature boundary در Auth و Podcast به‌خوبی مستند شده‌اند.
- Episode و Player همچنان به‌صورت incremental migration در مسیر تثبیت هستند.
- مشکل اصلی بیشتر یک `ownership gap` تدریجی است تا یک `drift عمیق` در معماری.

## 9. وضعیت Featureهای اصلی

| Feature | Status | Ownership | Risks |
|---|---|---|---|
| Auth | فعال و پایدار | Feature boundary در frontend + shared session plumbing | ریسک کم؛ only shared infrastructure remains outside boundary |
| Podcast | فعال و پایدار | Feature podcast + route composition | ریسک متوسط؛ form و orchestration route-level هنوز دیده می‌شود |
| Episode | فعال و در حال migration | Feature episode + shared API adapter | ریسک متوسط؛ route/page orchestration هنوز در بعضی مسیرها وجود دارد |
| Player | فعال و runtime-owned | Feature player runtime + store + UI panels | ریسک متوسط؛ coupling با UI presentation و playback contracts باید حفظ شود |
| Search | فعال و MVP-ready | Feature search boundary | ریسک کم تا متوسط؛ به دلیل `useSearchParams()` و Suspense alignment در build و route stability |
| Library | فعال و integration-ready | Feature library + Player/history bindings | ریسک کم |
| Playlist | فعال و integration-ready | Feature playlists + Player runtime handoff | ریسک کم |
| RSS | در مسیر ownership و persistence | Backend RSS module + persistence/orchestration services | ریسک متوسط؛ نبود queue و execution background در کد جاری |

## 10. بررسی Migrationهای انجام‌شده

### Migrationهای مشخص مشاهده‌شده
- `Phase 2.7.1` — Auth Feature Boundary Adoption
- `Phase 2.7.2` — Podcast Feature Boundary Adoption Plan
- `Phase 2.8.0` — Episode Feature Ownership Migration Plan
- `Phase 2.9` — Player Feature Boundary Adoption Plan
- RSS-related ownership migrations و persistence boundary isolation در docs و backend code
- `Settings`, `Profile`, `Library`, `Playlist`, `Player` و `Search` feature migrations در مستندات و کد فعلی به‌صورت incremental انجام شده‌اند.

### نتیجه Migration Audit
- مهاجرت‌ها بیشتر در قالب `incremental adoption` انجام شده‌اند تا `big-bang rewrite`.
- این روش با فلسفه پروژه سازگار است.
- مهم‌ترین مسیر ongoing migration، `Episode` و `Player runtime ownership` است؛ این مسیر هنوز به‌صورت کامل از route layer به feature layer نرسیده است.

## 11. بررسی Quality و استانداردهای کدنویسی

### Code Quality
- TypeScript در frontend و backend به‌صورت strict-ish و production-oriented استفاده می‌شود.
- نام‌گذاری در پروژه به‌صورت feature-based و PascalCase / camelCase انجام می‌شود.
- Feature folders از route و UI و validators و hooks پشتیبانی می‌کنند.
- ساختار feature boundary در بیشتر موارد با documented rules هم‌راستا است.

### Dependency Quality
- وابستگی‌های اصلی با استک مستند شده هم‌راستا هستند.
- بعضی packageهای آینده که در `docs/dependencies.md` و `tech-stack.md` ذکر شده‌اند، در واقعیت حاضر نیستند؛ از جمله `next-intl`, `next-pwa`, `idb`, `BullMQ`, `helmet`, `@nestjs/throttler`.
- این ناهماهنگی، بیشتر یک موضوع roadmap-vs-implementation است تا یک violation واقعی.

### Build System و Workspace
- package manager: `pnpm`
- workspace: `pnpm-workspace.yaml`
- scripts اصلی:
  - `pnpm dev:web`
  - `pnpm dev:api`
  - `pnpm build`
  - `pnpm lint`
  - `pnpm test`

### Validation Evidence
در این session، دستورات زیر اجرا شدند:
- `pnpm lint` → passed برای monorepo؛ با warnings ESLint در UI، اما بدون error blocker
- `pnpm build` → passed برای `shared-types`, `web`, و `api`
- `pnpm --filter @castaminofen/web test` → 43 test file و 145 test passed
- `pnpm --filter @castaminofen/api test` → 13 test passed، fail 0

> نکته مهم: runtime verification end-to-end در این session به‌صورت live stack startup انجام نشد؛ بنابراین، `build` و `test` را می‌توان به‌عنوان evidence مستقیم نام برد، اما `runtime verification` نیاز به اجرای کامل محیط محلی دارد.

## 12. ریسک‌های فعلی

### Critical
- عدم runtime verification کامل در محیط محلی و نبود اجرای end-to-end stack در این Audit
- drift جزئی در `backend modules` و `frontend boundary` در مسیرهای ongoing migration

### High
- نبود `BullMQ` و queue orchestration کامل در کد جاری در حالی که docs آن را به‌عنوان future architecture مطرح کرده است
- نبود PWA/offline workflow و storage abstraction برای `IndexedDB` و service-worker در runtime فعلی
- نبود `next-intl` و RTL configuration به‌صورت real implementation

### Medium
- Episode ownership هنوز به‌صورت partial route-owned باقی مانده است
- Player boundary به‌صورت strong است، اما `UI consumption` و `runtime consumption` هنوز باید در مسیر migration و stabilizing باقی بماند
- بعضی boundaryها با مستندات phase-legacy هم‌راستا‌اند، اما semantic ownership در چند مسیر هنوز کاملاً نهایی نشده است

### Low
- lint warnings و build warnings در UI، هرچند blocking نیستند
- drift در docs و implementation میان roadmap و status فعلی

## 13. مواردی که نباید تغییر کنند

1. مرزهای feature ownership اصلی در frontend: `auth`, `podcasts`, `episodes`, `player`, `library`, `search`, `profile`, `settings`, `playlist`.
2. حالت global runtime Player به‌عنوان owner واحد playback state و queue.
3. قراردادهای API عمومی بین frontend و backend. به‌ویژه برای `Podcast` و `Episode` domain model.
4. مسیر `REST /api/v1` و استفاده از `Prisma` به‌صورت relation-aware و type-safe.
5. ساختار monorepo و مخزن در سطح `apps/` و `packages/`.
6. الگوی `incremental migration` به جای Rewrite کامل.

## 14. پیشنهاد قدم بعدی

### پیشنهاد بر اساس Evidence
- از نگاه موضوعی و غیرقابل‌افزایش، قدم بعدی منطقی برای پروژه، `Phase RSS.1 — Content Ingestion Architecture Audit` یا یک `post-release hardening` با تمرکز بر runtime verification کامل است.
- با توجه به status فعلی، مسیر جدید باید به‌صورت محدود و بدون تغییر API contract و بدون refactor بزرگ باشد.

### پیشنهاد عملی
1. اجرای live verification کامل برای frontend، API و database local stack.
2. تثبیت ownership boundary برای `Episode` و `Player` در مسیرهای remaining route-owned.
3. تصمیم‌گیری رسمی برای `PWA/offline` و `i18n/RTL` بر اساس MVP scope.
4. ثبت دقیق وضعیت real dependency gap در مستندات و مطابقت با `docs/dependencies.md`.

## 15. نتیجه نهایی

### ارزیابی نهایی
- پروژه در سطح فعلی از نظر معماری، ownership و build/test status قابل‌قبول است.
- پیاده‌سازی به‌صورت incremental و بدون rewrite، در مسیر MVP آماده‌شدن ادامه داده است.
- هم‌راستایی مستندات و کد در بخش‌های اصلی بالا است، اما در مسیرهای آینده و runtime verification هنوز باید به‌صورت رسمی و دقیق‌تر تایید شود.
- مهم‌ترین اختلاف، `status واقعی` با `status documented` در بخش‌های `offline/PWA`, `next-intl/RTL`, `queue/BullMQ`, و `runtime verification` است.

### وضعیت Ready to Continue
- از دید Audit، پروژه برای ادامه‌ی phase بعدی در چارچوب همان architecture و بدون نیاز به بازطراحی کامل آماده است.
- اما باید قبل از شروع phase جدید، `runtime verification` و `confirmation of live environment` نیز انجام شود تا status تبدیل به مستنداتِ fully verified شود.

PROJECT UNDERSTOOD: YES
READY TO CONTINUE: YES

Recommended next development phase in Persian:
پیشنهاد منطقی بعدی، اجرای یک فاز سخت‌سازی و تایید runtime برای مسیرهای live stack و سپس ادامه‌ی یک phase مستقل برای RSS و یا hardening روی Player/Offline boundary است. در صورت تمایل به ادامه‌ی توسعه‌ی دامین، phase بعدی پیشنهادی، `Phase RSS.1 — Content Ingestion Architecture Audit` است؛ اما اگر هدف، تثبیت و خروج از MVP release-ready است، `post-release hardening` با تمرکز بر runtime verification و live-stack validation باید در اولویت باشد.
