import { savedItems } from "@/lib/library-data";
import { LibraryMediaCard } from "./cards";
import { Section, SectionHeader } from "./primitives";

export function SavedContentSection() {
  return (
    <Section>
      <SectionHeader eyebrow="Kept for later" title="Saved content" action="Manage" />
      <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {savedItems.map((item) => (
          <LibraryMediaCard key={item.id} item={item} className="w-full" />
        ))}
      </div>
    </Section>
  );
}
