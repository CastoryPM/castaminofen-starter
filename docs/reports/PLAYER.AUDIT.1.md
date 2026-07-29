# PLAYER.AUDIT.1 Report

## Executive Summary

The current Player implementation is a feature-owned runtime anchored in `apps/web/src/features/player/` and exposed globally through the app shell. Playback lifecycle, queue state, current item, seek, volume, repeat/shuffle, and media integration are handled inside the Player feature. The Player UI is rendered in `AppShell` and consumes a single global Zustand store plus a singleton runtime controller.

The system is broadly MVP-ready for local playback, but the runtime persistence layer is incomplete: persistent restoration rebuilds the current item and playback position, but not the queue context or playback metadata like repeat/shuffle. The next phase should prioritize runtime stabilization rather than broad refactor.

## Current Architecture

### Ownership and Entry Points
- `AppShell` (`apps/web/src/components/layout/app-shell.tsx`) renders `PlayerBar` on every non-landing route.
- `PlayerBar` composes `PlayerInfo`, `PlayerControls`, `PlayerProgress`, `PlayerVolume` and controls queue visibility.
- Feature consumers call the Player runtime via `usePlayerRuntime()` from:
  - `apps/web/src/features/podcasts/PodcastDetails.tsx`
  - `apps/web/src/features/episodes/EpisodeCard.tsx`
  - `apps/web/src/features/episodes/components/EpisodeDetailView.tsx`
  - `apps/web/src/features/playlists/components/PlaylistDetailsPage.tsx`
  - search, library, and playlist feature components.

### Player Runtime Flow
1. User action triggers a runtime method: `loadItem`, `play`, `pause`, `next`, `previous`, `replaceQueue`, `clearQueue`, `setCurrentTime`, or `setVolume`.
2. `usePlayerRuntime()` returns a singleton controller from `apps/web/src/features/player/runtime/playerRuntime.ts`.
3. The controller manipulates:
   - `usePlayerStore` in `apps/web/src/features/player/store/playerStore.ts`
   - the browser audio engine created by `createBrowserAudioEngine()` in `apps/web/src/features/player/runtime/audioEngine.ts`
4. The browser audio engine subscribes to audio events and feeds playback snapshots back to the store.
5. UI components read global state via `usePlayerState()` and update visuals immediately.

### Data Flow
- User action → Runtime controller
- Runtime controller → Store + AudioEngine
- AudioEngine events → Store
- Store → UI

The actual flow is:

User Action
↓
Player UI Component
↓
`usePlayerRuntime()` runtime method
↓
`playerRuntime` updates `playerStore` and `AudioEngine`
↓
`AudioEngine` browser events synchronize back into `playerStore`
↓
`PlayerBar` and child components render updated playback state

## Ownership Analysis

### Correct Ownership
- Player owns playback lifecycle and media element control.
- Player owns play/pause state and playbackStatus.
- Player owns current media item across the app.
- Player owns queue state, next/previous behavior, repeat, and shuffle.
- Player owns the UI surface rendered in the app shell.
- Player owns persistence of playback snapshot to localStorage.

### Wrong or Weak Ownership
- `readSettingsPreferences()` is called directly inside `playerRuntime.ts`, creating a runtime dependency on Settings persistence. This is a cross-feature coupling risk but not a functional playback bug.
- Persistence only saves partial runtime state: `currentItem`, `playbackStatus`, `duration`, `currentPosition`, and `error`; it does not save `queue`, `currentIndex`, `repeatMode`, `shuffleEnabled`, or `volume`.
- There is no explicit `appendToQueue` or queue mutation API; queue ownership is effectively a replace-only contract.

### Potential Future Migration Areas
- Make runtime preferences injectable instead of reading `Settings` directly.
- Extend Player persistence to restore full queue context and playback metadata.
- Add a formal queue API for append/insert/remove instead of relying only on full `replaceQueue()`.

## Runtime Analysis

### Playback Behavior
- `playItem()` loads a playable source and enters `loading` state.
- Successful playback transitions to `playing`; failures set `paused` plus a descriptive error.
- `pause()` pauses the engine and sets playback state to `paused`.
- `stop()` pauses audio, resets position to 0, and sets playback state to `idle`.
- `setCurrentTime()` seeks the engine and syncs the store.
- `setVolume()` updates the engine and store volume.
- `loadItem()` handles missing `audioUrl` by setting `idle` with an error message.

### Player Lifecycle
- The Player runtime is a singleton created on first `usePlayerRuntime()` invocation.
- It survives SPA navigation because `AppShell` remains mounted across routes.
- It registers a browser `beforeunload` handler to destroy the controller on page unload.
- On hard refresh, runtime restores persisted snapshot only when Settings `resumePlayback` is enabled.
- After refresh, current item and playback position are restored, but queue context and playback metadata are not.

### Media Integration
- Uses native `window.Audio()` through `createBrowserAudioEngine()`.
- Subscribes to native events: `play`, `pause`, `ended`, `timeupdate`, `loadedmetadata`, `canplay` and `error`.
- Uses `audioElement.src`, `load()`, `play()`, `pause()`, `currentTime`, `volume`, and `duration`.
- Does not currently integrate with `MediaSession` or advanced browser media APIs.
- Error handling is centralized: native `error` event maps to `Unable to load audio playback.` and playback promise rejection maps to `Unable to start playback.`

### Ended / Auto-Advance Behavior
- The runtime auto-advances when the engine enters `idle` and the previous store state showed `isPlaying` while Settings `autoplay` is true.
- This is implemented inside the audio engine subscription and is currently the only auto-next mechanism.
- Behavior is present, but it depends on the pre-update store play state, which is a subtle runtime detail.

## State Analysis

### Global Player State
Stored in `apps/web/src/features/player/store/playerStore.ts`:
- `currentItem`
- `queue`
- `currentIndex`
- `isPlaying`
- `playbackStatus`
- `duration`
- `currentPosition`
- `error`
- `volume`
- `repeatMode`
- `shuffleEnabled`

### Who Updates State
- Runtime controller methods update playback state and queue state.
- `PlayerBar` components update local UI state only.
- Some components call `usePlayerState()` to read state for labels and playback status.

### Who Consumes State
- `PlayerBar`, `PlayerInfo`, `PlayerControls`, `PlayerProgress`, `PlayerVolume`
- Podcast, Episode, Library, Playlist consumers read state for current item and playback labels.

### Global vs Local State
- Global state: all playback/runtime state is feature-global via Zustand.
- Local UI state: queue panel visibility, progress preview, and seeking state.

### State Synchronization
- `AudioEngine.subscribe()` drives snapshot sync into the store.
- `syncState()` normalizes current time and duration before persisting.
- `setPlaybackState()` derives `isPlaying` from `playbackStatus`.

### Noted Issue
- Partial persistence means restored state may be inconsistent: `currentItem` may be present while `queue` remains empty and `currentIndex` stays at `-1`.
- This can cause mismatch between restored playback item and subsequent queue navigation.

## Queue Analysis

### Implementation Status
- Queue exists and is owned by `playerStore`.
- `replaceQueue()` replaces the full queue and sets a start index.
- `clearQueue()` resets playback and stops audio.
- `goToNext()` and `goToPrevious()` are implemented in the store.
- Repeat (`off`, `one`, `queue`) and shuffle are supported.
- Auto-advance is implemented during audio engine idle events.

### How Items Enter the Queue
- `loadItem(item)` sets the queue to `[item]` and starts playback.
- `replaceQueue(items, startIndex)` loads a full queue and plays the selected item.
- Playlist playback uses `replaceQueue()` to play plan-based queues.

### Next/Previous Behavior
- `goToNext()` handles repeat-one, shuffle, queue wrap, and normal next.
- `goToPrevious()` wraps only when repeat-mode is `queue` and at the start.
- Shuffle next selects a random non-current index without mutating queue order.

### Auto-Advance
- Implemented by checking `snapshot.playbackStatus === 'idle'` and `currentStore.isPlaying` plus Settings `autoplay`.
- The runtime moves to the next queue item automatically after playback ends.

### Supported / Partial / Missing
- Implemented: queue state, next/previous, repeat, shuffle, auto-advance.
- Partially implemented: queue persistence, queue append/reorder, shuffle history.
- Missing: append-to-queue API, queue reorder, full queue restoration on refresh.

### Hidden Assumptions
- Queue is treated as replaceable rather than extendable.
- Shuffle preserves queue order but not playback history.
- The runtime assumes queue metadata is available after restore, but persistence does not guarantee it.

## UI/UX Analysis

### Player UI
- `PlayerBar` is the main persistent player surface in the app shell.
- The UI surface includes compact info, controls, progress bar, volume slider, and an optional queue panel.

### Controls and States
- Primary controls are play/pause, previous, next, stop, shuffle, repeat.
- `PlayerProgress` supports seeking with preview while dragging.
- `PlayerVolume` supports live volume changes through the runtime.
- Loading state is surfaced with text and spinner overlay.
- Error state is surfaced in the bar and info component.

### Empty and Fallback States
- When no current item exists, the player prompts users to choose an episode.
- When the queue exists but playback has not started, the player indicates the queue is ready.
- The queue panel shows current and up-next items or a fallback empty message.

### Mobile Behavior
- Layout is responsive: volume is hidden on small screens and progress is shown below controls.
- Queue panel is toggled via a button rather than full-screen modal.

### Accessibility
- Buttons include `aria-label` and `aria-pressed` for toggle controls.
- The progress slider includes `aria-valuetext` and accessible labeling.
- The queue panel uses semantic buttons and a visible close control.

### UX Gaps
- The queue panel is a simple toggle panel rather than a fully accessible modal.
- There is no visible queue reorder or item removal beyond clearing the queue.
- Seek commit relies on pointer up and blur only; edge-case drag interactions may be missed.
- Current playback restoration can feel incomplete after refresh because queue context is not restored.

## Coupling Analysis

### Player ↔ Episode
- Coupling is low-to-medium.
- Episodes are consumers mapped to `PlayableItem` and do not contain playback logic.
- This is appropriate ownership separation.

### Player ↔ Library
- Coupling is low.
- Library components use Player runtime for resume and playback triggers.
- Player state is read for current item labels.

### Player ↔ Search
- Coupling is low.
- Search results invoke runtime playback directly.

### Player ↔ Playlist
- Coupling is low.
- Playlist playback is implemented through queue replacement only.

### Player ↔ Settings
- Coupling is medium.
- Player runtime reads `Settings` persistence directly for `autoplay`, `defaultVolume`, and `resumePlayback`.
- This is a notable cross-feature dependency.

### Player ↔ API
- Coupling is low.
- Player does not interact directly with backend APIs.

### Player ↔ Shared Components
- Coupling is low.
- Player UI uses generic shared Button/Card components, preserving feature isolation.

## MVP Readiness

### Implemented MVP Capabilities
- ✅ play
- ✅ pause
- ✅ seek
- ✅ current item
- ✅ basic queue behavior
- ✅ stable runtime behavior in-session

### Not Supported / Out of Scope
- ❌ offline playback
- ❌ advanced analytics
- ❌ recommendation engine
- ❌ cross-device sync
- ❌ DRM
- ❌ complex media framework

### Assessment
- The current Player supports MVP playback requirements in-session.
- The gap is runtime persistence: queue context is not fully restored across refreshes, so session continuity is partially incomplete.
- Overall, the Player is MVP-ready with a stabilization phase rather than a major rewrite.

## Over Engineering Review

- The Player runtime abstraction is lean and justified.
- `AudioEngine` is simple and testable; it is not premature.
- Player persistence is modest and purpose-specific.
- Queue state and repeat/shuffle logic are implemented without unnecessary generic layering.
- The major abstraction risk is low.
- The only mild concern is the direct dependency on Settings persistence and the absence of a richer queue API if future playback workflows require it.

## Technical Debt

### Critical Issues
- Incomplete persistence: restored playback snapshot does not restore queue or playback metadata such as repeat/shuffle and volume.

### Medium Issues
- Direct runtime dependency on `Settings` persistence service.
- Shuffle mode lacks a played-history backtrack; `previous` does not reflect shuffled play order.
- Queue is replace-only; no explicit add/append/reorder API exists.

### Low Priority
- Queue panel accessibility could be improved with better modal semantics.
- Progress seeking commit logic is basic and may miss drag edge cases.
- No advanced MediaSession/browser media integration is implemented.

## Recommended Next Step

- Continue with a focused runtime stabilization phase.
- Harden persistence and session restoration so queue context and playback metadata survive refresh.
- Preserve current ownership boundaries and do not introduce broader refactor or new abstractions at this stage.

## Files Reviewed

- apps/web/src/components/layout/app-shell.tsx
- apps/web/src/app/layout.tsx
- apps/web/src/features/player/store/playerStore.ts
- apps/web/src/features/player/runtime/playerRuntime.ts
- apps/web/src/features/player/runtime/audioEngine.ts
- apps/web/src/features/player/runtime/playerPersistence.ts
- apps/web/src/features/player/hooks/usePlayerRuntime.ts
- apps/web/src/features/player/hooks/usePlayerState.ts
- apps/web/src/features/player/components/PlayerBar.tsx
- apps/web/src/features/player/components/PlayerControls.tsx
- apps/web/src/features/player/components/PlayerInfo.tsx
- apps/web/src/features/player/components/PlayerProgress.tsx
- apps/web/src/features/player/components/PlayerVolume.tsx
- apps/web/src/features/player/utils/playerPresentation.ts
- apps/web/src/features/player/adapters/episodeToPlayable.ts
- apps/web/src/features/player/runtime/playerRuntime.test.ts
- apps/web/src/features/podcasts/PodcastDetails.tsx
- apps/web/src/features/episodes/EpisodeCard.tsx
- apps/web/src/features/episodes/components/EpisodeDetailView.tsx
- apps/web/src/features/playlists/components/PlaylistDetailsPage.tsx
- apps/web/src/features/settings/services/preferencesPersistence.ts

---

## Known Limitations

- The Player persistence layer restores only partial state.
- `queue` is not persisted, so refresh behavior is inconsistent with restored current item.
- Runtime settings are coupled directly to the Settings persistence feature.
