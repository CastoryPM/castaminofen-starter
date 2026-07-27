# Phase RSS.5.1 — RSS Ingestion Core Services Report

## هدف

پیاده‌سازی حداقلی لایه‌ی application برای ورود داده‌های RSS بدون API، UI، scheduler یا persistence.

## محدوده

- ایجاد ماژول RSS در NestJS
- پیاده‌سازی Fetcher برای دریافت XML از URL
- پیاده‌سازی Parser برای تبدیل XML به ساختار میانی
- پیاده‌سازی Normalizer برای آماده‌سازی داده‌ی سازگار با domain
- پیاده‌سازی Importer به‌عنوان orchestrator ساده

## کارهای انجام‌شده

- ماژول RSS با سرویس‌های Fetcher، Parser، Normalizer و Importer اضافه شد.
- Fetcher فقط مسئول دریافت محتوای RSS و مدیریت خطاهای ساده‌ی شبکه و timeout است.
- Parser XML را به ساختار ParsedFeed تبدیل می‌کند و بدون دسترسی به database یا مدل‌های Prisma عمل می‌کند.
- Normalizer داده‌های parsed را به ورودی‌های سازگار با domain تبدیل می‌کند و مقادیر خالی را تمیز می‌کند.
- Importer جریان fetch → parse → normalize را هماهنگ می‌کند و از هرگونه منطق persistence یا sync جلوگیری می‌کند.

## فایل‌های ایجادشده

- apps/api/src/rss/rss.module.ts
- apps/api/src/rss/types.ts
- apps/api/src/rss/fetcher/fetcher.service.ts
- apps/api/src/rss/parser/parser.service.ts
- apps/api/src/rss/normalizer/normalizer.service.ts
- apps/api/src/rss/importer/importer.service.ts
- apps/api/test/rss-ingestion.spec.ts

## فایل‌های تغییر کرده

- apps/api/src/app.module.ts
- docs/development/changelog.md

## سرویس‌های جدید

- FetcherService
- ParserService
- NormalizerService
- ImporterService

## مسئولیت‌ها

- FetcherService: دریافت XML از URL و بازگرداندن متن خام
- ParserService: تبدیل XML به ParsedFeed
- NormalizerService: آماده‌سازی داده‌ها برای استفاده‌های بعدی در domain
- ImporterService: هماهنگی ساده‌ی ورودی‌ها بدون persistence

## وابستگی‌های اضافه‌شده

- هیچ وابستگی جدیدی اضافه نشد.

## وضعیت اعتبارسنجی

- Build API با موفقیت انجام شد.
- تست‌های جدید RSS با موفقیت اجرا شدند.

## نگرانی‌های معماری

- این مرحله فقط لایه‌ی application را فراهم می‌کند و اتصال به persistence در RSS.5.2 انجام می‌شود.
- هیچ منطق sync، match، deduplication یا database write در این مرحله وجود ندارد.
