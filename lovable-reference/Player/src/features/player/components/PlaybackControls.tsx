import {
  Gauge,
  Maximize2,
  Moon,
  Pause,
  PictureInPicture2,
  Play,
  RotateCcw,
  RotateCw,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import { usePlayer } from "../player-store";

const SPEEDS = [0.75, 1, 1.25, 1.5, 1.75, 2];
const SLEEP = [15, 30, 45, 60];

function IconBtn({
  label,
  active,
  children,
  onClick,
}: {
  label: string;
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`grid h-10 w-10 place-items-center rounded-full border border-border transition-all duration-200 hover:border-primary/60 hover:bg-surface-raised ${
        active ? "bg-surface-raised text-primary" : "text-foreground/80"
      }`}
    >
      {children}
    </button>
  );
}

export function PlaybackControls() {
  const {
    playing,
    toggle,
    nudge,
    speed,
    setSpeed,
    volume,
    setVolume,
    muted,
    setMuted,
    sleepTimer,
    setSleepTimer,
    setMinimized,
    setFocusMode,
    focusMode,
  } = usePlayer();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center gap-2 sm:gap-4">
        <IconBtn label="Previous">
          <SkipBack className="h-4 w-4" />
        </IconBtn>
        <IconBtn label="Back 15 seconds" onClick={() => nudge(-15)}>
          <span className="relative grid place-items-center">
            <RotateCcw className="h-5 w-5" />
            <span className="absolute text-[8px] font-bold">15</span>
          </span>
        </IconBtn>

        <button
          onClick={toggle}
          aria-label={playing ? "Pause" : "Play"}
          className={`ember-bg grid h-16 w-16 place-items-center rounded-full text-primary-foreground shadow-[var(--shadow-ember)] transition-transform duration-200 hover:scale-105 active:scale-95 ${
            playing ? "animate-pulse-ring" : ""
          }`}
        >
          {playing ? <Pause className="h-6 w-6" /> : <Play className="ml-0.5 h-6 w-6" />}
        </button>

        <IconBtn label="Forward 30 seconds" onClick={() => nudge(30)}>
          <span className="relative grid place-items-center">
            <RotateCw className="h-5 w-5" />
            <span className="absolute text-[8px] font-bold">30</span>
          </span>
        </IconBtn>
        <IconBtn label="Next">
          <SkipForward className="h-4 w-4" />
        </IconBtn>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
        <div className="glass-chip flex items-center gap-1 rounded-full px-2 py-1">
          <Gauge className="mr-1 h-3.5 w-3.5 text-primary" />
          {SPEEDS.map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`rounded-full px-2 py-0.5 tabular-nums transition-colors ${
                speed === s ? "ember-bg text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}×
            </button>
          ))}
        </div>

        <div className="glass-chip flex items-center gap-2 rounded-full px-3 py-1.5">
          <button onClick={() => setMuted(!muted)} aria-label={muted ? "Unmute" : "Mute"}>
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4 text-primary" />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={muted ? 0 : volume}
            onChange={(e) => {
              setMuted(false);
              setVolume(Number(e.target.value));
            }}
            aria-label="Volume"
            className="h-1 w-20 cursor-pointer appearance-none rounded-full bg-muted-foreground/30 accent-primary"
          />
        </div>

        <div className="glass-chip flex items-center gap-1 rounded-full px-2 py-1">
          <Moon className="mr-1 h-3.5 w-3.5 text-signal" />
          {SLEEP.map((m) => (
            <button
              key={m}
              onClick={() => setSleepTimer(sleepTimer === m ? null : m)}
              className={`rounded-full px-2 py-0.5 tabular-nums transition-colors ${
                sleepTimer === m ? "bg-signal text-signal-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {m}m
            </button>
          ))}
        </div>

        <IconBtn label="Focus mode" active={focusMode} onClick={() => setFocusMode(!focusMode)}>
          <Maximize2 className="h-4 w-4" />
        </IconBtn>
        <IconBtn label="Mini player" onClick={() => setMinimized(true)}>
          <PictureInPicture2 className="h-4 w-4" />
        </IconBtn>
      </div>

      {sleepTimer && (
        <p className="text-center text-xs text-signal">
          Bedtime mode · playback stops in {sleepTimer} minutes, fading out over the last 60 seconds.
        </p>
      )}
    </div>
  );
}
