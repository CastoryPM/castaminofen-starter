# Phase HISTORY.1 — Listening History MVP Report

## Summary
- Implemented the Listening History MVP using the existing `ListeningHistory` persistence model.
- Added backend support for fetching history with episode and podcast relations.
- Added a library history section in the frontend with empty/loading states, relative played-at labels, and resume playback integration.
- Kept Player as the only playback owner and did not invent or create any synthetic history data.

## Scope
- Backend: `apps/api/src/library/library.service.ts`, `apps/api/src/library/library.controller.ts`
- Frontend: `apps/web/src/features/library/components/LibraryHistorySection.tsx`, `apps/web/src/features/library/components/LibraryPage.tsx`, `apps/web/src/features/library/hooks/useUpdateListeningHistory.ts`, `apps/web/src/features/library/hooks/useSubscribePodcast.ts`, `apps/web/src/features/library/hooks/useUnsubscribePodcast.ts`, `apps/web/src/features/library/types/index.ts`, `apps/web/src/features/library/utils/library-collections.ts`, `apps/web/src/lib/library.ts`, `apps/web/src/features/library/utils/library-history-presentation.ts`
- Shared types: `packages/shared-types/src/index.ts`

## Completed Work
- Added a history query endpoint for the library feature in the API.
- Returned history records ordered by `lastPlayedAt`.
- Extended library overview types to include `history` from the backend.
- Added the `LibraryHistorySection` component with clear header, empty-state UI, and history items rendered as episode rows.
- Added relative timestamp formatting for `lastPlayedAt` labels.
- Integrated resume playback from history items through the existing Player runtime.
- Ensured history query cache invalidation when listening history updates.
- Extended the shared `Episode` type to include optional `duration` and rebuilt shared types.

## Architecture Decisions
- The history feature is built on top of the existing `ListeningHistory` model; no new history persistence was introduced.
- Player runtime remains the single playback owner; history is a presentation layer and resume surface only.
- History and continue-listening remain separate collections to reflect different UX surfaces.
- The shared `Episode` type was updated in `@castaminofen/shared-types` so the library UI can correctly handle optional `duration` metadata.

## Validation Results
- Run: `pnpm --filter @castaminofen/shared-types build`
- Run: `pnpm --filter @castaminofen/web build`
- Result: `apps/web` built successfully after the shared type rebuild and cache update fixes.

## Files Changed
- `apps/api/src/library/library.controller.ts`
- `apps/api/src/library/library.service.ts`
- `apps/web/src/features/library/components/LibraryCollectionsSection.tsx`
- `apps/web/src/features/library/components/LibraryHistorySection.tsx`
- `apps/web/src/features/library/components/LibraryPage.tsx`
- `apps/web/src/features/library/hooks/useSubscribePodcast.ts`
- `apps/web/src/features/library/hooks/useUnsubscribePodcast.ts`
- `apps/web/src/features/library/hooks/useUpdateListeningHistory.ts`
- `apps/web/src/features/library/types/index.ts`
- `apps/web/src/features/library/utils/library-collections.ts`
- `apps/web/src/features/library/utils/library-history-presentation.ts`
- `apps/web/src/lib/library.ts`
- `packages/shared-types/src/index.ts`

## Known Limitations
- No dedicated frontend unit tests were added in this phase.
- Build warnings unrelated to this feature still exist in unrelated search and player components.

## Next Step
- Add targeted frontend tests for `LibraryHistorySection` and `formatRelativePlayedAt`.
- Continue validation by running the full web test suite and a backend API smoke test.

## Suggested Commit Message
- `feat(library): add listening history MVP using existing playback history`