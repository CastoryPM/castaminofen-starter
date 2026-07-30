import { createContext, useContext, useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { chapters, comments, moments, queue, track } from "./data";
import type { Moment, PlayerMode, QueueItem, TimestampComment } from "./data";

export type PanelKey =
  | "comments"
  | "discussion"
  | "chapters"
  | "transcript"
  | "queue"
  | "moments"
  | "learning"
  | "about";

export type PlayerStatus = "loading" | "ready" | "error";

type PlayerState = ReturnType<typeof usePlayerEngine>;

const PlayerContext = createContext<PlayerState | null>(null);

function usePlayerEngine() {
  const [status, setStatus] = useState<PlayerStatus>("loading");
  const [mode, setMode] = useState<PlayerMode>("audio");
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(1330);
  const [speed, setSpeed] = useState(1);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [panel, setPanel] = useState<PanelKey>("comments");
  const [focusMode, setFocusMode] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [sleepTimer, setSleepTimer] = useState<number | null>(null);
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(true);
  const [following, setFollowing] = useState(false);
  const [savedMoments, setSavedMoments] = useState<Moment[]>(moments);
  const [threads, setThreads] = useState<TimestampComment[]>(comments);
  const [items, setItems] = useState<QueueItem[]>(queue);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setStatus("ready"), 900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!playing || status !== "ready") return;
    let last = performance.now();
    const tick = (now: number) => {
      const delta = ((now - last) / 1000) * speed;
      last = now;
      setPosition((p) => Math.min(track.duration, p + delta));
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [playing, speed, status]);

  const seek = useCallback((to: number) => {
    setPosition(Math.min(track.duration, Math.max(0, to)));
  }, []);

  const nudge = useCallback((by: number) => setPosition((p) => Math.min(track.duration, Math.max(0, p + by))), []);

  const currentChapter = useMemo(() => {
    return [...chapters].reverse().find((c) => position >= c.start) ?? chapters[0];
  }, [position]);

  const addMoment = useCallback(
    (kind: Moment["kind"], label: string, note?: string) => {
      setSavedMoments((prev) => [
        ...prev,
        {
          id: `${kind}-${Date.now()}`,
          at: Math.floor(position),
          label,
          note,
          kind,
          category: kind === "highlight" ? "Craft" : "Personal",
        },
      ]);
    },
    [position],
  );

  const addComment = useCallback(
    (body: string) => {
      setThreads((prev) => [
        {
          id: `c-${Date.now()}`,
          author: "You",
          initials: "YO",
          at: Math.floor(position),
          body,
          reactions: 0,
          replies: [],
        },
        ...prev,
      ]);
    },
    [position],
  );

  const removeQueueItem = useCallback((id: string) => setItems((p) => p.filter((i) => i.id !== id)), []);
  const moveQueueItem = useCallback((id: string, dir: -1 | 1) => {
    setItems((p) => {
      const i = p.findIndex((x) => x.id === id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= p.length) return p;
      const next = [...p];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }, []);

  return {
    status,
    setStatus,
    mode,
    setMode,
    playing,
    setPlaying,
    toggle: () => setPlaying((p) => !p),
    position,
    seek,
    nudge,
    speed,
    setSpeed,
    volume,
    setVolume,
    muted,
    setMuted,
    panel,
    setPanel,
    focusMode,
    setFocusMode,
    minimized,
    setMinimized,
    sleepTimer,
    setSleepTimer,
    activeCommentId,
    setActiveCommentId,
    liked,
    setLiked,
    saved,
    setSaved,
    following,
    setFollowing,
    savedMoments,
    addMoment,
    threads,
    addComment,
    items,
    removeQueueItem,
    moveQueueItem,
    currentChapter,
    progress: position / track.duration,
  };
}

export function PlayerProvider({ children }: { children: ReactNode }) {
  const value = usePlayerEngine();
  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used inside PlayerProvider");
  return ctx;
}
