# Phase 4.7 - Auth Runtime Fix Report

تاریخ: 2026-07-26

## هدف

رفع خرابی جریان ثبت‌نام، ورود، refresh و logout در MVP بدون اعمال تغییر معماری و بدون وارد کردن refactor غیرضروری.

## Scope

- بررسی واقعی runtime بک‌اند و فرانت‌اند
- شناسایی نقطه شکست در مسیر auth
- اعمال حداقل تغییر برای بازگرداندن عملکرد کامل احراز هویت
- حفظ قرارداد API و ساختار فعلی

## مشکل شناسایی‌شده

در بررسی اولیه، فرضیات اولیه درباره CORS یا React نادرست بودند. با بررسی مستقیم runtime، مشخص شد:

1. بک‌اند NestJS در ابتدا با خطای Prisma به دلیل نبود schema دیتابیس و جداول لازم در پایگاه داده‌ی محلی متوقف می‌شد.
2. پس از راه‌اندازی دیتابیس و ایجاد schema، مسیرهای auth به‌طور واقعی اجرا می‌شدند و register/login/refresh/logout به‌خوبی پاسخ می‌دادند.
3. در سطح مرورگر، برای درخواست‌های میان‌دامنه از localhost:3000 به localhost:3001، نیاز به پشتیبانی CORS با credentials وجود داشت.
4. در سطح فرانت‌اند، کامپوننت Input مشترک ref را به‌درستی forward نمی‌کرد و warning مربوط به React Hook Form ظاهر می‌شد؛ این موضوع مانع عملکرد auth نبود اما برای سازگاری فرم‌ها باید اصلاح می‌شد.

## اقدامات انجام‌شده

### 1) Audit runtime بک‌اند
- بررسی شد که آیا API در واقع اجرا می‌شود.
- بررسی شد که آیا مسیرهای auth در Nest ثبت شده‌اند.
- با درخواست مستقیم به endpointها، صحت پاسخ‌های register/login/refresh/logout بررسی شد.

### 2) رفع مشکل دیتابیس و Prisma
- دیتابیس PostgreSQL از طریق Docker Compose راه‌اندازی شد.
- schema‌ی Prisma با استفاده از Prisma db push به حالت هم‌خوان با کد فعلی آورده شد.
- این کار موجب ایجاد جداول مورد نیاز برای auth و مدل‌های MVP شد.

### 3) فعال‌سازی CORS
- در [apps/api/src/main.ts](../apps/api/src/main.ts) تنظیمات CORS برای Origin های localhost:3000 و 127.0.0.1:3000 اضافه شد.
- credentials: true فعال شد تا کوکی refreshToken در درخواست‌های Cross-Origin درست ارسال و دریافت شود.
- allowedHeaders و methods برای auth requests تنظیم شد.

### 4) اصلاح فرم ورودی برای React Hook Form
- در [apps/web/src/components/ui/input.tsx](../apps/web/src/components/ui/input.tsx) کامپوننت Input به forwardRef تبدیل شد تا React Hook Form بتواند ref را به‌درستی دریافت کند.

## نتایج اعتبارسنجی

### Backend
- register: HTTP 201 Created
- login: HTTP 200 OK + Set-Cookie refreshToken
- refresh: HTTP 200/201 OK + rotation refresh token
- logout: HTTP 200/201 OK + clear cookie
- preflight OPTIONS: HTTP 204 No Content با CORS headers مناسب

### Frontend
- مسیر /register در localhost:3000 با HTTP 200 پاسخ داد.
- فرم auth در محیط dev اجرا شد و بدون مشکل اساسی در مسیر runtime قابل دسترسی بود.

### Build و Lint
- Backend build: موفق
- Frontend build: موفق
- Lint: موفق

## فایل‌های تغییر یافته

- [apps/api/src/main.ts](../apps/api/src/main.ts)
- [apps/web/src/components/ui/input.tsx](../apps/web/src/components/ui/input.tsx)

## نتیجه نهایی

جریان احراز هویت در MVP دوباره عملیاتی شد. ثبت‌نام، ورود، refresh و logout در محیط محلی با موفقیت اجرا شدند و مشکل اصلی مربوط به runtime/auth flow برطرف گردید.
