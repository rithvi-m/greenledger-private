import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Building2, Shield } from "lucide-react";
import {
  FACILITY,
  TEAM,
  endSession,
  readSession,
  startSession,
  type Session,
  type TeamMember,
} from "@/lib/greenledger/session";
import { Logo } from "@/components/marketing/Logo";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [{ title: "GreenLedger — Facility Access" }],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [returning, setReturning] = useState<Session | null>(null);

  useEffect(() => {
    setReturning(readSession());
  }, []);

  const signIn = (member: TeamMember) => {
    startSession(member);
    navigate({ to: "/app" });
  };

  return (
    <div className="relative min-h-screen">
      <div className="gl-login-bg" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-lg flex-col px-4 py-8 sm:px-6">
        <header className="mb-10 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Home
          </Link>
          <Logo size="sm" />
        </header>

        <div className="gl-console-card p-6">
          <div className="flex items-start gap-3">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
              style={{ background: "rgba(var(--gl-sage-rgb), 0.18)", color: "var(--gl-mint)" }}
            >
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold">{FACILITY.company}</h1>
              <p className="mt-1 text-sm text-muted-foreground">{FACILITY.location}</p>
              <p className="mt-2 font-mono text-xs text-muted-foreground">
                {FACILITY.discom} · {FACILITY.tariff} · {FACILITY.account}
              </p>
            </div>
          </div>
        </div>

        {returning && (
          <div className="gl-console-card mt-4 flex flex-wrap items-center justify-between gap-3 p-4">
            <div className="text-sm">
              <span className="text-muted-foreground">Active session: </span>
              <span className="font-medium">{returning.name}</span>
            </div>
            <div className="flex gap-2">
              <button type="button" className="gl-btn-primary !py-2 !text-xs" onClick={() => navigate({ to: "/app" })}>
                Continue
              </button>
              <button
                type="button"
                className="gl-btn-ghost !py-2 !text-xs"
                onClick={() => {
                  endSession();
                  setReturning(null);
                }}
              >
                Sign out
              </button>
            </div>
          </div>
        )}

        <div className="mt-8">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold">
            <Shield className="h-4 w-4 text-[var(--gl-primary-light)]" />
            Select access role
          </div>
          <p className="mb-5 text-sm text-muted-foreground">
            One-click access to the ABC Steel live prototype — upload a bill, verify kWh, view carbon KPIs.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {TEAM.map((member) => (
              <button
                key={member.id}
                type="button"
                className="gl-role-card text-left"
                onClick={() => signIn(member)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-xs font-bold"
                    style={{ background: "rgba(var(--gl-sage-rgb), 0.18)", color: "var(--gl-mint)" }}
                  >
                    {member.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="font-display text-sm font-semibold">{member.name}</div>
                    <div className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-muted-foreground">
                      {member.role}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <p className="mt-auto pt-8 text-center text-[11px] leading-relaxed text-muted-foreground">
          Demo workspace · Do not upload confidential production bills.<br />
          Files stored in Supabase Storage · verified data only used for reports.
        </p>
      </div>
    </div>
  );
}
