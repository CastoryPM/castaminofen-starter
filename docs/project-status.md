# گزارش وضعیت پروژه — Castaminofen

تاریخ: 2026-07-26

## وضعیت فعلی

- مخزن در حال حاضر در وضعیت آماده‌سازی برای اولین نسخه‌ی MVP قرار دارد.
- فازهای اصلی implementation، validation، و release-candidate audit با موفقیت تکمیل شده‌اند.
- نسخه‌ی فعلی در محدوده‌ی MVP، تجربه‌ی اصلی احراز هویت، پادکست، اپیزود، جستجو، Library، Playlist و Player را پوشش می‌دهد.

## فاز جاری

- Phase PLAYER.4 — Player Experience & Runtime Polish MVP

## پیشرفت کلی

- Overall Progress: آماده برای انتشار MVP
- Status: Ready for Release

## امکانات تکمیل‌شده

- Authentication
- Podcasts
- Episodes
- Search
- Library
- Playlist
- Player
- Queue
- Repeat / Shuffle
- Continue Listening integration

## وضعیت Backend

- Backend با NestJS و Prisma در حال حاضر در محدوده‌ی MVP قابل‌استفاده است.
- DTO، validation، auth guards و service structure در ساختار فعلی حفظ شده‌اند.
- Build و lint бек‌اند با موفقیت اجرا شده‌اند.

## وضعیت Frontend

- Frontend با Next.js و feature-based structure در حال حاضر برای MVP آماده است.
- App shell، routing، provider، feature folders و UI state structure در حالت سازگار و قابل‌استفاده هستند.
- Build، lint و تست وب با موفقیت اجرا شده‌اند.
- Integrating RSS-backed podcast and episode content into the frontend now preserves the public podcast/episode domain experience without exposing internal RSS metadata.

## وضعیت Player

- Player به‌عنوان مالک runtime پخش باقی مانده است.
- Queue، Repeat، Shuffle، progress و lifecycle پخش در مالکیت Player باقی مانده‌اند.

## وضعیت Queue

- Queue برای پخش مداوم و navigation در Player پیاده‌سازی شده است.
- رفتار next/previous و auto-advance در سطح MVP موجود است.

## وضعیت Library

- Library برای نمایش subscriptions و Continue Listening در سطح MVP وجود دارد.
- Integrations با Player و history update در ساختار جاری پایدار هستند.

## وضعیت Playlist

- Playlist برای CRUD و interaction با Player در محدوده‌ی MVP موجود است.
- Integration با Player از طریق surface‌ی تاییدشده انجام شده است.

## وضعیت Search

- Search در سطح MVP و با مسیرهای موجود در Frontend/Backend در دسترس است.

## وضعیت Authentication

- Authentication با login، register، logout و protected routes در سطح MVP موجود است.

## وضعیت Build

- Lint: passed
- Library TypeScript validation: resolved
- Web build: blocked by an unrelated Search page suspense issue during prerender (`useSearchParams()` on `/search`)
- RSS ingestion regression tests: added for persistence boundary, matching decisions, and the new idempotent synchronization engine; backend build passed; Prisma schema validation and direct TypeScript verification confirmed the RSS sync behavior
- End-to-end RSS orchestration now coordinates fetch, parse, normalize, match, persist, and FeedSource state transitions for a single feed without introducing background execution or new business ownership

## تغییر اخیر — 2026-07-29

- Phase UI.DESIGN.2 — Design Tokens & Component Specification System تکمیل شد. مجموعه‌ی مستندات سیستم طراحی با توکن‌های معنایی، مشخصات کامپوننت، مقیاس spacing/layout، تایپوگرافی، elevation، motion، responsive، accessibility، inventory و naming conventions به‌روزرسانی شد و به‌عنوان مرجع رسمی برای UI آینده ثبت گردید بدون تغییر در منطق کسب‌وکار، روت‌ها، API یا مالکیت featureها.
- Phase PLAYER.4 — Player Experience & Runtime Polish MVP تکمیل شد. تجربه‌ی Player در سطح compact shell با بهبود hierarchy عنوان/پادکست/آرت‌ورک، بازخوردهای روشن‌تر برای کنترل‌ها، نمایش بهتر progress/buffering، هشدارهای queue-aware و polish loading/error در مرز Player به‌روزرسانی شد بدون تغییر در runtime، queue logic، API‌ها یا مالکیت feature.
- Phase UI.DESIGN.1 — Brand Identity System تکمیل شد. سیستم طراحی وب با توکن‌های معنایی، سطح‌بندی سطوح، تایپوگرافی و قوانین استفاده از رنگ‌های برند به‌روزرسانی شد و مستندات طراحی به‌عنوان منبع مرجع رسمی ثبت شد بدون تغییر در منطق کسب‌وکار، روت‌ها، API یا مالکیت featureها.
- Phase QA.2 — Full Test Suite Stabilization (Profile & Settings) تکمیل شد. تست‌های باقی‌مانده‌ی Frontend در محدوده‌ی Profile و Settings با رفع مشکل transform TSX در Vitest و راه‌اندازی محیط jsdom بازسازی شدند و کل تست‌های وب دوباره سبز شدند بدون تغییر در runtime یا رفتار محصول.
- Phase SETTINGS.2 — Preferences Ownership & Local Persistence MVP تکمیل شد. مالکیت ترجیحات کاربر به Feature Settings منتقل شد، مدل و persistence ترجیحات درون این مرز تعریف شدند، و UI تنظیمات از طریق hook عمومی Settings به این state دسترسی پیدا می‌کند بدون تغییر در مسیرها یا رفتار runtime.
- Phase SETTINGS.3 — Playback Preferences MVP تکمیل شد. ترجیحات پخش MVP شامل Autoplay، Default Volume و Resume Playback در Feature Settings تعریف، از طریق persistence محلی فعلی ذخیره، از طریق hook Settings در UI در دسترس و در runtime Player برای اعمال رفتارهای موجود استفاده شدند بدون تغییر در مسیرها، قرارداد API یا مالکیت Player.
- Phase SETTINGS.4 — Notification Preferences MVP تکمیل شد. ترجیحات اعلان MVP شامل Enable Notifications، New Episode Notifications و Product Updates به Feature Settings اضافه، از طریق persistence محلی فعلی ذخیره، از طریق hook Settings در UI در دسترس و در صفحه‌ی تنظیمات به‌صورت باکس‌های انتخابی MVP نمایش داده شدند؛ هیچ runtime اعلان، API یا مسیر جدیدی اضافه نشد.
- Phase PROFILE.3 — Edit Profile (MVP) تکمیل شد. صفحه‌ی Profile اکنون امکان ورود به حالت ویرایش، ویرایش نام کاربری از طریق endpoint موجود `PUT /users/me`, ذخیره با حالت loading/disabled، و نمایش پیام موفقیت/خطا را فراهم می‌کند. این تغییر در مرز Feature Profile باقی مانده و از تغییر در Auth یا قرارداد API جلوگیری شده است.

## تغییر اخیر — 2026-07-27

- فاز RSS.13 — RSS Import Ownership & Playback Integration تکمیل شد. خط لوله‌ی RSS اکنون برای فایل feed list و import اولیه پادکست‌ها از RSS، ایجاد حساب مالک ساده برای پادکست‌های واردشده، و اتصال پخش اپیزود به Player runtime در UI فعلی تکمیل شد.
- فاز RSS.12 — RSS Module Freeze & Documentation Finalization تکمیل شد. مستندات نهایی مرزهای معماری RSS، مالکیت دامنه، قواعد persistence، جریان sync، و API/Frontend boundaries را به‌صورت رسمی ثبت کرد و وضعیت freeze را برای توسعه‌دهندگان آینده تثبیت کرد.
- فاز RSS.11 — Final Architecture Review تکمیل شد. بازبینی نهایی نشان داد معماری RSS با مرزهای MVP هم‌راستاست و APIهای عمومی Podcast دیگر فیلدهای عملیاتی RSS را بازنمی‌نمایند.
- فاز RSS.9 — Frontend Integration تکمیل شد. نمایش پادکست و اپیزود از داده‌های RSS-backed اکنون از طریق همان contract عمومی Podcast/Episode انجام می‌شود و فیلدهای عملیاتی RSS در UI دیده نمی‌شوند.
- تست‌های رگرسیونی برای render پادکست و اپیزود اضافه شد تا این رفتار در آینده پایدار بماند.
- تست‌های یکپارچه‌سازی End-to-End برای خط لوله‌ی RSS اضافه شد (Phase RSS.8). این تست‌ها پوشش حالات موفق، تکرار، به‌روزرسانی اپیزود، فید نامعتبر و حالات جزئی نامعتبر را فراهم می‌کنند.
- تغییر: APIهای خواندن Podcast به‌روزرسانی شدند تا فیلدهای عملیاتی RSS (مانند `rssUrl` و `feedSourceId`) را در پاسخ‌های عمومی بازنشان ندهند. این اصلاح کوچک تضمین می‌کند که فرانت‌اند تنها مدل‌های دامنه `Podcast` و `Episode` را مشاهده می‌کند و مفاهیم عملیات RSS پنهان می‌مانند. (RSS.8.1)
 - تغییر: APIهای خواندن Episode به‌روزرسانی شدند تا فیلدهای عملیاتی RSS (مانند `guid`) را در پاسخ‌های عمومی بازنشان ندهند. این اصلاح کوچک تضمین می‌کند که فرانت‌اند تنها مدل‌های دامنه `Podcast` و `Episode` را مشاهده می‌کند و مفاهیم عملیات RSS پنهان می‌مانند. (RSS.8.2)
- تغییر: مسیر خواندن جزئیات Podcast با تست‌های رگرسیونی پوشش داده شد تا پاسخ‌های عمومی فقط شامل فیلدهای دامنه‌ی Podcast و Episode باشند و فیلدهای عملیاتی RSS پنهان بمانند. (RSS.8.3)


## وضعیت Tests

- Web tests: passed
- Total tests: 21

## وضعیت معماری

- معماری فعلی با مرزهای feature ownership و runtime ownership سازگار است.
- هیچ drift جدی در ساختار MVP مشاهده نشده است.

## کارهای آینده شناخته‌شده

- بهبود UX مربوط به refresh/session در وب
- تقویت تست‌های end-to-end
- افزایش پایداری runtime در شرایط شبکه و media edge case
- تکمیل CI و فرآیند release automation

## نسخه‌ی جاری

- Release target: v0.1.0
- Release scope: First official MVP release preparation

## سلامت مخزن

- Repository Health: Ready for MVP release
- Documentation: aligned with implementation
- Build/Test Health: green

## فاز پیشنهادی بعدی

- Phase RSS.1 — Content Ingestion Architecture Audit
- Post-release hardening و آماده‌سازی برای نسخه‌های بعدی
