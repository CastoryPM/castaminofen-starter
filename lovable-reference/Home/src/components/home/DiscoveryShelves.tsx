import { trending, recommended, newReleases, editorPicks, hiddenGems } from "@/data/home";
import { MediaCarousel } from "./MediaCarousel";
import { PodcastCard } from "./cards/PodcastCard";

export function TrendingSection() {
  return (
    <MediaCarousel title="Trending now" subtitle="Moving fast across Castaminofen">
      {trending.map((item) => (
        <PodcastCard key={item.id} item={item} />
      ))}
    </MediaCarousel>
  );
}

export function RecommendationSection() {
  return (
    <MediaCarousel title="Recommended for you" subtitle="Built from what you finish, not what you click">
      {recommended.map((item) => (
        <PodcastCard key={item.id} item={item} />
      ))}
    </MediaCarousel>
  );
}

export function NewReleasesSection() {
  return (
    <MediaCarousel title="New releases" subtitle="Published in the last seven days">
      {newReleases.map((item) => (
        <PodcastCard key={item.id} item={item} />
      ))}
    </MediaCarousel>
  );
}

export function EditorPicksSection() {
  return (
    <MediaCarousel title="Editor picks" subtitle="Chosen by people, not a ranking">
      {editorPicks.map((item) => (
        <PodcastCard key={item.id} item={item} />
      ))}
    </MediaCarousel>
  );
}

export function HiddenGemsSection() {
  return (
    <MediaCarousel title="Hidden gems" subtitle="Smaller creators worth an hour of your attention">
      {hiddenGems.map((item) => (
        <PodcastCard key={item.id} item={item} />
      ))}
    </MediaCarousel>
  );
}
