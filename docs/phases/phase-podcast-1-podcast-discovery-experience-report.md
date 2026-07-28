# Phase Podcast.1 — Podcast Discovery Experience

## Objective
Create a usable podcast discovery experience that preserves the existing Podcast, Episode, and Player ownership boundaries while allowing users to browse podcasts, open a podcast detail view, inspect episodes, and trigger playback through the existing Player runtime.

## Scope
- Completed the podcast listing presentation with clearer owner metadata.
- Enhanced the podcast detail view to expose episode metadata and play actions without leaking RSS operational fields.
- Routed episode playback through the existing Player adapter so the Player feature remains the single owner of playback lifecycle.
- Added regression coverage for the podcast presentation helpers used by the discovery experience.

## Files changed
- apps/web/src/features/podcasts/PodcastCard.tsx
- apps/web/src/features/podcasts/PodcastDetails.tsx
- apps/web/src/features/podcasts/utils/podcastPresentation.ts
- apps/web/src/features/podcasts/utils/podcastPresentation.test.ts

## Routes updated
- /podcasts
- /podcasts/:id

## Architecture decisions
- Kept the Podcast feature responsible for discovery and presentation.
- Kept the Episode feature responsible for metadata presentation only.
- Kept the Player feature responsible for playback lifecycle through the existing adapter contract.
- Did not introduce new APIs or expose RSS operational fields in the public UI.

## API usage
- Consumed the existing podcast API contract through the current React Query hooks and shared podcast service layer.
- No API contract changes were required.

## Player integration details
- Episode play actions now call the existing Player runtime adapter and pass a playable item derived from the episode domain model.
- Playback remains owned by the Player runtime and is not implemented as episode-level audio logic.

## Validation results
- Web lint: passed
- Web build: passed
- Web tests: passed (29/29)
