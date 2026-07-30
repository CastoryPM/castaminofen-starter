import { videos } from "@/data/home";
import { MediaCarousel } from "./MediaCarousel";
import { VideoCard } from "./cards/VideoCard";

export function VideoSection() {
  return (
    <MediaCarousel title="Videos" subtitle="Essays, documentary and things worth watching twice">
      {videos.map((v) => (
        <VideoCard key={v.id} item={v} />
      ))}
    </MediaCarousel>
  );
}
