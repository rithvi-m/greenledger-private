import { Bell, FileText, TrendingUp } from "lucide-react";

/** Static dashboard mock for the landing hero — not live data. */
export function DashboardPreview() {
  return (
    <div className="gl-console-card gl-dashboard-preview overflow-hidden">
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{ borderBottom: "1px solid var(--gl-border)", background: "var(--gl-bg-elevated)" }}
      >
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full animate-pulse" style={{ background: "var(--gl-primary)" }} />
          <span className="text-xs font-semibold">Overview</span>
          <span className="gl-sample-pill">Sample preview</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 p-3 sm:grid-cols-4">
        {[
          { label: "CBAM exposure", value: "₹2.1L", warn: true },
          { label: "Monthly kWh", value: "48,200", warn: false },
          { label: "Scope 1+2 tCO₂e", value: "34.5", warn: false },
          { label: "Utility spend", value: "₹4.8L", warn: false },
        ].map((m) => (
          <div key={m.label} className={`gl-preview-metric ${m.warn ? "gl-preview-metric-warn" : ""}`}>
            <div className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground">{m.label}</div>
            <div
              className="mt-1 font-mono text-base font-bold tracking-tight"
              style={{ color: m.warn ? "var(--gl-danger)" : "var(--gl-primary)" }}
            >
              {m.value}
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-2.5 px-3 pb-3 sm:grid-cols-[1fr_1.4fr]">
        <div className="gl-preview-metric gl-preview-upload flex flex-col justify-between p-4">
          <FileText className="h-5 w-5" style={{ color: "var(--gl-primary)" }} strokeWidth={1.5} />
          <div>
            <div className="text-sm font-semibold">Bill verified</div>
            <div className="mt-0.5 text-[11px] text-muted-foreground">48,200 kWh · ₹4,82,000</div>
          </div>
          <span className="gl-verified-pill">Sample data</span>
        </div>
        <div className="gl-preview-metric p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground">kWh trend</span>
            <TrendingUp className="h-3 w-3" style={{ color: "var(--gl-warn)" }} />
          </div>
          <div className="flex h-20 items-end gap-1.5">
            {[58, 72, 68, 81, 94].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm transition-all"
                style={{
                  height: `${h}%`,
                  opacity: i === 4 ? 1 : 0.35 + i * 0.12,
                  background: i === 4 ? "var(--gl-sage)" : "rgba(var(--gl-sage-rgb), 0.35)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="px-3 py-2.5" style={{ borderTop: "1px solid var(--gl-border)", background: "rgba(184, 134, 11, 0.08)" }}>
        <div className="flex items-center gap-2 text-[11px] font-medium" style={{ color: "var(--gl-warn)" }}>
          <Bell className="h-3.5 w-3.5 shrink-0" />
          DG idle-time spike — est. ₹45k/mo energy leak
        </div>
      </div>
    </div>
  );
}
