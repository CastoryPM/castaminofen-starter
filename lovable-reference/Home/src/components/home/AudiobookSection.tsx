import { audiobooks, audiobookCategories } from "@/data/home";
import { SectionHeader } from "./MediaCarousel";
import { AudiobookCard } from "./cards/AudiobookCard";

/** Editorial audiobook shelf with a quiet category rail beneath it. */
export function AudiobookSection() {
  return (
    <section className="relative py-8 lg:py-12">
      <div className="aurora absolute inset-0 opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeader
          title="Audiobooks"
          subtitle="Long-form listening, kept exactly where you paused"
        />
        <div className="rail edge-fade px-4 pb-1 sm:px-6">
          {audiobooks.map((b) => (
            <AudiobookCard key={b.id} book={b} />
          ))}
        </div>
        <div className="rail edge-fade mt-4 px-4 sm:px-6">
          {audiobookCategories.map((c) => (
            <button
              key={c}
              type="button"
              className="rounded-full border border-border bg-surface px-4 py-2 text-xs font-medium whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
