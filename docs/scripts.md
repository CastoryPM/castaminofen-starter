# Project Scripts Registry

## pnpm build

Location:
root package.json

Purpose:
Build all workspace applications.

Usage:

pnpm build


Related Phase:

Phase 0+

## pnpm --filter @castaminofen/web test

Location:
apps/web/package.json

Purpose:
Run the Player runtime regression test suite for the web package.

Usage:

pnpm --filter @castaminofen/web test

Related Phase:

Phase 3.2.4 - Player Test Infrastructure Foundation

## pnpm --filter @castaminofen/api test -- --test-name-pattern='orchestrator|synchronization'

Location:
apps/api/package.json

Purpose:
Run the RSS synchronization and orchestrator regression tests for the API package.

Usage:

pnpm --filter @castaminofen/api test -- --test-name-pattern='orchestrator|synchronization'

Related Phase:

Phase RSS.6.4 - End-to-End Synchronization Orchestrator

## pnpm --filter @castaminofen/web test -- src/features/social/components/SocialInfrastructure.test.tsx

Location:
apps/web/package.json

Purpose:
Run the shared social infrastructure regression tests for comments, reactions, follows, and notifications.

Usage:

pnpm --filter @castaminofen/web test -- src/features/social/components/SocialInfrastructure.test.tsx

Related Phase:

Phase SOCIAL.1 - Shared Social Interaction Infrastructure
