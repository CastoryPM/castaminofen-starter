export function ProfileCover({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="absolute inset-x-0 top-0 h-[280px] overflow-hidden sm:h-[340px] lg:h-[420px]">
      <img
        src={src}
        alt={alt}
        width={1920}
        height={720}
        className="h-full w-full scale-105 object-cover opacity-90"
      />
      <div className="veil-bottom absolute inset-0" />
      <div
        className="absolute inset-0 opacity-40 mix-blend-soft-light"
        style={{ backgroundImage: "var(--gradient-ember)" }}
      />
    </div>
  );
}