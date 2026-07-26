# گزارش ممیزی: صفحات Profile و Login/Register

## وضعیت کلی

وضعیت: Yellow

در کد فعلی، مسیرهای مورد نظر وجود دارند و در build Next.js هم ثبت می‌شوند. با این حال، تجربه کاربری مربوط به این مسیرها هنوز به‌صورت کامل و MVP-محور تکمیل نشده است. مشکل اصلی بیشتر به «صفحات پایه/placeholder» و «عدم تکمیل جریان auth/profile» مربوط می‌شود، نه به عدم ثبت‌نام مسیر در App Router.

---

## 1. وضعیت فعلی مسیریابی

### مسیرهای موجود
- مسیر ورود در [apps/web/src/app/login/page.tsx](apps/web/src/app/login/page.tsx)
- مسیر ثبت‌نام در [apps/web/src/app/register/page.tsx](apps/web/src/app/register/page.tsx)
- مسیر پروفایل در [apps/web/src/app/profile/page.tsx](apps/web/src/app/profile/page.tsx)

### نتیجه بررسی
- فایل‌های page.tsx برای همه این مسیرها وجود دارند.
- در خروجی build، این مسیرها به‌صورت routeهای App Router ثبت شده‌اند:
  - /login
  - /register
  - /profile
- ساختار App Router فعلی با مسیرهای زیر سازگار است:
  - [apps/web/src/app/layout.tsx](apps/web/src/app/layout.tsx)
  - [apps/web/src/app/page.tsx](apps/web/src/app/page.tsx)

### نکته مهم
- مسیرها از نظر ثبت‌نام و ساختار Next.js، مشکل ندارند.
- با این حال، صفحه پروفایل فعلی فقط یک Placeholder است و نه یک صفحه واقعی و کاربردی.

---

## 2. جریان auth موجود

### اجزای موجود
- فرم ورود در [apps/web/src/features/auth/components/LoginForm.tsx](apps/web/src/features/auth/components/LoginForm.tsx)
- فرم ثبت‌نام در [apps/web/src/features/auth/components/RegisterForm.tsx](apps/web/src/features/auth/components/RegisterForm.tsx)
- هسته auth در [apps/web/src/lib/auth.ts](apps/web/src/lib/auth.ts)
- Zustand auth store در [apps/web/src/stores/authStore.ts](apps/web/src/stores/authStore.ts)

### رفتار فعلی
- پس از ورود/ثبت‌نام، کاربر به مسیر /profile هدایت می‌شود.
- ورود و ثبت‌نام از طریق APIهای auth انجام می‌شود و توکن accessToken در storage ذخیره می‌شود.
- پس از احراز هویت، وضعیت کاربر در auth store به‌روزرسانی می‌شود.

### محدودیت‌ها
- این جریان صرفاً یک جریان ساده و اولیه است.
- هیچ middleware یا guard سمت سرور برای محافظت از مسیرها وجود ندارد.
- محافظت فعلی بیشتر به‌صورت client-side انجام می‌شود و فقط برای برخی مسیرها در قالب ProtectedRoute اعمال شده است.

---

## 3. جریان profile موجود

### وضعیت کنونی
- صفحه پروفایل در [apps/web/src/app/profile/page.tsx](apps/web/src/app/profile/page.tsx) فقط با RoutePlaceholder render می‌شود.
- فایل مکمل ساختاری [apps/web/src/app/profile/route-page.tsx](apps/web/src/app/profile/route-page.tsx) نیز در همین حالت قرار دارد.

### بررسی نقش‌های موجود
- لینک پروفایل در هدر و منوی پایین موجود است:
  - [apps/web/src/components/layout/header.tsx](apps/web/src/components/layout/header.tsx)
  - [apps/web/src/components/layout/bottom-navigation.tsx](apps/web/src/components/layout/bottom-navigation.tsx)

### مشکل اصلی
- صفحه پروفایل در واقع «صفحه‌ای آماده‌ی ساختاردهی» است، نه یک صفحه محصولی کامل.
- این صفحه هنوز داده کاربر، تنظیمات حساب، اطلاعات شخصی، یا وضعیت احراز هویت واقعی را نمایش نمی‌دهد.

---

## 4. دلایل ریشه‌ای

### 4.1 مسیرها وجود دارند اما صفحه‌ی محصولی نیستند
- صفحه پروفایل فقط با المان RoutePlaceholder ساخته شده است.
- این موضوع باعث می‌شود کاربر به‌نظر برسد که مسیر در دسترس است، اما تجربه واقعی پروفایل هنوز وجود ندارد.

### 4.2 auth flow کامل نیست
- فرم‌های ورود و ثبت‌نام وجود دارند، اما جریان آن‌ها هنوز به یک تجربه کامل profile-aware متصل نشده است.
- پس از ورود، کاربر به صفحه‌ای هدایت می‌شود که هنوز «واقعی» نیست.

### 4.3 محافظت مسیرها به‌صورت ناقص انجام می‌شود
- در [apps/web/src/features/auth/components/ProtectedRoute.tsx](apps/web/src/features/auth/components/ProtectedRoute.tsx) یک guard client-side وجود دارد.
- اما این guard برای صفحه پروفایل به‌صورت صریح استفاده نشده است.
- در نتیجه، دسترسی به صفحه پروفایل از نظر مسیر، ممکن است برقرار باشد، اما از نظر منطق تجربه کاربری و محافظت احراز هویت، هنوز ناتمام است.

### 4.4 نبود middleware سمت سرور
- در repo هیچ فایل middleware.ts یا معادل آن یافت نشد.
- این موضوع به‌معنای «بلاک‌کردن کامل مسیرها در سطح سرور» نیست، اما باعث می‌شود کنترل دسترسی در MVP فقط در لایه client انجام شود.

---

## 5. فایل‌ها/اجزای отсутствی یا ناقص

### فایل‌ها/اجزای ناقص
- هیچ component اختصاصی برای صفحه پروفایل در لایه feature وجود ندارد.
- هیچ feature/profile فعلی برای نمایش اطلاعات کاربر و وضعیت حساب وجود ندارد.
- صفحه پروفایل در حال حاضر از یک الگوی عمومی استفاده می‌کند و نه از یک تجربه اختصاصی.

### مواردی که برای تکمیل جریان لازم است
- یک component صفحه پروفایل واقعی (مثلاً ProfilePageView)
- یک feature مجزا برای profile با hooks/types/components
- اتصال صفحه پروفایل به auth store و session
- اعمال guard مناسب روی مسیر /profile

---

## 6. تغییرات لازم

### تغییرات حداقلی پیشنهادی
1. صفحه پروفایل را از حالت placeholder به یک صفحه واقعی تبدیل کنید.
2. صفحه پروفایل را با ProtectedRoute پوشش دهید تا فقط کاربران واردشده بتوانند دسترسی داشته باشند.
3. یک component اختصاصی برای نمایش وضعیت کاربر و اطلاعات حساب ایجاد کنید.
4. از auth store/session برای نمایش داده‌های کاربر استفاده کنید.
5. برای MVP، از رویکرد client-side guard استفاده کنید و از ساختار feature-first پیروی کنید.

### تغییرات غیرضروری
- بازآرایی کامل App Router
- اضافه‌کردن middleware سرور در این مرحله، مگر اینکه نیاز MVP آن را ایجاب کند
- ساختن یک سیستم auth پیچیده‌تر از حد نیاز MVP

---

## 7. آیا مشکل architectural است یا implementation-only؟

این مشکل بیشتر از نوع implementation-only است، نه یک مشکل معماری بنیادی.

### دلیل
- مسیرها در App Router به‌درستی ثبت شده‌اند.
- ساختار feature-based و layout موجود در پروژه با این کار سازگار است.
- مشکل اصلی این است که صفحات auth/profile هنوز به‌صورت کامل پیاده‌سازی نشده‌اند و جریان Full UX آن‌ها ناقص مانده است.

### نتیجه
- معماری فعلی برای این مسیرها مناسب است.
- نیاز اصلی تکمیل پیاده‌سازی است، نه بازطراحی ساختار.

---

## 8. پیشنهاد حداقلی برای رفع مشکل با حفظ معماری MVP

### رویکرد پیشنهادی
- در لایه feature، یک صفحه profile واقعی بسازید.
- صفحه /profile را به‌جای placeholder، به یک ProfilePageView اختصاصی متصل کنید.
- این صفحه را با ProtectedRoute محافظت کنید.
- برای صفحات Login/Register، جریان فعلی را نگه دارید اما از آن برای ورود به یک تجربه profile واقعی استفاده کنید.

### دلیل این پیشنهاد
- با این روش، بدون ایجاد پیچیدگی اضافی، مسیرها به‌صورت واقعی قابل دسترس و قابل استفاده می‌شوند.
- این رویکرد با اصول MVP و معماری فعلی این پروژه هم‌خوانی دارد.

---

## نتیجه نهایی

مشکل اصلی این نیست که مسیرهای Login/Register/Profile وجود ندارند. مشکل این است که:
- مسیر پروفایل هنوز یک placeholder است.
- جریان auth به‌صورت کامل به یک تجربه profile واقعی متصل نشده است.
- حفاظت دسترسی برای صفحه پروفایل هنوز به‌صورت کامل و کاربرپسند اعمال نشده است.

بنابراین، این موضوع بیشتر یک مشکل تکمیل‌نشده‌ی پیاده‌سازی است تا یک مشکل معماری پایه.
