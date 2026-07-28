# Validation Report

Date: 2026-07-28

## Summary

- Build: failed
- Lint: failed
- Test: passed

## Command Results

### 1) Build

Command:

```bash
pnpm build
```

Status: failed

Failing package:

- @castaminofen/api

Compiler output:

```text
> @castaminofen/api@0.1.0 build /workspaces/castaminofen-starter/apps/api
> nest build

src/library/library.service.ts:21:31 - error TS2339: Property 'PrismaClientKnownRequestError' does not exist on type 'typeof Prisma'.
src/playlists/playlists.service.ts:32:27 - error TS7006: Parameter 'playlist' implicitly has an 'any' type.
src/playlists/playlists.service.ts:118:52 - error TS7006: Parameter 'tx' implicitly has an 'any' type.
src/playlists/playlists.service.ts:150:35 - error TS2339: Property 'PrismaClientKnownRequestError' does not exist on type 'typeof Prisma'.
src/playlists/playlists.service.ts:150:68 - error TS18046: 'error' is of type 'unknown'.
src/playlists/playlists.service.ts:207:59 - error TS7006: Parameter 'item' implicitly has an 'any' type.
src/playlists/playlists.service.ts:232:44 - error TS7006: Parameter 'tx' implicitly has an 'any' type.
src/podcasts/podcasts.service.ts:52:25 - error TS2694: Namespace 'Prisma' has no exported member 'PodcastWhereInput'.
src/rss/bootstrap/feed-config.ts:3:10 - error TS2305: Module '@prisma/client' has no exported member 'FeedSourceType'.
src/rss/dto/create-feed-source.dto.ts:2:10 - error TS2305: Module '@prisma/client' has no exported member 'FeedSourceType'.
src/rss/orchestration/rss-sync.orchestrator.ts:193:29 - error TS7006: Parameter 'fs' implicitly has an 'any' type.
src/rss/services/feed-source.service.ts:5:10 - error TS2305: Module '@prisma/client' has no exported member 'FeedSource'.
src/rss/synchronization/synchronization.service.ts:139:64 - error TS7006: Parameter 'tx' implicitly has an 'any' type.
src/rss/synchronization/synchronization.service.ts:175:45 - error TS7006: Parameter 'tx' implicitly has an 'any' type.
src/rss/synchronization/synchronization.service.ts:198:47 - error TS7006: Parameter 'tx' implicitly has an 'any' type.
src/rss/synchronization/synchronization.service.ts:220:43 - error TS7006: Parameter 'tx' implicitly has an 'any' type.
src/rss/synchronization/synchronization.service.ts:246:70 - error TS7006: Parameter 'tx' implicitly has an 'any' type.

Found 17 error(s).
```

Root cause:

- The API build fails during TypeScript compilation in the library, playlists, podcasts, and RSS modules.
- The reported errors indicate Prisma client type mismatches (for example, missing exported members such as FeedSourceType and PrismaClientKnownRequestError) and several implicit-any parameters in service methods.

### 2) Lint

Command:

```bash
pnpm lint
```

Status: failed

Failing package:

- @castaminofen/api

Linter output:

```text
> castaminofen@0.1.0 lint /workspaces/castaminofen-starter
> pnpm -r lint

apps/api lint$ pnpm exec eslint --ext .ts src --ignore-pattern '**/*.spec.ts' --max-warnings=0

/workspaces/castaminofen-starter/apps/api/src/rss/rss.module.ts
  17:10  warning  'NormalizedFeed' is defined but never used. Allowed unused vars?  
  31:20  warning  'prisma' is defined but never used. Allowed unused vars?  
✖ 2 problems (0 errors, 2 warnings)
ESLint found too many warnings (maximum: 0).
```

Root cause:

- The lint step failed because ESLint reported warnings in the API RSS module and the project is configured to fail when warnings exceed zero.

### 3) Test

Command:

```bash
pnpm test
```

Status: passed

Result:

```text
> @castaminofen/api@0.1.0 test /workspaces/castaminofen-starter/apps/api
> node --require ts-node/register/transpile-only --test src/**/*.spec.ts

✔ PodcastsService.findById returns public podcast details and related episodes
✔ PodcastsService.create returns public podcast details without RSS infrastructure fields
✔ PodcastsService.update returns public podcast details without RSS infrastructure fields
✔ PodcastsService.findById throws NotFoundException for missing podcasts
✔ PodcastsService.findEpisodesByPodcastId scopes episodes to the requested podcast
✔ PodcastsService.findAll searches by title and podcast author name

ℹ tests 6
ℹ pass 6
ℹ fail 0
```
