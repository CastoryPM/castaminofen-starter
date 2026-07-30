import { MoreHorizontal, Play, Heart, Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LibraryItem } from "@/lib/library-data";
import { ProgressLine, TypeBadge } from "./primitives";
import { useMediaDetails } from "./MediaDetailsDrawer";

/* ---------- Generic saved media card (podcast / video / audiobook / short) ---------- */
export function LibraryMediaCard({ item, className }: { item: LibraryItem; className?: string }) {
  const { openDetails } = useMediaDetails();
  const open = () => openDetails({ ...item });
  return (
    <article className={cn("group w-[164px] sm:w-[192px]", className)}>
      <div
        role="button"
        tabIndex={0}
        onClick={open}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), open())}
        aria-label={`Open details for ${item.title}`}
        className="relative block w-full cursor-pointer overflow-hidden rounded-2xl surface-panel text-left lift"
      >
        <img
          src={item.artwork}
          alt=""
          loading="lazy"
          className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute bottom-2.5 right-2.5 grid size-10 translate-y-2 place-items-center rounded-full ember-fill opacity-0 shadow-[var(--shadow-lift)] transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Play className="size-4 fill-current" />
        </span>
      </div>
      <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2">
        <div className="min-w-0">
          <button onClick={open} className="block max-w-full truncate text-left text-sm font-medium hover:underline">
            {item.title}
          </button>
          <p className="truncate text-xs text-muted-foreground">{item.creator}</p>
        </div>
        <button
          aria-label="More options"
          onClick={open}
          className="shrink-0 rounded-full p-1 text-muted-foreground hover:bg-elevated hover:text-foreground"
        >
          <MoreHorizontal className="size-4" />
        </button>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <TypeBadge type={item.type} />
        <span className="truncate text-[11px] text-muted-foreground">{item.savedAt ?? item.duration}</span>
      </div>
    </article>
  );
}

/* ---------- Podcast show ---------- */
export function PodcastCard({
  show,
}: {
  show: { title: string; creator: string; artwork: string; latest: string };
}) {
  const { openDetails } = useMediaDetails();
  return (
    <article className="group w-[214px]">
      <button
        onClick={() =>
          openDetails({
            title: show.title,
            creator: show.creator,
            artwork: show.artwork,
            type: "podcast",
            meta: show.latest,
            description: `You follow ${show.title}. Latest release: ${show.latest}`,
          })
        }
        className="block w-full overflow-hidden rounded-2xl surface-panel text-left lift"
        aria-label={`Open details for ${show.title}`}
      >
        <img src={show.artwork} alt="" loading="lazy" className="aspect-square w-full object-cover" />
      </button>
      <h3 className="mt-3 truncate text-sm font-medium">{show.title}</h3>
      <p className="truncate text-xs text-muted-foreground">{show.creator}</p>
      <p className="mt-1.5 line-clamp-2 text-xs text-muted-foreground/80">{show.latest}</p>
    </article>
  );
}

/* ---------- Audiobook ---------- */
export function AudiobookCard({
  book,
}: {
  book: { title: string; author: string; artwork: string; status: string };
}) {
  const { openDetails } = useMediaDetails();
  const finished = book.status === "Finished";
  const parsed = Number.parseInt(book.status, 10);
  const progress = finished ? 100 : Number.isNaN(parsed) ? 0 : parsed;
  return (
    <article className="group">
      <button
        onClick={() =>
          openDetails({
            title: book.title,
            creator: book.author,
            artwork: book.artwork,
            type: "audiobook",
            progress,
            portrait: true,
            meta: book.status,
          })
        }
        aria-label={`Open details for ${book.title}`}
        className="relative block w-full overflow-hidden rounded-r-xl rounded-l-sm shadow-[var(--shadow-book)] transition-transform duration-500 group-hover:-translate-y-1"
      >
        <img src={book.artwork} alt="" loading="lazy" className="aspect-[3/4] w-full object-cover" />
        <span className="absolute inset-y-0 left-0 w-2 bg-foreground/15" />
      </button>
      <h3 className="mt-3 truncate text-sm font-medium">{book.title}</h3>
      <p className="truncate text-xs text-muted-foreground">{book.author}</p>
      <p className={cn("mt-1 inline-flex items-center gap-1 text-[11px]", finished ? "text-accent" : "text-muted-foreground")}>
        {finished ? <Check className="size-3" /> : null}
        {book.status}
      </p>
    </article>
  );
}

/* ---------- Video ---------- */
export function VideoCard({ item }: { item: LibraryItem }) {
  const { openDetails } = useMediaDetails();
  return (
    <article className="group w-[280px] sm:w-[320px]">
      <button
        onClick={() => openDetails({ ...item })}
        aria-label={`Open details for ${item.title}`}
        className="relative block w-full overflow-hidden rounded-2xl surface-panel text-left lift"
      >
        <img src={item.artwork} alt="" loading="lazy" className="aspect-video w-full object-cover" />
        <span className="absolute bottom-2 right-2 rounded-md bg-background/80 px-1.5 py-0.5 text-[11px] tabular-nums backdrop-blur">
          {item.duration}
        </span>
        {item.progress ? (
          <span className="absolute inset-x-0 bottom-0 block">
            <ProgressLine value={item.progress} className="h-[3px] rounded-none bg-foreground/20" />
          </span>
        ) : null}
      </button>
      <h3 className="mt-3 truncate text-sm font-medium">{item.title}</h3>
      <p className="truncate text-xs text-muted-foreground">{item.creator}</p>
    </article>
  );
}

/* ---------- Creator ---------- */
export function CreatorCard({
  creator,
}: {
  creator: { name: string; artwork: string; latest: string; following: boolean };
}) {
  return (
    <article className="flex w-[168px] flex-col items-center rounded-2xl surface-panel px-4 py-5 text-center lift">
      <img src={creator.artwork} alt="" loading="lazy" className="size-16 rounded-full object-cover" />
      <h3 className="mt-3 line-clamp-1 text-sm font-medium">{creator.name}</h3>
      <p className="mt-1 line-clamp-2 text-[11px] text-muted-foreground">{creator.latest}</p>
      <button
        className={cn(
          "mt-3 inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
          creator.following
            ? "border border-border text-muted-foreground hover:text-foreground"
            : "ember-fill",
        )}
      >
        {creator.following ? <Check className="size-3" /> : <Plus className="size-3" />}
        {creator.following ? "Following" : "Follow"}
      </button>
    </article>
  );
}

/* ---------- Collection / playlist ---------- */
export function CollectionCard({
  collection,
}: {
  collection: { name: string; count: number; artwork: string };
}) {
  return (
    <article className="group relative w-[228px] overflow-hidden rounded-2xl surface-panel lift">
      <img src={collection.artwork} alt="" loading="lazy" className="aspect-[5/3] w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <h3 className="truncate font-display text-base font-semibold">{collection.name}</h3>
        <p className="text-xs text-muted-foreground">{collection.count} items</p>
      </div>
    </article>
  );
}

export function FavoriteTile({ item }: { item: LibraryItem }) {
  const { openDetails } = useMediaDetails();
  return (
    <button
      onClick={() => openDetails({ ...item })}
      aria-label={`Open details for ${item.title}`}
      className="group relative block overflow-hidden rounded-xl"
    >
      <img src={item.artwork} alt="" loading="lazy" className="aspect-square w-full object-cover" />
      <Heart className="absolute bottom-2 right-2 size-4 fill-primary text-primary opacity-0 transition-opacity group-hover:opacity-100" />
    </button>
  );
}
