# سیستم Elevation

## سطوح ارتفاعی

| سطح | Shadow | Opacity | Blur | کاربرد | مثال کامپوننت |
| --- | --- | --- | --- | --- | --- |
| xs | 0 6px 16px rgba(2, 6, 20, 0.18) | 0.18 | 16px | عناصر بسیار کم‌ارتفاع | badge، chip |
| sm | 0 10px 24px rgba(2, 6, 20, 0.24) | 0.24 | 24px | کارت‌های استاندارد | card، podcast card |
| md | 0 18px 40px rgba(2, 6, 20, 0.32) | 0.32 | 40px | عناصر مهم‌تر | player، dialog |
| lg | 0 26px 56px rgba(2, 6, 20, 0.40) | 0.40 | 56px | overlay‌های عمیق | modal، sheet |
| xl | 0 34px 72px rgba(2, 6, 20, 0.48) | 0.48 | 72px | سطح‌های بسیار برجسته | special promo surface |
| glass | 0 18px 48px rgba(2, 6, 20, 0.22) | 0.22 | 48px | سطح‌های شفاف/مخصوص glass | player overlay |
| overlay | یک لایه‌ی پس‌زمینه با opacity 0.72 | 0.72 | — | پوشش روی محتوا | modal backdrop |

## قواعد

- elevation نباید برای تزئینی استفاده شود؛ فقط برای جداسازی سطح و اهمیت استفاده شود.
- در حالت Light، shadow ملایم‌تر و با opacity کمتر استفاده شود.
- برای عناصر ثابت در صفحه مثل Player، از elevation md یا lg استفاده شود.
