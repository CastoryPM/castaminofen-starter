import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { LibraryHeader } from "@/components/library/LibraryHeader";
import { ContinueJourneySection } from "@/components/library/ContinueJourneySection";
import {
  LibraryCategoryNavigation,
  type LibraryCategory,
} from "@/components/library/LibraryCategoryNavigation";
import { SavedContentSection } from "@/components/library/SavedContentSection";
import { FavoriteCollection } from "@/components/library/FavoriteCollection";
import { PodcastLibrarySection } from "@/components/library/PodcastLibrarySection";
import { AudiobookLibrarySection } from "@/components/library/AudiobookLibrarySection";
import { VideoLibrarySection } from "@/components/library/VideoLibrarySection";
import { ShortsLibrarySection } from "@/components/library/ShortsLibrarySection";
import { PlaylistCollection } from "@/components/library/PlaylistCollection";
import { HistorySection } from "@/components/library/HistorySection";
import { CreatorCollection } from "@/components/library/CreatorCollection";
import { CommunitySavedSection } from "@/components/library/CommunitySavedSection";
import { LibrarySkeleton } from "@/components/library/LibrarySkeleton";
import { LibraryEmptyState } from "@/components/library/LibraryEmptyState";
import { BottomNavigation } from "@/components/library/BottomNavigation";
import { MediaDetailsProvider } from "@/components/library/MediaDetailsDrawer";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Your Library · Castaminofen" },
      {
        name: "description",
        content:
          "Your private media universe on Castaminofen — continue podcasts, audiobooks and videos, revisit favorites, and organize personal collections.",
      },
      { property: "og:title", content: "Your Library · Castaminofen" },
      {
        property: "og:description",
        content:
          "Continue unfinished stories, manage favorites and collections, and return to your listening history.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LibraryPage,
});

function LibraryPage() {
  const [category, setCategory] = useState<LibraryCategory>("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <MediaDetailsProvider>
      <div className="min-h-screen pb-24 lg:pb-16">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          {loading ? (
            <LibrarySkeleton />
          ) : (
            <>
              <LibraryHeader />
              <div className="mt-6">
                <LibraryCategoryNavigation active={category} onChange={setCategory} />
              </div>
              <main className="divide-y divide-border">
                <CategoryContent category={category} />
              </main>
              <footer className="py-10 text-center text-xs text-muted-foreground">
                Castaminofen · Your library, kept quietly.
              </footer>
            </>
          )}
        </div>
        <BottomNavigation />
      </div>
    </MediaDetailsProvider>
  );
}


function CategoryContent({ category }: { category: LibraryCategory }) {
  switch (category) {
    case "Podcasts":
      return (
        <>
          <ContinueJourneySection />
          <PodcastLibrarySection />
          <CreatorCollection />
        </>
      );
    case "Videos":
      return (
        <>
          <VideoLibrarySection />
          <HistorySection />
        </>
      );
    case "Audiobooks":
      return <AudiobookLibrarySection />;
    case "Shorts":
      return <ShortsLibrarySection />;
    case "Favorites":
      return (
        <>
          <FavoriteCollection />
          <CreatorCollection />
        </>
      );
    case "Collections":
      return (
        <>
          <PlaylistCollection />
          <CommunitySavedSection />
        </>
      );
    case "History":
      return <HistorySection />;
    default:
      return (
        <>
          <ContinueJourneySection />
          <SavedContentSection />
          <FavoriteCollection />
          <PodcastLibrarySection />
          <AudiobookLibrarySection />
          <VideoLibrarySection />
          <ShortsLibrarySection />
          <PlaylistCollection />
          <HistorySection />
          <CreatorCollection />
          <CommunitySavedSection />
          <section className="py-9">
            <LibraryEmptyState
              title="Room for more."
              description="Save podcasts, videos, and stories to keep growing your personal collection."
            />
          </section>
        </>
      );
  }
}
