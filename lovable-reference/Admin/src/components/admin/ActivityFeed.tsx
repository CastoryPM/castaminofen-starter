import { Activity, Mic2, ShieldAlert, Sparkles, Users } from "lucide-react";
import { activityFeed } from "@/data/admin-data";
import { cn } from "@/lib/utils";

const iconFor = {
  content: Sparkles,
  users: Users,
  creator: Mic2,
  moderation: ShieldAlert,
  system: Activity,
} as const;

const toneFor: Record<string, string> = {
  content: "text-primary bg-primary/12",
  users: "text-info bg-info/12",
  creator: "text-accent bg-accent/12",
  moderation: "text-destructive bg-destructive/12",
  system: "text-success bg-success/12",
};

export function ActivityFeed() {
  return (
    <ul className="scroll-thin max-h-[420px] space-y-1 overflow-y-auto pr-1">
      {activityFeed.map((item) => {
        const Icon = iconFor[item.kind as keyof typeof iconFor] ?? Activity;
        return (
          <li
            key={item.id}
            className="flex items-start gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-muted/60"
          >
            <span className={cn("mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg", toneFor[item.kind])}>
              <Icon className="size-4" />
            </span>
            <div className="min-w-0">
              <p className="text-sm leading-snug">{item.text}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{item.time}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
