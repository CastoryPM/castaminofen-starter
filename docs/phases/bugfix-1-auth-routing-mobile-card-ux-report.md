# Phase BUGFIX.1 — Authentication Routing & Mobile Card UX Investigation

## 1. Executive Summary

This phase addressed the authentication routing regression on the home route and applied small mobile-first UX improvements to podcast and episode cards without changing the broader MVP architecture. The root cause was that the root page always rendered the onboarding experience, regardless of the auth store state. The fix now respects auth hydration and session data before deciding whether to show the welcome screen or route authenticated users to the library experience. The mobile card polish focused on spacing, touch targets, typography, and overflow handling while preserving the existing visual language.

## 2. Root Cause Analysis (Authentication bug)

### Problem
Authenticated users clicking Home were still being sent to the Get Started/onboarding experience because the root route in [apps/web/src/app/page.tsx](apps/web/src/app/page.tsx) was hard-coded to render the welcome screen.

### Why the redirect happened
The app had two separate sources of truth for auth state:
- The session query from [apps/web/src/lib/auth.ts](apps/web/src/lib/auth.ts)
- The Zustand auth store in [apps/web/src/stores/authStore.ts](apps/web/src/stores/authStore.ts)

The root route did not consult those values before rendering the onboarding component. As a result, once the user navigated to `/`, the app always showed the welcome experience instead of respecting the authenticated state.

### Fix applied
A minimal fix was implemented by:
- Checking the auth store hydration status and session data in [apps/web/src/app/page.tsx](apps/web/src/app/page.tsx)
- Routing authenticated users to the library experience via `router.replace('/library')`
- Keeping unauthenticated users on the existing onboarding view

This preserves the existing auth architecture and only changes the decision point at the root route.

## 3. Mobile UI Review

### Reviewed areas
- Podcast cards in [apps/web/src/features/podcasts/PodcastCard.tsx](apps/web/src/features/podcasts/PodcastCard.tsx)
- Episode cards in [apps/web/src/features/episodes/EpisodeCard.tsx](apps/web/src/features/episodes/EpisodeCard.tsx)
- Library podcast cards in [apps/web/src/features/library/components/LibraryPodcastCard.tsx](apps/web/src/features/library/components/LibraryPodcastCard.tsx)
- Library episode rows in [apps/web/src/features/library/components/LibraryEpisodeRow.tsx](apps/web/src/features/library/components/LibraryEpisodeRow.tsx)

### Improvements made
- Increased card padding and rounded corners for better mobile spacing
- Improved vertical stacking for buttons and content on small screens
- Increased touch targets for primary actions
- Tightened text sizing and line-height for better readability
- Adjusted image sizing and overflow handling to prevent cramped layouts

These changes were intentionally mobile-first and did not alter the desktop experience beyond preserving layout consistency.

## 4. Files Modified

- [apps/web/src/app/page.tsx](apps/web/src/app/page.tsx)
- [apps/web/src/app/home-page-mode.ts](apps/web/src/app/home-page-mode.ts)
- [apps/web/src/app/page.test.ts](apps/web/src/app/page.test.ts)
- [apps/web/src/features/podcasts/PodcastCard.tsx](apps/web/src/features/podcasts/PodcastCard.tsx)
- [apps/web/src/features/episodes/EpisodeCard.tsx](apps/web/src/features/episodes/EpisodeCard.tsx)
- [apps/web/src/features/library/components/LibraryPodcastCard.tsx](apps/web/src/features/library/components/LibraryPodcastCard.tsx)
- [apps/web/src/features/library/components/LibraryEpisodeRow.tsx](apps/web/src/features/library/components/LibraryEpisodeRow.tsx)

## 5. Validation Results

### Commands run
- `pnpm test`
- `pnpm lint`
- `pnpm --filter @castaminofen/web exec tsc -p tsconfig.json --noEmit --pretty false`
- `pnpm build`

### Results
- Tests: passed
- Lint: passed
- Type-check: passed
- Build: passed

## 6. Known Existing Issues

No new issues were introduced by this phase.

## 7. `library-mappers.ts` Investigation

### File reviewed
- [apps/web/src/features/library/utils/library-mappers.ts](apps/web/src/features/library/utils/library-mappers.ts)

### Root cause
The file itself is simple and does not appear to contain a functional issue in the current workspace state. The reported type-check problem was not reproduced during this phase.

### Relation to this phase
It is not related to the auth routing or mobile-card UX work.

### Blocker status
It did not block this phase because the current workspace build and type-check completed successfully after the routed fix.

### Recommended future fix
If a future type-check failure appears for this module, the next step should be to inspect the relevant type definitions in [apps/web/src/features/library/types/index.ts](apps/web/src/features/library/types/index.ts) and the consumers in [apps/web/src/features/library/components/LibraryEpisodeRow.tsx](apps/web/src/features/library/components/LibraryEpisodeRow.tsx) to ensure the mapper signatures and the imported types remain aligned.

## 8. Regression Check

The targeted regression test in [apps/web/src/app/page.test.ts](apps/web/src/app/page.test.ts) covers the routing decision logic so the home route continues to honor auth state for future changes.

## 9. Final MVP Assessment

The requested bugfix scope is complete. Authentication state is now respected on the root route, and the mobile presentation of podcast and episode cards has been improved in a focused, low-risk way that remains consistent with the existing MVP experience.
