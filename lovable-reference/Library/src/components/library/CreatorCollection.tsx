import { creators } from "@/lib/library-data";
import { CreatorCard } from "./cards";
import { Rail, Section, SectionHeader } from "./primitives";

export function CreatorCollection() {
  return (
    <Section>
      <SectionHeader eyebrow="People you follow" title="My creators" action="See all" />
      <Rail>
        {creators.map((creator) => (
          <CreatorCard key={creator.id} creator={creator} />
        ))}
      </Rail>
    </Section>
  );
}
