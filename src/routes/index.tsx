import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/marketing/LandingPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GreenLedger — Live Prototype | SRCAS Hackathon 3.0" },
      {
        name: "description",
        content:
          "Live prototype: upload TANGEDCO bills, verify kWh, export ISO 14064 carbon reports for EU CBAM compliance.",
      },
      { property: "og:title", content: "GreenLedger — Carbon Compliance & Energy Audit" },
      {
        property: "og:description",
        content: "Upload bills. Get verified carbon reports. Protect exports from EU carbon tariffs.",
      },
    ],
  }),
  component: LandingPage,
});
