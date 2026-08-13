/** Mock OCR extraction preview for landing — illustrates Azure Document AI output */
export function OcrPreviewMock() {
  const rows = [
    { label: "Consumer No.", value: "TN-41-8821-0047" },
    { label: "Billing month", value: "Aug 2026" },
    { label: "Units consumed", value: "48,200 kWh" },
    { label: "Max demand", value: "142 KVA" },
    { label: "Bill amount", value: "₹4,82,150" },
  ];

  return (
    <div className="gl-console-card overflow-hidden">
      <div className="flex items-center justify-between border-b px-4 py-2.5" style={{ borderColor: "var(--gl-border)" }}>
        <span className="text-[11px] font-medium text-muted-foreground">Azure Document AI · OCR output</span>
        <span className="gl-badge !text-[10px]">Layout-agnostic</span>
      </div>
      <div className="grid gap-3 p-4 sm:grid-cols-2">
        <div className="gl-ocr-bill-mock flex flex-col justify-center p-4">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Input</div>
          <div className="mt-2 text-sm font-medium">TANGEDCO LT-11 PDF</div>
          <div className="mt-3 space-y-1.5">
            {[72, 48, 88, 56, 64].map((w, i) => (
              <div key={i} className="h-1.5 rounded bg-white/10" style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Extracted fields</div>
          {rows.map((r) => (
            <div key={r.label} className="flex justify-between gap-2 text-xs">
              <span className="text-muted-foreground">{r.label}</span>
              <span className="font-mono font-medium text-[var(--gl-mint)]">{r.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
