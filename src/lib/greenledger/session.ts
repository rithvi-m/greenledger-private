export type Permission =
  | "view_dashboard"
  | "upload_bills"
  | "verify_bills"
  | "manage_users"
  | "view_reports"
  | "generate_reports"
  | "view_audit_history"
  | "access_settings"
  | "view_carbon_analytics"
  | "view_compliance"
  | "view_evidence_trail"
  | "analyze_energy_data"
  | "compare_months"
  | "run_savings_analysis"
  | "ask_greenledger";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  initials: string;
  permissions: Permission[];
};

export const FACILITY = {
  company: "ABC Steel Components",
  location: "Coimbatore, Tamil Nadu",
  industry: "Steel Components Manufacturing",
  discom: "TANGEDCO",
  tariff: "LT-11 · Industrial",
  account: "TN-41-8821-0047",
};

export const TEAM: TeamMember[] = [
  {
    id: "admin",
    name: "Facility Administrator",
    role: "Upload bills · Verify data · Export CBAM reports",
    initials: "FA",
    permissions: [
      "view_dashboard",
      "upload_bills",
      "verify_bills",
      "manage_users",
      "view_reports",
      "generate_reports",
      "view_audit_history",
      "access_settings",
      "view_carbon_analytics",
      "compare_months",
      "ask_greenledger",
    ],
  },
  {
    id: "compliance",
    name: "Compliance Verifier",
    role: "Human-verify OCR bills · Audit trail · ISO checks",
    initials: "CV",
    permissions: [
      "view_dashboard",
      "upload_bills",
      "verify_bills",
      "view_audit_history",
      "generate_reports",
      "view_reports",
      "view_compliance",
    ],
  },
  {
    id: "auditor",
    name: "ESG Auditor",
    role: "Scope 1 & 2 analytics · EU buyer certificates",
    initials: "EA",
    permissions: [
      "view_dashboard",
      "view_carbon_analytics",
      "view_compliance",
      "view_evidence_trail",
      "view_audit_history",
      "generate_reports",
      "view_reports",
      "ask_greenledger",
    ],
  },
  {
    id: "analyst",
    name: "Energy Analyst",
    role: "kWh trends · Leak detection · Savings modelling",
    initials: "EN",
    permissions: [
      "view_dashboard",
      "analyze_energy_data",
      "compare_months",
      "run_savings_analysis",
      "view_reports",
      "ask_greenledger",
    ],
  },
];

export type Session = {
  userId: string;
  name: string;
  role: string;
  permissions: Permission[];
  signedInAt: string;
};

const KEY = "greenledger.session";

export function readSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function startSession(member: TeamMember): Session {
  const session: Session = {
    userId: member.id,
    name: member.name,
    role: member.role,
    permissions: member.permissions,
    signedInAt: new Date().toISOString(),
  };
  window.localStorage.setItem(KEY, JSON.stringify(session));
  return session;
}

export function endSession() {
  window.localStorage.removeItem(KEY);
}

export function findMemberByEmail(email: string): TeamMember | undefined {
  const handle = email.trim().toLowerCase().split("@")[0];
  return TEAM.find(
    (m) => m.id === handle || m.name.toLowerCase().replace(/\s+/g, "") === handle,
  );
}
