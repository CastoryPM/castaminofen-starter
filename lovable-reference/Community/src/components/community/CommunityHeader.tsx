import { GhostButton, PrimaryButton } from "./Primitives";

export function CommunityHeader({
  onCreate,
  query,
  onQuery,
}: {
  onCreate: () => void;
  query: string;
  onQuery: (value: string) => void;
}) {
  return (
    <header className="relative overflow-hidden rounded-3xl border border-border bg-surface p-6 sm:p-10">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-cinematic)" }}
        aria-hidden
      />
      <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-insight/15 blur-3xl" aria-hidden />

      <div className="relative">
        <p className="label-eyebrow">Castaminofen · Community</p>
        <h1 className="text-display mt-4 max-w-2xl text-4xl sm:text-6xl">
          Explore ideas, conversations, and perspectives.
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Where content becomes conversation, conversation becomes knowledge, and knowledge builds
          the people around it.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <div className="relative min-w-0">
            <span
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            >
              ⌕
            </span>
            <input
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              placeholder="Search discussions, topics, people, insights…"
              aria-label="Search the community"
              className="focus-ring w-full rounded-full border border-border bg-background/60 py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/70"
            />
          </div>
          <PrimaryButton onClick={onCreate} className="w-full sm:w-auto">
            + Create discussion
          </PrimaryButton>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            { label: "Your discussions", value: "14", note: "3 still open" },
            { label: "People you helped", value: "50", note: "this month" },
            { label: "Insights saved by others", value: "312", note: "from your notes" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card/60 px-4 py-3">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="text-display mt-1 text-2xl text-foreground">{s.value}</p>
              <p className="text-[11px] text-muted-foreground">{s.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <GhostButton active>For you</GhostButton>
          <GhostButton>Following</GhostButton>
          <GhostButton>Spaces</GhostButton>
          <GhostButton>Knowledge</GhostButton>
          <GhostButton>Events</GhostButton>
        </div>
      </div>
    </header>
  );
}
