import { createFileRoute } from "@tanstack/react-router";
import { SearchPage } from "@/components/search/SearchPage";

const title = "Castaminofen Search — Find podcasts, videos, books & creators";
const description =
  "Search the Castaminofen universe: podcasts, videos, audiobooks, shorts, creators and community discussions in one calm, premium discovery experience.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: SearchPage,
});
