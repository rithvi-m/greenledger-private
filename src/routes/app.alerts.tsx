import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, FileUp, Gauge, TrendingUp } from "lucide-react";
import { useFacilityBills } from "@/lib/greenledger/useFacilityBills";
import { DataSourceBanner } from "@/components/greenledger/DataPrivacyPanel";

export const Route = createFileRoute("/app/alerts")({
  head: () => ({
    meta: [{ title: "Alerts — GreenLedger" }],
  }),
  component: Page,
});

const ALERTS = [
  {
    id: "leak",
    severity: "warning" as const,
    title: "Generator run-hours 40% above baseline",
    detail:
      "Diesel consumption pattern suggests hidden generator wastage during peak TANGEDCO hours. Estimated utility leak: ~₹45,000/month (modeled, pilot validation pending).",
    action: { label: "View energy analytics", to: "/app/energy" as const },
  },
  {
    id: "pf",
    severity: "warning" as const,
    title: "Power factor below 0.90 on last bill",
    detail:
      "TANGEDCO LT-11 tariff penalises power factor below 0.90. Last verified bill showed 0.87 — review capacitor bank.",
    action: { label: "Open bill verification", to: "/app/bills" as const },
  },
  {
    id: "cbam",
    severity: "info" as const,
    title: "CBAM certificate expires in 47 days",
    detail:
      "EU buyer requires refreshed ISO 14064 inventory. Upload August bill and re-export certificate before 30 Sep 2026.",
    action: { label: "Preview certificate", to: "/app/reports" as const },
  },
];

function Page() {
  const { hasVerified, loading } = useFacilityBills();

  return (
    <div className="space-y-6">
      <DataSourceBanner empty={!hasVerified} />

      <header>
        <h1 className="font-display text-lg font-semibold">Alerts</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Consumption anomalies, tariff penalties, and compliance deadlines for your facility.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-3">
        <Summary icon={AlertTriangle} label="Active warnings" value={hasVerified ? "2" : "—"} tone="warning" empty={!hasVerified} />
        <Summary icon={Gauge} label="Est. monthly leak" value={hasVerified ? "₹45k" : "—"} tone="gold" empty={!hasVerified} />
        <Summary icon={TrendingUp} label="kWh vs baseline" value={hasVerified ? "+8.3%" : "—"} tone="danger" empty={!hasVerified} />
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : !hasVerified ? (
        <div className="gl-alert-strip">
          <FileUp className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gl-sage)]" />
          <div>
            <div className="text-sm font-medium">Alerts activate after bill verification</div>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Upload and verify a TANGEDCO bill first. Modeled leak detection and tariff alerts appear once
              consumption data is on file.
            </p>
            <Link to="/app/bills" className="mt-2 inline-block text-xs text-[var(--gl-primary-light)] hover:underline">
              Upload a bill →
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {ALERTS.map((a) => (
            <div
              key={a.id}
              className={`gl-alert-strip ${a.severity === "warning" ? "gl-alert-warn" : "gl-alert-ok"}`}
            >
              <AlertTriangle
                className={`mt-0.5 h-4 w-4 shrink-0 ${a.severity === "warning" ? "" : "text-[var(--gl-primary-light)]"}`}
                style={a.severity === "warning" ? { color: "var(--gl-warn)" } : undefined}
              />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium">{a.title}</div>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{a.detail}</p>
                <Link
                  to={a.action.to}
                  className="mt-2 inline-block text-xs text-[var(--gl-primary-light)] hover:underline"
                >
                  {a.action.label} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Summary({
  icon: Icon,
  label,
  value,
  tone,
  empty,
}: {
  icon: typeof AlertTriangle;
  label: string;
  value: string;
  tone: "warning" | "gold" | "danger";
  empty?: boolean;
}) {
  const color =
    tone === "gold" ? "var(--gl-accent)" : tone === "danger" ? "var(--gl-danger)" : "var(--gl-warn)";
  return (
    <div className={`gl-kpi ${empty ? "gl-kpi-empty" : ""}`}>
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4" style={{ color: empty ? "var(--gl-text-muted)" : color }} strokeWidth={1.75} />
        <div className="gl-kpi-label">{label}</div>
      </div>
      <div className="gl-kpi-value" style={{ color: empty ? undefined : color }}>
        {value}
      </div>
    </div>
  );
}
