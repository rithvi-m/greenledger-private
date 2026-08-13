export function AnimatedBackground({ variant = "full" }: { variant?: "full" | "subtle" }) {
  return (
    <div
      className={`gl-bg-scene ${variant === "subtle" ? "opacity-30" : "opacity-45"}`}
      aria-hidden="true"
    >
      <div className="gl-orb gl-orb-1" />
      <div className="gl-orb gl-orb-2" />
      {variant === "full" && <div className="gl-orb gl-orb-3" />}
    </div>
  );
}
