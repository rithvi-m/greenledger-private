import { AlertTriangle, FileOutput, ScanLine, Upload, Zap } from "lucide-react";

const STEPS = [
  { icon: Upload, label: "Upload bill" },
  { icon: ScanLine, label: "AI scan" },
  { icon: Zap, label: "Carbon calc" },
  { icon: AlertTriangle, label: "Leak alert" },
  { icon: FileOutput, label: "ISO 14064 PDF" },
] as const;

export function PitchFlowStrip() {
  return (
    <div className="gl-pitch-flow" aria-label="How GreenLedger works">
      {STEPS.map(({ icon: Icon, label }, i) => (
        <div key={label} className="gl-pitch-flow-step">
          <div className="gl-pitch-flow-icon">
            <Icon className="h-3.5 w-3.5" strokeWidth={2} />
          </div>
          <span className="gl-pitch-flow-label">{label}</span>
          {i < STEPS.length - 1 && <span className="gl-pitch-flow-arrow" aria-hidden="true" />}
        </div>
      ))}
    </div>
  );
}
