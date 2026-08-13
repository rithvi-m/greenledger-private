import {
  AlertTriangle,
  Building2,
  Database,
  FileText,
  Lock,
  Shield,
  UserCheck,
} from "lucide-react";

const FLOW = [
  {
    icon: FileText,
    title: "You upload",
    desc: "TANGEDCO / diesel PDF goes to encrypted Supabase Storage under your facility folder.",
  },
  {
    icon: Database,
    title: "We store metadata",
    desc: "File name, kWh, billing month — only after a person verifies OCR values in the app.",
  },
  {
    icon: UserCheck,
    title: "Human sign-off",
    desc: "Nothing counts toward carbon reports until Compliance Verifier confirms each field.",
  },
  {
    icon: Lock,
    title: "Demo vs production",
    desc: "Hackathon demo uses a shared ABC Steel workspace. Production would isolate each factory with strict access rules.",
  },
] as const;

export function DataPrivacyPanel({ compact }: { compact?: boolean }) {
  return (
    <div className={compact ? "gl-console-card p-5" : "gl-privacy-panel"}>
      <div className="flex items-start gap-3">
        <div className="gl-icon-box shrink-0">
          <Shield className="h-5 w-5" strokeWidth={1.75} />
        </div>
        <div>
          <h2 className="font-display text-lg font-semibold">
            {compact ? "Where your data goes" : "Data sources & company privacy"}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Transparent by design — every dashboard number is traceable to an uploaded bill or clearly
            marked as demo sample data.
          </p>
        </div>
      </div>

      <div className={`mt-6 grid gap-3 ${compact ? "" : "sm:grid-cols-2"}`}>
        {FLOW.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="gl-privacy-item">
            <Icon className="mb-2 h-4 w-4 text-[var(--gl-sage)]" strokeWidth={1.75} />
            <div className="text-sm font-medium">{title}</div>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-md border px-4 py-3 text-xs leading-relaxed text-muted-foreground" style={{ borderColor: "var(--gl-border)", background: "rgba(255,255,255,0.02)" }}>
        <strong className="text-[var(--gl-text)]">Dashboard numbers:</strong> KPIs use{" "}
        <span className="text-[var(--gl-mint)]">verified uploaded bills</span> when available. Until you
        upload &amp; verify a bill, the Overview shows labelled sample figures for demo presentation only.
        Leak alert (₹45k/mo) is a modeled estimate pending pilot validation — not live meter data.
      </div>

      {!compact && (
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Building2 className="h-3 w-3" /> Facility-scoped storage path
          </span>
          <span className="inline-flex items-center gap-1">
            <Lock className="h-3 w-3" /> Signed URLs for file access (1 hr)
          </span>
          <span className="inline-flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" /> Audit log on every verification edit
          </span>
        </div>
      )}
    </div>
  );
}

export function DataSourceBanner({ empty = false }: { empty?: boolean }) {
  return (
    <div className={`gl-data-banner ${empty ? "gl-data-banner-empty" : ""}`}>
      <Database className="h-4 w-4 shrink-0 text-[var(--gl-sage)]" />
      <p className="text-xs leading-relaxed text-muted-foreground">
        {empty ? (
          <>
            <span className="font-semibold text-[var(--gl-text)]">No verified bills yet.</span> KPIs show{" "}
            <span className="font-mono">—</span> until you upload a TANGEDCO PDF and verify kWh on the Bills
            page. Values then come from Supabase.
          </>
        ) : (
          <>
            <span className="font-medium text-[var(--gl-text)]">Live data:</span> Metrics from{" "}
            <span className="text-[var(--gl-mint)]">human-verified bills</span> in Supabase. Leak alerts
            marked “modeled” are estimates, not meter readings.
          </>
        )}
      </p>
    </div>
  );
}
