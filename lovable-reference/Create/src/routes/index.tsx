import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Moon, Sun } from "lucide-react";
import type { CreationTypeId } from "@/components/create-studio/data";
import { BottomNav, CreateLauncher } from "@/components/create-studio/CreateLauncher";
import { CreationTypeSelector } from "@/components/create-studio/CreationTypeSelector";
import { CreationWizard } from "@/components/create-studio/CreationWizard";
import {
  CreatorJourney,
  DraftSection,
  PublishedSection,
} from "@/components/create-studio/CreatorDashboard";
import {
  CollaborationPanel,
  CommunityFeedback,
} from "@/components/create-studio/community";
import {
  CreatorBranding,
  CreatorIdentity,
  MonetizationPreview,
} from "@/components/create-studio/creator";
import { AIAssistant } from "@/components/create-studio/tools";
import { SectionHeader } from "@/components/create-studio/primitives";

export const Route = createFileRoute("/")({
  component: CreateStudioPage,
  head: () => ({
    meta: [
      { title: "Create Studio — Castaminofen" },
      {
        name: "description",
        content:
          "Castaminofen Create Studio: turn an idea into a podcast, video, short, audiobook or community project in one premium creation flow.",
      },
      { property: "og:title", content: "Create Studio — Castaminofen" },
      {
        property: "og:description",
        content:
          "The creative doorway of Castaminofen — drafts, chapters, highlights, collaboration and publishing in one cinematic workspace.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function CreateStudioPage() {
  const [wizardOpen, setWizardOpen] = useState(false);
  const [seedType, setSeedType] = useState<CreationTypeId | undefined>();
  const [dark, setDark] = useState(true);

  const open = (t?: CreationTypeId) => {
    setSeedType(t);
    setWizardOpen(true);
  };

  return (
    <div className={dark ? "dark text-foreground" : "text-foreground"}>
      <div className="min-h-screen bg-background pb-28 lg:pb-12">
        <header className="sticky top-0 z-30 glass-panel border-x-0 border-t-0">
          <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3.5 sm:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-ember-gradient text-sm font-semibold text-primary-foreground">
                C
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium">Castaminofen</span>
                <span className="block text-[11px] text-muted-foreground">Create Studio</span>
              </span>
            </div>
            <button
              type="button"
              onClick={() => setDark((d) => !d)}
              aria-label="Toggle theme"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition hover:text-ember"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-7xl space-y-14 px-5 py-8 sm:px-8 sm:py-12">
          <CreateLauncher onCreate={() => open()} />

          <section>
            <CreationTypeSelector onSelect={(t) => open(t)} />
          </section>

          <DraftSection onContinue={(t) => open(t)} />
          <PublishedSection />
          <CreatorJourney />

          <section>
            <SectionHeader eyebrow="Together" title="Collaboration & community" />
            <div className="grid gap-3 lg:grid-cols-2">
              <CollaborationPanel />
              <CommunityFeedback />
            </div>
          </section>

          <section>
            <SectionHeader eyebrow="Who you are here" title="Creator identity" />
            <div className="grid gap-3 lg:grid-cols-2">
              <CreatorIdentity />
              <CreatorBranding />
            </div>
          </section>

          <section className="grid gap-3 lg:grid-cols-2">
            <AIAssistant />
            <MonetizationPreview />
          </section>
        </main>

        <BottomNav onCreate={() => open()} />
        <CreationWizard
          open={wizardOpen}
          onClose={() => setWizardOpen(false)}
          initialType={seedType}
          key={seedType ?? "none"}
        />
      </div>
    </div>
  );
}
