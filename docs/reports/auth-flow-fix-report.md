# Authentication Flow Audit Report

## Executive Summary

این گزارش بر اساس بررسی مستقیم کد، پیکربندی محیط و ارزیابی runtime در محیط محلی، نتیجه‌گیری نهایی درباره جریان احراز هویت در Castaminofen MVP را ارائه می‌دهد. شواهد موجود نشان می‌دهند که ساختار احراز هویت فعلی، از نظر کد و API، با یکدیگر سازگار است: مسیر ثبت‌نام کاربر را ایجاد می‌کند، مسیر ورود یک access token در بدنه پاسخ بازمی‌گرداند و refresh token را در کوکی HttpOnly قرار می‌دهد، و سپس frontend با ذخیره توکن و ارسال آن در Authorization header، درخواست پروفایل را انجام می‌دهد. نتیجهٔ اصلی این بازرسی این است که فرضیهٔ «نقص معماری auth / عدم سازگاری بین register و fetchProfile» با شواهد قابل اثبات پشتیبانی نمی‌شود.

## Scope

- بررسی کد frontend: registerUser(), loginUser(), auth store، ذخیره‌سازی توکن، fetchProfile()، API client و منطق redirect.
- بررسی کد backend: POST /auth/register، POST /auth/login، DTOها، AuthService و تعامل با Prisma.
- بررسی runtime با درخواست‌های مستقیم HTTP به API محلی.
- بررسی پیکربندی محیطی، مسیرهای API در Next.js و تنظیمات CORS.
- توجه: در این محیط، تست مستقیم مرورگر/Network tab به‌صورت خودکار انجام نشد؛ شواهد مرورگر بر اساس کد و مسیرهای مشابه درخواست‌های HTTP تأیید شده‌اند.

## Investigation

### Frontend

فایل‌های بررسی‌شده:
- [apps/web/src/lib/auth.ts](apps/web/src/lib/auth.ts)
- [apps/web/src/lib/auth-token.ts](apps/web/src/lib/auth-token.ts)
- [apps/web/src/shared/lib/api-client.ts](apps/web/src/shared/lib/api-client.ts)
- [apps/web/src/stores/authStore.ts](apps/web/src/stores/authStore.ts)
- [apps/web/src/features/auth/components/RegisterForm.tsx](apps/web/src/features/auth/components/RegisterForm.tsx)
- [apps/web/src/features/auth/components/LoginForm.tsx](apps/web/src/features/auth/components/LoginForm.tsx)

شواهد کد:
- registerUser() ابتدا درخواست POST به auth/register می‌فرستد و سپس با loginUser() ادامه می‌دهد. این رفتار در [apps/web/src/lib/auth.ts](apps/web/src/lib/auth.ts) دیده می‌شود.
- loginUser() پاسخ auth/login را دریافت می‌کند و accessToken را در localStorage ذخیره می‌کند.
- apiFetch() در [apps/web/src/shared/lib/api-client.ts](apps/web/src/shared/lib/api-client.ts) در صورت وجود توکن، هدر Authorization: Bearer ... را اضافه می‌کند و credentials: 'include' را نیز ارسال می‌کند.
- fetchProfile() در همین فایل با فراخوانی users/me، همان مسیر محافظت‌شده توسط JWT را تست می‌کند.
- فرم‌های ورود و ثبت‌نام بعد از موفقیت، پروفایل را می‌گیرند و سپس کاربر را به /profile هدایت می‌کنند.

### Backend

فایل‌های بررسی‌شده:
- [apps/api/src/auth/auth.controller.ts](apps/api/src/auth/auth.controller.ts)
- [apps/api/src/auth/auth.service.ts](apps/api/src/auth/auth.service.ts)
- [apps/api/src/auth/dto/register.dto.ts](apps/api/src/auth/dto/register.dto.ts)
- [apps/api/src/auth/dto/login.dto.ts](apps/api/src/auth/dto/login.dto.ts)
- [apps/api/src/users/users.controller.ts](apps/api/src/users/users.controller.ts)
- [apps/api/src/main.ts](apps/api/src/main.ts)

شواهد کد:
- POST /auth/register فقط کاربر را ایجاد می‌کند و اطلاعات کاربر را برمی‌گرداند؛ این مسیر access token برنمی‌گرداند.
- POST /auth/login در [apps/api/src/auth/auth.controller.ts](apps/api/src/auth/auth.controller.ts) با تنظیم refreshToken در کوکی HttpOnly و بازگشت { accessToken } پاسخ می‌دهد.
- AuthService در [apps/api/src/auth/auth.service.ts](apps/api/src/auth/auth.service.ts) توکن‌ها را می‌سازد و refreshToken را هش‌دار می‌کند.
- مسیر /users/me با JwtAuthGuard محافظت می‌شود و در صورت ارسال توکن معتبر، پروفایل کاربر را برمی‌گرداند.

### Runtime

در این بازرسی، سرور API به‌صورت محلی روی پورت 3001 اجرا شد. درخواست‌های مستقیم HTTP به شرح زیر انجام شدند:
- ثبت‌نام با دادهٔ آزمایشی
- ورود با همان کاربر
- درخواست پروفایل با هدر Authorization

### Environment

- در [apps/web/next.config.js](apps/web/next.config.js) یک rewrite برای /api/v1/:path* به http://localhost:3001/api/v1/:path* تعریف شده است.
- در [apps/web/src/shared/lib/env.ts](apps/web/src/shared/lib/env.ts) اگر NEXT_PUBLIC_API_URL تنظیم نشده باشد، frontend از /api/v1 در مرورگر استفاده می‌کند و در SSR به http://localhost:3001/api/v1 می‌رود.
- در [apps/api/.env](apps/api/.env) متغیرهای JWT و DATABASE_URL تنظیم شده‌اند. در حین بازرسی، دیتابیس Prisma با نام کاربری/رمز عبور اشتباه در محیط اولیه اجرا نمی‌شد؛ پس از هماهنگ‌سازی با پیکربندی Docker Postgres، API راه‌اندازی شد.

## Evidence

### API Tests

تست ثبت‌نام:
- دستور اجرا شده: curl -i -s -X POST http://localhost:3001/api/v1/auth/register ...
- خروجی مشاهده‌شده: HTTP/1.1 201 Created
- بدنه پاسخ: شامل id، email، name، createdAt و updatedAt کاربر

تست ورود:
- دستور اجرا شده: curl -i -s -c /tmp/castaminofen-cookies.txt -X POST http://localhost:3001/api/v1/auth/login ...
- خروجی مشاهده‌شده: HTTP/1.1 200 OK
- ریسپانس بدنه: شامل {"accessToken":"..."}
- هدر Set-Cookie: refreshToken با HttpOnly و SameSite=Lax

تست پروفایل:
- دستور اجرا شده: درخواست GET به /api/v1/users/me با هدر authorization: Bearer <accessToken>
- خروجی مشاهده‌شده: HTTP/1.1 200 OK
- بدنه پاسخ: اطلاعات کاربر بدون فیلدهای حساس

### Browser Tests

این بازرسی در محیط فعلی، تست خودکار مرورگر یا بازخوانی Network tab را انجام نداد. در عوض، منطق frontend با همان مسیرهای HTTP‌ای که در تست‌های بالا تأیید شدند، از روی کد بررسی شد. بنابراین ادعای مربوط به رفتار مرورگر فقط بر پایهٔ کد و مسیرهای واقعی درخواست‌ها است، نه بر اساس capture زنده از Network tab.

### Runtime Verification

- لاگ‌های Nest هنگام راه‌اندازی، مسیرهای زیر را نشان دادند: /api/v1/auth/register، /api/v1/auth/login، /api/v1/auth/refresh و /api/v1/users/me.
- پس از اصلاح پیکربندی دیتابیس، API با موفقیت راه‌اندازی شد و درخواست‌های auth به‌خوبی پاسخ داد.

### Build Verification

- pnpm lint: موفق و بدون خطا
- pnpm build: موفق و بدون خطا

## Root Cause

ریشهٔ اصلی این بازرسی این است که نتیجه‌گیری قبلی مبنی بر «عدم سازگاری معماری auth» با شواهد تأیید نشده است. ادعاهای زیر باید اصلاح شوند:

1. گزارشی که گفت /auth/register باید access token بازگرداند، درست نیست. این مسیر به‌طور طراحی فقط کاربر را می‌سازد و در کد frontend نیز بعد از ثبت‌نام، loginUser() صریحاً فراخوانی می‌شود.
2. گزارشی که گفت frontend به‌طور خودکار به‌دلیل نبود access token از register، fetchProfile را با شکست مواجه می‌کند، با شواهد فعلی قابل تأیید نیست.
3. مشکل واقعی که در این بازرسی قابل شناسایی بود، مربوط به پیکربندی محیطی و دیتابیس محلی بود؛ نه به قرارداد auth یا معماری آن.

به‌عبارت دقیق‌تر: جریان فعلی auth در کد و در runtime، درست عمل می‌کند. اگر در محیطی خاص خطایی دیده شود، احتمالاً به‌سبب پیکربندی محلی، دیتابیس در دسترس نبودن، یا شرایط مرورگر/محیط اجرا است، نه به‌خاطر نقص در قرارداد register/login.

## Resolution

در این مرحله هیچ تغییر محصولی یا معماری در auth اعمال نشد. هدف این گزارش، اصلاح ادعاهای قبلی و جایگزین کردن آن‌ها با نتیجه‌ای مبتنی بر شواهد واقعی بود.

## Files Modified

- [docs/reports/auth-flow-fix-report.md](docs/reports/auth-flow-fix-report.md)

## Files Added

- هیچ فایل جدیدی اضافه نشده است.

## Architecture Impact

- هیچ تأثیری بر معماری auth ندارد.
- قرارداد API بدون تغییر باقی ماند.

## API Impact

- هیچ تغییری در API اعمال نشده است.
- مسیرهای auth به‌صورت موجود تأیید شدند.

## Validation Results

- pnpm lint: موفق
- pnpm build: موفق
- auth flow verification: ثبت‌نام، ورود و درخواست پروفایل با موفقیت انجام شد
- runtime verification: مسیرهای auth در محیط محلی پاسخ مناسب دادند

## Remaining Risks

- در این محیط، یک capture زنده از Network tab مرورگر در دسترس نبود، بنابراین رفتار browser-only در زمان واقعی به‌صورت مستقیم تأیید نشد.
- اگر در محیط دیگری خطا دیده شود، باید ابتدا وضعیت دیتابیس، CORS، NEXT_PUBLIC_API_URL و cookie/credentials مرورگر بررسی شود.

## Follow-up Recommendations

- یک تست end-to-end auth در CI یا local QA اضافه شود تا ثبت‌نام/ورود/پروفایل در یک اجرا واقعی مرورگر نیز پوشش داده شود.
- در مستندات توسعه، پیش‌نیازهای محیطی مانند دیتابیس lokal، DATABASE_URL و پیکربندی Docker به‌صورت شفاف ثبت شود.
- در صورت نیاز، برای دیباگ بهتر، لاگ‌های توسعه‌ای ساده برای ذخیره/خواندن توکن در frontend اضافه شود.
