# طراحی‌ سیستم — توکن‌های اصلی

## هدف

این سند به‌عنوان مرجع رسمی برای همه‌ی انتخاب‌های رنگی و سطح‌بندی بصری در MVP استفاده می‌شود. هدف، حذف حدس و زدن در زمان توسعه‌ی UI آینده است.

## اصول اصلی

- رنگ‌های برند باید بر اساس معنا استفاده شوند، نه فقط بر اساس ظاهر.
- Purple برای اقدام و تأکید رابط کاربری رزرو می‌شود.
- Green برای پخش و موفقیت رزرو می‌شود.
- Olive برای متادیتا و وضعیت‌های کم‌اهمیت‌تر رزرو می‌شود.
- همه‌ی توکن‌ها باید در حالت Dark و Light قابل استفاده باشند.

## ماتریس توکن‌های رنگ

| نام توکن | مقدار | هدف | استفاده مجاز | استفاده غیرمجاز |
| --- | --- | --- | --- | --- |
| color-primary | #776CFE | تأکید اصلی برای دکمه، لینک، focus | CTA، navigation، state active | متن اصلی، پس‌زمینه‌های بزرگ |
| color-primary-soft | rgba(119, 108, 254, 0.16) | پس‌زمینه‌ی ملایم برای hover/selected | باکس‌های انتخابی، badge، state highlight | متن یا border اصلی |
| color-primary-hover | #6A60F0 | حالت hover | دکمه و کنترل‌های تعاملی | حالت default |
| color-primary-active | #5B53E3 | حالت pressed/active | دکمه‌ها و آیتم‌های فعال | hover سبک |
| color-primary-muted | rgba(119, 108, 254, 0.12) | سطح کم‌اهمیت‌تر برای background | card، chip، badge | سطح اصلی |
| color-accent-green | #00EA99 | پخش و موفقیت | play، progress، success | متن عمومی |
| color-accent-green-soft | rgba(0, 234, 153, 0.16) | پس‌زمینه‌ی موفقیت و playback | badge، status pill | border اصلی |
| color-accent-purple | #A03CFF | تأکید لوکس و پرمیوم | highlight ویژه، انتخاب | دکمه‌ی عادی |
| color-secondary-olive | #99BE7D | متادیتا و اطلاعات ثانویه | metadata، chip، label | کنترل‌های اصلی |
| color-success | #00EA99 | وضعیت موفق | success state | error یا warning |
| color-warning | #F5B84E | هشدار | warning state | success |
| color-danger | #F56565 | خطا | error state | success |
| color-info | #7C96FF | اطلاعات | info notice | CTA اصلی |
| color-selection | rgba(119, 108, 254, 0.28) | برجسته‌سازی انتخاب | selected row، option active | background صفحه |
| color-focus-ring | #8C7EFF | focus indicator | keyboard focus | حالت عادی |
| color-overlay | rgba(10, 12, 20, 0.72) | پوشش روی سطح | modal، sheet overlay | متن |
| color-scrim | rgba(3, 6, 14, 0.76) | پوشش عمیق‌تر برای backdrop | modal، drawer، loading cover | ui control |
| surface-canvas | #060814 | پس‌زمینه‌ی اصلی | صفحه، app background | card surface |
| surface-card | #161B2D | سطح کارت | card، panel | page canvas |
| surface-dialog | #1B2135 | سطح دیالوگ | dialog، popover، dropdown | page background |
| surface-input | #111726 | سطح ورودی | input، textarea | button |
| surface-sidebar | #12172A | سطح نوار کناری | sidebar | main content |
| surface-player | #171C31 | سطح Player | player bar، sheet | card |
| border | rgba(255, 255, 255, 0.10) | خط جداکننده | border، divider | text |
| divider | rgba(255, 255, 255, 0.08) | جداکننده ظریف | section separators | main action |
| text-primary | #F7F8FC | متن اصلی | headings، body، labels | decorative elements |
| text-secondary | #A6ACC7 | متن ثانویه | helper text، captions | primary action |
| text-muted | #6C7491 | متن کم‌رنگ | metadata، disabled state | active text |
| text-inverse | #F7F8FC | متن روی سطح رنگی | button label روی primary | متن روی surface روشن |
| placeholder | #6C7491 | متن جایگزین | input placeholder | actionable text |
| disabled | rgba(108, 116, 145, 0.6) | حالت غیرفعال | disabled button/input | active state |

## راهنمای استفاده

- هر رنگ باید با یک معنای مشخص استفاده شود و نباید به‌طور آزاد برای دکوراسیون به کار رود.
- در حالت Light، مقادیر مشابه حفظ می‌شوند اما با کنتراست روشن‌تر تنظیم می‌شوند.
- اگر یک رنگ برای چند حالت متفاوت نیاز بود، از توکن معنایی استفاده شود نه رنگ مستقیم.
