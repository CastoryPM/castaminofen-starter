export function InterestTags({ interests, editable }: { interests: string[]; editable?: boolean }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {interests.map((interest) => (
        <li key={interest}>
          <span className="silk inline-flex items-center rounded-full border border-border bg-surface/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur hover:border-primary/50 hover:text-foreground">
            {interest}
          </span>
        </li>
      ))}
      {editable ? (
        <li>
          <button className="silk rounded-full border border-dashed border-primary/50 px-3 py-1 text-xs font-semibold text-primary hover:bg-primary/10">
            + Manage interests
          </button>
        </li>
      ) : null}
    </ul>
  );
}