import { useState } from "react";
import { X } from "lucide-react";
import { DataPrivacyPanel } from "@/components/greenledger/DataPrivacyPanel";

const PIPELINE = [
  "Upload — TANGEDCO / diesel PDF",
  "AI Scan — Azure Document AI (layout-agnostic OCR)",
  "Carbon calc — CEA 0.716 + IPCC Scope 1 & 2",
  "Alert — DG idle-time anomaly detection",
  "ESG PDF — ISO 14064 certificate export",
];

const COMPARE = [
  ["Built for", "Fortune 500", "Tamil Nadu MSME exporters"],
  ["Setup", "6 months + consultants", "~10 min from bills"],
  ["Cost", "$50k+/year", "₹999–₹4,999/mo"],
  ["Input", "Manual entry", "1-click Indian bill OCR"],
];

export function PitchDetailsDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-xs text-muted-foreground underline-offset-2 hover:text-[var(--gl-text)] hover:underline"
      >
        Technical details for judges
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} aria-hidden="true" />
          <div
            className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-xl sm:rounded-xl"
            style={{ background: "var(--gl-bg-elevated)", border: "1px solid var(--gl-border)" }}
            role="dialog"
            aria-modal="true"
            aria-label="Technical details for judges"
          >
            <div className="sticky top-0 flex items-center justify-between border-b px-5 py-4" style={{ borderColor: "var(--gl-border)", background: "var(--gl-surface)" }}>
              <h2 className="font-display text-base font-semibold">For judges — technical &amp; data details</h2>
              <button type="button" onClick={() => setOpen(false)} className="rounded-md p-1 text-muted-foreground hover:text-[var(--gl-text)]" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6 p-5">
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">5-step process</h3>
                <ol className="mt-3 space-y-2">
                  {PIPELINE.map((step, i) => (
                    <li key={step} className="flex gap-3 text-sm">
                      <span className="font-mono text-xs font-bold text-[var(--gl-sage)]">{i + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </section>

              <section>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">vs enterprise ESG</h3>
                <div className="mt-3 overflow-x-auto">
                  <table className="gl-compare-table text-xs">
                    <thead>
                      <tr>
                        <th />
                        <th>Persefoni / Watershed</th>
                        <th className="gl-compare-highlight">GreenLedger</th>
                      </tr>
                    </thead>
                    <tbody>
                      {COMPARE.map(([label, ent, gl]) => (
                        <tr key={label}>
                          <td>{label}</td>
                          <td className="text-muted-foreground">{ent}</td>
                          <td className="gl-compare-highlight">{gl}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <DataPrivacyPanel compact />

              <p className="text-xs text-muted-foreground">
                SDG 9 · 12 · 13 · EU CBAM aligned · GHG Protocol · ISO 14064
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
