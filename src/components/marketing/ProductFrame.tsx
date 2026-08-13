import type { ReactNode } from "react";

/** Browser-style frame so the preview reads as the live app, not a marketing mock. */
export function ProductFrame({ children, label = "ABC Steel · Overview" }: { children: ReactNode; label?: string }) {
  return (
    <div className="gl-product-frame">
      <div className="gl-product-frame-chrome">
        <div className="flex items-center gap-1.5">
          <span className="gl-window-dot gl-window-dot-red" />
          <span className="gl-window-dot gl-window-dot-amber" />
          <span className="gl-window-dot gl-window-dot-green" />
        </div>
        <div className="gl-product-frame-url">
          <span className="gl-live-dot" aria-hidden="true" />
          greenledger.app / {label}
        </div>
        <span className="gl-live-badge">LIVE</span>
      </div>
      <div className="gl-product-frame-body">{children}</div>
    </div>
  );
}
