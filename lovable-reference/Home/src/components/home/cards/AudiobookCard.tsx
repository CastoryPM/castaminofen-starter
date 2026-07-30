import { BookOpen, Headphones } from "lucide-react";
import type { Audiobook } from "@/data/home";
import { ProgressBar } from "../ProgressBar";

/** Editorial audiobook card: tall cover, author + narrator, chapter context. */
export function AudiobookCard({ book }: { book: Audiobook }) {
  return (
    <article className="group card-elevated w-[228px] overflow-hidden rounded-2xl p-3 sm:w-[248px]">
      <div className="overflow-hidden rounded-xl">
        <img
          src={book.artwork}
          alt=""
          loading="lazy"
          className="aspect-[3/4] size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
      <div className="px-0.5 pt-3">
        <h3 className="truncate font-display text-base font-semibold">{book.title}</h3>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">by {book.author}</p>
        <p className="mt-0.5 flex items-center gap-1.5 truncate text-[11px] text-muted-foreground/80">
          <Headphones className="size-3.5 shrink-0" />
          Narrated by {book.narrator}
        </p>

        {book.progress ? (
          <div className="mt-3">
            <ProgressBar value={book.progress} label={`${book.title} progress`} />
            <p className="mt-1.5 text-[11px] text-muted-foreground">
              {book.progress}% · {Math.round((book.chapters * book.progress) / 100)} of{" "}
              {book.chapters} chapters
            </p>
          </div>
        ) : (
          <p className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <BookOpen className="size-3.5" />
            {book.chapters} chapters · {book.duration}
          </p>
        )}
      </div>
    </article>
  );
}
