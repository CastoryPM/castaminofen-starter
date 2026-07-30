import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { Play, Plus, Heart, Share2, Download, Clock, RotateCcw, Check } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import type { MediaType } from "@/lib/library-data";
import { ProgressLine, TypeBadge } from "./primitives";

export type MediaDetail = {
  title: string;
  creator: string;
  artwork: string;
  type?: MediaType;
  /** 0–100 */
  progress?: number;
  remaining?: string;
  duration?: string;
  savedAt?: string;
  meta?: string;
  description?: string;
  portrait?: boolean;
};

type Ctx = { openDetails: (detail: MediaDetail) => void };

const MediaDetailsContext = createContext<Ctx | null>(null);

export function useMediaDetails() {
  const ctx = useContext(MediaDetailsContext);
  if (!ctx) throw new Error("useMediaDetails must be used within MediaDetailsProvider");
  return ctx;
}

export function MediaDetailsProvider({ children }: { children: ReactNode }) {
  const [detail, setDetail] = useState<MediaDetail | null>(null);
  const [open, setOpen] = useState(false);

  const openDetails = useCallback((next: MediaDetail) => {
    setDetail(next);
    setOpen(true);
  }, []);

  const value = useMemo(() => ({ openDetails }), [openDetails]);

  return (
    <MediaDetailsContext.Provider value={value}>
      {children}
      <MediaDetailsDrawer detail={detail} open={open} onOpenChange={setOpen} />
    </MediaDetailsContext.Provider>
  );
}

function MediaDetailsDrawer({
  detail,
  open,
  onOpenChange,
}: {
  detail: MediaDetail | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!detail) return null;

  const progress = detail.progress ?? 0;
  const started = progress > 0;
  const finished = progress >= 100;

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="mx-auto max-w-lg border-border surface-panel">
        <div className="max-h-[82vh] overflow-y-auto px-5 pb-8">
          <DrawerHeader className="px-0 text-left">
            <div className="flex gap-5">
              <div
                className={
                  detail.portrait
                    ? "relative w-28 shrink-0 overflow-hidden rounded-l-sm rounded-r-lg shadow-[var(--shadow-book)]"
                    : "w-28 shrink-0 overflow-hidden rounded-2xl shadow-[var(--shadow-lift)]"
                }
              >
                <img
                  src={detail.artwork}
                  alt=""
                  className={detail.portrait ? "aspect-[3/4] w-full object-cover" : "aspect-square w-full object-cover"}
                />
                {detail.portrait ? <div className="absolute inset-y-0 left-0 w-1.5 bg-foreground/15" /> : null}
              </div>
              <div className="min-w-0 flex-1">
                {detail.type ? <TypeBadge type={detail.type} /> : null}
                <DrawerTitle className="mt-2 font-display text-xl leading-tight">
                  {detail.title}
                </DrawerTitle>
                <DrawerDescription className="mt-1 line-clamp-2">{detail.creator}</DrawerDescription>
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                  {detail.duration ? (
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3" />
                      {detail.duration}
                    </span>
                  ) : null}
                  {detail.savedAt ? <span>{detail.savedAt}</span> : null}
                  {detail.meta ? <span>{detail.meta}</span> : null}
                </div>
              </div>
            </div>
          </DrawerHeader>

          <p className="text-sm leading-relaxed text-muted-foreground">
            {detail.description ??
              "Part of your personal library. Pick up exactly where you left off, or save it for a quieter moment."}
          </p>

          <div className="mt-6">
            <div className="mb-2 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 text-[11px] text-muted-foreground">
              <span className="truncate">
                {finished ? "Completed" : started ? `${Math.round(progress)}% complete` : "Not started"}
              </span>
              {detail.remaining ? <span className="shrink-0">{detail.remaining}</span> : null}
            </div>
            <ProgressLine value={progress} />
          </div>

          <div className="mt-6 grid grid-cols-[minmax(0,1fr)_auto] gap-3">
            <button className="inline-flex items-center justify-center gap-2 rounded-full ember-fill px-5 py-3 text-sm font-medium">
              {finished ? <RotateCcw className="size-4" /> : <Play className="size-4 fill-current" />}
              {finished ? "Play again" : started ? "Resume" : "Start"}
            </button>
            <button
              aria-label="Mark as played"
              className="grid size-12 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
            >
              <Check className="size-4" />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-2">
            {[
              { icon: Plus, label: "Queue" },
              { icon: Heart, label: "Favorite" },
              { icon: Download, label: "Download" },
              { icon: Share2, label: "Share" },
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                className="flex flex-col items-center gap-1.5 rounded-2xl border border-border px-2 py-3 text-[11px] text-muted-foreground transition-colors hover:bg-elevated hover:text-foreground"
              >
                <Icon className="size-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
