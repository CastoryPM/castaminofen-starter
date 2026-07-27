# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog, and this project adheres to a documentation-first release workflow for the MVP phase.

## [v1.0.0-mvp] - 2026-07-26

### Added
- Added regression coverage for the Podcast details read contract, ensuring public responses include podcast and episode domain fields while hiding RSS operational metadata

### RSS Phase
- Added: Podcast details API regression coverage for Phase RSS.8.3
- Preserved: RSS operational fields remain hidden from public podcast details responses


### Added
- Initial MVP release documentation package
- Release notes for the first public MVP milestone
- GitHub release summary for release publishing
- Updated project status and repository README for release readiness

### Changed
- Refreshed repository README to better reflect the current MVP scope and setup flow
- Updated project-status documentation to describe the post-Phase 4.4 release state

### Fixed
- Documentation consistency issues related to release packaging and repository metadata

### Architecture
- Preserved the existing feature-oriented architecture and runtime ownership model
- Kept documentation aligned with the current implementation boundaries

### Validation
- Verified repository documentation against the current MVP implementation scope
- Confirmed release documentation references the validated architecture and feature set

### Build Status
- Lint: passed
- Build: passed
- Web tests: passed (21 tests)

### RSS Phase
- Added: End-to-end RSS ingestion validation tests (Phase RSS.8)
 - Fixed: Podcast read APIs to hide RSS operational fields from public responses (RSS.8.1)
 - Fixed: Episode read APIs to hide RSS operational fields from public responses (RSS.8.2)

