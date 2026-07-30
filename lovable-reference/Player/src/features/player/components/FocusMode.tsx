import { Minimize2, X } from "lucide-react";
import { ARTWORK, formatTime, track } from "../data";
import { usePlayer } from "../player-store";
import { Waveform } from "./Waveform";

export function FocusMode() {
  const { focusMode, setFocusMode, position, playing, toggle, currentChapter } = usePlayer();
  if (!focusMode) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center stage-bg px-6 text-center">
      <button
        onClick={() => setFocusMode(false)}
        aria-label="Leave focus mode"
        className="glass-chip absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full"
      >
        <Minimize2 className="h-4 w-4" />
      </button>

      <div className="relative">
        <div className="ember-bg absolute inset-0 rounded-full opacity-40 blur-3xl animate-breathe" aria-hidden />
        <img
          src={ARTWORK}
          alt=""
          width={1024}
          height={1024}
          loading="lazy"
          className="relative h-56 w-56 rounded-full object-cover sm:h-72 sm:w-72"
        />
      </div>

      <p className="mt-10 text-xs uppercase tracking-[0.35em] text-muted-foreground">
        Chapter {currentChapter.index} · {currentChapter.title}
      </p>
      <h2 className="mt-3 max-w-lg text-balance text-2xl font-semibold sm:text-3xl">{track.title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{track.creator.name}</p>

      <div className="mt-10 w-full max-w-md">
        <Waveform height={40} count={64} />
        <p className="mt-3 text-xs tabular-nums text-muted-foreground">
          {formatTime(position)} / {formatTime(track.duration)}
        </p>
      </div>

      <button
        onClick={toggle}
        className="mt-8 rounded-full border border-border px-8 py-3 text-sm font-medium transition-colors hover:border-primary/60"
      >
        {playing ? "Pause" : "Play"}
      </button>
      <p className="mt-6 max-w-xs text-xs text-muted-foreground">
        Focus mode hides comments, queue and community until you come back.
      </p>
    </div>
  );
}

export function ModalPlayerHint() {
  return (
    <span className="glass-chip inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] text-muted-foreground">
      <X className="h-3 w-3" /> Swipe down to switch to mini player
    </span>
  );
}
