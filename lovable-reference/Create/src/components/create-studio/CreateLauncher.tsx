import { Compass, Home, Library, MessagesSquare, Plus, Search, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Btn } from "./primitives";

const navItems = [
  { icon: Home, label: "Home" },
  { icon: Library, label: "Library" },
  { icon: Search, label: "Search" },
  { icon: MessagesSquare, label: "Community" },
  { icon: User, label: "Profile" },
];

export function BottomNav({ onCreate }: { onCreate: () => void }) {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 glass-panel border-t px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] lg:hidden"
    >
      <ul className="mx-auto grid max-w-md grid-cols-5 items-end">
        {navItems.slice(0, 2).map((n) => (
          <NavButton key={n.label} {...n} />
        ))}
        <li className="flex justify-center">
          <button
            type="button"
            onClick={onCreate}
            aria-label="Create"
            className="-mt-7 grid h-14 w-14 place-items-center rounded-2xl bg-ember-gradient text-primary-foreground shadow-ember transition active:scale-95"
          >
            <Plus size={24} />
          </button>
        </li>
        {navItems.slice(2, 4).map((n) => (
          <NavButton key={n.label} {...n} />
        ))}
      </ul>
    </nav>
  );
}

function NavButton({ icon: Icon, label }: { icon: typeof Home; label: string }) {
  return (
    <li>
      <button
        type="button"
        className="flex w-full flex-col items-center gap-1 rounded-xl py-2 text-[10px] text-muted-foreground transition hover:text-foreground"
      >
        <Icon size={19} strokeWidth={1.7} />
        {label}
      </button>
    </li>
  );
}

export function CreateLauncher({
  onCreate,
  className,
}: {
  onCreate: () => void;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-border bg-stage px-6 py-12 sm:px-10 sm:py-16",
        className,
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-ember/20 blur-[90px]"
      />
      <div className="relative max-w-2xl">
        <p className="eyebrow">Castaminofen · Create Studio</p>
        <h1 className="mt-4 text-4xl leading-[1.05] sm:text-6xl">
          You have an idea.
          <br />
          <span className="text-ember">Let's give it a form.</span>
        </h1>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
          Podcasts, videos, shorts, audiobooks, conversations — or something the community builds
          with you. This is the doorway.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Btn variant="ember" size="lg" onClick={onCreate}>
            <Plus size={18} /> Start creating
          </Btn>
          <Btn variant="outline" size="lg">
            <Compass size={17} /> Take the tour
          </Btn>
        </div>
      </div>
    </section>
  );
}
