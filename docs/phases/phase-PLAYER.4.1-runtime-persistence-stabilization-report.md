# Phase PLAYER.4.1 — Runtime Persistence Stabilization Report

## هدف
بازگردانی کامل جلسه Player پس از refresh بدون تغییر معماری موجود؛ تضمین persistence و restore برای snapshot کامل شامل queue، currentIndex، modes و volume.

## محدوده
- Persist کامل snapshot شامل: `currentItem`, `queue`, `currentIndex`, `playbackStatus`, `currentPosition`, `duration`, `volume`, `repeatMode`, `shuffleEnabled`.
- Restore validation و نرمال‌سازی state پس از بارگذاری.
- ضمانت اینکه `queue[currentIndex] === currentItem` پس از restore برقرار باشد.
- Persist و restore حجم (`volume`) بین refreshها.
- افزودن تست‌های واحد برای persistence (restore queue/index/repeat/shuffle/volume).

## کارهای انجام‌شده
- گسترش `playerPersistence` برای نوشتن/خواندن snapshot کامل و اضافه شدن تابع کمکی `applyPersistedSnapshotToStore` برای اعمال snapshot به `playerStore` با منطق نرمال‌سازی.
- به‌روزرسانی `playerRuntime.restorePersistedSnapshot` برای استفاده از helper فوق و اعمال volume بازخوانی‌شده روی `AudioEngine`.
- به‌روزرسانی `persistCurrentPlayerState` برای ذخیره‌ی کامل state (شامل queue/index/volume/repeat/shuffle).
- افزودن تست‌های Vitest در [apps/web/src/features/player/runtime/__tests__/persistence.test.ts](apps/web/src/features/player/runtime/__tests__/persistence.test.ts) که موارد زیر را پوشش می‌دهند:
  - write/read snapshot کامل
  - بازسازی queue هنگامی که queue خالی است ولی currentItem وجود دارد
  - تضمین همخوانی `queue[currentIndex]` و `currentItem`
  - بازگردانی `repeatMode`, `shuffleEnabled`, `volume`
- اجرای مجموعه تست‌های وب و رفع مشکل مربوط به بارگذاری ماژول در محیط تست.

## فایل‌های تغییر یافته
- [apps/web/src/features/player/runtime/playerPersistence.ts](apps/web/src/features/player/runtime/playerPersistence.ts)
- [apps/web/src/features/player/runtime/playerRuntime.ts](apps/web/src/features/player/runtime/playerRuntime.ts)
- [apps/web/src/features/player/store/playerStore.ts](apps/web/src/features/player/store/playerStore.ts) (بدون تغییرات منطقال، فقط برای مرجع) 
- [apps/web/src/features/player/runtime/__tests__/persistence.test.ts](apps/web/src/features/player/runtime/__tests__/persistence.test.ts) (جدید)
- [docs/development/changelog.md](docs/development/changelog.md) (به‌روزرسانی)

## دستورات اجرا شده
- اجرای تست‌های وب با Vitest:

```bash
pnpm --filter @castaminofen/web test
```

## نتایج build/lint/test
- Build: (لمس نشده مستقیم در این فاز)
- Lint: (لمس نشده مستقیم در این فاز)
- Test: تمام تست‌های وب سبز شدند: `24 files, 84 tests passed`.

## محدودیت‌ها و نکات شناخته‌شده
- این فاز به‌طور عمدی از تغییر معماری یا افزودن feature جدید خودداری کرد تا مطابق با اهداف MVP بماند.
- MediaSession، Offline و Analytics خارج از محدوده این فاز باقی ماندند.
- restore volume اعمال می‌شود اما اگر تنظیمات `resumePlayback` خاموش باشد، snapshot حذف خواهد شد (رفتار موجود حفظ شد).

## قدم بعدی پیشنهادی
- اضافه کردن یک تست انتها-به-انتها برای سناریوی refresh مرورگر (PWA/jsdom) تا رفتار runtime کامل‌تر اعتبارسنجی شود.
- ثبت یک کوچک ADR اگر بخواهیم در آینده رفتار پیش‌فرض volume را تغییر دهیم یا snapshot را در IndexedDB نگهداری کنیم.

