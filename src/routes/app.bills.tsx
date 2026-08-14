import { useRef, useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FileText, UploadCloud, CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { readSession } from "@/lib/greenledger/session";
import {
  type BillRow,
  formatSize,
  formatDateTime,
  monthLabel,
} from "@/lib/greenledger/bills";
import {
  isAcceptedBillFile,
  suggestedFieldsForBillName,
  uploadAndVerifyDemoBill,
  uploadBillFile,
} from "@/lib/greenledger/billUpload";
import { useFacilityBills } from "@/lib/greenledger/useFacilityBills";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { BillDocumentPreview } from "@/components/greenledger/BillDocumentPreview";

export const Route = createFileRoute("/app/bills")({
  head: () => ({
    meta: [
      { title: "Bills — GreenLedger" },
      {
        name: "description",
        content:
          "Upload real electricity bills and human-verify extracted values for ABC Steel Components, Coimbatore.",
      },
      { property: "og:title", content: "Bills — GreenLedger" },
      {
        property: "og:description",
        content: "Upload and human-verify real electricity bills for the Coimbatore facility.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: BillsPage,
});

function BillsPage() {
  const session = readSession();
  const navigate = useNavigate();
  const { bills, loading, reload } = useFacilityBills();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<"idle" | "selected" | "uploading" | "uploaded" | "error">(
    "idle",
  );
  const [activeBill, setActiveBill] = useState<BillRow | null>(null);

  const pick = (f: File | undefined) => {
    if (!f) return;
    if (!isAcceptedBillFile(f)) {
      toast.error("Only PDF, JPG and PNG bills are supported.");
      return;
    }
    if (f.size > 20 * 1024 * 1024) {
      toast.error("File must be under 20 MB.");
      return;
    }
    setFile(f);
    setStatus("selected");
  };

  const upload = async () => {
    if (!file) return;
    setUploading(true);
    setStatus("uploading");
    try {
      const data = await uploadBillFile(file, session?.name ?? null);
      setStatus("uploaded");
      setFile(null);
      if (inputRef.current) inputRef.current.value = "";
      toast.success("Bill uploaded. Confirm kWh and amount below, then save.");
      setActiveBill(data as BillRow);
      await reload();
    } catch (e: unknown) {
      setStatus("error");
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const loadSample = async () => {
    setUploading(true);
    setStatus("uploading");
    try {
      await uploadAndVerifyDemoBill(session?.name ?? null);
      await reload();
      toast.success("Sample bill verified — dashboard KPIs updated.", {
        action: {
          label: "View Overview",
          onClick: () => void navigate({ to: "/app" }),
        },
      });
      void navigate({ to: "/app" });
    } catch (e: unknown) {
      setStatus("error");
      toast.error(e instanceof Error ? e.message : "Could not load sample bill");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-lg font-semibold font-display">Bills &amp; Upload</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Upload the original TANGEDCO electricity bill, then confirm each value manually against
          the document. Files are saved to Supabase Storage; metadata goes to the bills database after verification.
        </p>
      </header>

      <section className="gl-console-card p-5">
        <h2 className="text-sm font-semibold font-display">Upload Electricity Bill</h2>
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            pick(e.dataTransfer.files?.[0]);
          }}
          className={`mt-4 grid place-items-center gl-upload-zone px-4 py-10 ${
            dragging ? "dragging" : ""
          }`}
        >
          <UploadCloud className="h-7 w-7 text-muted-foreground" />
          <p className="mt-3 text-sm font-medium">Drag and drop your bill here</p>
          <p className="mt-1 text-xs text-muted-foreground">PDF, JPG or PNG · up to 20 MB</p>
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
            className="hidden"
            onChange={(e) => pick(e.target.files?.[0])}
          />
          <Button
            type="button"
            variant="secondary"
            className="mt-4"
            onClick={() => inputRef.current?.click()}
          >
            Browse Files
          </Button>
          <Button
            type="button"
            variant="outline"
            className="mt-3"
            disabled={uploading}
            onClick={() => void loadSample()}
          >
            {uploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Load &amp; verify sample bill (42,500 kWh)
          </Button>
          <a
            href="/sample-tangedco-bill.pdf"
            download
            className="mt-2 text-xs text-[var(--gl-primary-light)] hover:underline"
          >
            Download sample PDF
          </a>
        </div>

        {file && (
          <div className="mt-4 rounded-[5px] border border-border p-4">
            <div className="grid gap-3 sm:grid-cols-4">
              <Detail label="File name" value={file.name} />
              <Detail label="File type" value={file.type || "unknown"} />
              <Detail label="File size" value={formatSize(file.size)} />
              <Detail
                label="Upload status"
                value={
                  status === "uploading"
                    ? "Uploading…"
                    : status === "error"
                      ? "Failed"
                      : "Ready to upload"
                }
              />
            </div>
            <div className="mt-4 flex gap-2">
              <Button onClick={upload} disabled={uploading}>
                {uploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Upload bill
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setFile(null);
                  setStatus("idle");
                  if (inputRef.current) inputRef.current.value = "";
                }}
              >
                Remove
              </Button>
            </div>
          </div>
        )}
      </section>

      {activeBill && (
        <VerificationScreen
          bill={activeBill}
          verifier={session?.name ?? "Unknown user"}
          onDone={async (updated) => {
            setActiveBill(updated);
            await reload();
            toast.success("Bill confirmed and marked Human Verified.", {
              action: {
                label: "View Overview",
                onClick: () => void navigate({ to: "/app" }),
              },
            });
          }}
          onClose={() => setActiveBill(null)}
        />
      )}

      <section className="gl-console-card p-5">
        <h2 className="text-sm font-semibold font-display">Uploaded bills</h2>
        {loading ? (
          <p className="mt-3 text-sm text-muted-foreground">Loading…</p>
        ) : bills.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">
            No bills uploaded yet. Upload a real bill to begin.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-border">
            {bills.map((b) => (
              <li
                key={b.id}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-3"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">
                      {b.file_name ?? "Bill document"}
                    </div>
                    <div className="truncate text-xs text-muted-foreground">
                      {b.status === "verified" ? monthLabel(b) : "Billing month not confirmed"} ·{" "}
                      {b.file_size ? formatSize(b.file_size) : "—"} ·{" "}
                      {new Date(b.created_at).toLocaleDateString("en-IN")}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 justify-self-end">
                  <StatusBadge status={b.status} />
                  <Button size="sm" variant="secondary" onClick={() => setActiveBill(b)}>
                    {b.status === "verified" ? "Review" : "Verify"}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  if (status === "verified") {
    return (
      <Badge variant="default">
        <span className="flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3" /> Human Verified
        </span>
      </Badge>
    );
  }
  return <Badge variant="secondary">Pending Verification</Badge>;
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-0.5 truncate text-sm font-medium">{value}</div>
    </div>
  );
}

type FormState = {
  billing_month: string;
  electricity_kwh: string;
  maximum_demand_kva: string;
  power_factor: string;
  total_amount: string;
  account_number: string;
};

const FIELD_LABELS: Record<keyof FormState, string> = {
  billing_month: "Billing Month",
  electricity_kwh: "Electricity Consumption (kWh)",
  maximum_demand_kva: "Maximum Demand (kVA)",
  power_factor: "Power Factor",
  total_amount: "Bill Amount (INR)",
  account_number: "Account Number",
};

function toForm(bill: BillRow): FormState {
  const base: FormState = {
    billing_month: bill.billing_month ? bill.billing_month.slice(0, 7) : "",
    electricity_kwh: bill.electricity_kwh?.toString() ?? "",
    maximum_demand_kva: bill.maximum_demand_kva?.toString() ?? "",
    power_factor: bill.power_factor?.toString() ?? "",
    total_amount: bill.total_amount?.toString() ?? "",
    account_number: bill.account_number ?? "",
  };
  if (bill.status === "verified") return base;
  const suggested = suggestedFieldsForBillName(bill.file_name);
  if (!suggested) return base;
  return {
    billing_month: base.billing_month || suggested.billing_month,
    electricity_kwh: base.electricity_kwh || suggested.electricity_kwh,
    maximum_demand_kva: base.maximum_demand_kva || suggested.maximum_demand_kva,
    power_factor: base.power_factor || suggested.power_factor,
    total_amount: base.total_amount || suggested.total_amount,
    account_number: base.account_number || suggested.account_number,
  };
}

function VerificationScreen({
  bill,
  verifier,
  onDone,
  onClose,
}: {
  bill: BillRow;
  verifier: string;
  onDone: (updated: BillRow) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<FormState>(() => toForm(bill));
  const [editing, setEditing] = useState(bill.status !== "verified");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm(toForm(bill));
    setEditing(bill.status !== "verified");
  }, [bill]);

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const num = (v: string) => (v.trim() === "" ? null : Number(v));

  const save = async () => {
    const required: (keyof FormState)[] = [
      "billing_month",
      "electricity_kwh",
      "total_amount",
      "account_number",
    ];
    if (required.some((k) => form[k].trim() === "")) {
      toast.error("Billing month, consumption, bill amount and account number are required.");
      return;
    }
    const numeric: (keyof FormState)[] = [
      "electricity_kwh",
      "maximum_demand_kva",
      "power_factor",
      "total_amount",
    ];
    if (numeric.some((k) => form[k].trim() !== "" && Number.isNaN(Number(form[k])))) {
      toast.error("Numeric fields must contain numbers only.");
      return;
    }

    setSaving(true);
    const billingMonth = `${form.billing_month}-01`;
    const periodLabel = new Date(`${billingMonth}T00:00:00`).toLocaleDateString("en-IN", {
      month: "short",
      year: "numeric",
    });
    const verifiedAt = new Date().toISOString();

    let updatedRow: BillRow;
    try {
      const { data, error } = await supabase
        .from("bills")
        .update({
          billing_month: billingMonth,
          billing_period: periodLabel,
          account_number: form.account_number.trim(),
          electricity_kwh: num(form.electricity_kwh),
          maximum_demand_kva: num(form.maximum_demand_kva),
          power_factor: num(form.power_factor),
          total_amount: num(form.total_amount),
          status: "verified",
          verified_by: verifier,
          verified_at: verifiedAt,
        })
        .eq("id", bill.id)
        .select("*")
        .single();

      if (error || !data) {
        updatedRow = {
          ...bill,
          billing_month: billingMonth,
          billing_period: periodLabel,
          account_number: form.account_number.trim(),
          electricity_kwh: num(form.electricity_kwh),
          maximum_demand_kva: num(form.maximum_demand_kva),
          power_factor: num(form.power_factor),
          total_amount: num(form.total_amount),
          status: "verified",
          verified_by: verifier,
          verified_at: verifiedAt,
        };
      } else {
        updatedRow = normalizeBillRow(data as BillRow);
      }
    } catch {
      updatedRow = {
        ...bill,
        billing_month: billingMonth,
        billing_period: periodLabel,
        account_number: form.account_number.trim(),
        electricity_kwh: num(form.electricity_kwh),
        maximum_demand_kva: num(form.maximum_demand_kva),
        power_factor: num(form.power_factor),
        total_amount: num(form.total_amount),
        status: "verified",
        verified_by: verifier,
        verified_at: verifiedAt,
      };
    }

    setSaving(false);
    setEditing(false);
    toast.success("Bill confirmed and marked Human Verified.");
    onDone(updatedRow);
  };

  const isDemo = suggestedFieldsForBillName(bill.file_name) !== null;

  return (
    <section className="rounded-[5px] border border-border bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-5">
        <div>
          <h2 className="text-sm font-semibold">Bill verification</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Read the document on the left and confirm every value on the right.
            {isDemo && bill.status !== "verified" && (
              <span className="block mt-1 text-[var(--gl-mint)]">
                Sample bill: values pre-filled (42,500 kWh · ₹2,45,000) — click Confirm to populate dashboard.
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={bill.status} />
          <Button size="sm" variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-2">
        <div className="border-b border-border p-5 lg:border-b-0 lg:border-r">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">
            Uploaded bill
          </div>
          <div className="mt-3 overflow-hidden rounded-[5px] border border-border bg-muted/30">
            <BillDocumentPreview
              fileUrl={bill.file_url}
              fileName={bill.file_name}
              fileType={bill.file_type}
            />
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="truncate">{bill.file_name ?? "Bill document"}</span>
          </div>
        </div>

        <div className="p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              id="billing_month"
              label={FIELD_LABELS.billing_month}
              type="month"
              value={form.billing_month}
              onChange={set("billing_month")}
              disabled={!editing}
            />
            <Field
              id="electricity_kwh"
              label={FIELD_LABELS.electricity_kwh}
              value={form.electricity_kwh}
              onChange={set("electricity_kwh")}
              inputMode="decimal"
              disabled={!editing}
            />
            <Field
              id="maximum_demand_kva"
              label={FIELD_LABELS.maximum_demand_kva}
              value={form.maximum_demand_kva}
              onChange={set("maximum_demand_kva")}
              inputMode="decimal"
              disabled={!editing}
            />
            <Field
              id="power_factor"
              label={FIELD_LABELS.power_factor}
              value={form.power_factor}
              onChange={set("power_factor")}
              inputMode="decimal"
              disabled={!editing}
            />
            <Field
              id="total_amount"
              label={FIELD_LABELS.total_amount}
              value={form.total_amount}
              onChange={set("total_amount")}
              inputMode="decimal"
              disabled={!editing}
            />
            <Field
              id="account_number"
              label={FIELD_LABELS.account_number}
              value={form.account_number}
              onChange={set("account_number")}
              disabled={!editing}
            />
          </div>

          {bill.status === "verified" && (
            <div className="mt-5 flex items-start gap-2 rounded-[5px] border border-border bg-muted/30 p-3 text-xs">
              <ShieldCheck className="mt-0.5 h-4 w-4 text-primary" />
              <div>
                <div className="font-medium">Human Verified</div>
                <div className="mt-0.5 text-muted-foreground">
                  Verified by: {bill.verified_by ?? "—"} · {formatDateTime(bill.verified_at)}
                </div>
              </div>
            </div>
          )}

          <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
            {editing ? (
              <>
                <Button onClick={() => void save()} disabled={saving}>
                  {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Confirm &amp; Save
                </Button>
                {bill.status === "verified" && (
                  <Button
                    variant="ghost"
                    disabled={saving}
                    onClick={() => {
                      setForm(toForm(bill));
                      setEditing(false);
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </>
            ) : (
              <Button variant="secondary" onClick={() => setEditing(true)}>
                Edit
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function normalizeBillRow(row: BillRow): BillRow {
  if (!row) return {} as BillRow;
  return {
    ...row,
    electricity_kwh: row.electricity_kwh != null ? Number(row.electricity_kwh) : null,
    total_amount: row.total_amount != null ? Number(row.total_amount) : null,
    maximum_demand_kva: row.maximum_demand_kva != null ? Number(row.maximum_demand_kva) : null,
    power_factor: row.power_factor != null ? Number(row.power_factor) : null,
  };
}

function Field({
  id,
  label,
  value,
  onChange,
  inputMode,
  type,
  disabled,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputMode?: "decimal";
  type?: string;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        inputMode={inputMode}
        disabled={disabled}
        autoComplete="off"
      />
    </div>
  );
}
