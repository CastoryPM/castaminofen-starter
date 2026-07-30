import { createFileRoute } from "@tanstack/react-router";
import { CommunityPage } from "@/components/community/CommunityPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Castaminofen Community — Where Content Becomes Conversation" },
      {
        name: "description",
        content:
          "Discuss episodes minute by minute, build community notes, and create knowledge together inside the Castaminofen Community.",
      },
      { property: "og:title", content: "Castaminofen Community" },
      {
        property: "og:description",
        content:
          "Timestamped conversations, collaborative notes, and co-creation — the intelligence layer of Castaminofen.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CommunityPage,
});
