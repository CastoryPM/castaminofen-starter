# Local Development Setup — Castaminofen (MVP)

این راهنما برای راه‌اندازی محلی پروژه‌ی Castaminofen روی یک ماشین جدید طراحی شده است. راهنمای اصلی ویندوز (PowerShell) است. در انتهای هر بخش دستورات معادل برای macOS / Linux قرار داده شده است.

این فایل بر اساس محتوای ریپازیتوری تولید شده است و تنها از فایل‌ها و پیکربندی‌های قابل مشاهده استفاده می‌کند. هر موردی که در مخزن پیدا نشود با عنوان "Needs manual confirmation" مشخص شده است.

---

**هدف:** کلون کردن مخزن، نصب وابستگی‌ها، پیکربندی محیط، راه‌اندازی خدمات محلی (Postgres, Redis, MinIO)، اجرای مهاجرت‌ها و seed، وارد کردن فیدهای RSS، و اجرا و اعتبارسنجی اپلیکیشن فرانت‌اند و بک‌اند در حالت توسعه.

پیش‌نیاز: این پروژه یک مونو-ریپو با اپ‌های `apps/api` (NestJS) و `apps/web` (Next.js) است و بسته‌ی مشترک تایپ‌ها در `packages/shared-types` قرار دارد.

**فایل‌های مرجع در مخزن (تأییدی):**
- [package.json](package.json)
- [pnpm-workspace.yaml](pnpm-workspace.yaml)
- [docker-compose.yml](docker-compose.yml)
- [.env.example](.env.example)
- [apps/api/.env.example](apps/api/.env.example)
- [apps/api/prisma/schema.prisma](apps/api/prisma/schema.prisma)
- [apps/api/prisma/seed.ts](apps/api/prisma/seed.ts)
- [rss-feeds.txt](rss-feeds.txt)
- [scripts/local-dev-commands.sh](scripts/local-dev-commands.sh)
- [README.md](README.md)

---

**1) پیش‌نیازهای نرم‌افزاری (Verified from repo):**

- Git
  - چرا: کلون کردن مخزن
  - نحوه بررسی: `git --version`
  - نسخه پیشنهادی: هر نسخه‌ی جدید پایدار (2.x+)

- Node.js
  - چرا: اجرای `pnpm`, `next`, `nest`, بسته‌ها
  - بررسی در repo: `package.json` بالا نشان می‌دهد `dev` و CI از Node 24 (GitHub Actions uses node-version: 24). همچنین `packageManager` در root روی `pnpm@10.32.1` تنظیم شده است.
  - حداقل / پیشنهادی: Node 24 (LTS) توصیه می‌شود
  - بررسی: `node -v`

- pnpm
  - چرا: workspace package manager (pnpm-workspace.yaml)
  - نسخه مورد استفاده در repo: `pnpm@10.32.1` (package.json -> `packageManager` and CI)
  - بررسی: `pnpm -v`
  - نصب: `npm install -g pnpm@10` یا استفاده از نصب‌کننده رسمی pnpm

- Docker & Docker Compose
  - چرا: برای راه‌اندازی PostgreSQL، Redis و MinIO محلی (docker-compose.yml)
  - بررسی: `docker compose version` یا `docker --version` و `docker compose version`
  - نسخه پیشنهادی: Docker Desktop که `docker compose` پشتیبانی کند؛ تصویر‌ها در `docker-compose.yml` از Postgres 16 و Redis 7 و MinIO استفاده می‌کنند.

- PostgreSQL
  - چرا: دیتابیس پروژه (Prisma datasource استفاده از postgresql در schema.prisma)
  - در حالت محلی از Docker Compose استفاده می‌شود (تأیید شده)
  - اگر می‌خواهید محلی بدون Docker استفاده کنید: PostgreSQL 16 توصیه می‌شود (match image: `postgres:16-alpine`).

- Redis
  - چرا: پروژه به `REDIS_URL` اشاره دارد و `docker-compose.yml` شامل سرویس `redis` است.
  - نسخه توصیه‌شده: همان نسخه‌ی Docker image (`redis:7-alpine`) یا Redis 7

- MinIO
  - چرا: storage محلی برای uploads (docker-compose.yml includes `minio`)
  - نسخه image در compose: `minio/minio:RELEASE.2024-10-02T17-50-41Z`

- pnpm-managed tooling in repos:
  - TypeScript (devDeps in packages)
  - Nest CLI (apps/api devDependencies)
  - Prisma CLI available via `pnpm exec prisma` (apps/api deps include `prisma` and `@prisma/client`)

- VS Code
  - چرا: راهنما برای باز کردن workspace و استفاده از launch/tasks/extension recommendations
  - بررسی: user choice; repo does not include `.vscode` folder, so recommended extensions listed below are based on tech stack.

- FFmpeg
  - Needs manual confirmation: پروژه references audio playback but no explicit FFmpeg requirement discovered in repo files. Marking as "Needs manual confirmation".


---

**2) توصیه‌شده‌های VS Code (extensions)**
(Repository does not include `.vscode/extensions.json`; these are recommendations based on stack.)

- ESLint (dbaeumer.vscode-eslint)
- Prettier - Code formatter (esbenp.prettier-vscode)
- TypeScript Toolbox / TypeScript support (built-in)
- Tailwind CSS IntelliSense (bradlc.vscode-tailwindcss)
- Prisma (Prisma.prisma)
- Docker (ms-azuretools.vscode-docker)
- GitLens — optional (eamodio.gitlens)

Notes: These are recommendations; the repo does not contain a `.vscode` folder with required extensions.

---

**3) محیط‌ها و متغیرهای محیطی (Environment Variables)
(Collected from `.env.example`, `apps/api/.env.example`, and code scanning for `process.env`)

The repository provides `.env.example` at root and `apps/api/.env.example`.

Merged list (all variables found in the repository files):

| Variable | Required | Description | Example / Source |
|----------|----------|-------------|------------------|
| DATABASE_URL | Yes | Prisma datasource connection string for PostgreSQL. Used by `apps/api/prisma/schema.prisma`. | `postgresql://postgres:postgres@localhost:5432/castaminofen` (root .env.example)
| REDIS_URL | Yes | Redis connection URL used by services. | `redis://localhost:6379` (.env.example)
| MINIO_ENDPOINT | Yes | MinIO endpoint URL for S3-compatible storage. | `http://localhost:9000` (.env.example)
| MINIO_ACCESS_KEY | Yes | MinIO root user. | `minioadmin` (.env.example)
| MINIO_SECRET_KEY | Yes | MinIO root password. | `minioadmin` (.env.example)
| MINIO_BUCKET | Yes | Bucket name the app expects. | `castaminofen` (.env.example)
| PORT | Optional (for API) | Port used by API app if not provided via `apps/api/.env`. `apps/api` listens on `process.env.PORT ?? 3001`. | `3001` (.env.example)
| JWT_SECRET | Yes (for auth) | JWT access token secret. | `development-jwt-secret` (.env.example)
| JWT_REFRESH_SECRET | Yes (for auth) | JWT refresh token secret. | `development-refresh-secret` (.env.example)
| ACCESS_TOKEN_TTL | Optional | token TTL (apps/api/.env.example contains defaults). | `15m` (apps/api/.env.example)
| REFRESH_TOKEN_TTL | Optional | refresh token TTL | `7d` (apps/api/.env.example)
| NEXT_PUBLIC_API_URL | Optional for web | If set, `apps/web` uses it to resolve API base URL. If not set, web defaults to `/api/v1` for browser and `http://localhost:3001/api/v1` on server. | `http://localhost:3001/api/v1` (inferred)
| NEXT_PUBLIC_APP_ENV | Optional | Accepts `development`, `production`, `test`. Default `development`. | `development` (apps/web/src/shared/lib/env.ts)
| RSS_FETCH_RETRY_COUNT | Optional | Number of retries for RSS fetcher (apps/api/src/rss/fetcher/fetcher.service.ts). Default `2`. | `2` (code default)
| RSS_FETCH_RETRY_DELAY_MS | Optional | Delay ms between retries. Default `250`. | `250` (code default)
| RSS_EPISODE_BATCH_SIZE | Optional | Batch size when persisting episodes. Default `50`. | `50` (code default)

Notes:
- Some defaults are provided in code (see `fetcher.service.ts`, `synchronization.service.ts`, `apps/web/src/shared/lib/env.ts`).
- If `.env` files are not present, create them from `.env.example`.

Files to create / edit:
- Root: `.env` — copy from `.env.example`
- API: `apps/api/.env` — copy from `apps/api/.env.example`
- Web: optional `.env.local` or use root `.env` and set `NEXT_PUBLIC_API_URL` if needed.

---

**4) Clone repository**
Windows PowerShell:

```powershell
git clone <repository-url>
cd castaminofen-starter
```

macOS / Linux (bash):

```bash
git clone <repository-url>
cd castaminofen-starter
```

Replace `<repository-url>` with the Git remote URL.

---

**5) Install dependencies**
Root (Windows PowerShell):

```powershell
# install pnpm globally if needed
npm install -g pnpm@10.32.1
pnpm install
```

macOS / Linux:

```bash
npm install -g pnpm@10.32.1
pnpm install
```

Notes:
- `pnpm install` will install workspace packages defined in `pnpm-workspace.yaml`.
- CI in `.github/workflows/ci.yml` uses `pnpm install --frozen-lockfile`.

---

**6) Configure environment files**

Create `.env` at repository root from `.env.example`:

Windows PowerShell:

```powershell
cp .env.example .env
cp apps/api/.env.example apps/api/.env
```

macOS / Linux:

```bash
cp .env.example .env
cp apps/api/.env.example apps/api/.env
```

Edit `.env` and `apps/api/.env` if you need different credentials (e.g., when not using docker-compose defaults). Important variables: `DATABASE_URL`, `REDIS_URL`, `MINIO_*`, `JWT_SECRET`, `JWT_REFRESH_SECRET`.

If you run services on different hosts or ports, update variables accordingly.

---

**7) Start dependent services (Postgres, Redis, MinIO) using Docker Compose**
Repository contains `docker-compose.yml` with services: `postgres`, `redis`, `minio`.

Windows PowerShell (requires Docker Desktop with `docker compose` available):

```powershell
docker compose up -d
```

macOS / Linux:

```bash
docker compose up -d
```

Verify services:

```powershell
# Postgres
docker ps --filter name=castaminofen-postgres
# Redis
docker ps --filter name=castaminofen-redis
# MinIO
docker ps --filter name=castaminofen-minio
```

Check ports: Postgres 5432, Redis 6379, MinIO 9000 (console 9001).

---

**8) Database migrations & Prisma Client**

The API package uses Prisma. Migrations are present in `apps/api/prisma/migrations`.

Commands available in repository (verified):
- `pnpm --filter @castaminofen/api seed` — defined in `apps/api/package.json` as `prisma db seed` script, and `prisma.seed` configured to run `ts-node --transpile-only prisma/seed.ts`.

The repo does not include a top-level `prisma` command; use pnpm exec within the API package.

Windows PowerShell:

```powershell
# Generate Prisma client (from repo root)
pnpm --filter @castaminofen/api exec prisma generate

# Apply migrations (dev):
# Use 'migrate dev' to apply migrations and create shadow DB if needed
pnpm --filter @castaminofen/api exec prisma migrate deploy

# If you want to run migrate dev (interactive), run inside apps/api:
pnpm --filter @castaminofen/api exec prisma migrate dev --name init
```

macOS / Linux:

```bash
pnpm --filter @castaminofen/api exec prisma generate
pnpm --filter @castaminofen/api exec prisma migrate deploy
```

Notes & validation:
- `apps/api/prisma/migrations` already exists. For CI or production use, `prisma migrate deploy` applies all pending migrations.
- `prisma generate` generates `@prisma/client` files used by the API.

**Seeding**

A seed script exists at `apps/api/prisma/seed.ts` and is wired in `apps/api/package.json` via `prisma.seed`.

Windows PowerShell:

```powershell
# Run seed (from repo root):
pnpm --filter @castaminofen/api run seed
```

This will import predefined RSS feed sources via `bootstrapFeedSources`, which reads `rss-feeds.txt` automatically if present (see `apps/api/src/rss/bootstrap/feed-config.ts`).

---

**9) RSS Initialization**

- `rss-feeds.txt` exists at repository root. The API seed will read this file automatically (via `buildBootstrapFeedSources()` which uses `readRssFeedUrlsFromFile()`).
- Running the seed command will ensure feed sources are created in the database.

So the recommended flow: after migrations and `prisma generate`, run `pnpm --filter @castaminofen/api run seed` to import both predefined feeds and those in `rss-feeds.txt`.

---

**10) Start development servers**

The repository provides root scripts in `package.json` to start both apps.

Windows PowerShell (in repo root):

```powershell
# Start API in watch mode (NestJS)
pnpm dev:api

# In a separate terminal, start web (Next.js)
pnpm dev:web
```

macOS / Linux:

```bash
pnpm dev:api
pnpm dev:web
```

What these commands do (verified):
- `dev:api` -> `pnpm --filter @castaminofen/api start:dev` -> runs `nest start --watch` inside `apps/api`.
- `dev:web` -> `pnpm --filter @castaminofen/web dev` -> runs `next dev -p 3000` inside `apps/web`.

Notes:
- Web uses `next.config.js` to rewrite `/api/v1` to `http://localhost:3001/api/v1` in development.
- API listens on `process.env.PORT` or default `3001` (see `apps/api/src/main.ts`). Ensure `apps/api/.env` sets `PORT=3001` or keep default.

---

**11) Verify the application is working**

Checklist (Windows PowerShell / browser):

- API is listening:
  - `curl http://localhost:3001/api/v1/health` — Needs manual confirmation: no explicit health route found in repo. Try root API endpoints such as `GET /api/v1/podcasts`.
- Web is reachable:
  - Open `http://localhost:3000` in browser. The web dev server runs on port 3000.
- Prisma client generated:
  - `pnpm --filter @castaminofen/api exec prisma generate` must have been run; absence causes runtime errors.
- Seeded feed sources exist:
  - Check DB `feedSource` table for rows (use `psql` or a DB viewer).
- RSS synchronization:
  - There is no automatic background worker; synchronization is triggered via services in API when needed. Repo contains synchronization logic but no scheduled job discovered — Needs manual confirmation on how sync is triggered in runtime.

Specific verification commands:

```powershell
# Verify Next.js
Invoke-WebRequest http://localhost:3000
# Verify API root (example):
Invoke-WebRequest http://localhost:3001/api/v1/podcasts
```

If endpoints return JSON and web loads, basic verification passes.

---

**12) Running inside VS Code**

1. Open the repository in VS Code: `File -> Open Folder...` and select repository root.
2. Recommended extensions (install): ESLint, Prettier, Tailwind CSS IntelliSense, Prisma, Docker.
3. Workspace settings / launch.json: this repository does not include `.vscode/launch.json` or `tasks.json`. Create custom configurations if you want to debug NestJS and Next.js from VS Code.

Example `launch.json` suggestions (not created by this script — add manually):

- Node: Attach to NestJS (run `pnpm --filter @castaminofen/api start:dev` then attach to port 9229 if started with `--inspect`).
- Next.js: Start with `pnpm dev:web` then attach.

Note: Because the repo lacks built-in VS Code configs, set them up per your workflow.

---

**13) Useful commands (collected from repo)**

- Install deps: `pnpm install`
- Start API (dev): `pnpm dev:api`
- Start Web (dev): `pnpm dev:web`
- Build: `pnpm build` (root script builds shared-types, web, api)
- Lint: `pnpm lint` (root) or `pnpm --filter @castaminofen/web lint`, `pnpm --filter @castaminofen/api lint`
- Test API: `pnpm --filter @castaminofen/api test`
- Prisma generate: `pnpm --filter @castaminofen/api exec prisma generate`
- Prisma migrate deploy: `pnpm --filter @castaminofen/api exec prisma migrate deploy`
- Prisma migrate dev: `pnpm --filter @castaminofen/api exec prisma migrate dev --name <name>`
- Seed DB: `pnpm --filter @castaminofen/api run seed`
- Docker compose up: `docker compose up -d`

All above commands exist in the repository (checked against `package.json`, `apps/api/package.json`, scripts folder, and `docker-compose.yml`).

---

**14) Common problems & fixes (from repo patterns)**

- Prisma Client missing / runtime error:
  - Symptom: runtime error complaining about missing Prisma client.
  - Cause: `prisma generate` not run after `pnpm install` or after changing schema.
  - Fix: `pnpm --filter @castaminofen/api exec prisma generate`

- Database connection failure:
  - Symptom: API cannot connect to Postgres; errors about `DATABASE_URL`.
  - Cause: Postgres container not running or `DATABASE_URL` incorrect.
  - Fix: `docker compose up -d` and ensure `.env` `DATABASE_URL` matches container.

- Port in use:
  - Symptom: Cannot bind to port 3000/3001.
  - Fix: Stop other processes or change `PORT` in `apps/api/.env` and Next port via `pnpm --filter @castaminofen/web dev -- -p <port>`.

- RSS import not visible:
  - Symptom: Seed ran but no feed sources in DB.
  - Cause: Seed may have failed; check logs. `bootstrapFeedSources` reads `rss-feeds.txt` relative to API source; ensure the file exists in repository root.
  - Fix: Run `pnpm --filter @castaminofen/api run seed` and inspect logs.

---

**15) Project structure overview**

- `apps/web`: Next.js frontend (dev script `pnpm --filter @castaminofen/web dev`).
- `apps/api`: NestJS backend with Prisma (dev script `pnpm --filter @castaminofen/api start:dev`).
  - `apps/api/prisma`: Prisma schema, migrations, seed script.
- `packages/shared-types`: shared TypeScript types used by frontend and backend.
- `docs`: documentation and phase reports.
- `docker-compose.yml`: local dev services (Postgres, Redis, MinIO).
- `rss-feeds.txt`: file used by feed seeder to bootstrap RSS feed sources.

---

**16) Summary of manual confirmations / unknowns**

- Health check endpoint path: repo does not provide a clear health route. Use `GET /api/v1/podcasts` to test API. (Needs manual confirmation)
- Whether FFmpeg or other native tooling required for audio processing: not found in repo (Needs manual confirmation).
- Automatic RSS synchronization trigger: repo contains synchronization services but no scheduler or cron job discovered — unclear whether sync runs automatically on startup. Feed seeder ensures feed sources exist; actual fetching might be triggered by other runtime components or manual endpoints (Needs manual confirmation).
- VS Code launch / task files: not present in repo; must be created by developer.

---

**17) Example full Windows setup sequence (copy-paste)**

```powershell
# 1) clone
git clone <repository-url>
cd castaminofen-starter

# 2) install pnpm (if missing) and deps
npm install -g pnpm@10.32.1
pnpm install

# 3) copy env files
cp .env.example .env
cp apps/api/.env.example apps/api/.env
# optionally edit .env files now

# 4) start DB & infra
docker compose up -d

# 5) generate prisma client and apply migrations
pnpm --filter @castaminofen/api exec prisma generate
pnpm --filter @castaminofen/api exec prisma migrate deploy

# 6) seed DB (imports rss-feeds.txt)
pnpm --filter @castaminofen/api run seed

# 7) start api (dev) in one terminal
pnpm dev:api

# 8) start web (dev) in another terminal
pnpm dev:web
```

macOS / Linux: use identical `bash` commands (replace `cp` and shell if needed).

---

**18) Suggested next steps for repo owners (optional)**

- Add `.vscode/launch.json` and `tasks.json` to simplify debugging.
- Add `Makefile` or `scripts` to unify common flows (`dev`, `setup`, `reset-db`).
- Add `health` endpoint in API for easier verification.
- Document RSS synchronization triggers and any required worker processes.

---

If you want, I can now:
- create a `docs/development/LOCAL_SETUP.md` (already created),
- or generate a suggested `.vscode/launch.json` and `tasks.json` for local debugging.

پایان مستند راه‌اندازی محلی (نسخه تولید شده از محتوای ریپازیتوری).