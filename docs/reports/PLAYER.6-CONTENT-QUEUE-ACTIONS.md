# PLAYER.6 Report

## Executive Summary

The player queue now accepts real playable content from episode, search, playlist, podcast, and library surfaces while preserving the existing player-owned queue model. Queue mutations continue to flow through the player runtime, the queue panel renders real queued items, and persistence remains intact across reloads.

## Scope Completed

- Added real add-to-queue actions from episode cards, episode detail views, podcast episode lists, playlist episode lists, search results, and library surfaces.
- Kept queue ownership inside the player runtime and store layers without introducing a queue manager or new abstraction.
- Updated the queue panel to show the current item and real upcoming items with remove/clear actions.
- Added regression tests for runtime-level queue actions and feature-level integration points.

## Content Integration Changes

- Episode cards now expose an add-to-queue action that sends the actual episode as a playable item to the runtime.
- Episode detail views now include the same real add-to-queue interaction.
- Podcast episode lists and search results now route queue insertion through the player runtime instead of relying on placeholder items.
- Playlist and library surfaces now offer queue actions that add the selected episode as a real playable item.

## Player Runtime Changes

- The runtime continues to expose queue mutation methods via the existing controller API.
- Queue appends and removals now operate on real playable content with stable item identity.
- Persistence remains aligned so queue changes continue to write through the existing player snapshot flow.

## Queue API Changes

- Existing runtime actions remain the single entry point for queue changes:
  - play item via loadItem
  - replaceQueue for full queue replacement
  - appendToQueue for appending real playable content
  - removeFromQueue for removing queued items
- No external feature now mutates queue state directly.

## UI/UX Changes

- The queue panel now surfaces real queue items from the runtime instead of a placeholder derived from the current item.
- Queue actions in the panel continue to support removing individual items and clearing the queue.
- Content surfaces now expose add-to-queue actions in-line with their existing play actions.

## Persistence Validation

- Queue additions and removals are persisted through the existing player snapshot mechanism.
- Restoring the player snapshot keeps the queue/current item/current index relationship consistent for real queued items.

## Tests Added

- Runtime tests for appending and removing real queue items.
- Feature tests for episode card and search result queue actions.
- Existing queue panel UI tests continue to validate remove action behavior.

## Validation Results

- Web test suite: passed (7 queue-related tests).
- Production build: passed.

## Files Changed

- [apps/web/src/features/episodes/EpisodeCard.tsx](apps/web/src/features/episodes/EpisodeCard.tsx)
- [apps/web/src/features/episodes/components/EpisodeDetailView.tsx](apps/web/src/features/episodes/components/EpisodeDetailView.tsx)
- [apps/web/src/features/podcasts/PodcastDetails.tsx](apps/web/src/features/podcasts/PodcastDetails.tsx)
- [apps/web/src/features/playlists/components/PlaylistDetailsPage.tsx](apps/web/src/features/playlists/components/PlaylistDetailsPage.tsx)
- [apps/web/src/features/playlists/components/PlaylistEpisodeList.tsx](apps/web/src/features/playlists/components/PlaylistEpisodeList.tsx)
- [apps/web/src/features/search/components/SearchResultsPanel.tsx](apps/web/src/features/search/components/SearchResultsPanel.tsx)
- [apps/web/src/features/library/components/ContinueListeningSection.tsx](apps/web/src/features/library/components/ContinueListeningSection.tsx)
- [apps/web/src/features/library/components/LibraryFavoritesSection.tsx](apps/web/src/features/library/components/LibraryFavoritesSection.tsx)
- [apps/web/src/features/library/components/LibraryHistorySection.tsx](apps/web/src/features/library/components/LibraryHistorySection.tsx)
- [apps/web/src/features/library/components/LibraryEpisodeRow.tsx](apps/web/src/features/library/components/LibraryEpisodeRow.tsx)
- [apps/web/src/features/player/components/PlayerBar.tsx](apps/web/src/features/player/components/PlayerBar.tsx)
- [apps/web/src/features/player/runtime/playerRuntime.queue.test.ts](apps/web/src/features/player/runtime/playerRuntime.queue.test.ts)
- [apps/web/src/features/episodes/EpisodeCard.test.tsx](apps/web/src/features/episodes/EpisodeCard.test.tsx)
- [apps/web/src/features/search/components/SearchResultsPanel.test.tsx](apps/web/src/features/search/components/SearchResultsPanel.test.tsx)

## Known Limitations

- Play Next support remains intentionally out of scope for this MVP.
- Queue reordering and advanced queue management remain outside the current phase.

## Next Recommended Phase

- PLAYER.7: Queue UX refinement and deeper player/queue state interactions around resume and current-item selection.
