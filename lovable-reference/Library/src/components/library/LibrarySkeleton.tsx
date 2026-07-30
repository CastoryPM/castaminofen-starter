function Shimmer({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-2xl bg-elevated ${className ?? ""}`} />;
}

export function LibrarySkeleton() {
  return (
    <div className="space-y-10 py-8" aria-busy="true" aria-label="Loading your library">
      <div className="space-y-3">
        <Shimmer className="h-3 w-28 rounded-full" />
        <Shimmer className="h-12 w-72 max-w-full" />
        <Shimmer className="h-3 w-56 rounded-full" />
      </div>

      <div className="flex gap-3 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <Shimmer key={i} className="h-9 w-24 shrink-0 rounded-full" />
        ))}
      </div>

      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 3 }).map((_, i) => (
          <Shimmer key={i} className="h-36 w-[300px] shrink-0 rounded-3xl sm:w-[380px]" />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Shimmer className="aspect-square w-full" />
            <Shimmer className="h-3 w-3/4 rounded-full" />
            <Shimmer className="h-3 w-1/2 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
