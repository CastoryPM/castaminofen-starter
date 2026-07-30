import { continueItems } from "@/data/home";
import { MediaCarousel } from "./MediaCarousel";
import { ContinueCard } from "./cards/ContinueCard";
import { EmptyState } from "./states/EmptyState";

export function ContinueSection({ items = continueItems }: { items?: typeof continueItems }) {
  if (items.length === 0) {
    return (
      <section className="py-6 lg:py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <EmptyState
            title="Start exploring to build your personal timeline."
            body="Anything you begin — an episode, a chapter, a video — reappears here exactly where you left it."
            action="Browse discovery"
          />
        </div>
      </section>
    );
  }

  return (
    <MediaCarousel title="Continue" subtitle="Pick up exactly where you stopped">
      {items.map((item) => (
        <ContinueCard key={item.id} item={item} />
      ))}
    </MediaCarousel>
  );
}
