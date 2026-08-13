import { createFileRoute } from "@tanstack/react-router";
import { SectionPlaceholder } from "@/components/greenledger/AppShell";

export const Route = createFileRoute("/app/recommendations")({
  head: () => ({
    meta: [
      { title: "Recommendations — GreenLedger" },
      { name: "description", content: "Energy savings recommendations for the ABC Steel Components facility." },
      { property: "og:title", content: "Recommendations — GreenLedger" },
      { property: "og:description", content: "Energy savings recommendations for the ABC Steel Components facility." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SectionPlaceholder
      title="Recommendations"
      description="Savings recommendations will be generated from verified consumption patterns."
    />
  );
}
