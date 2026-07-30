# Script Registry

این فایل رکوردی از اسکریپت‌های موجود در مخزن است. برای هر اسکریپت، نام، مکان و دستور اجرا ذکر می‌شود.

- **API build**: `apps/api` — `pnpm --filter @castaminofen/api build`
- **API tests**: `apps/api` — `pnpm --filter @castaminofen/api test`
- **Prisma validate**: `apps/api` — `pnpm --filter @castaminofen/api exec prisma validate`
- **Web PWA build validation**: `apps/web` — `pnpm --filter @castaminofen/web build`
- **Web admin intelligence tests**: `apps/web` — `pnpm --filter @castaminofen/web test`
- **Web type-check**: `apps/web` — `pnpm exec tsc -p apps/web/tsconfig.json --noEmit`
