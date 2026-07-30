import { shorts } from "@/data/home";
import { MediaCarousel } from "./MediaCarousel";
import { ShortCard } from "./cards/ShortCard";

export function ShortsSection() {
  return (
    <MediaCarousel title="Shorts" subtitle="Sixty-second ideas from the people you follow">
      {shorts.map((s) => (
        <ShortCard key={s.id} item={s} />
      ))}
    </MediaCarousel>
  );
}
