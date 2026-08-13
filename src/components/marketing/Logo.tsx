export function Logo({ size = "md", showText = true }: { size?: "sm" | "md" | "lg"; showText?: boolean }) {
  const sizes = {
    sm: { box: "h-8 w-8", icon: 16, text: "text-sm" },
    md: { box: "h-9 w-9", icon: 18, text: "text-base" },
    lg: { box: "h-11 w-11", icon: 22, text: "text-lg" },
  };
  const s = sizes[size] || sizes.md;

  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`${s.box} relative flex items-center justify-center rounded-[10px] overflow-hidden`}
        style={{
          background: "linear-gradient(145deg, var(--gl-primary) 0%, var(--gl-primary-dark) 100%)",
          boxShadow: "0 2px 8px rgba(45,106,79,0.25), inset 0 1px 0 rgba(255,255,255,0.25)",
        }}
      >
        <svg width={s.icon} height={s.icon} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="4" y="14" width="3" height="6" rx="0.5" fill="rgba(255,255,255,0.85)" />
          <rect x="9" y="10" width="3" height="10" rx="0.5" fill="rgba(255,255,255,0.95)" />
          <rect x="14" y="6" width="3" height="14" rx="0.5" fill="white" />
          <rect x="19" y="12" width="3" height="8" rx="0.5" fill="rgba(255,255,255,0.7)" />
          <path d="M3 20.5h19" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        </svg>
      </div>
      {showText && (
        <span className={`${s.text} font-bold font-display tracking-tight`} style={{ color: "var(--gl-text)" }}>
          Green<span style={{ color: "var(--gl-primary-light)" }}>Ledger</span>
        </span>
      )}
    </div>
  );
}
