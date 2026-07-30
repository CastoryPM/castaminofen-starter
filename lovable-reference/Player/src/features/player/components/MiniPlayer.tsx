import { BellRing, Lock, Pause, Play, X } from "lucide-react";
import { ARTWORK, formatTime, track } from "../data";
import { usePlayer } from "../player-store";

export function MiniPlayer() {
  const { minimized, setMinimized, playing, toggle, progress, position } = usePlayer();
  if (!minimized) return null;

  return (
    <div className="fixed inset-x-0 bottom-[68px] z-40 px-3 md:bottom-4 md:left-auto md:right-4 md:w-[380px] md:px-0">
      <div className="panel overflow-hidden">
        <div className="h-0.5 w-full bg-muted-foreground/20">
          <div className="ember-bg h-full" style={{ width: `${progress * 100}%` }} />
        </div>
        <div className="grid grid-cols-[auto_minmax(0,1fr)_auto_auto] items-center gap-3 p-2.5">
          <button onClick={() => setMinimized(false)} className="shrink-0" aria-label="Expand player">
            <img
              src={ARTWORK}
              alt=""
              width={1024}
              height={1024}
              loading="lazy"
              className="h-11 w-11 rounded-lg object-cover"
            />
          </button>
          <button onClick={() => setMinimized(false)} className="min-w-0 text-left">
            <p className="truncate text-sm font-medium">{track.title}</p>
            <p className="truncate text-xs tabular-nums text-muted-foreground">
              {track.creator.name} · {formatTime(position)}
            </p>
          </button>
          <button
            onClick={toggle}
            aria-label={playing ? "Pause" : "Play"}
            className="ember-bg grid h-9 w-9 shrink-0 place-items-center rounded-full text-primary-foreground"
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
          </button>
          <button
            onClick={() => setMinimized(false)}
            aria-label="Close mini player"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-surface-raised"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/** UI-only concept of background / lock-screen playback surfaces. */
export function BackgroundPlaybackPreview() {
  const { position } = usePlayer();
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="relative overflow-hidden rounded-2xl border border-border stage-bg p-5">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          <Lock className="h-3.5 w-3.5" /> Lock screen
        </p>
        <p className="mt-6 text-3xl font-semibold tabular-nums">9:41</p>
        <div className="mt-6 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
          <img
            src={ARTWORK}
            alt=""
            width={1024}
            height={1024}
            loading="lazy"
            className="h-12 w-12 rounded-lg object-cover"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{track.title}</p>
            <p className="truncate text-xs text-muted-foreground">{track.creator.name}</p>
          </div>
        </div>
        <div className="mt-4 h-1 rounded-full bg-muted-foreground/25">
          <div className="ember-bg h-full rounded-full" style={{ width: `${(position / 3480) * 100}%` }} />
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-surface/60 p-5">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          <BellRing className="h-3.5 w-3.5" /> Notification controls
        </p>
        <p className="mt-4 text-sm font-medium">Castaminofen · Playing in background</p>
        <p className="text-xs text-muted-foreground">Deep Signal · Episode 114</p>
        <div className="mt-4 flex gap-2">
          {["−15", "Play", "+30", "Bookmark"].map((l) => (
            <span key={l} className="glass-chip rounded-full px-3 py-1.5 text-xs">
              {l}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
