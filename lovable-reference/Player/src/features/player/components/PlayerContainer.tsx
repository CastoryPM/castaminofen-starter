import {
  BookOpen,
  ChevronDown,
  Download,
  Headphones,
  Heart,
  ListMusic,
  MessageCircle,
  MoreHorizontal,
  Bookmark,
  Film,
  Share2,
  Sparkles,
  Users,
  Highlighter,
  Info,
  BookMarked,
} from "lucide-react";
import { formatTime, track } from "../data";
import type { PlayerMode } from "../data";
import { usePlayer } from "../player-store";
import type { PanelKey } from "../player-store";
import { MediaArea } from "./MediaArea";
import { PlaybackControls } from "./PlaybackControls";
import { ProgressTimeline } from "./ProgressTimeline";
import { DiscussionPanel, TimestampComments } from "./Community";
import { ChapterList, ContentContext, LearningMode, QueuePanel, SavedMoments, TranscriptPanel } from "./panels";
import { PlayerErrorState, PlayerLoadingState } from "./states";
import { BackgroundPlaybackPreview } from "./MiniPlayer";
import { ModalPlayerHint } from "./FocusMode";

const PANELS: { key: PanelKey; label: string; icon: typeof Heart }[] = [
  { key: "comments", label: "Moments", icon: MessageCircle },
  { key: "discussion", label: "Community", icon: Users },
  { key: "chapters", label: "Chapters", icon: BookOpen },
  { key: "transcript", label: "Transcript", icon: BookMarked },
  { key: "queue", label: "Queue", icon: ListMusic },
  { key: "moments", label: "Saved", icon: Highlighter },
  { key: "learning", label: "Learning", icon: Sparkles },
  { key: "about", label: "About", icon: Info },
];

const MODES: { key: PlayerMode; label: string; icon: typeof Heart }[] = [
  { key: "audio", label: "Audio", icon: Headphones },
  { key: "video", label: "Video", icon: Film },
  { key: "longform", label: "Long-form", icon: BookOpen },
];

function PanelBody({ which }: { which: PanelKey }) {
  switch (which) {
    case "comments":
      return <TimestampComments />;
    case "discussion":
      return <DiscussionPanel />;
    case "chapters":
      return <ChapterList />;
    case "transcript":
      return <TranscriptPanel />;
    case "queue":
      return <QueuePanel />;
    case "moments":
      return <SavedMoments />;
    case "learning":
      return <LearningMode />;
    default:
      return <ContentContext />;
  }
}

function PanelTabs() {
  const { panel, setPanel } = usePlayer();
  return (
    <div className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1">
      {PANELS.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          onClick={() => setPanel(key)}
          className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium transition-all ${
            panel === key
              ? "ember-bg text-primary-foreground shadow-[var(--shadow-ember)]"
              : "glass-chip text-muted-foreground hover:text-foreground"
          }`}
        >
          <Icon className="h-3.5 w-3.5" />
          {label}
        </button>
      ))}
    </div>
  );
}

function ActionRow() {
  const { liked, setLiked, saved, setSaved, addMoment, position } = usePlayer();
  const actions = [
    { label: liked ? "Liked" : "Like", icon: Heart, active: liked, onClick: () => setLiked(!liked) },
    { label: saved ? "Saved" : "Save", icon: Bookmark, active: saved, onClick: () => setSaved(!saved) },
    {
      label: "Bookmark moment",
      icon: Highlighter,
      active: false,
      onClick: () => addMoment("bookmark", `Bookmark at ${formatTime(position)}`),
    },
    { label: "Share", icon: Share2, active: false, onClick: () => {} },
    { label: "Download", icon: Download, active: false, onClick: () => {} },
  ];
  return (
    <div className="flex flex-wrap items-center gap-2">
      {actions.map(({ label, icon: Icon, active, onClick }) => (
        <button
          key={label}
          onClick={onClick}
          aria-pressed={active}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            active ? "bg-primary/15 text-primary" : "glass-chip text-muted-foreground hover:text-foreground"
          }`}
        >
          <Icon className={`h-3.5 w-3.5 ${active ? "fill-current" : ""}`} />
          {label}
        </button>
      ))}
    </div>
  );
}

function TopBar() {
  const { setMinimized, mode, setMode } = usePlayer();
  return (
    <header className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
      <button
        onClick={() => setMinimized(true)}
        aria-label="Minimize player"
        className="glass-chip grid h-10 w-10 shrink-0 place-items-center rounded-full"
      >
        <ChevronDown className="h-4 w-4" />
      </button>
      <div className="min-w-0 text-center">
        <p className="truncate text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
          Playing from {track.series}
        </p>
        <p className="truncate text-xs font-medium">{track.episode}</p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <div className="glass-chip hidden gap-1 rounded-full p-1 sm:flex">
          {MODES.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setMode(key)}
              title={label}
              aria-label={`${label} mode`}
              className={`grid h-7 w-7 place-items-center rounded-full transition-colors ${
                mode === key ? "ember-bg text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
            </button>
          ))}
        </div>
        <button aria-label="More options" className="glass-chip grid h-10 w-10 place-items-center rounded-full">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}

function ContentInfo() {
  const { currentChapter, following, setFollowing } = usePlayer();
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
          {track.category} · Chapter {currentChapter.index}
        </p>
        <h1 className="mt-1.5 text-balance text-2xl font-semibold leading-tight sm:text-3xl">{track.title}</h1>
        <p className="mt-1 truncate text-sm text-muted-foreground">
          {track.creator.name} · {track.series}
        </p>
      </div>
      <button
        onClick={() => setFollowing(!following)}
        className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
          following ? "glass-chip text-foreground" : "ember-bg text-primary-foreground"
        }`}
      >
        {following ? "Following" : "Follow"}
      </button>
    </div>
  );
}

export function PlayerContainer() {
  const { status, setStatus, panel } = usePlayer();

  return (
    <div className="relative min-h-screen stage-bg pb-40 md:pb-16">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-40 animate-drift"
        style={{ backgroundImage: "var(--gradient-stage)" }}
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-4 pt-5 sm:px-6 lg:px-8">
        <TopBar />

        {status === "loading" ? (
          <div className="mt-8">
            <PlayerLoadingState />
          </div>
        ) : status === "error" ? (
          <div className="mt-8">
            <PlayerErrorState onRetry={() => setStatus("ready")} />
          </div>
        ) : (
          <div className="mt-6 grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)_360px] xl:grid-cols-[340px_minmax(0,1fr)_400px]">
            {/* Left — content context (desktop) */}
            <aside className="panel order-2 hidden min-w-0 max-h-[calc(100vh-140px)] overflow-y-auto p-5 lg:order-1 lg:block">
              <ContentContext />
            </aside>

            {/* Center — media stage */}
            <main className="order-1 min-w-0 space-y-6 lg:order-2">
              <MediaArea />
              <ContentInfo />
              <ProgressTimeline />
              <PlaybackControls />
              <ActionRow />
              <div className="hidden justify-center lg:flex">
                <ModalPlayerHint />
              </div>
              <section className="panel p-5 lg:hidden">
                <PanelTabs />
                <div className="mt-4 max-h-[440px] overflow-y-auto">
                  <PanelBody which={panel} />
                </div>
              </section>
              <section className="space-y-3 lg:hidden">
                <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Background playback
                </h2>
                <BackgroundPlaybackPreview />
              </section>
              <section className="panel p-5 lg:hidden">
                <ContentContext />
              </section>
            </main>

            {/* Right — community / queue / related */}
            <aside className="panel order-3 hidden min-w-0 max-h-[calc(100vh-140px)] flex-col p-5 lg:flex">
              <PanelTabs />
              <div className="mt-4 min-h-0 flex-1 overflow-y-auto">
                <PanelBody which={panel} />
              </div>
            </aside>
          </div>
        )}

        <section className="mt-10 hidden space-y-4 lg:block">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Background & lock-screen states
          </h2>
          <BackgroundPlaybackPreview />
          <div className="flex flex-wrap gap-2 pt-2">
            <button
              onClick={() => setStatus(status === "error" ? "ready" : "error")}
              className="glass-chip rounded-full px-4 py-2 text-xs font-medium"
            >
              Preview error state
            </button>
            <button
              onClick={() => {
                setStatus("loading");
                setTimeout(() => setStatus("ready"), 1200);
              }}
              className="glass-chip rounded-full px-4 py-2 text-xs font-medium"
            >
              Preview loading state
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
