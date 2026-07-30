import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "@/components/profile/ProfilePage";
import { visitedProfile } from "@/lib/profile-data";

const title = "Mireille Vasse on Castaminofen";
const description =
  "Documentary sound designer. Explore her favorite podcasts, saved moments, community insights and published work on Castaminofen.";

export const Route = createFileRoute("/u/$username")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: PublicProfileRoute,
});

function PublicProfileRoute() {
  return <ProfilePage profile={visitedProfile} mode="public" />;
}