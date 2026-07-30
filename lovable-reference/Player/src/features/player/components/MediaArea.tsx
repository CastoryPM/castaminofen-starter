import { Maximize2, Radio, Settings2, Sparkles } from "lucide-react";
import { ARTWORK, track } from "../data";
import { usePlayer } from "../player-store";
import { Waveform } from "./Waveform";

function AudioArtwork() {
  const { playing } = usePlayer();
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[min(70vh,520px)]">
      <div
        className={`ember-bg absolute inset-6 rounded-full blur-3xl ${playing ? "animate-breathe" : "opacity-40"}`}
        aria-hidden
      />
      <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-border shadow-[var(--shadow-stage)]">
        <img
          src={ARTWORK}
          alt={`Cover art for ${track.title} by ${track.creator.name}`}
          width={1024}
          height={1024}
          className={`h-full w-full object-cover transition-transform duration-[1200ms] ${
            playing ? "scale-105" : "scale-100"
          }`}
        />
        <div className="absolute inset-0 bg-[var(--gradient-veil)]" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <Waveform height={54} count={72} />
        </div>
      </div>
      {playing && (
        <span className="glass-chip absolute left-4 top-4 flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium">
          <Radio className="h-3.5 w-3.5 text-primary" />
          Now playing
        </span>
      )}
    </div>
  );
}

function VideoStage() {
  const { progress, playing } = usePlayer();
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[1.5rem] border border-border bg-surface-sunken shadow-[var(--shadow-stage)]">
      <img
        src={ARTWORK}
        alt={`Video still from ${track.title}`}
        width={1024}
        height={1024}
        className="h-full w-full object-cover opacity-90"
      />
      <div className="absolute inset-0 bg-[var(--gradient-veil)]" aria-hidden />
      <div className="absolute left-4 top-4 flex gap-2">
        <span className="glass-chip rounded-full px-3 py-1 text-xs font-medium">1440p</span>
        <span className="glass-chip rounded-full px-3 py-1 text-xs font-medium">HDR</span>
      </div>
      <div className="absolute right-4 top-4 flex gap-2">
        <button className="glass-chip grid h-9 w-9 place-items-center rounded-full" aria-label="Quality settings">
          <Settings2 className="h-4 w-4" />
        </button>
        <button className="glass-chip grid h-9 w-9 place-items-center rounded-full" aria-label="Fullscreen">
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-muted-foreground/25">
        <div className="ember-bg h-full" style={{ width: `${progress * 100}%` }} />
      </div>
      {!playing && (
        <div className="absolute inset-0 grid place-items-center">
          <span className="glass-chip rounded-full px-4 py-2 text-sm">Paused</span>
        </div>
      )}
    </div>
  );
}

function LongformStage() {
  const { currentChapter, playing } = usePlayer();
  return (
    <div className="relative overflow-hidden rounded-[1.5rem] border border-border stage-bg p-8 shadow-[var(--shadow-stage)]">
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <img
          src={ARTWORK}
          alt={`Cover of ${track.title}`}
          width={1024}
          height={1024}
          loading="lazy"
          className="h-40 w-28 shrink-0 rounded-lg object-cover shadow-[var(--shadow-ember)]"
        />
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Long-form mode
          </p>
          <h3 className="mt-2 text-2xl font-semibold">
            Chapter {currentChapter.index} · {currentChapter.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{currentChapter.description}</p>
          <p className="mt-4 max-w-prose text-[15px] leading-relaxed text-foreground/80">
            “We treat attention as a metric. It is closer to a material — and materials have a grain.”
          </p>
        </div>
      </div>
      <div className="mt-6">
        <Waveform height={40} count={110} />
      </div>
      {playing && <div className="ember-bg absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-25 blur-3xl" />}
    </div>
  );
}

export function MediaArea() {
  const { mode } = usePlayer();
  if (mode === "video") return <VideoStage />;
  if (mode === "longform") return <LongformStage />;
  return <AudioArtwork />;
}
