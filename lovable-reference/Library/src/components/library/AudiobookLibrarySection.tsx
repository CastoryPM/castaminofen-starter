import { Play } from "lucide-react";
import { audiobookShelf, currentlyReading } from "@/lib/library-data";
import { AudiobookCard } from "./cards";
import { ProgressLine, Section, SectionHeader } from "./primitives";
import { useMediaDetails } from "./MediaDetailsDrawer";

export function AudiobookLibrarySection() {
  const { openDetails } = useMediaDetails();
  return (
    <Section>
      <SectionHeader eyebrow="My audiobooks" title="Currently reading" />
      <div className="grid gap-5 sm:grid-cols-2">
        {currentlyReading.map((book) => (
          <article key={book.id} className="flex gap-5 rounded-3xl surface-panel p-5">
            <button
              onClick={() =>
                openDetails({
                  title: book.title,
                  creator: `${book.author} · narrated by ${book.narrator}`,
                  artwork: book.artwork,
                  type: "audiobook",
                  progress: book.progress,
                  remaining: book.remaining,
                  meta: book.chapter,
                  portrait: true,
                })
              }
              aria-label={`Open details for ${book.title}`}
              className="relative w-24 shrink-0 overflow-hidden rounded-l-sm rounded-r-lg shadow-[var(--shadow-book)] sm:w-28"
            >
              <img src={book.artwork} alt="" loading="lazy" className="aspect-[3/4] w-full object-cover" />
              <span className="absolute inset-y-0 left-0 w-1.5 bg-foreground/15" />
            </button>
            <div className="flex min-w-0 flex-1 flex-col justify-between">
              <div className="min-w-0">
                <h3 className="line-clamp-2 font-display text-lg font-semibold leading-tight">{book.title}</h3>
                <p className="mt-1 truncate text-xs text-muted-foreground">{book.author}</p>
                <p className="truncate text-xs text-muted-foreground">Narrated by {book.narrator}</p>
              </div>

              <div className="mt-4">
                <p className="mb-2 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  {book.chapter}
                </p>
                <ProgressLine value={book.progress} />
                <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                  <span className="truncate text-[11px] text-muted-foreground">{book.remaining}</span>
                  <button className="inline-flex shrink-0 items-center gap-1.5 rounded-full ember-fill px-3.5 py-1.5 text-xs font-medium">
                    <Play className="size-3 fill-current" />
                    Resume
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <h3 className="mb-4 mt-10 text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
        My audiobook collection
      </h3>
      <div className="grid grid-cols-3 gap-x-5 gap-y-8 sm:grid-cols-4 lg:grid-cols-6">
        {audiobookShelf.map((book) => (
          <AudiobookCard key={book.id} book={book} />
        ))}
      </div>
    </Section>
  );
}
