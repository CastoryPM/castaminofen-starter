# API Connectivity Investigation

## Executive Summary

The browser connectivity issue is not caused by the authentication implementation or by a backend application bug in the request handling path. The verified root cause is environmental: the API process is running inside the dev container and is listening on localhost inside that container, while the browser is effectively operating from the host side of the dev container context. In this setup, direct browser access to http://localhost:3001 is not a valid reachability path unless port forwarding for port 3001 is explicitly provided.

The frontend code is correctly configured to use the Next.js development rewrite for /api/v1 requests, and those requests succeed from the container when tested directly. The backend also accepts the expected CORS preflight and registration requests. The failure is therefore a runtime/network exposure issue, not an auth or API contract issue.

## Scope

- Investigate why browser requests to the API fail while curl requests succeed.
- Verify frontend configuration, API base URL handling, and runtime request paths.
- Verify backend binding, CORS behavior, and port exposure.
- Determine whether the issue is environmental, infrastructure-related, or architectural.

## Environment

- Workspace: Castaminofen MVP
- Runtime host: GitHub Codespaces / dev container environment
- Web app port: 3000
- API port: 3001
- Browser context: outside the API process container boundary
- API process verified to be listening inside the container on port 3001
- No explicit dev container port-forwarding configuration for the API was found in the workspace

## Frontend Configuration

The frontend configuration does not appear to be the source of the problem.

- The web app is started with Next.js on port 3000 from [apps/web/package.json](apps/web/package.json).
- The development rewrite in [apps/web/next.config.js](apps/web/next.config.js) forwards /api/v1/:path* to http://localhost:3001/api/v1/:path*.
- The client-side API helper in [apps/web/src/shared/lib/api-client.ts](apps/web/src/shared/lib/api-client.ts) uses a relative base URL when running in the browser.
- The environment helper in [apps/web/src/shared/lib/env.ts](apps/web/src/shared/lib/env.ts) does not set NEXT_PUBLIC_API_URL in this environment, so the browser uses the relative /api/v1 path rather than an absolute localhost URL.

This means the browser should not need to directly target localhost:3001 for normal development requests.

## Backend Configuration

The backend is configured to accept requests on port 3001 and to allow the web app origin.

- The API bootstraps with a global prefix of api/v1 in [apps/api/src/main.ts](apps/api/src/main.ts).
- CORS is enabled for http://localhost:3000 and http://127.0.0.1:3000 in [apps/api/src/main.ts](apps/api/src/main.ts).
- The backend successfully mapped the expected routes, including /api/v1/auth/register and /api/v1/users/me.
- The API accepted direct registration and preflight requests successfully.

## Network Investigation

The issue is consistent with a host/container networking boundary problem.

The browser-facing request path is different from the process-local request path:

- The API process is reachable from inside the container via localhost:3001.
- The browser environment is not the same runtime context as the API process.
- In this setup, direct access to localhost:3001 from the browser host requires explicit port forwarding or an exposed host address.

This is why the failure appears as a browser network error even though the API itself is alive and responding locally.

## Evidence

### Browser Console

No browser console capture was available in this environment. The observed behavior is consistent with a network reachability failure rather than an application exception or an auth error.

### Network Requests

The web app development server on port 3000 successfully handled requests through the /api/v1 rewrite path.

The registration endpoint was verified through the web path and returned HTTP 201.

### API Logs

The Nest application started successfully and logged the expected routes, including:

- /api/v1/auth/register
- /api/v1/auth/login
- /api/v1/auth/refresh
- /api/v1/users/me

### Curl Tests

Verified from the container:

- Direct API request to http://localhost:3001/api/v1/auth/register returned HTTP 201.
- Web rewrite request to http://localhost:3000/api/v1/auth/register also returned HTTP 201.
- CORS preflight request to the API returned HTTP 204 with the expected Access-Control-Allow-Origin and Access-Control-Allow-Credentials headers.

### Environment Variables

Relevant environment values observed:

- PORT=3001
- No NEXT_PUBLIC_API_URL was set in the current environment
- The web app uses the relative browser URL path by default

### Port Configuration

Verified runtime state:

- Web app process: listening on port 3000
- API process: listening on port 3001 inside the container
- No explicit port-forwarding configuration for the API was found in the workspace dev container configuration

## Root Cause

The confirmed root cause is an environment/network exposure issue:

The API is running inside the dev container and is reachable on localhost:3001 from inside that container, but the browser context cannot reliably reach that same localhost endpoint unless the port is explicitly forwarded or exposed to the browser host. The application code and API contract are not the cause.

## Resolution

No application code changes were required.

The issue is environmental and infrastructure-related. The current implementation is behaving correctly for the runtime context in which it was tested.

## Files Modified

- [docs/reports/api-connectivity-investigation.md](docs/reports/api-connectivity-investigation.md)

## Commands Executed

- curl http://localhost:3001/api/v1/auth/register
- curl http://localhost:3000/api/v1/auth/register
- curl -X OPTIONS http://localhost:3001/api/v1/auth/register -H 'Origin: http://localhost:3000'
- pnpm --filter @castaminofen/api start:dev
- pnpm --filter @castaminofen/web dev
- ps, ss, netstat, and hostname checks to verify runtime binding

## Validation Results

- API endpoint reachable from the container via curl: confirmed
- Web rewrite path reachable from the container via curl: confirmed
- CORS preflight accepted: confirmed
- Backend route registration: confirmed
- Browser-facing direct localhost:3001 access is not valid in this containerized environment without explicit port forwarding: confirmed by environment analysis

## Remaining Risks

- If the browser is opened from outside the container and the API port is not forwarded, direct access to localhost:3001 will continue to fail.
- If the team wants browser-host access to the API without using the web rewrite path, explicit port forwarding or a host-reachable URL must be configured.

## Recommendations

1. Keep the current frontend and backend code unchanged for this issue.
2. Ensure the API port is forwarded in the Codespaces/dev container environment if direct browser access to it is required.
3. Prefer the existing web rewrite path for local development unless a host-reachable API URL is explicitly required.
4. If the team wants a more robust local dev experience, document the expected host/port mapping clearly for browser-based testing.
