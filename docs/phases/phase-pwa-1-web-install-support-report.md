# Phase PWA.1 — Web App Installation Support Report

## Objective

Add minimal browser-based installation support for the Castaminofen web app while preserving existing routes, APIs, business logic, and feature ownership boundaries.

## Scope

- Add a web app manifest for installability.
- Expose the required metadata and icon links through the Next.js app shell.
- Register a minimal service worker for compatible browsers.
- Add a lightweight install banner in the shared app shell so users can trigger the browser install flow without interrupting the experience.

## Changes Made

- Added a manifest file at apps/web/public/site.webmanifest with name, short name, description, start URL, display mode, theme/background colors, and icon references.
- Wired the manifest and PWA metadata into the root layout via Next.js metadata and viewport exports.
- Added a minimal service worker at apps/web/public/sw.js for installable-browser registration.
- Added a shared install banner component at apps/web/src/components/pwa/install-banner.tsx that listens for the beforeinstallprompt event and offers an opt-in install action.
- Added small PWA helper utilities and regression tests in apps/web/src/lib/pwa.ts and apps/web/src/lib/pwa.test.ts.

## Files Changed

- apps/web/src/app/layout.tsx
- apps/web/src/components/layout/app-shell.tsx
- apps/web/src/components/pwa/install-banner.tsx
- apps/web/src/lib/pwa.ts
- apps/web/src/lib/pwa.test.ts
- apps/web/public/site.webmanifest
- apps/web/public/sw.js

## Validation

- Web tests: passed (29 files, 99 tests)
- Web lint: passed with existing warnings in unrelated feature files
- Web build: passed
- Repo lint: passed
- Repo tests: passed

## Notes

- Installability depends on browser support and hosting conditions; browsers typically require HTTPS and a valid manifest for the install prompt to appear.
- The implementation intentionally stays minimal and does not introduce offline-first behavior, caching architecture, or feature-level PWA ownership.
