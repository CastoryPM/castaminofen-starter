# Phase PROFILE.1 — Profile Architecture Audit

## Objective

تثبیت و مستندسازی معماری Feature Profile برای MVP بدون ایجاد هیچ تغییری در Runtime، API Contract یا ساختار فعلی پروژه. این phase صرفاً به‌عنوان Audit و شناسایی مرزهای معماری انجام شده است.

## Scope

- بررسی ساختار فعلی Auth / Profile / Settings / Player / Library
- بررسی Ownership و State Ownership
- بررسی APIهای موجود مربوط به کاربر
- بررسی Navigation و UI فعلی
- شناسایی Boundary Violations و MVP Gap Analysis
- ارائه پیشنهاد برای مراحل بعدی بدون اعمال تغییر در کد

## نتیجه کلی

Feature Profile در حال حاضر به‌صورت یک صفحه ساده و Read-only موجود است. این صفحه اطلاعات حساب کاربری را نمایش می‌دهد، اما هنوز به‌عنوان یک Feature مستقل و کاملاً مالک‌دار تعریف نشده است. بیشترین مشکل، استفاده از Auth Store برای نگهداری داده‌های کاربر و نبود Store جداگانه برای Profile و Settings است.

## 1. Current User Flow

### منابع بارگذاری اطلاعات کاربر

اطلاعات کاربر فعلاً از طریق مسیر زیر بارگذاری می‌شود:

- در Frontend، توکن دسترسی در Local Storage با کلید `castaminofen_access_token` نگهداری می‌شود.
- در فایل `apps/web/src/lib/auth.ts`، تابع `getSession()` از `fetchProfile()` استفاده می‌کند.
- `fetchProfile()` به endpoint `users/me` درخواست می‌زند.
- بعد از دریافت پاسخ، داده‌ی کاربر به `useAuthStore` سینک می‌شود.

### Auth Store چیست؟

در فایل `apps/web/src/stores/authStore.ts` یک Zustand Store با موارد زیر وجود دارد:

- `user`
- `isAuthenticated`
- `isHydrated`

این Store در حال حاضر مسئول نگهداری وضعیت احراز هویت و داده‌ی کاربر است.

### Session چگونه نگهداری می‌شود؟

- Session در قالب access token در Local Storage نگهداری می‌شود.
- وضعیت احراز هویت با `useSession()` در `apps/web/src/lib/auth.ts` مدیریت می‌شود.
- `useSession()` با React Query و `getSession()` کار می‌کند.
- پس از بارگذاری موفق، `useAuthStore` به‌روزرسانی می‌شود.

### Current User از چه API دریافت می‌شود؟

Current User از endpoint زیر دریافت می‌شود:

- `GET /users/me`

این endpoint در Backend توسط `UsersController` پوشش داده شده است.

## 2. Current UI Audit

### آیا Profile Screen وجود دارد؟

بله. صفحه پروفایل در مسیر زیر وجود دارد:

- `/profile`

### Profile Screen فعلی چه چیزی دارد؟

صفحه فعلی در فایل `apps/web/src/features/profile/components/ProfilePage.tsx` پیاده‌سازی شده است و شامل موارد زیر است:

- نمایش نام کاربر
- نمایش ایمیل
- نمایش شناسه کاربری
- نمایش تاریخ عضویت
- نمایش وضعیت ورود
- دکمه بازگشت به خانه
- دکمه رفتن به کتابخانه

### چه چیزهایی Missing هستند؟

در حالت فعلی، موارد زیر در Profile UI وجود ندارند:

- ویرایش نام
- ویرایش بیو
- مدیریت Avatar
- Logout از صفحه پروفایل
- Theme switching
- Language switching
- Favorites shortcut
- Continue Listening shortcut
- بخش‌های سازمان‌یافته Profile Overview / Preferences / Listening Hub

## 3. API Audit

### Endpointهای موجود

در Backend، endpointهای زیر وجود دارند:

- `GET /users/me`
- `PUT /users/me`

### Endpointهای مورد انتظار در این phase

برای موارد زیر، در کد فعلی هیچ پوشش API‌ای وجود ندارد:

- `GET /me` → موجود نیست
- `PATCH /me` → موجود نیست
- `POST /avatar` → موجود نیست
- `DELETE /avatar` → موجود نیست

نکته مهم: در حال حاضر API برای پروفایل با مسیر `users/me` کار می‌کند، نه با مسیرهای `me` یا `avatar`.

## 4. Ownership Audit

### Auth

مالکیت Auth در حال حاضر شامل موارد زیر است:

- ورود و ثبت‌نام
- نگهداری token
- مدیریت session
- حفاظت از مسیرهای خصوصی
- وضعیت `isAuthenticated` و `isHydrated`

### Profile

مالکیت Profile در حال حاضر فقط به‌صورت بخشی از UI اجرا شده است:

- نمایش اطلاعات حساب
- نمایش وضعیت کاربر

اما هنوز به‌صورت یک Feature مستقل با State و Logic جداگانه مدیریت نمی‌شود.

### Settings

Settings فعلاً وجود ندارد.

- Store جداگانه برای Preferences وجود ندارد
- هیچ UI‌ای برای Theme / Language / Preferences در حال حاضر وجود ندارد

### Player

Player یک Feature مستقل و مالک‌دار است.

- دارای Store مخصوص خود است
- دارای Runtime و UI جداگانه

### Library

Library هم یک Feature جداگانه و مستقل است.

- شامل داده‌های ذخیره‌شده کاربر
- شامل Continue Listening و Subscriptions

## 5. State Ownership Audit

### Auth Store

Auth Store در حال حاضر مسئول موارد زیر است:

- `token` (به‌صورت غیرمستقیم در Local Storage)
- `session`
- `user`
- `isAuthenticated`
- `isHydrated`

### Profile Store

Profile Store در حال حاضر وجود ندارد.

- داده‌ی کاربر در Auth Store نگهداری می‌شود
- Profile UI از همان Auth Store استفاده می‌کند

### Settings Store

Settings Store در حال حاضر وجود ندارد.

- Preferences فعلاً تعریف نشده‌اند

### نتیجه مرزبندی

مرزبندی فعلی به‌خوبی رعایت نشده است.

- Profile data در Auth Store قرار گرفته است
- Profile UI به Auth Store وابسته است
- Settings هنوز هیچ مرز مشخصی ندارد
- این ساختار برای MVP قابل قبول نیست، اما برای این phase هیچ refactor یا تغییر Runtime انجام نمی‌شود

## 6. Boundary Violations

### 6.1 Coupling

- `ProfilePage` مستقیماً از `useAuthStore` استفاده می‌کند.
- این باعث می‌شود Profile UI وابسته به Auth state شود.

### 6.2 Duplicated Logic

- Login و Register فرم‌ها، پس از ورود، خودشان `fetchProfile()` را اجرا می‌کنند و کاربر را در Auth Store ثبت می‌کنند.
- همین منطق در `useSession()` نیز تکرار شده است.

### 6.3 Profile inside Auth

- داده‌ی Profile در Auth Store نگهداری می‌شود.
- این یعنی Profile در واقع بخشی از Auth شده است، نه یک Feature مستقل.

### 6.4 Auth inside Profile

- Profile UI هیچ منطق جداگانه‌ای ندارد و کاملاً به جریان Auth وابسته است.
- در نتیجه، Profile هنوز از نظر معماری، یک Feature مستقل محسوب نمی‌شود.

### 6.5 UI Coupling

- صفحه Profile در حال حاضر فقط یک نمای اطلاعاتی است و با جریان Login/Session/ProtectedRoute در هم تنیده شده است.

## 7. MVP Gap Analysis

| Feature | Exists | Missing |
|---|---:|---:|
| Avatar | ❌ | ندارد |
| Edit Name | ❌ | ندارد |
| Bio | ❌ | ندارد |
| Logout | ❌ | در UI پروفایل وجود ندارد |
| Theme | ❌ | ندارد |
| Language | ❌ | ندارد |
| Favorites Shortcut | ❌ | ندارد |
| Continue Listening | ❌ | ندارد |

> نکته: یک component عمومی Avatar در UI وجود دارد، اما هیچ flow واقعی برای Avatar Profile در Auth/Profile وجود ندارد.

## 8. Implementation Plan Recommendation

در این phase هیچ کدگذاری، refactor، API اضافه‌سازی یا تغییر Runtime انجام نمی‌شود. پیشنهاد معماری برای مراحل بعدی به صورت زیر است:

- PROFILE.2 → Profile Overview
  - ایجاد نمای کلی پروفایل با بخش‌های سازمان‌یافته
  - جداکردن UI Profile از Auth state در سطح معماری

- PROFILE.3 → Edit Profile
  - اضافه‌کردن ویرایش نام و بیو
  - استفاده از endpointهای موجود برای به‌روزرسانی کاربر

- PROFILE.4 → Preferences
  - ایجاد Settings Store برای Theme و Language
  - جداکردن Preferences از Auth و Profile

- PROFILE.5 → Listening Hub
  - افزودن Favorites Shortcut و Continue Listening
  - اتصال به Library feature بدون تداخل با Player

## Final Assessment

این phase یک Audit معماری موفق بوده است. نتیجه‌گیری نهایی این است که:

- Profile در حال حاضر وجود دارد اما به‌صورت Placeholder و Read-only است
- Ownership هنوز مناسب نیست
- State Ownership باید در آینده از Auth جدا شود
- هیچ API جدید یا تغییر Runtime در این phase اعمال نشده است
- بهترین مسیر برای MVP، ساخت Profile به‌صورت Feature مستقل با Store، UI و API واضح است
