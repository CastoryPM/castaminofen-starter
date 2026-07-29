# مشخصات کامپوننت‌ها

## اصول کلی

همه‌ی کامپوننت‌های مشترک باید بر اساس همان مدل semantic token و state pattern ساخته شوند. این سند، مرجع استاندارد برای استفاده در UI آینده است و هیچ‌گونه redesign انجام نمی‌دهد.

## ماتریس کامپوننت‌ها

| کامپوننت | Surface | Border | Radius | Shadow | Padding | Typography | Icon Size | Hover | Pressed | Focused | Selected | Disabled | Loading | Responsive | Accessibility |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Button | surface-card / primary | border | md | xs | 12/16 | button | 16 | primary-hover | primary-active | focus-ring | none | disabled | spinner | full-width on mobile | min 44px touch target |
| Card | surface-card | border | md | xs | 16 | body | 18 | surface-hover | surface-pressed | focus-ring | selected tint | muted | skeleton | stack on mobile | semantic heading + contrast |
| Episode Card | surface-card | border | md | xs | 16 | body | 18 | surface-hover | surface-pressed | focus-ring | selection tint | muted | skeleton | single column mobile | clear play affordance |
| Podcast Card | surface-card | border | lg | sm | 16 | title/body | 20 | surface-hover | surface-pressed | focus-ring | selection tint | muted | skeleton | 1-2 columns on tablet | artwork alt text |
| Player | surface-player | border | lg | md | 16/24 | body/title | 20 | none | none | focus-ring | none | muted | spinner | sticky bottom | keyboard controls |
| Mini Player | surface-player | border | lg | md | 12/16 | body-sm | 18 | surface-hover | surface-pressed | focus-ring | none | muted | spinner | compact mobile-first | aria-labels |
| Sidebar | surface-sidebar | border | none | none | 16 | body | 18 | surface-hover | surface-pressed | focus-ring | selected tint | muted | none | hidden on mobile | visible focus state |
| Navigation | surface-canvas | border | none | none | 12 | label | 18 | surface-hover | surface-pressed | focus-ring | selected tint | muted | none | bottom nav mobile | touch target 44px |
| Footer | surface-canvas | divider | none | none | 16/24 | caption | 16 | none | none | focus-ring | none | none | none | stacked on mobile | readable contrast |
| Input | surface-input | border | md | none | 12/16 | body | 16 | none | none | focus-ring | none | muted | none | full-width | label + error text |
| Textarea | surface-input | border | md | none | 12/16 | body | 16 | none | none | focus-ring | none | muted | none | full-width | resize allowed |
| Checkbox | surface-canvas | border | sm | none | 8 | body | 16 | none | surface-pressed | focus-ring | selected tint | muted | none | stacked | visible checked state |
| Radio | surface-canvas | border | pill | none | 8 | body | 16 | none | surface-pressed | focus-ring | selected tint | muted | none | stacked | proper group semantics |
| Switch | surface-input | border | pill | none | 8 | body-sm | 16 | none | surface-pressed | focus-ring | selected tint | muted | none | full-width | label and state |
| Tabs | surface-canvas | divider | none | none | 8/12 | label | 16 | surface-hover | surface-pressed | focus-ring | selected tint | muted | none | scroll horizontally if needed | ARIA tablist |
| Badge | surface-card | border | pill | none | 6/10 | metadata | 14 | none | none | none | color selection | muted | none | wrap naturally | not rely on color only |
| Chip | surface-card | border | pill | none | 8/12 | label | 14 | surface-hover | surface-pressed | focus-ring | selected tint | muted | none | wrap naturally | contrast + label |
| Toast | surface-dialog | border | md | md | 12/16 | body-sm | 16 | none | none | none | none | none | none | top-center mobile | live region |
| Dialog | surface-dialog | border | lg | lg | 24 | body/title | 20 | none | none | focus-ring | none | muted | none | centered | focus trap |
| Dropdown | surface-dialog | border | md | md | 12 | body | 16 | surface-hover | surface-pressed | focus-ring | selected tint | muted | none | full-width mobile | role menu |
| Popover | surface-dialog | border | md | md | 12/16 | body | 16 | surface-hover | surface-pressed | focus-ring | selected tint | muted | none | anchored to trigger | keyboard dismissal |
| Tooltip | surface-dialog | border | sm | sm | 8/12 | caption | 14 | none | none | none | none | none | none | follow viewport | screen reader alternative |
| Search | surface-input | border | pill | none | 12/16 | body | 16 | none | surface-pressed | focus-ring | none | muted | none | full-width | label or placeholder |
| Pagination | surface-canvas | border | pill | none | 8/12 | label | 16 | surface-hover | surface-pressed | focus-ring | selected tint | muted | none | wrap on mobile | accessible page labels |
| Skeleton | surface-muted | none | md | none | none | none | none | none | none | none | none | none | animated | responsive | no layout shift |
| Empty State | surface-canvas | none | none | none | 24 | body | 24 | none | none | none | none | none | none | centered | clear action guidance |
| Loading State | surface-canvas | none | none | none | 24 | body-sm | 20 | none | none | none | none | none | animated | full-screen / inline | visible progress |
| Error State | surface-card | border | md | xs | 16 | body | 20 | none | none | focus-ring | none | none | none | centered | clear recovery action |
