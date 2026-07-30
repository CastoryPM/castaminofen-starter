import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "@/components/profile/ProfilePage";
import { ownerProfile } from "@/lib/profile-data";

const title = "Aurel Nadeau — My Castaminofen Profile";
const description =
  "A personal universe inside Castaminofen: listening journey, saved moments, collections, achievements and creator space.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

function Index() {
  return <ProfilePage profile={ownerProfile} mode="personal" />;
}
