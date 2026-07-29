# توکن‌های Motion

## مقیاس رسمی

| توکن | Duration | Timing Function | Delay | Scale | Opacity | کاربرد |
| --- | --- | --- | --- | --- | --- | --- |
| motion-hover | 120ms | cubic-bezier(0.2, 0.8, 0.2, 1) | 0ms | 1.0 → 1.01 | 1.0 → 1.0 | hover روی کنترل‌ها |
| motion-press | 180ms | cubic-bezier(0.2, 0.8, 0.2, 1) | 0ms | 0.98 | 1.0 → 0.98 | press / click |
| motion-fade | 180ms | ease-out | 0ms | 1.0 | 0 → 1 | ورود/خروج ملایم |
| motion-scale | 220ms | ease-out | 0ms | 0.96 → 1.0 | 1.0 | باز شدن کارت / state reveal |
| motion-slide | 240ms | ease-out | 0ms | 1.0 | 1.0 | drawer و sheet |
| motion-drawer | 240ms | ease-out | 0ms | 1.0 | 1.0 | drawer / panel |
| motion-dialog | 240ms | ease-out | 0ms | 1.0 | 0 → 1 | dialog / modal |
| motion-toast | 220ms | ease-out | 120ms | 1.0 | 0 → 1 | toast notification |
| motion-dropdown | 160ms | ease-out | 0ms | 1.0 | 0 → 1 | dropdown / popover |
| motion-tooltip | 120ms | ease-out | 0ms | 1.0 | 0 → 1 | tooltip |
| motion-loading | 800ms | linear | 0ms | 1.0 | 1.0 | skeleton / spinner |

## قواعد

- حرکت باید آرام و غیرپرش باشد.
- از animation‌های طولانی یا نمایشی پرهیز شود.
- در حالت reduced motion باید animation حذف یا کاهش یابد.
