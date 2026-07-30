import { creators } from "@/data/home";
import { MediaCarousel } from "./MediaCarousel";
import { CreatorCard } from "./cards/CreatorCard";

export function CreatorSection() {
  return (
    <MediaCarousel title="Creators to follow" subtitle="The people behind what you finished this month">
      {creators.map((c) => (
        <CreatorCard key={c.id} creator={c} />
      ))}
    </MediaCarousel>
  );
}
