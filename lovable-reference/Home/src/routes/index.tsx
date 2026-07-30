import { createFileRoute } from "@tanstack/react-router";
import { HomeHeader } from "@/components/home/HomeHeader";
import { WelcomeHero } from "@/components/home/WelcomeHero";
import { CategoryNavigation } from "@/components/home/CategoryNavigation";
import { ContinueSection } from "@/components/home/ContinueSection";
import { FeaturedContentHero } from "@/components/home/FeaturedContentHero";
import {
  TrendingSection,
  RecommendationSection,
  NewReleasesSection,
  EditorPicksSection,
  HiddenGemsSection,
} from "@/components/home/DiscoveryShelves";
import { PodcastSection } from "@/components/home/PodcastSection";
import { VideoSection } from "@/components/home/VideoSection";
import { AudiobookSection } from "@/components/home/AudiobookSection";
import { ShortsSection } from "@/components/home/ShortsSection";
import { CreatorSection } from "@/components/home/CreatorSection";
import { CommunityHighlights } from "@/components/home/CommunityHighlights";
import { LibraryShortcut } from "@/components/home/LibraryShortcut";
import { BottomNav } from "@/components/home/BottomNav";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Castaminofen — Your personal media universe" },
      {
        name: "description",
        content:
          "Discover podcasts, videos, audiobooks and shorts on Castaminofen, and continue every story exactly where you left it.",
      },
      { property: "og:title", content: "Castaminofen — Your personal media universe" },
      {
        property: "og:description",
        content:
          "A premium home for podcasts, videos, audiobooks, shorts and the community around them.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <HomeHeader />
      <main>
        <h1 className="sr-only">Castaminofen home</h1>
        <WelcomeHero />
        <CategoryNavigation />
        <ContinueSection />
        <FeaturedContentHero />
        <TrendingSection />
        <RecommendationSection />
        <PodcastSection />
        <VideoSection />
        <AudiobookSection />
        <ShortsSection />
        <NewReleasesSection />
        <CommunityHighlights />
        <CreatorSection />
        <EditorPicksSection />
        <HiddenGemsSection />
        <LibraryShortcut />
      </main>
      <BottomNav />
    </div>
  );
}
