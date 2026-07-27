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
