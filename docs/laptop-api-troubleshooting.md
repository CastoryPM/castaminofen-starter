# راهنمای کامل حل مشکل اجرای API Castaminofen روی لپ‌تاپ

## خلاصه مسئله
اگر هنگام اجرای دستور زیر با خطا مواجه می‌شوید:

```bash
pnpm dev:api
```

معمولاً دلیل آن یکی از این موارد است:

1. بسته `bcrypt` به‌درستی کامپایل نشده است.
2. فایل `.env` برای اجرای پروژه وجود ندارد یا مقدارهای آن کامل نیست.
3. سرویس‌های لازم مثل PostgreSQL / Redis / MinIO روشن نیستند.

در محیطی که ما بررسی کردیم، مشکل اصلی ابتدا مربوط به `bcrypt` و سپس به تنظیمات محیطی بود. بعد از رفع این دو مورد، API با موفقیت راه‌اندازی شد.

---

## وضعیت فعلی
در خروجی آخر، پیام زیر دیده شد:

```text
[NestApplication] Nest application successfully started
```

این یعنی مشکل اصلی حل شده و API در حال اجراست. اگر بعد از این پیام، با Ctrl+C متوقف شد، این طبیعی است؛ یعنی شما فقط فرآیند watch mode را قطع کرده‌اید.

---

## راه‌حل مرحله‌به‌مرحله روی لپ‌تاپ

### 1) وارد پوشه پروژه شوید

```bash
cd /path/to/castaminofen-starter
```

مثلاً اگر پروژه در Desktop است:

```bash
cd ~/Desktop/castaminofen-starter
```

---

### 2) وابستگی‌ها را نصب کنید

```bash
pnpm install
```

اگر قبلاً نصب شده بود اما مشکل ادامه داشت:

```bash
pnpm install --force
```

---

### 3) بسته `bcrypt` را دوباره build کنید

این مرحله بسیار مهم است چون مشکل اصلی معمولاً از این بسته ناشی می‌شود.

```bash
pnpm rebuild bcrypt
```

اگر باز هم خطا داشت، این دستور را هم اجرا کنید:

```bash
cd node_modules/.pnpm/bcrypt@5.1.1/node_modules/bcrypt
npm install --build-from-source
```

---

### 4) فایل `.env` را ایجاد کنید

در ریشه پروژه، یک فایل با نام `.env` بسازید و این محتوا را داخل آن قرار دهید:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/castaminofen
REDIS_URL=redis://localhost:6379
MINIO_ENDPOINT=http://localhost:9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_BUCKET=castaminofen
PORT=3001
JWT_SECRET=development-jwt-secret
JWT_REFRESH_SECRET=development-refresh-secret
```

اگر فایل `.env.example` در پروژه وجود دارد، می‌توانید با این دستور کپی کنید:

```bash
cp .env.example .env
```

اگر فایل `.env.example` نبود، خودتان فایل `.env` را بسازید و مقادیر بالا را داخل آن بگذارید.

---

### 5) سرویس‌های لازم را روشن کنید

این پروژه برای اجرا به سرویس‌های زیر نیاز دارد:

- PostgreSQL
- Redis
- MinIO

اگر Docker روی لپ‌تاپ شما نصب است، این دستور را اجرا کنید:

```bash
docker compose up -d
```

اگر Docker نصب نیست، باید این سرویس‌ها را به‌صورت جداگانه راه‌اندازی کنید.

---

### 6) API را اجرا کنید

```bash
pnpm dev:api
```

اگر همه‌چیز درست باشد، باید این‌طور در خروجی دیده شود:

```text
[Nest] application successfully started
```

---

## اگر هنوز خطا داشت

### حالت 1: خطای مربوط به `bcrypt`

```bash
pnpm rebuild bcrypt
```

### حالت 2: خطای مربوط به `MinIO`

یعنی فایل `.env` درست نیست یا متغیرهای MinIO موجود نیستند.

```bash
cat .env
```

و مطمئن شوید این موارد در فایل `.env` وجود دارند:

```env
MINIO_ENDPOINT=http://localhost:9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_BUCKET=castaminofen
```

### حالت 3: خطای اتصال به دیتابیس

اگر PostgreSQL روشن نیست:

```bash
docker compose up -d postgres
```

یا مطمئن شوید سرویس PostgreSQL روی پورت `5432` در حال اجراست.

---

## تست سریع برای اطمینان

بعد از اجرای API، این دستور را امتحان کنید:

```bash
cd apps/api
node -e "require('bcrypt'); console.log('bcrypt ok')"
```

اگر خروجی `bcrypt ok` را دیدید، یعنی بسته `bcrypt` درست بارگذاری شده است.

---

## نکته مهم
اگر در محیط Dev Container / Codespaces کار می‌کنید، بهتر است همان محیط را ادامه بدهید. بعضی وقت‌ها بسته‌های native مثل `bcrypt` در محیط container با محیط لپ‌تاپ تفاوت دارند.

---

## جمع‌بندی سریع
برای حل مشکل روی لپ‌تاپ، این کارها را انجام دهید:

```bash
cd /path/to/castaminofen-starter
pnpm install
pnpm rebuild bcrypt
cp .env.example .env
docker compose up -d
pnpm dev:api
```

اگر همه‌چیز درست باشد، API راه‌اندازی می‌شود و پیام `Nest application successfully started` را می‌بینید.
