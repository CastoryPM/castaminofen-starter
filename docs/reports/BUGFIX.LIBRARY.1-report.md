# BUGFIX.LIBRARY.1 Report

## Executive Summary
The Home and Library pages were failing because the library API route was registered with a duplicated prefix. The frontend was requesting /api/v1/library, while the backend controller was mounted as api/v1/library, which caused the route to resolve incorrectly and return 404.

## Symptoms
- Library overview requests from the web app failed after authentication.
- The UI displayed the error message: "بارگذاری کتابخانه با مشکل مواجه شد".
- The backend responded with HTTP 404 for GET /api/v1/library.

## Root Cause Analysis
The issue was not caused by the frontend library hooks or the API client layer. The frontend correctly called the shared library path, and the backend controller was also present. The actual defect was a route registration mismatch:
- The NestJS app globally prefixes routes with api/v1.
- The library controller was explicitly registered with the path api/v1/library.
- This caused the effective route to become api/v1/api/v1/library, which did not match the frontend request.

## Investigation Findings
- Frontend initiator: the library page hooks in apps/web/src/features/library/hooks/ use the shared client in apps/web/src/lib/library.ts.
- Backend endpoint: apps/api/src/library/library.controller.ts defined the library controller.
- API base URL: apps/web/src/shared/lib/env.ts correctly resolves to /api/v1 in the browser.
- Authentication headers: the shared API client already attaches the bearer token and credentials correctly.
- Root cause: duplicated API prefix in the controller path.

## Fix Applied
The library controller path was changed from api/v1/library to library so it resolves correctly under the global API prefix and matches the frontend request to /api/v1/library.

## Files Modified
- apps/api/src/library/library.controller.ts
- apps/api/src/library/library.controller.spec.ts
- docs/reports/BUGFIX.LIBRARY.1-report.md

## Validation Results
- Regression test for the controller route path passed.
- API build completed successfully.
- The library request path now resolves under the expected /api/v1/library endpoint.

## Remaining Recommendations
- If the API gateway or reverse proxy is introduced later, verify that it preserves the NestJS global prefix behavior for all versioned routes.
- Keep the regression test in place to guard against future route-prefix regressions.
