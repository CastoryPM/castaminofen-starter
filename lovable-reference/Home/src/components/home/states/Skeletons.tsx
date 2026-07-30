/** Skeleton primitives for the Home shelves. */
export function MediaCardSkeleton({ aspect = "aspect-square" }: { aspect?: string }) {
  return (
    <div className="w-[156px] sm:w-[178px]">
      <div className={`${aspect} w-full animate-pulse rounded-2xl bg-surface-raised`} />
      <div className="mt-3 h-3.5 w-4/5 animate-pulse rounded-full bg-surface-raised" />
      <div className="mt-2 h-3 w-1/2 animate-pulse rounded-full bg-surface-raised" />
    </div>
  );
}

export function ShelfSkeleton({
  count = 5,
  aspect,
}: {
  count?: number;
  aspect?: string;
}) {
  return (
    <section className="py-6 lg:py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 px-4 sm:px-6">
          <div className="h-5 w-40 animate-pulse rounded-full bg-surface-raised" />
        </div>
        <div className="rail edge-fade px-4 sm:px-6">
          {Array.from({ length: count }).map((_, i) => (
            <MediaCardSkeleton key={i} aspect={aspect} />
          ))}
        </div>
      </div>
    </section>
  );
}
