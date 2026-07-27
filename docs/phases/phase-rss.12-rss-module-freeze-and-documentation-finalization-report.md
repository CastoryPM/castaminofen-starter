# Phase RSS.12 — RSS Module Freeze & Documentation Finalization Report

## Objective

Officially freeze the RSS module architecture after RSS.1–RSS.11 and create the final documentation reference for future development. The purpose of this phase is to make the current RSS design explicit, stable, and protected from architectural drift.

## Final RSS Architecture Summary

The RSS implementation remains an internal ingestion and synchronization mechanism for the Castaminofen MVP. It does not define a separate product domain and does not introduce new business entities beyond the canonical domain models.

Flow:

FeedSource

↓

Fetch

↓

Parse

↓

Normalize

↓

Match

↓

Persist

↓

FeedSource State Update

This workflow is operational by design. The public product experience remains centered on Podcast and Episode, while RSS concerns remain internal to the API layer.

## Module Boundaries

### RSS module
- Owns ingestion-related responsibilities: fetch, parse, normalize, match, and synchronize.
- Owns operational state for FeedSource and synchronization execution.
- Remains internal infrastructure for the MVP.

### Podcast module
- Owns the canonical Podcast business model.
- Owns podcast identity, metadata, and user-facing product representation.
- Does not own RSS ingestion logic.

### Episode module
- Owns the canonical Episode business model.
- Owns user-facing episode content and playback-related domain behavior.
- Does not own RSS ingestion logic.

### Frontend
- Consumes only public Podcast and Episode domain models.
- Does not own RSS implementation details or operational metadata.

## Domain Ownership Rules

### Podcast
- Canonical business entity.
- Public product model.
- Owns podcast identity and metadata.
- Serves as the anchor for RSS-backed content ingestion.

### Episode
- Canonical playable content entity.
- Belongs to Podcast.
- Represents user-facing content and playback state.
- Must remain the only content model exposed to the frontend.

### FeedSource
- Operational infrastructure only.
- Stores RSS source information and synchronization state.
- Must not become a business entity, user-facing model, or public product domain.

## Persistence Decisions

- Internal IDs remain system-owned and authoritative.
- External RSS identifiers are used only for matching and synchronization purposes.
- No RSS-specific business entities are introduced in the persistence model.
- Podcast and Episode remain the canonical persistence owners for product data.
- FeedSource is retained only for operational bookkeeping and ingestion coordination.

### Persistence rules
- RSS-derived identifiers such as `guid` and `audioUrl` may be stored for matching and deduplication.
- These values are operational metadata and are not promoted to standalone business ownership.
- Uniqueness and relationship constraints are enforced around canonical domain entities, not around RSS structure itself.
- Synchronization is assumed to be repeatable and idempotent.

## Synchronization Workflow Overview

The synchronization workflow remains deterministic and internal:

1. Resolve a FeedSource.
2. Fetch the remote feed.
3. Parse feed content.
4. Normalize incoming podcast and episode data.
5. Match against existing Podcast/Episode records using the approved priority:
   - `guid`
   - `audioUrl`
   - `title + publishedAt`
6. Persist new or updated content through canonical domain models.
7. Update FeedSource operational state.

### Synchronization guarantees
- Idempotency is preserved across repeated runs.
- Duplicate content is prevented through matching and update rules.
- Partial failures do not change the ownership model.
- FeedSource status transitions follow the operational lifecycle: `RUNNING`, `SUCCESS`, `FAILED`.

## Public API Boundaries

### Public
- Podcast APIs
- Episode APIs

### Internal
- RSS synchronization operations
- FeedSource state management
- Ingestion metadata and operational bookkeeping

Public responses must not expose:
- `rssUrl`
- `feedSourceId`
- `FeedSource`
- `syncStatus`
- `lastSyncedAt`
- `lastError`

These values remain internal operational details and must not leak into the public domain contract.

## Frontend Boundaries

The frontend knows:
- Podcast
- Episode
- Public content fields

The frontend does not know:
- RSS
- FeedSource
- Synchronization mechanics
- Ingestion metadata

The user experience remains a normal podcast/episode experience. RSS remains invisible to the product surface.

## Files Reviewed

- [apps/api/src/rss](apps/api/src/rss)
- [apps/api/src/podcasts/podcasts.service.ts](apps/api/src/podcasts/podcasts.service.ts)
- [apps/api/src/episodes/episodes.service.ts](apps/api/src/episodes/episodes.service.ts)
- [docs/phases/phase-rss.11-final-architecture-review-report.md](docs/phases/phase-rss.11-final-architecture-review-report.md)
- [docs/phases/phase-rss.10-production-readiness-audit-report.md](docs/phases/phase-rss.10-production-readiness-audit-report.md)
- [docs/architecture-decisions.md](docs/architecture-decisions.md)

## Changes Made

No runtime code changes were required.

This phase was documentation and architecture finalization only. The main work was to formalize the freeze decision and preserve the established boundaries for future contributors.

## Validation Performed

The following commands were executed successfully:

- `pnpm --filter @castaminofen/api build`
- `pnpm --filter @castaminofen/api test`
- `pnpm --filter @castaminofen/web test`
- `pnpm --dir apps/api exec prisma validate`

## Final Freeze Status

RSS is officially frozen as an internal ingestion and synchronization mechanism for the MVP.

The current architecture is considered stable and protected from drift under the following rules:
- Podcast and Episode remain canonical business models.
- FeedSource remains operational infrastructure only.
- RSS details remain internal to the API layer.
- The frontend continues to consume only public domain content.

## Future Modification Rules

### Allowed
- Adding new ingestion sources
- Improving parsing and normalization reliability
- Improving synchronization reliability
- Adding operational monitoring and diagnostics

### Not allowed without architecture review
- Making FeedSource a user-facing entity
- Exposing RSS fields through public APIs
- Coupling the frontend to ingestion details
- Creating source-specific business models
- Bypassing canonical Podcast/Episode models

## Remaining Risks

- Runtime feed availability and malformed feeds can still cause sync failures.
- Operational telemetry and feed-specific edge cases may require future hardening, but these are implementation concerns rather than architectural changes.
- Future expansion of RSS support must continue to preserve the strict separation between ingestion infrastructure and public domain models.

## Suggested Conventional Commit Message

`docs(rss): freeze rss architecture boundaries and finalize documentation`
