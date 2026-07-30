# Design System Primitives

## Overview

This layer hosts reusable Castaminofen UI primitives that are shared across features without introducing feature-specific business logic.

## Components

- PageContainer — page-level spacing wrapper used for top-level screens.
- SectionHeader — shared section title and actions pattern.
- MediaCard — generic surface for cards and summaries.
- EmptyState / LoadingState — standard page-state presentation.
- MobileHeader / BottomNavigation / DesktopNavigation — navigation primitives for mobile and desktop layouts.
- Avatar / UserBadge / CreatorBadge — identity and creator presentation.
- ContentArtwork / CreatorCard / MediaRow / MediaCarousel — media-centric composition primitives.
- Reaction / CommentPreview / DiscussionCard — social interaction surfaces.
- MiniPlayer / TimelineMarker / ProgressIndicator — player-oriented presentation primitives.
- Button / IconButton / Chip / Tag — common interaction and labeling primitives.

## Usage location

These primitives are intended for reuse in app shell, discovery, community, library, profile, playlists, and upcoming creator/admin experiences.
