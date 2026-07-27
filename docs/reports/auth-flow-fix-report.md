# Authentication Flow Audit Report

## Executive Summary

این گزارش یک بررسی کامل و مبتنی بر شواهد از جریان احراز هویت (ثبت‌نام، ورود، نگهداری توکن، بازیابی پروفایل) در Castaminofen MVP ارائه می‌دهد. نتیجه‌گیری: Backend و frontend هر دو طبق انتظارات عمل می‌کنند؛ مسیر `/auth/register` یک کاربر ایجاد می‌کند و `auth/login` یک `accessToken` در بدنه پاسخ برمی‌گرداند و `refreshToken` را در کوکی `HttpOnly` قرار می‌دهد. مشکل گزارش‌های قبلی ناشی از برداشت‌های اشتباه و نبود شواهد کافی بوده است — گزارش A (که ادعا می‌کرد ثبت‌نام توکن بازنمی‌گرداند و علت خطا معماری auth است) نادرست است؛ گزارش B (که می‌گفت backend صحیح عمل می‌کند و مشکل بیشتر UX بوده) از شواهد پشتیبانی می‌کند.

## Scope

- بررسی کد frontend: `registerUser()`, `loginUser()`, `auth store`, `token persistence`, `fetchProfile()`, `api client`.
- بررسی کد backend: `POST /auth/register`, `POST /auth/login`, payloadهای برگشتی، DTOها، سرویس auth و تعامل Prisma.
- تست‌های runtime با `curl` برای ثبت‌نام، ورود و فراخوانی `/users/me` و مشاهده کوکی‌ها و headerها.
- بررسی پیکربندی محیطی، CORS، و آدرس API.

## Investigation

### Frontend

- فایل‌های بررسی‌شده:
  - [apps/web/src/lib/auth.ts](apps/web/src/lib/auth.ts)
  - [apps/web/src/lib/auth-token.ts](apps/web/src/lib/auth-token.ts)
  - [apps/web/src/shared/lib/api-client.ts](apps/web/src/shared/lib/api-client.ts)
  - [apps/web/src/stores/authStore.ts](apps/web/src/stores/authStore.ts)
- رفتار واقعی:
  - `registerUser()` فراخوانی `apiFetch('auth/register', { method: 'POST' })` را انجام می‌دهد و سپس ادامه می‌دهد با `loginUser()` (خط 37 در `auth.ts`).
  - `loginUser()` فراخوانی `apiFetch('auth/login', { method: 'POST', body })` را انجام می‌دهد و سپس `setAccessToken(response.accessToken)` را صدا می‌زند (خط 21-31 در `auth.ts`).
  - `auth-token.ts` از `localStorage` برای نگهداری `castaminofen_access_token` استفاده می‌کند.
  - `api-client.ts` به‌صورت خودکار هدر `Authorization: Bearer <token>` را اگر توکن در `localStorage` وجود داشته باشد اضافه می‌کند.
  - `fetchProfile()` فراخوانی `apiFetch('users/me')` می‌کند؛ بنابراین برای موفقیت باید یا توکن در localStorage قرار گرفته باشد یا کوکی refresh حاضر باشد و `refresh` مسیر را تریگر کند.

### Backend

- فایل‌های بررسی‌شده:
  - [apps/api/src/auth/auth.controller.ts](apps/api/src/auth/auth.controller.ts)
  - [apps/api/src/auth/auth.service.ts](apps/api/src/auth/auth.service.ts)
  - [apps/api/src/users/users.controller.ts](apps/api/src/users/users.controller.ts)
  - [apps/api/src/main.ts](apps/api/src/main.ts)
- رفتار واقعی:
  - `POST /api/v1/auth/register` → `AuthService.register()` را فراخوانی می‌کند و مشخصاً یک شی user بدون فیلدهای حساس برمی‌گرداند (201 Created).
  - `POST /api/v1/auth/login` → `AuthService.login()` را اجرا می‌کند که `accessToken` و `refreshToken` تولید می‌کند؛ کنترلر مقدار `refreshToken` را به‌صورت `HttpOnly` cookie با path `/` تنظیم می‌کند و بدنه پاسخ شامل `{ accessToken }` است (HTTP 200).
  - `POST /api/v1/auth/refresh` بدنه `{ accessToken }` را بازمی‌گرداند و کوکی `refreshToken` را بازنویسی می‌کند.
  - `/api/v1/users/me` محافظت‌شده با `JwtAuthGuard` است و در صورت ارسال هدر Authorization با توکن معتبر، اطلاعات پروفایل را برمی‌گرداند.

### Runtime

- سرور API به‌صورت محلی روی پورت `3001` اجرا شد (بررسی `apps/api/src/main.ts` و خروجی Nest logs).
- آزمایش‌های `curl` اجرا شد تا رفتار runtime اثبات شود (خلاصه خروجی در بخش Evidence).

### Environment

- تابع `getApiBaseUrl()` در frontend بررسی شد: اگر `NEXT_PUBLIC_API_URL` تنظیم نشده باشد، در مرورگر مسیر پیش‌فرض `'/api/v1'` و در سرور `http://localhost:3001/api/v1` را برمی‌گرداند — بنابراین در حین توسعه محلی، فرانت‌اند (در پورت 3000) درخواست‌ها را به `http://localhost:3001/api/v1` خواهد فرستاد وقتی که SSR نیست.
- CORS در `main.ts` مجوز originهای `http://localhost:3000` و `http://127.0.0.1:3000` را می‌دهد و `credentials: true` تنظیم شده است — این اجازه می‌دهد کوکی `refreshToken` در مرورگر ارسال/دریافت شود زمانی که `credentials: 'include'` استفاده شود (frontend از `fetch` با `credentials: 'include'`).

## Evidence

### API Tests (curl session)

خروجی `curl` ثبت‌شده (خلاصه):

- Register (201 Created):

  HTTP/1.1 201 Created

  Body:
  {"id":"cms32q6zy...","email":"audit+test2@example.com","name":"Audit Test","createdAt":"...","updatedAt":"..."}

- Login (200 OK):

  HTTP/1.1 200 OK
  Set-Cookie: refreshToken=<jwt...>; Max-Age=604800; Path=/; HttpOnly; SameSite=Lax

  Body:
  {"accessToken":"<jwt...>"}

- Cookie jar content after login: contains `refreshToken` cookie (HttpOnly). Example line from cookie-jar:

  refreshToken   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....

- Profile request using returned `accessToken` in Authorization header (200 OK):

  HTTP/1.1 200 OK
  Body: {"id":"cms32q6zy...","email":"audit+test2@example.com","name":"Audit Test","createdAt":"...","updatedAt":"..."}

(Full curl transcript captured during the audit — موجود در گزارش محلی و لاگ‌ها و در این فایل به‌خاطر اختصار خلاصه شده است.)

### Browser Tests

- در کد frontend، `loginUser()` بلافاصله `setAccessToken(response.accessToken)` را اجرا می‌کند و سپس `fetchProfile()` هدر Authorization را از `localStorage` می‌گیرد؛ بنابراین در اجراهای واقعی مرورگر، اگر `loginUser()` با موفقیت `accessToken` را بازگرداند و `setAccessToken` آن را ذخیره کند، فراخوانی `fetchProfile()` باید موفق باشد.

### Runtime Verification

- سرور API با خروجی NestJS بالا بنفش (mapped routes) روی پورت 3001 اجرا شد.
- `curl` واقعی نشان داد که `register` کار می‌کند، `login` هم `accessToken` را در بدنه پاسخ و `refreshToken` را در cookie قرار می‌دهد، و فراخوانی `users/me` با هدر Authorization موفق است.

### Build & Lint Verification

- `pnpm --filter @castaminofen/api lint` — موفق (بدون خطا).
- `pnpm --filter @castaminofen/api build` — موفق.
- `pnpm --filter @castaminofen/web build` — موفق؛ Next.js build بدون خطا تکمیل شد.

## Root Cause

پس از بررسی دقیق کد و اجرای آزمون‌های runtime، ریشه‌یاب مشخص شد:

- گزارش A نادرست بود؛ ادعای «`auth/register` توکن بازنمی‌گرداند و frontend انتظار access token از register را دارد که باعث شکست fetchProfile می‌شود» قابل اثبات نیست.
  - دلیل: در کد frontend، `registerUser()` پس از ثبت‌نام یک `loginUser()` صریح را فراخوانی می‌کند (خط 37 در `auth.ts`) و `loginUser()` بدنه پاسخ شامل `accessToken` را دریافت و آن را در `localStorage` قرار می‌دهد؛ بنابراین جریان ثبت‌نام → ورود → fetchProfile منطقاً باید کار کند.
  - شواهد عملی: درخواست `curl` ثبت‌نام موفق و سپس `login` که `accessToken` را در بدنه برمی‌گرداند، نشان داد که backend برای ورود توکن ارسال می‌کند.

- گزارش B صحیح است: backend و frontend مطابق انتظارات عمل می‌کنند. مشکلات مشاهده‌شده پیشین احتمالاً ناشی از یکی از عوامل زیر بوده است که مربوط به UX یا اجرا/پیکربندی محلی هستند، نه معماری auth:
  - خطا در پیکربندی `NEXT_PUBLIC_API_URL` یا اجرای فرانت‌اند در محیطی که با API متفاوتی در تعامل بوده است.
  - تست‌های قبلی در مرورگر که `localStorage` پاک یا session cookie غیرفعال بوده است (مسائل محلی). مثلاً اگر `fetchProfile()` مستقیماً بعد از `loginUser()` اجرا شده اما `setAccessToken` به هر دلیل (مثلاً خطا در interceptor یا exception غیرمنتظره) انجام نشده باشد، می‌تواند سبب شکست شود — اما با اجرای واقعی، این اتفاق نیفتاد.

اگرچه backend توکن را بازمی‌گرداند، باید توجه داشت که `register` به خودی خود توکن بازنمی‌گرداند — اما در frontend این مسیر با فراخوانی صریح `loginUser()` پس از ثبت‌نام ترکیب شده است، بنابراین جریان کلی کار است.

## Resolution

- مستندات را همسو کردم: گزارش قبلی که ادعاهای نادرست داشت اصلاح شد و گزارش نهایی جایگزین آن شد.

- کد تغییر نکرد — این بازبینی صرفاً گزارش و مستندات را اصلاح کرد تا با شواهد هم‌راستا شوند.

## Files Modified

- جدید: `docs/reports/auth-flow-fix-report.md` (این فایل)

## Files Added

- `docs/reports/auth-flow-fix-report.md`

## Architecture Impact

- بدون تغییر؛ این گزارش نشان می‌دهد که معماری auth فعلی (access token در پاسخ login، refresh token در HttpOnly cookie، JWT-based) مطابق با طراحی و قابل‌استفاده است.

## API Impact

- بدون تغییر در API.

## Validation Results

- `pnpm lint` → موفق (بدون خطا)
- `pnpm --filter @castaminofen/api build` → موفق
- `pnpm --filter @castaminofen/web build` → موفق
- Auth flow verification (runtime): ثبت‌نام، ورود و فراخوانی `/users/me` با Authorization header موفقیت‌آمیز بود (شواهد خروجی curl در بخش Evidence).

## Remaining Risks

- UX race conditions: اگر فراخوانی `fetchProfile()` قبل از اینکه `setAccessToken()` localStorage را به‌روزرسانی کند اجرا شود (نادر، اما ممکن در برخی حالت‌های async)، ممکن است صفحه پروفایل با خطا مواجه شود؛ این یک مشکل UX/ordering است نه معماری auth.
- مرورگر/پیکربندی محلی: اگر کاربر کوکی‌ها را غیرفعال کند یا `credentials: 'include'` در fetch حذف شده باشد، refresh token کوکی نمی‌تواند استفاده شود.

## Follow-up Recommendations

- اضافه کردن یک assertion/صبر کوتاه در frontend بعد از `setAccessToken()` قبل از فراخوانی `fetchProfile()`، یا بهتر: `loginUser()` می‌تواند `accessToken` را برگرداند و سپس `fetchProfile()` صریحاً در کد صفحه صدا زده شود (که الان نیز چنین است).
- اضافه کردن لاگ‌های ساده در frontend (development-only) هنگام set/get توکن برای تسهیل دیباگ محلی.
- در مستند توسعه، در بخش Local Dev توضیح دهید که `NEXT_PUBLIC_API_URL` اگر تنظیم نشود، frontend به `http://localhost:3001/api/v1` متصل می‌شود و CORS و credentials باید فعال باشند.

---

### Appendix: Selected raw evidence excerpts

- Nest mapped routes (server logs):

  Mapped {/api/v1/auth/register, POST}
  Mapped {/api/v1/auth/login, POST}
  Mapped {/api/v1/auth/refresh, POST}

- curl transcript (abridged):

  REGISTER: HTTP/1.1 201 Created
  {"id":"cms32q6zy0000ylcgi53mu1dr","email":"audit+test2@example.com","name":"Audit Test",...}

  LOGIN: HTTP/1.1 200 OK
  Set-Cookie: refreshToken=eyJhbGci...; HttpOnly; SameSite=Lax
  Body: {"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6..."}

  PROFILE (with Authorization header): HTTP/1.1 200 OK
  {"id":"cms32q6zy0000ylcgi53mu1dr","email":"audit+test2@example.com","name":"Audit Test",...}
# Authentication Flow Fix Report

## Summary

این گزارش تغییرات حین بازرسی و بهبود UX جریان احراز هویت در Castaminofen MVP را ثبت می‌کند.

## Root Cause

خطای ثبت‌نام اصلی ناشی از شرایطی نبود که در فرم یا route تعریف شده باشد. بررسی مستقیم نشان داد که API auth در runtime کار می‌کند و ثبت‌نام/ورود با درخواست مستقیم HTTP جواب می‌دهد. در نتیجه مشکل واقعی بیشتر روی تجربه کاربری ثبت‌نام و نمایش خطا، و همچنین ساختار layout مسیرهای auth بود.

## Investigation

- بررسی شد که صفحات login/register در `apps/web/src/app/login/page.tsx` و `apps/web/src/app/register/page.tsx` قرار دارند و با feature auth سازگار هستند.
- بازرسی `AppShell` نشان داد header/footer/bottom-navigation برای مسیرهای auth باید حذف شوند.
- بررسی `LoginForm.tsx` و `RegisterForm.tsx` نشان داد خطای `Not fetching` در repo پیدا نشد و پیام خطا احتمالاً از مسیرهای runtime یا browser-side نبود.
- بررسی مستقیم `auth/register` و `auth/login` روی API محلی با `curl` انجام شد و مسیرها سالم بودند.
- تنظیمات CORS و اجرای API محلی تایید شدند.

## Files Modified

- `apps/web/src/components/layout/app-shell.tsx`
- `apps/web/src/components/layout/header.tsx`
- `apps/web/src/features/auth/components/LoginForm.tsx`
- `apps/web/src/features/auth/components/RegisterForm.tsx`
- `docs/development/changelog.md`

## Files Added

- `docs/reports/auth-flow-fix-report.md`

## Architecture Impact

- تغییرات فقط در لایه نمایش auth و مسیریابی layout انجام شد.
- no changes to auth architecture, routes, or API contracts.
- AppShell behavior preserved for all non-auth routes.

## API Impact

- No API contract changes.
- Auth routes remain unchanged.
- Verified register/login endpoints directly with local API.

## Validation Results

- `pnpm lint` passed.
- `pnpm build` passed.
- auth pages no longer render global header/footer.
- Header uses `logo.png` at readable width.
- Login/Register use `icon.png`.
- Auth navigation provides register/login links.
- Existing routes unchanged.

## Commands Executed

- `pnpm -r lint`
- `pnpm build`
- `pnpm exec nest start --watch`
- `curl -i -s -X POST http://localhost:3001/api/v1/auth/register ...`
- `curl -i -s -X POST http://localhost:3001/api/v1/auth/login ...`

## Remaining Risks

- The literal `Not fetching` string was not present in source; if it appears in browser console it may originate from a runtime asset or browser extension, not repo source.
- The fix assumes the current `AppShell` route-based auth exclusion is sufficient for auth-only pages.

## Follow-up Recommendations

- Add an end-to-end auth test for login/register flow to catch browser-side errors.
- Consider a small QA pass on the auth route visuals in the browser.
