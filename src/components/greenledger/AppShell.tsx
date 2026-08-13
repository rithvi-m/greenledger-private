import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  LayoutGrid,
  FileText,
  BarChart3,
  Bell,
  ClipboardList,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/marketing/Logo";
import { FACILITY, endSession, readSession, type Session } from "@/lib/greenledger/session";

export const NAV_ITEMS = [
  { to: "/app", label: "Overview", icon: LayoutGrid, exact: true },
  { to: "/app/bills", label: "Bills & Upload", icon: FileText },
  { to: "/app/carbon", label: "Carbon & CBAM", icon: BarChart3 },
  { to: "/app/alerts", label: "Alerts", icon: Bell },
  { to: "/app/reports", label: "Reports", icon: ClipboardList },
] as const;

const PAGE_TITLES: Record<string, string> = {
  "/app": "Overview",
  "/app/bills": "Bills & Upload",
  "/app/carbon": "Carbon & CBAM",
  "/app/alerts": "Alerts",
  "/app/reports": "Reports",
};

function currentPeriodLabel() {
  return new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" });
}

export function AppShell({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(() => readSession());
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!session) navigate({ to: "/login", replace: true });
  }, [session, navigate]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (!session) return null;

  const leave = () => {
    endSession();
    setSession(null);
    navigate({ to: "/login" });
  };

  const pageTitle =
    PAGE_TITLES[pathname] ??
    NAV_ITEMS.find((n) => pathname.startsWith(n.to))?.label ??
    "Dashboard";

  const nav = (
    <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 py-4">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            activeOptions={{ exact: item.to === "/app" }}
            className="gl-nav-link"
          >
            <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
            <span className="truncate">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );

  const userBlock = (
    <div className="border-t px-3 py-4" style={{ borderColor: "var(--gl-border)" }}>
      <div className="flex min-w-0 items-center gap-3 px-1">
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-xs font-semibold"
          style={{ background: "rgba(var(--gl-sage-rgb), 0.18)", color: "var(--gl-mint)" }}
        >
          {session.name.slice(0, 1)}
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-medium">{session.name}</div>
          <div className="truncate text-[11px] text-muted-foreground">
            {session.role.split("·")[0]?.trim()}
          </div>
        </div>
      </div>
      <Button
        size="sm"
        variant="ghost"
        className="mt-3 w-full text-muted-foreground hover:text-[var(--gl-danger)]"
        onClick={leave}
      >
        Sign out
      </Button>
    </div>
  );

  const sidebarInner = (
    <div className="flex h-full flex-col border-r bg-[var(--gl-bg-elevated)]" style={{ borderColor: "var(--gl-border)" }}>
      <div className="border-b px-4 py-4" style={{ borderColor: "var(--gl-border)" }}>
        <Logo size="sm" />
        <p className="mt-1 pl-[42px] text-[10px] text-muted-foreground">{FACILITY.discom} · {FACILITY.tariff}</p>
      </div>
      {nav}
      {userBlock}
    </div>
  );

  return (
    <div className="relative min-h-screen">
      <div className="gl-console-bg" aria-hidden="true" />

      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[248px] lg:block">{sidebarInner}</aside>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} aria-hidden="true" />
          <div className="absolute inset-y-0 left-0 w-[260px] max-w-[85vw]">{sidebarInner}</div>
        </div>
      )}

      <div className="relative z-10 lg:pl-[248px]">
        <header className="sticky top-0 z-20 border-b bg-[var(--gl-bg)]" style={{ borderColor: "var(--gl-border)" }}>
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                aria-label="Open navigation"
                onClick={() => setOpen(true)}
                className="rounded-md border p-2 lg:hidden"
                style={{ borderColor: "var(--gl-border)" }}
              >
                <Menu className="h-4 w-4" />
              </button>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold font-display">{pageTitle}</div>
                <div className="truncate text-xs text-muted-foreground">
                  {FACILITY.company} · {currentPeriodLabel()}
                </div>
              </div>
            </div>
            <div className="hidden shrink-0 text-right sm:block">
              <div className="text-[11px] text-muted-foreground">Account</div>
              <div className="font-mono text-xs">{FACILITY.account}</div>
            </div>
          </div>
        </header>
        <main className="px-4 py-6 sm:px-6">{children}</main>
      </div>
    </div>
  );
}

export function SectionPlaceholder({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="gl-console-card p-5">
      <h1 className="font-display text-base font-semibold">{title}</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
