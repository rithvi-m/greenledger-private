import { createFileRoute } from "@tanstack/react-router";
import { SectionPlaceholder } from "@/components/greenledger/AppShell";

export const Route = createFileRoute("/app/ask")({
  head: () => ({
    meta: [
      { title: "Ask GreenLedger — GreenLedger" },
      { name: "description", content: "Ask questions about your facility's verified energy and carbon data." },
      { property: "og:title", content: "Ask GreenLedger — GreenLedger" },
      { property: "og:description", content: "Ask questions about your facility's verified energy and carbon data." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SectionPlaceholder
      title="Ask GreenLedger"
      description="A question interface over your verified facility data will be added here."
    />
  );
}
