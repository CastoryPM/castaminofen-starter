import { useRef, useState } from "react";
import { chapters, formatTime, track } from "../data";
import { usePlayer } from "../player-store";

export function ProgressTimeline() {
  const { position, progress, seek, threads, savedMoments, setPanel, setActiveCommentId } = usePlayer();
  const barRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);

  const pct = (t: number) => `${(t / track.duration) * 100}%`;

  const handle = (clientX: number) => {
    const rect = barRef.current?.getBoundingClientRect();
    if (!rect) return;
    seek(((clientX - rect.left) / rect.width) * track.duration);
  };

  return (
    <div className="w-full">
      <div
        ref={barRef}
        className="group relative h-10 cursor-pointer select-none"
        onClick={(e) => handle(e.clientX)}
        onMouseMove={(e) => {
          const rect = barRef.current?.getBoundingClientRect();
          if (rect) setHover(((e.clientX - rect.left) / rect.width) * track.duration);
        }}
        onMouseLeave={() => setHover(null)}
        role="slider"
        tabIndex={0}
        aria-label="Playback position"
        aria-valuemin={0}
        aria-valuemax={track.duration}
        aria-valuenow={Math.floor(position)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") seek(position + 15);
          if (e.key === "ArrowLeft") seek(position - 15);
        }}
      >
        <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 overflow-hidden rounded-full bg-muted-foreground/20">
          <div className="ember-bg h-full rounded-full transition-[width] duration-150" style={{ width: pct(position) }} />
        </div>

        {chapters.slice(1).map((c) => (
          <span
            key={c.id}
            className="absolute top-1/2 h-3 w-px -translate-y-1/2 bg-background/70"
            style={{ left: pct(c.start) }}
            aria-hidden
          />
        ))}

        {savedMoments.map((m) => (
          <button
            key={m.id}
            className="absolute top-1/2 grid h-3 w-3 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-signal ring-2 ring-background transition-transform hover:scale-150"
            style={{ left: pct(m.at) }}
            title={`${m.label} · ${formatTime(m.at)}`}
            aria-label={`Saved moment: ${m.label}`}
            onClick={(e) => {
              e.stopPropagation();
              seek(m.at);
              setPanel("moments");
            }}
          />
        ))}

        {threads.map((c) => (
          <button
            key={c.id}
            className="absolute bottom-0 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-background bg-primary text-[9px] font-bold text-primary-foreground transition-transform hover:scale-125"
            style={{ left: pct(c.at) }}
            aria-label={`Comment by ${c.author} at ${formatTime(c.at)}`}
            title={`${c.author} · ${formatTime(c.at)}`}
            onClick={(e) => {
              e.stopPropagation();
              setActiveCommentId(c.id);
              setPanel("comments");
              seek(c.at);
            }}
          >
            {c.initials[0]}
          </button>
        ))}

        {hover !== null && (
          <span
            className="glass-chip pointer-events-none absolute -top-1 -translate-x-1/2 rounded-md px-2 py-0.5 text-[11px] tabular-nums"
            style={{ left: pct(hover) }}
          >
            {formatTime(hover)}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between text-xs tabular-nums text-muted-foreground">
        <span>{formatTime(position)}</span>
        <span className="hidden truncate px-2 text-[11px] uppercase tracking-widest sm:block">
          {chapters.filter((c) => position >= c.start).slice(-1)[0]?.title}
        </span>
        <span>-{formatTime(track.duration - position)}</span>
      </div>
    </div>
  );
}
