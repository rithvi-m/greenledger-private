import { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { signedUrl } from "@/lib/greenledger/bills";
import { DEMO_BILL, isDemoBillName } from "@/lib/greenledger/billUpload";

type Props = {
  fileUrl: string;
  fileName: string | null;
  fileType: string | null;
};

function isImageType(fileType: string | null, fileName: string | null): boolean {
  const hint = `${fileType ?? ""} ${fileName ?? ""}`.toLowerCase();
  return hint.includes("image/") || /\.(jpg|jpeg|png|webp)$/i.test(hint);
}

function isPdfType(fileType: string | null, fileName: string | null): boolean {
  const hint = `${fileType ?? ""} ${fileName ?? ""}`.toLowerCase();
  return hint.includes("pdf") || hint.endsWith(".pdf");
}

export function BillDocumentPreview({ fileUrl, fileName, fileType }: Props) {
  const [url, setUrl] = useState<string | null>(null);
  const [loadError, setLoadError] = useState(false);
  const isDemo = isDemoBillName(fileName);
  const isImage = isImageType(fileType, fileName);
  const isPdf = isPdfType(fileType, fileName);

  useEffect(() => {
    let alive = true;
    setLoadError(false);
    void signedUrl(fileUrl).then((u) => {
      if (alive) setUrl(u);
    });
    return () => {
      alive = false;
    };
  }, [fileUrl]);

  if (isDemo) {
    return <DemoBillPreview signedUrl={url} />;
  }

  if (!url) {
    return (
      <div className="grid h-[420px] place-items-center text-sm text-muted-foreground">
        Loading document…
      </div>
    );
  }

  if (isImage) {
    return (
      <img
        src={url}
        alt={fileName ?? "Electricity bill"}
        className="max-h-[520px] w-full bg-white object-contain"
        onError={() => setLoadError(true)}
      />
    );
  }

  if (loadError || !isPdf) {
    return (
      <div className="flex h-[420px] flex-col items-center justify-center gap-3 p-6 text-center">
        <FileText className="h-10 w-10 text-muted-foreground" strokeWidth={1.25} />
        <p className="text-sm font-medium">Preview unavailable in browser</p>
        <p className="max-w-xs text-xs text-muted-foreground">
          Open the file in a new tab and enter kWh from the document on the right.
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[var(--gl-primary-light)] underline"
        >
          Open {fileName ?? "bill file"} in new tab
        </a>
      </div>
    );
  }

  return (
    <iframe
      src={url}
      title={fileName ?? "Electricity bill"}
      className="h-[520px] w-full bg-white"
      onError={() => setLoadError(true)}
    />
  );
}

function DemoBillPreview({ signedUrl: docUrl }: { signedUrl: string | null }) {
  return (
    <div className="max-h-[520px] overflow-auto bg-white p-6 text-[13px] leading-relaxed text-neutral-900">
      <div className="border-b border-neutral-300 pb-3 text-center font-bold uppercase tracking-wide">
        Tamil Nadu Generation and Distribution Corporation (TANGEDCO)
      </div>
      <div className="mt-3 text-center text-xs font-semibold uppercase text-neutral-600">
        High Tension Electricity Consumption Bill &amp; Invoice
      </div>
      <div className="mt-6 space-y-2 font-mono text-xs">
        <Row label="Service No" value={DEMO_BILL.account_number} />
        <Row label="Billing month" value="March 2026" />
        <Row label="Consumer" value="Coimbatore Industrial Exporters Unit 4" />
      </div>
      <div className="mt-6 rounded border border-neutral-300 p-4">
        <div className="text-xs font-bold uppercase text-neutral-600">Consumption</div>
        <div className="mt-3 grid gap-2 font-mono text-sm">
          <Row label="Previous reading" value="1,240,500 kWh" />
          <Row label="Current reading" value="1,283,000 kWh" />
          <Row label="Recorded units" value={`${DEMO_BILL.electricity_kwh.toLocaleString("en-IN")} kWh`} highlight />
        </div>
      </div>
      <div className="mt-4 rounded border border-neutral-300 p-4">
        <Row label="Total payable" value={`₹${DEMO_BILL.total_amount.toLocaleString("en-IN")}`} highlight />
        <Row label="Due date" value="15-Apr-2026" />
      </div>
      {docUrl && (
        <a
          href={docUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-xs text-blue-700 underline"
        >
          Open stored PDF
        </a>
      )}
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-neutral-500">{label}</span>
      <span className={highlight ? "font-bold text-emerald-800" : "font-medium"}>{value}</span>
    </div>
  );
}
