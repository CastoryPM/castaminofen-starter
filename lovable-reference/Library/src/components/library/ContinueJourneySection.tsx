import { Play } from "lucide-react";
import { continueJourney } from "@/lib/library-data";
import { ProgressLine, Section, SectionHeader, TypeBadge, Rail } from "./primitives";
import { useMediaDetails } from "./MediaDetailsDrawer";

export function ContinueJourneySection() {
  const { openDetails } = useMediaDetails();
  return (
    <Section>
      <SectionHeader eyebrow="Pick up where you left" title="Continue your journey" action="See all" />
      <Rail>
        {continueJourney.map((item) => (
          <article
            key={item.id}
            className="group flex w-[300px] gap-4 rounded-3xl surface-panel p-3 lift sm:w-[380px] sm:p-4"
          >
            <button
              onClick={() => openDetails({ ...item })}
              aria-label={`Open details for ${item.title}`}
              className="relative size-24 shrink-0 overflow-hidden rounded-2xl sm:size-28"
            >
              <img src={item.artwork} alt="" className="size-full object-cover" width={640} height={640} />
            </button>

            <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
              <div className="min-w-0">
                <TypeBadge type={item.type} />
                <button
                  onClick={() => openDetails({ ...item })}
                  className="mt-2 block max-w-full text-left"
                >
                  <h3 className="line-clamp-2 text-sm font-medium leading-snug hover:underline sm:text-base">
                    {item.title}
                  </h3>
                </button>

                <p className="mt-0.5 truncate text-xs text-muted-foreground">{item.creator}</p>
              </div>
              <div className="mt-3">
                <ProgressLine value={item.progress ?? 0} />
                <div className="mt-2 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                  <span className="truncate text-[11px] text-muted-foreground">{item.remaining}</span>
                  <button className="inline-flex shrink-0 items-center gap-1.5 rounded-full ember-fill px-3.5 py-1.5 text-xs font-medium">
                    <Play className="size-3 fill-current" />
                    Resume
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </Rail>
    </Section>
  );
}
