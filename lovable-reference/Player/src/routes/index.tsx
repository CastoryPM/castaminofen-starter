import { createFileRoute } from "@tanstack/react-router";
import { PlayerProvider } from "@/features/player/player-store";
import { PlayerContainer } from "@/features/player/components/PlayerContainer";
import { MiniPlayer } from "@/features/player/components/MiniPlayer";
import { FocusMode } from "@/features/player/components/FocusMode";
import { BottomNav } from "@/features/player/components/BottomNav";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Castaminofen Player — Immersive Media Experience" },
      {
        name: "description",
        content:
          "The Castaminofen Player: cinematic audio, video and long-form playback with timestamp comments, chapters, transcripts, highlights and community listening.",
      },
      { property: "og:title", content: "Castaminofen Player — Immersive Media Experience" },
      {
        property: "og:description",
        content:
          "Timestamp comments, chapters, transcripts, saved moments and community listening — where media becomes an experience.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PlayerPage,
});

function PlayerPage() {
  return (
    <PlayerProvider>
      <PlayerContainer />
      <FocusMode />
      <MiniPlayer />
      <BottomNav />
    </PlayerProvider>
  );
}
