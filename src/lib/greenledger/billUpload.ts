import { supabase } from "@/integrations/supabase/client";
import { FACILITY_ID } from "@/lib/greenledger/bills";

const EXT_TYPES: Record<string, string> = {
  pdf: "application/pdf",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
};

export function billFileMime(file: File): string | null {
  if (file.type && file.type !== "application/octet-stream") {
    return file.type;
  }
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  return EXT_TYPES[ext] ?? null;
}

export function isAcceptedBillFile(file: File): boolean {
  return billFileMime(file) !== null;
}

export const DEMO_BILL = {
  fileName: "Sample_TANGEDCO_Electricity_Bill.pdf",
  publicPath: "/sample-tangedco-bill.pdf",
  billing_month: "2026-03",
  electricity_kwh: 42500,
  total_amount: 245000,
  account_number: "HT-4290-004984",
} as const;

export async function fetchDemoBillFile(): Promise<File> {
  const res = await fetch(DEMO_BILL.publicPath);
  if (!res.ok) throw new Error("Sample bill not found. Restart dev server and try again.");
  const blob = await res.blob();
  return new File([blob], DEMO_BILL.fileName, { type: "application/pdf" });
}

export function isDemoBillName(fileName: string | null | undefined): boolean {
  if (!fileName) return false;
  const name = fileName.toLowerCase();
  return (
    name.includes("sample_tangedco") ||
    name.includes("sample-tangedco") ||
    name === DEMO_BILL.fileName.toLowerCase()
  );
}

export function suggestedFieldsForBillName(fileName: string | null | undefined) {
  if (!isDemoBillName(fileName)) return null;
  return {
    billing_month: DEMO_BILL.billing_month,
    electricity_kwh: String(DEMO_BILL.electricity_kwh),
    total_amount: String(DEMO_BILL.total_amount),
    account_number: DEMO_BILL.account_number,
    maximum_demand_kva: "",
    power_factor: "",
  };
}

export async function uploadBillFile(file: File, uploadedBy: string | null) {
  const mime = billFileMime(file);
  if (!mime) {
    throw new Error("Only PDF, JPG and PNG bills are supported.");
  }
  if (file.size > 20 * 1024 * 1024) {
    throw new Error("File must be under 20 MB.");
  }

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "bin";
  const path = `${FACILITY_ID}/${crypto.randomUUID()}.${ext}`;

  const { error: upErr } = await supabase.storage.from("bills").upload(path, file, {
    contentType: mime,
    upsert: false,
  });
  if (upErr) throw new Error(upErr.message);

  const { data, error } = await supabase
    .from("bills")
    .insert({
      facility_id: FACILITY_ID,
      file_url: path,
      file_name: file.name,
      file_type: mime,
      file_size: file.size,
      status: "pending_verification",
      uploaded_by: uploadedBy,
    })
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  return data;
}

/** One-click demo: upload sample bill and mark verified immediately. */
export async function uploadAndVerifyDemoBill(uploadedBy: string | null) {
  const file = await fetchDemoBillFile();
  const row = await uploadBillFile(file, uploadedBy);
  const billingMonth = `${DEMO_BILL.billing_month}-01`;
  const periodLabel = new Date(`${billingMonth}T00:00:00`).toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric",
  });

  const { data, error } = await supabase
    .from("bills")
    .update({
      billing_month: billingMonth,
      billing_period: periodLabel,
      account_number: DEMO_BILL.account_number,
      electricity_kwh: DEMO_BILL.electricity_kwh,
      total_amount: DEMO_BILL.total_amount,
      status: "verified",
      verified_by: uploadedBy,
      verified_at: new Date().toISOString(),
    })
    .eq("id", row.id)
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  return data;
}
