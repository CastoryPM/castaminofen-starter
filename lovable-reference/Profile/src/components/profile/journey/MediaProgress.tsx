export function MediaProgress({ value, label }: { value: number; label?: string }) {
  return (
    <div>
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2"
      >
        <div className="h-full rounded-full bg-ember-gradient" style={{ width: `${value}%` }} />
      </div>
      {label ? <p className="mt-2 text-[11px] text-muted-foreground">{label}</p> : null}
    </div>
  );
}