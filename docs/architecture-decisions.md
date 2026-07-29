# Architecture Decisions

## ADR-016 — FeedSource is operational infrastructure

- تصمیم: FeedSource به‌عنوان یک مدل عملیاتی برای نگهداری منبع RSS و وضعیت sync تعریف می‌شود.
- دلیل: مطابق audit RSS.2، FeedSource باید زیرساخت اجرایی باشد و مالکیت تجاری را به Podcast و Episode منتقل نکند.
- پیامد: مدل‌های تجاری canonical در سطح داده و مالکیت حفظ می‌شوند.

## ADR-017 — RSS persistence stays minimal for MVP

- تصمیم: فقط فیلدهای لازم برای sync آینده در schema ذخیره می‌شوند.
- دلیل: MVP باید بدون اضافه‌کردن abstractionهای آینده‌نگر و بدون پیچیدگی غیرضروری پیاده‌سازی شود.
- پیامد: فیلدهایی مانند guid، audioUrl و duration برای هویت و persistence لازم گنجانده شده‌اند، اما analytics و قابلیت‌های غیرضروری اضافه نشده‌اند.

## ADR-018 — Podcast remains canonical identity for RSS content

- تصمیم: Podcast همچنان هویت اصلی برای داده‌های RSS باقی می‌ماند و FeedSource فقط به آن متصل می‌شود.
- دلیل: این تغییر از ایجاد مدل‌های موازی یا جابه‌جایی مالکیت دامنه جلوگیری می‌کند.
- پیامد: sync آینده می‌تواند idempotent و قابل‌پیش‌بینی باشد بدون تغییر در ownership.

## ADR-019 — Imported podcasts get a minimal owner account

- تصمیم: برای هر پادکست واردشده از RSS، یک حساب کاربری بسیار ساده و داخلی ایجاد می‌شود تا Podcast دارای مالکیت قابل‌استفاده برای سرویس‌های بعدی باشد.
- دلیل: در مدل فعلی، `ownerId` روی Podcast وجود دارد اما برای داده‌های RSS از قبل هیچ مالک واقعی ایجاد نمی‌شد. این تغییر کمترین راهحل MVP برای حفظ مالکیت و سازگاری با APIهای موجود است.
- پیامد: پادکست‌های واردشده از RSS در مدل داده دارای `ownerId` شده‌اند و API‌های موجود بدون تغییر قرارداد عمومی می‌توانند این مالکیت را نمایش دهند.
## ADR-020 — Settings owns user preferences for the MVP

- تصمیم: منطق مربوط به ترجیحات کاربر در مرز feature Settings نگهداری می‌شود و سایر featureها فقط از API عمومی Settings برای دسترسی به آن استفاده می‌کنند.
- دلیل: این تغییر از پراکندگی state و دسترسی مستقیم به storage در کامپوننت‌ها جلوگیری می‌کند و مرز مالکیت را برای ترجیحات روشن می‌سازد.
- پیامد: مدل ترجیحات، persistence و hook دسترسی در Feature Settings مستقر شده‌اند و رفتار runtime بدون تغییر باقی می‌ماند.

## ADR-021 — App shell owns minimal PWA installability support

- تصمیم: قابلیت نصب PWA در سطح app shell و لایه تنظیمات وب پیاده‌سازی می‌شود و featureهای تجاری هیچ مسئولیتی در این زمینه ندارند.
- دلیل: نصب‌پذیری مرورگر یک نیاز runtime/پلتفرم است و باید در لایه shell نگهداری شود بدون تأثیر بر مالکیت featureها.
- پیامد: manifest، metadata، service worker ثبت‌ساز و دکمه نصب در shell مدیریت می‌شوند و Player/Podcast/Episode/Library/Profile بدون تغییر باقی می‌مانند.

- تصمیم: منطق مربوط به ترجیحات کاربر در مرز feature Settings نگهداری می‌شود و سایر featureها فقط از API عمومی Settings برای دسترسی به آن استفاده می‌کنند.
- دلیل: این تغییر از پراکندگی state و دسترسی مستقیم به storage در کامپوننت‌ها جلوگیری می‌کند و مرز مالکیت را برای ترجیحات روشن می‌سازد.
- پیامد: مدل ترجیحات، persistence و hook دسترسی در Feature Settings مستقر شده‌اند و رفتار runtime بدون تغییر باقی می‌ماند.
