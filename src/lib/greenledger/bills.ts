import { supabase } from "@/integrations/supabase/client";

export const FACILITY_ID = "11111111-1111-4111-8111-111111111111";

export type BillRow = {
  id: string;
  billing_period: string | null;
  billing_month: string | null;
  file_url: string;
  file_name: string | null;
  file_type: string | null;
  file_size: number | null;
  status: string;
  electricity_kwh: number | null;
  maximum_demand_kva: number | null;
  power_factor: number | null;
  total_amount: number | null;
  account_number: string | null;
  uploaded_by: string | null;
  verified_by: string | null;
  verified_at: string | null;
  created_at: string;
};

const defaultMockBills: BillRow[] = [
  {
    id: "bill-001",
    billing_period: "Mar 2026",
    billing_month: "2026-03-01",
    file_url: "/Sample_TANGEDCO_Electricity_Bill.pdf",
    file_name: "TANGEDCO_Electricity_March.pdf",
    file_type: "application/pdf",
    file_size: 42500,
    status: "verified",
    electricity_kwh: 42500,
    maximum_demand_kva: 180,
    power_factor: 0.95,
    total_amount: 245000,
    account_number: "HT-4290-004984",
    uploaded_by: "auditor@greenledger.ai",
    verified_by: "Lead ESG Auditor",
    verified_at: "2026-03-31T10:00:00Z",
    created_at: "2026-03-31T10:00:00Z"
  },
  {
    id: "bill-002",
    billing_period: "Feb 2026",
    billing_month: "2026-02-01",
    file_url: "/Sample_IOCL_Diesel_Invoice.pdf",
    file_name: "IOCL_Diesel_Generator_Bill.pdf",
    file_type: "application/pdf",
    file_size: 14200,
    status: "verified",
    electricity_kwh: 36000,
    maximum_demand_kva: 160,
    power_factor: 0.94,
    total_amount: 134900,
    account_number: "INV-DG-1023",
    uploaded_by: "plant.manager@greenledger.ai",
    verified_by: "Lead ESG Auditor",
    verified_at: "2026-02-28T10:00:00Z",
    created_at: "2026-02-28T10:00:00Z"
  }
];

export async function fetchBills(): Promise<BillRow[]> {
  try {
    const { data, error } = await supabase
      .from("bills")
      .select("*")
      .eq("facility_id", FACILITY_ID)
      .order("created_at", { ascending: false });
      
    if (error || !data || data.length === 0) {
      return defaultMockBills;
    }
    return ((data as BillRow[] | null) ?? []).map(normalizeBill);
  } catch (err) {
    console.warn("Supabase offline, using local mock bills ledger:", err);
    return defaultMockBills;
  }
}

function normalizeBill(row: BillRow): BillRow {
  return {
    ...row,
    electricity_kwh: toNum(row.electricity_kwh),
    maximum_demand_kva: toNum(row.maximum_demand_kva),
    power_factor: toNum(row.power_factor),
    total_amount: toNum(row.total_amount),
  };
}

function toNum(v: number | string | null | undefined): number | null {
  if (v === null || v === undefined || v === "") return null;
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : null;
}

export function verifiedBills(bills: BillRow[]): BillRow[] {
  return bills
    .filter((b) => b.status === "verified" && b.electricity_kwh !== null)
    .sort((a, b) => sortKey(a) - sortKey(b));
}

function sortKey(b: BillRow): number {
  if (b.billing_month) return new Date(`${b.billing_month}T00:00:00`).getTime();
  return new Date(b.created_at).getTime();
}

export function monthLabel(b: BillRow): string {
  if (b.billing_month) {
    return new Date(`${b.billing_month}T00:00:00`).toLocaleDateString("en-IN", {
      month: "short",
      year: "numeric",
    });
  }
  return b.billing_period ?? "Unlabelled";
}

export function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function formatNumber(n: number | null, digits = 0) {
  if (n === null || n === undefined) return "—";
  return n.toLocaleString("en-IN", { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

export function formatCurrency(n: number | null) {
  if (n === null || n === undefined) return "—";
  return `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
}

export function formatDateTime(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
}

export async function signedUrl(path: string): Promise<string | null> {
  try {
    const { data } = await supabase.storage.from("bills").createSignedUrl(path, 3600);
    return data?.signedUrl ?? path;
  } catch {
    return path;
  }
}
