import { Mic } from "lucide-react";
import { ActionButton } from "../shared/ActionButton";

export function CreatorEntry() {
  return (
    <section className="surface-panel relative overflow-hidden p-6 sm:p-8">
      <div
        className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full opacity-20 blur-3xl"
        style={{ backgroundImage: "var(--gradient-ember)" }}
      />
      <div className="relative grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
            <Mic className="h-3 w-3" /> Creator layer
          </span>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Your taste is already a body of work.</h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Turn your collections, notes, and saved moments into something other people can listen to. Publishing lives
            in Create — this is just the door.
          </p>
        </div>
        <ActionButton variant="ember" className="lg:h-12 lg:px-7">
          Start creating
        </ActionButton>
      </div>
    </section>
  );
}