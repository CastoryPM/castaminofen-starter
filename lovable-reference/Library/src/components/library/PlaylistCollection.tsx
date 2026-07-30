import { Plus } from "lucide-react";
import { collections } from "@/lib/library-data";
import { CollectionCard } from "./cards";
import { Rail, Section, SectionHeader } from "./primitives";

export function PlaylistCollection() {
  return (
    <Section>
      <SectionHeader eyebrow="Organized by you" title="My collections" action="New collection" />
      <Rail>
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
        <button className="flex aspect-[5/3] w-[228px] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border text-muted-foreground transition-colors hover:border-primary hover:text-foreground">
          <Plus className="size-5" />
          <span className="text-sm">Create collection</span>
        </button>
      </Rail>
    </Section>
  );
}
