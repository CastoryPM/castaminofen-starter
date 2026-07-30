# Castaminofen — Home experience

UI-only implementation of the Castaminofen Home discovery surface. No APIs,
no auth, no player engine, no social backend — every value is a static fixture.

## File structure

```
src/routes/index.tsx              HomePage: composes the section order + SEO head
src/data/home.ts                  Static fixtures + exported TS types (component contracts)
src/assets/                       Generated artwork (featured hero + 3 abstract covers)
src/styles.css                    Design tokens, utilities (rail, veil, aurora, card-elevated)
src/components/home/
  HomeHeader.tsx                  Sticky app bar: brand, search, notifications, profile
  WelcomeHero.tsx                 Personalized greeting + quick actions
  CategoryNavigation.tsx          Sticky content-universe pill rail (local active state)
  ContinueSection.tsx             Continue rail; falls back to EmptyState when empty
  FeaturedContentHero.tsx         Cinematic featured slot (play + save)
  MediaCarousel.tsx               SectionHeader + shared horizontal rail frame
  DiscoveryShelves.tsx            Trending / Recommended / New / Editor picks / Hidden gems
  PodcastSection.tsx              Episode rows + creator chips
  VideoSection.tsx                16:9 video rail
  AudiobookSection.tsx            Editorial covers + category rail
  ShortsSection.tsx               9:16 short-form rail
  CreatorSection.tsx              Creator discovery with local follow toggle
  CommunityHighlights.tsx         Discussions preview + "People are listening to"
  LibraryShortcut.tsx             Favorites / Saved / Playlists / History entries
  BottomNav.tsx                   6-tab thumb-reachable navigation
  cards/                          ContinueCard, PodcastCard, VideoCard, AudiobookCard,
                                  ShortCard, CreatorCard
  ProgressBar.tsx                 Shared progress rail
  states/EmptyState.tsx           "Your journey starts here"
  states/ErrorState.tsx           Friendly failure + retry
  states/Skeletons.tsx            MediaCardSkeleton + ShelfSkeleton
```

## Design decisions

- **Own identity.** Ink-indigo surfaces (`oklch(0.17 0.019 268)`) with a warm
  ember gradient accent and a cool signal accent. Deliberately not Spotify
  green, YouTube red or Netflix black/red. Artwork is the only saturated thing
  on screen; chrome stays quiet so covers carry the color.
- **Typography.** Fraunces (display, editorial serif) against Manrope (UI sans).
  The serif signals "curated media house", not "streaming dashboard".
- **Tokens only.** Every color, gradient, shadow and radius lives in
  `src/styles.css`. Components never hardcode color utilities.
- **Rails over grids on mobile.** One vertical scroll, many horizontal rails,
  masked edges (`edge-fade`) to hint at more content without arrows.
- **Restrained motion.** Artwork scales subtly on hover; play affordances fade
  in. Nothing animates on load.
- **Desktop is the same product.** Content is centered at `max-w-6xl`; shelves
  simply show more cards. No separate desktop layout.
- **Community is a preview.** Home shows the pulse and hands off; it never
  owns threads or posting.

## Integration notes

- Replace `src/data/home.ts` with real data. Keep the exported types
  (`MediaItem`, `Audiobook`, `Short`, `Creator`, `Discussion`) — components
  depend only on those shapes.
- Sections are pure presentational components; pass data in as props (each
  currently defaults to its fixture) and lift fetching to the page.
- Loading: swap a section for `<ShelfSkeleton />`. Failure: render
  `<ErrorState onRetry={...} />` inside the same slot. Empty:
  `<EmptyState />` (already wired into `ContinueSection`).
- `WelcomeHero` takes `name` and `hour`. Pass the real hour on the client
  (e.g. in an effect) to avoid an SSR/client mismatch.
- Interactive state (category, follow, bottom nav) is local `useState` only —
  wire to routing/state management at integration.
- **Framework note:** this project runs TanStack Start, so the page lives at
  `src/routes/index.tsx`. The components themselves are framework-agnostic
  React + Tailwind. To port to Next.js App Router, move them under
  `app/components/`, add `"use client"` to the four stateful files
  (`CategoryNavigation`, `CreatorCard`, `BottomNav`, and any page using state),
  and move the `head()` meta into a `metadata` export.
