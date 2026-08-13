import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, Download, FileUp } from "lucide-react";
import { formatNumber, monthLabel } from "@/lib/greenledger/bills";
import { CEA_GRID_FACTOR, formatTco2e, scope2Tco2e } from "@/lib/greenledger/metrics";
import { useFacilityBills } from "@/lib/greenledger/useFacilityBills";
import { FACILITY } from "@/lib/greenledger/session";
import { DataSourceBanner } from "@/components/greenledger/DataPrivacyPanel";

export const Route = createFileRoute("/app/reports")({
  head: () => ({
    meta: [{ title: "Reports — GreenLedger" }],
  }),
  component: Page,
});

function Page() {
  const { hasVerified, current, loading } = useFacilityBills();

  const kwh = current?.electricity_kwh ?? null;
  const scope2 = scope2Tco2e(kwh);
  const scope1 = null as number | null;
  const total = scope1 !== null && scope2 !== null ? scope1 + scope2 : scope2;
  const period = current ? monthLabel(current) : "—";

  return (
    <div className="space-y-6">
      <DataSourceBanner empty={!hasVerified} />

      <header>
        <h1 className="font-display text-lg font-semibold">Reports &amp; Certificates</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          ISO 14064 aligned greenhouse gas inventory for EU CBAM disclosure.
        </p>
      </header>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : !hasVerified ? (
        <div className="gl-console-card flex flex-col items-center justify-center px-6 py-16 text-center">
          <FileUp className="h-10 w-10 text-muted-foreground" strokeWidth={1.25} />
          <h2 className="mt-4 font-display text-base font-semibold">Certificate not ready yet</h2>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Upload a TANGEDCO bill and verify kWh on the Bills page. The ISO 14064 certificate is built
            from those verified fields.
          </p>
          <Link to="/app/bills" className="gl-btn-primary mt-6 inline-flex !text-sm">
            Go to Bills
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="gl-cert-preview">
            <div className="gl-cert-preview-header">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    ISO 14064 · GHG Protocol
                  </div>
                  <h2 className="mt-1 font-display text-base font-bold">
                    Greenhouse Gas Inventory Statement
                  </h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {FACILITY.company} · {FACILITY.location}
                  </p>
                </div>
                <span className="gl-badge shrink-0">Draft</span>
              </div>
            </div>

            <div className="space-y-4 p-5 text-sm">
              <div className="grid gap-3 sm:grid-cols-3">
                <Metric label="Reporting period" value={period} />
                <Metric label="Scope 1" value={scope1 !== null ? `${formatTco2e(scope1)} tCO₂e` : "—"} />
                <Metric label="Scope 2" value={scope2 !== null ? `${formatTco2e(scope2)} tCO₂e` : "—"} />
              </div>

              <div className="rounded-md border p-4" style={{ borderColor: "var(--gl-border)", background: "var(--gl-surface)" }}>
                <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Total emissions
                </div>
                <div className="mt-1 font-mono text-2xl font-semibold text-[var(--gl-primary-light)]">
                  {formatTco2e(total)} tCO₂e
                </div>
              </div>

              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b text-muted-foreground" style={{ borderColor: "var(--gl-border)" }}>
                    <th className="pb-2 font-medium">Source</th>
                    <th className="pb-2 font-medium">Activity data</th>
                    <th className="pb-2 font-medium">Factor</th>
                    <th className="pb-2 text-right font-medium">tCO₂e</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: "var(--gl-border)" }}>
                  <tr>
                    <td className="py-2.5">Grid electricity ({FACILITY.discom})</td>
                    <td className="py-2.5 font-mono">{kwh !== null ? `${formatNumber(kwh)} kWh` : "—"}</td>
                    <td className="py-2.5 font-mono">{CEA_GRID_FACTOR} kg/kWh</td>
                    <td className="py-2.5 text-right font-mono">{formatTco2e(scope2)}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5">Diesel generator</td>
                    <td className="py-2.5 font-mono">—</td>
                    <td className="py-2.5 font-mono">IPCC 74.1 kg/GJ</td>
                    <td className="py-2.5 text-right font-mono">{formatTco2e(scope1)}</td>
                  </tr>
                </tbody>
              </table>

              <p className="text-[11px] leading-relaxed text-muted-foreground">
                Prepared from human-verified utility bills. Emission factors cited per CEA India grid
                average and IPCC 2006 guidelines. Suitable for EU CBAM embedded emissions documentation.
              </p>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="gl-console-card p-5">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <BadgeCheck className="h-4 w-4 text-[var(--gl-primary-light)]" />
                Certificate status
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Draft ready for compliance review. Export PDF after final bill verification.
              </p>
              <button type="button" className="gl-btn-primary mt-4 w-full !text-xs" disabled>
                <Download className="h-4 w-4" />
                Export PDF (demo)
              </button>
            </div>

            <div className="gl-console-card p-5">
              <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                CBAM filing note
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                EU importers require verified embedded emissions. This report maps directly to CBAM
                quarterly declaration fields.
              </p>
              <Link to="/app/carbon" className="mt-3 inline-block text-xs text-[var(--gl-primary-light)] hover:underline">
                View carbon breakdown →
              </Link>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="gl-preview-metric">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm font-medium">{value}</div>
    </div>
  );
}
