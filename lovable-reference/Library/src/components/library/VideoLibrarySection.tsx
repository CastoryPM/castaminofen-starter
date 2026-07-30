import { videoItems } from "@/lib/library-data";
import { VideoCard } from "./cards";
import { Rail, Section, SectionHeader } from "./primitives";

export function VideoLibrarySection() {
  return (
    <Section>
      <SectionHeader eyebrow="My videos" title="Saved & watching" action="Watch history" />
      <Rail>
        {videoItems.map((item) => (
          <VideoCard key={item.id} item={item} />
        ))}
      </Rail>
    </Section>
  );
}
