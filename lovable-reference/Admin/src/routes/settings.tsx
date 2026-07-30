import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel } from "@/components/admin/Panel";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Application Settings · Castaminofen Admin" },
      {
        name: "description",
        content: "Branding, themes, languages, platform limits and notification defaults.",
      },
      { property: "og:title", content: "Application Settings · Castaminofen Admin" },
      { property: "og:description", content: "Configure how Castaminofen looks and behaves." },
    ],
  }),
  component: SettingsPage,
});

function Row({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 py-3 last:border-0">
      <div>
        <p className="text-sm font-medium">{label}</p>
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </div>
      {children}
    </div>
  );
}

function Toggle({ defaultOn = true }: { defaultOn?: boolean }) {
  return (
    <label className="relative inline-flex cursor-pointer items-center">
      <input type="checkbox" defaultChecked={defaultOn} className="peer sr-only" />
      <span className="h-6 w-11 rounded-full bg-secondary p-0.5 transition-colors peer-checked:bg-primary">
        <span className="block size-5 rounded-full bg-card transition-transform peer-checked:translate-x-5" />
      </span>
    </label>
  );
}

function SettingsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Platform"
        title="Application Settings"
        description="Global configuration for branding, localisation, limits and notifications."
        actions={
          <button className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground">
            Save changes
          </button>
        }
      />

      <div className="grid gap-4 xl:grid-cols-2">
        <Panel title="Branding" description="Identity used across web, apps and emails">
          <Row label="Platform name">
            <input
              defaultValue="Castaminofen"
              className="h-9 w-52 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/40"
            />
          </Row>
          <Row label="Tagline">
            <input
              defaultValue="Your multimedia universe"
              className="h-9 w-52 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/40"
            />
          </Row>
          <Row label="Accent color" hint="Primary brand token">
            <div className="flex items-center gap-2">
              <span className="size-7 rounded-md bg-[image:var(--gradient-primary)]" />
              <code className="text-xs text-muted-foreground">--primary</code>
            </div>
          </Row>
          <Row label="Logo" hint="SVG recommended, 512×512 fallback">
            <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium">
              Upload
            </button>
          </Row>
        </Panel>

        <Panel title="Theme" description="Default appearance for new sessions">
          <Row label="Default theme">
            <select className="h-9 rounded-lg border border-input bg-background px-3 text-sm outline-none">
              <option>Dark</option>
              <option>Light</option>
              <option>System</option>
            </select>
          </Row>
          <Row label="Allow user theme switching">
            <Toggle />
          </Row>
          <Row label="High contrast mode" hint="Accessibility enhancement">
            <Toggle defaultOn={false} />
          </Row>
          <Row label="Reduced motion default">
            <Toggle defaultOn={false} />
          </Row>
        </Panel>

        <Panel title="Languages" description="Localisation coverage">
          <Row label="Default language">
            <select className="h-9 rounded-lg border border-input bg-background px-3 text-sm outline-none">
              <option>English (US)</option>
              <option>Deutsch</option>
              <option>Español</option>
            </select>
          </Row>
          <Row label="Enabled locales" hint="7 active, 3 in translation">
            <div className="flex flex-wrap gap-1.5">
              {["EN", "DE", "ES", "FR", "PT", "JA", "AR"].map((l) => (
                <span key={l} className="rounded-md bg-secondary px-2 py-1 text-[11px] font-medium">
                  {l}
                </span>
              ))}
            </div>
          </Row>
          <Row label="Auto-translate descriptions">
            <Toggle defaultOn={false} />
          </Row>
        </Panel>

        <Panel title="Limits & notifications" description="Guardrails and delivery defaults">
          <Row label="Max upload size" hint="Per media file">
            <input
              defaultValue="4 GB"
              className="h-9 w-28 rounded-lg border border-input bg-background px-3 text-sm outline-none"
            />
          </Row>
          <Row label="Daily uploads per creator">
            <input
              defaultValue="25"
              className="h-9 w-28 rounded-lg border border-input bg-background px-3 text-sm outline-none"
            />
          </Row>
          <Row label="Push notifications">
            <Toggle />
          </Row>
          <Row label="Weekly digest email">
            <Toggle />
          </Row>
          <Row label="Creator payout alerts">
            <Toggle />
          </Row>
        </Panel>
      </div>
    </>
  );
}
