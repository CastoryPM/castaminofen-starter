import { Sparkles } from "lucide-react";
import type { Profile } from "@/lib/profile-data";

export function MediaPersonality({ profile }: { profile: Profile }) {
  const { personality } = profile;
  return (
    <section className="surface-panel relative overflow-hidden p-6 sm:p-8">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-25 blur-3xl"
        style={{ backgroundImage: "var(--gradient-ember)" }}
      />
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">My Castaminofen identity</p>
      <h2 className="text-ember-gradient mt-2 text-3xl font-bold sm:text-4xl">{personality.title}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{personality.description}</p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Favorite formats</p>
          <ul className="flex flex-wrap gap-2">
            {personality.formats.map((f) => (
              <li key={f} className="rounded-full bg-surface-2 px-3 py-1 text-xs font-medium">
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Preferred topics</p>
          <ul className="flex flex-wrap gap-2">
            {personality.topics.map((t) => (
              <li
                key={t}
                className="inline-flex items-center gap-1 rounded-full border border-signal/30 bg-signal/10 px-3 py-1 text-xs font-medium text-signal"
              >
                <Sparkles className="h-3 w-3" /> {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}