# گزارش Audit مجدد پروژه Castaminofen

1. تاریخ بررسی
   - 2026-07-28 11:51

2. نسخه / وضعیت پروژه
   - وضعیت فعلی: آماده‌سازی MVP و فاز پایانی Release Candidate
   - مستندات اخیر نشان می‌دهد که پروژه در محدوده `v1.0.0-mvp` قرار دارد و تمرکز بر تثبیت معماری RSS، auth، podcast، episode، player و playlist است.

3. خلاصه اجرایی
   - پروژه یک مونوریپ با `apps/web` برای فرانت‌اند و `apps/api` برای بک‌اند است.
   - قوانین معماری در `.github/copilot-instructions.md` و `docs/architecture.md` بسیار واضح هستند: feature-based frontend، feature-based backend، strict TypeScript، Tailwind، Zustand، React Query، React Hook Form + Zod، NestJS + Prisma، PostgreSQL، Redis، MinIO.
   - پیاده‌سازی فعلی با مستندات تطابق عمومی خوبی دارد، به‌ویژه در ساختار frontend و backend.
   - برخی موارد مستندسازی برنامه‌ریزی‌شده هنوز در کد نصب یا پیاده‌سازی نشده‌اند: `next-intl`, `next-pwa`, `idb`, `BullMQ`.
   - Ownership featureها تا حد زیادی تثبیت شده است و پروژه اکنون در مرحله نهایی آماده‌سازی MVP قرار دارد.

4. بررسی قوانین پروژه و copilot-instructions.md
   - کد باید ساده، قابل‌نگهداری، مقیاس‌پذیر و قابل‌فهم باشد.
   - هر تغییر باید با هدف مشخص و حداقلی باشد.
   - feature-based architecture الزامی است.
   - فایل‌ها نباید بدون دلیل اضافه شوند.
   - frontend: Server Components by default، Zustand برای state جهانی، React Query برای server state، React Hook Form + Zod برای فرم‌ها، Tailwind بدون CSS خطی، RTL ضروری.
   - backend: thin controllers، services برای منطق کسب‌وکار، Prisma، REST versioned `/api/v1`، DTOها، JWT access+refresh، HttpOnly cookies، bcrypt.
   - گزارش‌ها و مستندسازی باید بخشی از هر فاز باشند.
   - زبان گزارش و توضیحات باید فارسی باشد.

5. درک معماری فعلی
   - Frontend: `apps/web/src` با `app/`, `features/`, `components/`, `lib/`, `providers/`, `shared/`, `stores/`, `styles/`.
   - Backend: `apps/api/src` با ماژول‌های feature-based مستقیم مثل `auth`, `podcasts`, `episodes`, `library`, `playlists`, `storage`, `rss`, `users`.
   - Shared packages: `packages/shared-types`, `packages/config`.
   - Infrastructure: `docker-compose.yml` شامل `postgres`, `redis`, `minio`.
   - App shell frontend در `apps/web/src/components/layout/app-shell.tsx` و providers در `apps/web/src/providers/app-providers.tsx`.
   - Backend AppModule ساده و feature-oriented است.

6. بررسی ساختار Repository
   - `apps/web`: frontend Next.js 14 App Router.
   - `apps/api`: backend NestJS با Prisma.
   - `packages/shared-types`: تایپ‌های مشترک.
   - `packages/config`: پیکربندی پایه.
   - `docs/`: مستندات معماری، فازها، changelog و audit.
   - `docker-compose.yml`: محیط محلی Postgres/Redis/MinIO.
   - وجود `docs/audits/` با گزارش‌های متعدد نشان‌دهنده رویه‌ی مستندسازی قوی است.

7. بررسی Technology Stack

| Area | Documented | Actual | Status |
|---|---|---|---|
| Frontend framework | Next.js 14 App Router | Next.js 14.2.15 App Router | ✅ Aligned |
| Frontend state | Zustand | Zustand | ✅ Aligned |
| Frontend data | TanStack Query | @tanstack/react-query | ✅ Aligned |
| Frontend forms | React Hook Form + Zod | react-hook-form + zod | ✅ Aligned |
| Styling | Tailwind CSS | Tailwind CSS | ✅ Aligned |
| i18n/RTL | next-intl planned | not installed | ⚠️ Planned/not implemented |
| Offline | idb + Service Worker planned | not present | ⚠️ Planned/not implemented |
| Backend framework | NestJS | NestJS | ✅ Aligned |
| Backend ORM | Prisma | Prisma | ✅ Aligned |
| Database | PostgreSQL | Postgres configured in Docker | ✅ Aligned |
| Cache/queue | Redis + BullMQ planned | Redis in Docker, BullMQ missing | ⚠️ Partial (Redis present, queue not implemented) |
| Storage | MinIO | MinIO in Docker | ✅ Aligned |
| Auth | JWT + refresh + bcrypt | JWT packages and bcrypt present | ✅ Aligned |

8. بررسی Feature Ownership
   - Auth: `apps/web/src/features/auth` دارد و صفحات login/register از آن استفاده می‌کنند، ولی shared auth plumbing (`apps/web/src/lib/auth.ts`, `apps/web/src/stores/authStore.ts`) هنوز وجود دارد. ownership قوی اما incremental است.
   - Podcasts: `apps/web/src/features/podcasts` با hooks، utils، فرم‌ها و presentation components موجود است. routes در `apps/web/src/app/podcasts` به عنوان entry points باقی مانده‌اند.
   - Episodes: feature دارای `components`, `hooks`, `validators` است و نشان می‌دهد migration از route به feature در جریان است. صفحه‌ها هنوز orchestration route-level دارند ولی بخش زیادی در feature پوشش داده شده است.
   - Player: `apps/web/src/features/player` با runtime و store جداگانه وجود دارد؛ ownership runtime به‌صورت یک global player instance تعریف شده است.
   - Library/Playlist/Search: هرکدام feature folders دارند و از shared primitives و API adaptaion استفاده می‌کنند.
   - Global infrastructure: `apps/web/src/shared`, `apps/web/src/providers`, `apps/web/src/lib` و `apps/web/src/components/layout` مسئول shared infrastructure هستند.

9. وضعیت Featureهای اصلی

| Feature | Status | Ownership | Risks |
|---|---|---|---|
| Auth | پیاده‌سازی شده و feature boundary تعریف شده | صفحات auth feature-owned، session plumbing shared | احتمال drift وقتی shared auth plumbing و feature surface همزمان تغییر کنند |
| Podcast | feature boundary فعال | hooks, form fields و presentation در feature | page-level orchestration هنوز در route است، اما قابل قبول |
| Episode | partially migrated | feature contains hooks/components/validators | route-level state & orchestration هنوز موجود، migration کافی نیست ولی در مسیر صحیح است |
| Player | موجود و global | runtime-owned via `features/player` | coupling با UI تغییر نکند؛ باید نگهداری runtime و queue دقیق باشد |
| Playlist | CRUD + player integration موجود | feature-owned | dependency روی playlist hooks و shared API باید حفظ شود |
| Search | feature-owned | query hooks + page | احتمالا باید URL-state حفظ شود |

10. بررسی Migrationهای انجام‌شده
   - فازهای auth و podcast feature boundary در docs ثبت شده و اجرا شده‌اند.
   - فاز episode ownership migration در `docs/phase-2.8.0-episode-feature-ownership-migration-plan.md` به‌صورت Plan موجود است.
   - تعداد زیاد auditها نشان می‌دهد پروژه مراحل متعددی از فازهای 2.4 تا 4.5 را گذرانده است.
   - مستندات اخیر `docs/project-status.md` و changelogها نشان می‌دهد پروژه به کامه نهایی MVP نزدیک است.

11. بررسی Quality و استانداردهای کدنویسی
   - TypeScript strict در frontend/backend برقرار است.
   - نام‌گذاری مطابق قواعد پروژه است: `PascalCase` برای components/types، `camelCase` برای hooks/variables، `kebab-case` برای فایل‌ها.
   - folder conventions رعایت شده: feature-based frontend و feature-based backend.
   - duplicate logic بزرگ دیده نشد؛ shared API adapters و feature hooks منطقی به نظر می‌رسند.
   - package manager: pnpm.
   - scripts اصلی در root و زیرپروژه‌ها وجود دارد: `dev:web`, `dev:api`, `build`, `lint`, `test`.
   - docs نشان می‌دهد lint و build frontend سبز هستند؛ backend نیز معمولاً سالم است ولی گزارش‌های قبلی به مشکلات `Prisma typing` اشاره کرده‌اند.
   - testing: `vitest` در frontend و `node --test` در backend تعریف شده‌اند؛ چند تست E2E backend (`apps/api/test/rss-e2e.spec.ts`) موجود است.

12. ریسک‌های فعلی
   - Critical:
     - هیچ ریسک بحرانی جدید در ساختار فعلی دیده نشد.
   - High:
     - ترکیب `feature-owned` و `shared plumbing` در auth می‌تواند در صورت refactor ناگهانی منجر به drift شود.
     - فقدان `BullMQ` در backend اگر RSS ingestion یا job queue مورد نیاز باشد، می‌تواند نیاز معماری آینده را کند کند.
   - Medium:
     - i18n/RTL مستند شده اما `next-intl` نصب نشده؛ این می‌تواند خطا در اجرای RTL پیشرفته ایجاد کند.
     - offline storage مستند شده اما پیاده‌سازی نشده؛ این یک gap بین docs و کد است.
     - route-level orchestration در episodes هنوز وجود دارد، که مرز feature را کمتر شفاف می‌کند.
   - Low:
     - برخی docs برنامه‌ریزی‌شده (`next-pwa`, `idb`) هنوز روی کد پیاده نشده‌اند.
     - مستندات معماری به‌صورت کامل همه feature ownershipهای جدید را منعکس نکرده‌اند.

13. مواردی که نباید تغییر کنند
   - ساختار کلی `apps/web` و `apps/api` را نباید بدون دلیل تغییر داد.
   - feature-based ownership و نگهداری shared infrastructure در لایه‌های مناسب باید حفظ شود.
   - قوانین `copilot-instructions.md` در مورد minimal change، docs update و گزارش فازی باید بدون استثنا رعایت شوند.
   - `docker-compose.yml` فعلی به عنوان محیط محلی استاندارد باید حفظ شود.
   - `packages/shared-types` و `packages/config` باید صرفاً برای shared code استفاده شوند.

14. پیشنهاد قدم بعدی
   - ادامه‌ی منطقی: تثبیت کامل فاز MVP و آماده‌سازی release candidate.
   - توصیه شده: تمرکز روی اطمینان از build/backend بدون خطا، ثبت کامل ownership در docs و تکمیل موارد برنامه‌ریزی‌شده `next-intl` / `offline` در فاز بعدی.
   - بر اساس مستندات فعلی، قدم بعدی پیشنهادی: `Phase RSS.1 — Content Ingestion Architecture Audit` یا معادل آن در مسیر release candidate.

15. نتیجه نهایی
   - پروژه درک شده و آماده ادامه است.
   - جریان معماری و قوانین پروژه مستند و قابل پیگیری‌اند.
   - پیاده‌سازی فعلی با مستندات اصلی تطابق قابل قبولی دارد.

PROJECT UNDERSTOOD: YES
READY TO CONTINUE: YES