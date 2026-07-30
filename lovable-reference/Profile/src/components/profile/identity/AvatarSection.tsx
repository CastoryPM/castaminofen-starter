import { BadgeCheck } from "lucide-react";

export function AvatarSection({
  src,
  name,
  isCreator,
  isOnline,
}: {
  src: string;
  name: string;
  isCreator: boolean;
  isOnline: boolean;
}) {
  return (
    <div className="relative w-fit shrink-0">
      <div className="w-fit rounded-[28px] bg-ember-gradient p-[2px]" style={{ boxShadow: "var(--shadow-cinematic)" }}>
        <img
          src={src}
          alt={name}
          width={816}
          height={816}
          className="h-24 w-24 rounded-[26px] object-cover sm:h-32 sm:w-32 lg:h-40 lg:w-40"
        />
      </div>

      {isCreator ? (
        <span className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-ember-gradient px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-ember-foreground">
          <BadgeCheck className="h-3 w-3" /> Creator
        </span>
      ) : null}

      {isOnline ? (
        <span
          aria-label="Currently active"
          className="live-dot absolute right-1 top-1 h-3.5 w-3.5 rounded-full border-2 border-background bg-signal"
        />
      ) : null}
    </div>
  );
}