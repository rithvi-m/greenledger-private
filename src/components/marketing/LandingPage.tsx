import { Link } from "@tanstack/react-router";
import { ArrowRight, Play } from "lucide-react";
import { Logo } from "./Logo";
import { DashboardPreview } from "./DashboardPreview";
import { PitchDetailsDialog } from "./PitchDetailsDialog";
import { PitchFlowStrip } from "./PitchFlowStrip";
import { ProductFrame } from "./ProductFrame";

export function LandingPage() {
  return (
    <div className="landing-page gl-pitch-launcher relative flex min-h-screen flex-col overflow-hidden">
      {/* Clean console backdrop — no drifting orbs */}
      <div className="gl-pitch-backdrop" aria-hidden="true" />

      {/* Urgency strip */}
      <div className="gl-urgency-strip relative z-20 shrink-0">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-1 px-4 py-2 text-center text-xs sm:text-sm">
          <span>
            <strong className="text-[var(--gl-danger)]">20–35%</strong> EU CBAM tariff on steel exports
          </span>
          <span className="hidden text-muted-foreground sm:inline">·</span>
          <span>
            <strong className="text-[var(--gl-warn)]">₹3–5L</strong> Big-4 audit per plant
          </span>
          <span className="hidden text-muted-foreground sm:inline">·</span>
          <span className="text-muted-foreground">Tamil Nadu MSMEs · zero IoT setup</span>
        </div>
      </div>

      <header className="relative z-20 shrink-0 px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Logo size="sm" />
          <span className="hidden rounded-full border px-3 py-1 text-[11px] font-medium text-muted-foreground sm:inline-block" style={{ borderColor: "var(--gl-border)" }}>
            SRCAS Hackathon 3.0 · Team Codex
          </span>
        </div>
      </header>

      <main className="relative z-10 flex flex-1 flex-col px-4 pb-6 sm:px-6 sm:pb-8">
        <div className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-10">
          {/* Product first on large screens — order flipped on mobile so copy leads */}
          <div className="order-2 lg:order-1">
            <p className="gl-pitch-eyebrow">Live prototype · ABC Steel, Coimbatore</p>

            <h1 className="gl-pitch-headline mt-3 font-display font-bold tracking-tight">
              Your bills in,
              <br />
              <span className="gl-pitch-headline-accent">audit-ready reports</span> out.
            </h1>

            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
              TANGEDCO PDF → verified kWh → Scope 1 &amp; 2 tCO₂e → ISO 14064 for EU CBAM.
              Under 10 minutes. No ₹5L consultant.
            </p>

            <div className="mt-6">
              <PitchFlowStrip />
            </div>

            <Link to="/login" className="gl-pitch-cta mt-8">
              <Play className="h-5 w-5 fill-current" />
              Launch live demo
              <ArrowRight className="h-5 w-5 opacity-70" />
            </Link>

            <p className="mt-3 text-xs text-muted-foreground">
              Upload a bill · verify OCR · export certificate — full flow in ~60 seconds
            </p>
          </div>

          <div className="order-1 lg:order-2">
            <ProductFrame label="app/overview">
              <DashboardPreview />
            </ProductFrame>
          </div>
        </div>
      </main>

      <footer className="relative z-20 shrink-0 border-t px-4 py-3 sm:px-6" style={{ borderColor: "var(--gl-border)" }}>
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 sm:flex-row">
          <p className="text-[11px] text-muted-foreground">
            Azure Document AI · CEA 0.716 · ISO 14064 · TANGEDCO LT-11
          </p>
          <PitchDetailsDialog />
        </div>
      </footer>
    </div>
  );
}
