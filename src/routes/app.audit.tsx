import { createFileRoute } from "@tanstack/react-router";
import { SectionPlaceholder } from "@/components/greenledger/AppShell";

export const Route = createFileRoute("/app/audit")({
  head: () => ({
    meta: [
      { title: "Audit Trail — GreenLedger" },
      { name: "description", content: "Immutable evidence trail of every bill upload, edit and verification." },
      { property: "og:title", content: "Audit Trail — GreenLedger" },
      { property: "og:description", content: "Immutable evidence trail of every bill upload, edit and verification." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SectionPlaceholder
      title="Audit Trail"
      description="Every upload, correction and verification action will be recorded here with user and timestamp."
    />
  );
}
