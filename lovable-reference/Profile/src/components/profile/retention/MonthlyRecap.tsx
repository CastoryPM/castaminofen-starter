import { ActionButton } from "../shared/ActionButton";
import type { Profile } from "@/lib/profile-data";

export function MonthlyRecap({ profile }: { profile: Profile }) {
  const { recap } = profile;
  return (
    <section className="surface-panel relative overflow-hidden p-6 sm:p-8">
      <div
        className="pointer-events-none absolute inset-x-0 -top-32 h-64 opacity-25 blur-3xl"
        style={{ backgroundImage: "var(--gradient-ember)" }}
      />
      <div className="relative">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
          Your Castaminofen journey · {recap.period}
        </p>
        <h2 className="mt-2 max-w-2xl text-2xl font-bold sm:text-3xl">{recap.headline}</h2>

        <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {recap.lines.map((line) => (
            <li key={line.label}>
              <p className="text-ember-gradient text-4xl font-bold sm:text-5xl">{line.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{line.label}</p>
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap gap-2">
          <ActionButton variant="ember">Replay your month</ActionButton>
          <ActionButton>Share recap</ActionButton>
        </div>
      </div>
    </section>
  );
}