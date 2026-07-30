import { useMemo } from "react";
import { usePlayer } from "../player-store";

/** Deterministic pseudo-random bar heights so SSR and client match. */
function bars(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const v = Math.abs(Math.sin(i * 12.9898) * 43758.5453);
    return 0.22 + (v - Math.floor(v)) * 0.78;
  });
}

export function Waveform({ height = 64, count = 96 }: { height?: number; count?: number }) {
  const heights = useMemo(() => bars(count), [count]);
  const { progress, playing, seek } = usePlayer();

  return (
    <div
      className="flex w-full cursor-pointer items-center gap-[2px] overflow-hidden"
      style={{ height }}
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        seek(((e.clientX - rect.left) / rect.width) * 3480);
      }}
      role="presentation"
      aria-hidden
    >
      {heights.map((h, i) => {
        const played = i / count <= progress;
        return (
          <span
            key={i}
            className={`flex-1 rounded-full transition-colors duration-300 ${
              played ? "ember-bg" : "bg-muted-foreground/25"
            } ${playing && Math.abs(i / count - progress) < 0.06 ? "animate-wave" : ""}`}
            style={{
              height: `${h * 100}%`,
              animationDelay: `${(i % 9) * 0.07}s`,
            }}
          />
        );
      })}
    </div>
  );
}
