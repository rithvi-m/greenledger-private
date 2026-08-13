import { useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Download, Loader2, UploadCloud, Zap } from "lucide-react";
import { toast } from "sonner";
import { readSession } from "@/lib/greenledger/session";
import {
  fetchDemoBillFile,
  isAcceptedBillFile,
  uploadAndVerifyDemoBill,
  uploadBillFile,
} from "@/lib/greenledger/billUpload";

type Props = {
  compact?: boolean;
  onUploaded?: () => void;
};

export function BillUploadZone({ compact, onUploaded }: Props) {
  const session = readSession();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  const upload = async (f: File) => {
    if (!isAcceptedBillFile(f)) {
      toast.error("Only PDF, JPG and PNG bills are supported.");
      return;
    }

    setUploading(true);
    try {
      await uploadBillFile(f, session?.name ?? null);
      toast.success("Bill uploaded. Next: verify kWh on the Bills page.", {
        action: {
          label: "Verify now",
          onClick: () => void navigate({ to: "/app/bills" }),
        },
      });
      await onUploaded?.();
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const pick = async (f: File | undefined) => {
    if (!f) return;
    await upload(f);
  };

  const useSampleBill = async () => {
    setUploading(true);
    try {
      await uploadAndVerifyDemoBill(session?.name ?? null);
      await onUploaded?.();
      toast.success("Sample bill verified — 42,500 kWh loaded on dashboard.");
      void navigate({ to: "/app" });
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Could not load sample bill");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="gl-console-card p-5">
      <h2 className="text-sm font-semibold font-display">Upload TANGEDCO bill</h2>
      <p className="mt-1 text-xs text-muted-foreground">
        PDF, JPG or PNG · up to 20 MB · KPIs appear after you verify kWh on Bills
      </p>

      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && !uploading && inputRef.current?.click()}
        onClick={() => !uploading && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          void pick(e.dataTransfer.files?.[0]);
        }}
        className={`gl-upload-zone mt-4 ${dragging ? "dragging" : ""}`}
      >
        {uploading ? (
          <Loader2 className="h-7 w-7 animate-spin text-[var(--gl-primary-light)]" />
        ) : (
          <UploadCloud className="h-7 w-7 text-muted-foreground" strokeWidth={1.5} />
        )}
        <p className="mt-3 text-sm font-medium">
          {uploading ? "Uploading…" : "Drop PDF here or click to browse"}
        </p>
        {!compact && (
          <p className="mt-1 text-xs text-muted-foreground">
            Windows tip: if upload fails, use “Load sample bill” below
          </p>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
        className="hidden"
        onChange={(e) => void pick(e.target.files?.[0])}
      />

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          disabled={uploading}
          onClick={() => void useSampleBill()}
          className="gl-btn-primary !py-2 !text-xs"
        >
          <Zap className="h-3.5 w-3.5" />
          Load &amp; verify sample bill
        </button>
        <a href="/sample-tangedco-bill.pdf" download className="gl-btn-ghost !py-2 !text-xs">
          <Download className="h-3.5 w-3.5" />
          Download sample PDF
        </a>
        <Link to="/app/bills" className="gl-btn-ghost !py-2 !text-xs">
          Verify uploaded bills
        </Link>
      </div>
    </div>
  );
}
