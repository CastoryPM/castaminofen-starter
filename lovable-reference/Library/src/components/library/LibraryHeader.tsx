import { Headphones, Bookmark, Layers, Flame } from "lucide-react";
import { libraryStats } from "@/lib/library-data";

function Stat({ icon: Icon, value, label }: { icon: typeof Flame; value: string; label: string }) {
  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <Icon className="size-4 shrink-0 text-primary" />
      <div className="min-w-0">
        <p className="truncate text-sm font-medium tabular-nums">{value}</p>
        <p className="truncate text-[11px] text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

export function LibraryHeader() {
  return (
    <header className="relative overflow-hidden pb-2 pt-10 sm:pt-14">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-32 size-[420px] rounded-full opacity-20 blur-3xl"
        style={{ backgroundImage: "var(--gradient-ember)" }}
      />
      <div className="relative">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
          Castaminofen
        </p>
        <h1 className="mt-3 font-display text-[2.4rem] leading-[1.05] font-semibold sm:text-6xl">
          Your Library,
          <br />
          <span className="ember-text">{libraryStats.name}</span>
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
          Everything you've saved, started and returned to — stories, knowledge and
          memories kept in one quiet place.
        </p>

        <div className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-6 sm:flex sm:flex-wrap sm:gap-x-10">
          <Stat icon={Bookmark} value={`${libraryStats.saved} items`} label="saved" />
          <Stat icon={Headphones} value={`${libraryStats.hoursThisWeek} hours`} label="listened this week" />
          <Stat icon={Layers} value={`${libraryStats.collections} collections`} label="curated by you" />
          <Stat icon={Flame} value={`${libraryStats.streakDays} days`} label="in a row" />
        </div>
      </div>
    </header>
  );
}
