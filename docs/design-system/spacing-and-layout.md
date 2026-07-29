# مقیاس فاصله و لایه‌بندی

## مقیاس فاصله رسمی

تمامی فاصله‌ها باید از توکن‌های زیر استفاده کنند تا spacing در همه‌ی صفحات قابل پیش‌بینی باشد.

| توکن | مقدار پیکسلی | کاربرد | مثال |
| --- | ---: | --- | --- |
| space-2 | 8px | فاصله‌ی ظریف بین عناصر کوچک | gap بین icon و label |
| space-4 | 16px | فاصله‌ی استاندارد برای کنترل‌ها | button row، item gap |
| space-6 | 24px | فاصله‌ی میان بخش‌ها | داخل card، section padding |
| space-8 | 32px | فاصله‌ی قابل‌توجه | column gap در page |
| space-10 | 40px | فاصله‌ی بخش‌های بزرگ | section spacing در صفحه |
| space-12 | 48px | فاصله‌ی عمیق | header/content spacing |
| space-16 | 64px | فاصله‌ی صفحه‌ای بزرگ | page chunk separation |
| space-20 | 80px | فاصله‌ی بسیار وسیع | hero / prominent section |
| space-24 | 96px | فاصله‌ی حداکثر در صفحه | major layout separation |

## مقادیر مرتبط با layout

- container-max: 72rem
- content-width: 64rem
- sidebar-width: 18rem
- player-height: 5rem
- header-height: 4rem
- footer-height: 3rem
- section-gap: space-8
- card-gap: space-4
- max-reading-width: 48rem

## قواعد استفاده

- هر layout باید از spacing token استفاده کند و نه از عددهای hardcoded.
- برای فواصل داخلی components، از 8/12/16/24 استفاده شود.
- برای فاصله‌ی بین بخش‌های صفحه، از 24/32/40 استفاده شود.
- برای فضای خالی و whitespace، از 48 به بالا فقط در موارد ضروری استفاده شود.
