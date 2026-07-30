import { Bell, Globe, LogOut, Lock, Palette, User } from "lucide-react";
import { SectionHeader } from "../shared/SectionHeader";

const rows = [
  { icon: User, label: "Account", hint: "Name, username, email" },
  { icon: Lock, label: "Privacy", hint: "Who can see your journey" },
  { icon: Bell, label: "Notifications", hint: "Moments, replies, releases" },
  { icon: Palette, label: "Theme", hint: "Cinematic dark · Auto" },
  { icon: Globe, label: "Language", hint: "English (UK)" },
];

export function ProfileSettings() {
  return (
    <section>
      <SectionHeader eyebrow="Settings" title="Preferences" />
      <ul className="surface-panel divide-y divide-border overflow-hidden">
        {rows.map(({ icon: Icon, label, hint }) => (
          <li key={label}>
            <button className="silk grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-5 py-4 text-left hover:bg-surface-2">
              <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium">{label}</span>
                <span className="block truncate text-xs text-muted-foreground">{hint}</span>
              </span>
              <span className="text-muted-foreground">›</span>
            </button>
          </li>
        ))}
        <li>
          <button className="silk grid w-full grid-cols-[auto_minmax(0,1fr)] items-center gap-3 px-5 py-4 text-left text-destructive hover:bg-destructive/10">
            <LogOut className="h-4 w-4 shrink-0" />
            <span className="text-sm font-medium">Log out</span>
          </button>
        </li>
      </ul>
    </section>
  );
}