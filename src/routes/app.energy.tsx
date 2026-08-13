import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  type BillRow,
  fetchBills,
  formatCurrency,
  formatNumber,
  monthLabel,
  verifiedBills,
} from "@/lib/greenledger/bills";
import { StatusBadge } from "@/routes/app.bills";

export const Route = createFileRoute("/app/energy")({
  head: () => ({
    meta: [
      { title: "Energy Analytics — GreenLedger" },
      {
        name: "description",
        content:
          "Bill history and electricity usage and cost trends built only from human-verified bills.",
      },
      { property: "og:title", content: "Energy Analytics — GreenLedger" },
      {
        property: "og:description",
        content: "Bill history and electricity usage and cost trends from verified bills only.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Page,
});

function Page() {
  const [bills, setBills] = useState<BillRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void fetchBills()
      .then(setBills)
      .catch((e: unknown) => toast.error(e instanceof Error ? e.message : "Could not load bills"))
      .finally(() => setLoading(false));
  }, []);

  const verified = verifiedBills(bills);
  const data = verified.map((b) => ({
    name: monthLabel(b),
    kwh: b.electricity_kwh ?? 0,
    amount: b.total_amount ?? 0,
  }));

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-lg font-semibold">Energy Analytics</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Bill history and trends grow automatically as more monthly bills are verified. No months
          are estimated or generated.
        </p>
      </header>

      <section className="rounded-[5px] border border-border bg-surface p-5">
        <h2 className="text-sm font-semibold">Bill History</h2>
        {loading ? (
          <p className="mt-3 text-sm text-muted-foreground">Loading…</p>
        ) : verified.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">
            No verified bills yet. Verify an uploaded bill on the Bills page to populate history.
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="pb-2 pr-4 font-medium">Month</th>
                  <th className="pb-2 pr-4 font-medium">Electricity Used</th>
                  <th className="pb-2 pr-4 font-medium">Bill Amount</th>
                  <th className="pb-2 pr-4 font-medium">Power Factor</th>
                  <th className="pb-2 pr-4 font-medium">Status</th>
                  <th className="pb-2 font-medium">Verified By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[...verified].reverse().map((b) => (
                  <tr key={b.id}>
                    <td className="py-3 pr-4 font-medium">{monthLabel(b)}</td>
                    <td className="py-3 pr-4">{formatNumber(b.electricity_kwh)} kWh</td>
                    <td className="py-3 pr-4">{formatCurrency(b.total_amount)}</td>
                    <td className="py-3 pr-4">
                      {b.power_factor === null ? "—" : b.power_factor.toFixed(2)}
                    </td>
                    <td className="py-3 pr-4">
                      <StatusBadge status={b.status} />
                    </td>
                    <td className="py-3">{b.verified_by ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {data.length > 0 && (
        <>
          <section className="rounded-[5px] border border-border bg-surface p-5">
            <h2 className="text-sm font-semibold">Electricity Usage Trend</h2>
            <div className="mt-4 h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 24, right: 12, left: 4, bottom: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} />
                  <YAxis tickLine={false} axisLine={false} fontSize={12} width={70} />
                  <Tooltip
                    cursor={{ fill: "var(--muted)", opacity: 0.4 }}
                    formatter={(v: number) => [`${formatNumber(v)} kWh`, "Consumption"]}
                  />
                  <Bar dataKey="kwh" fill="var(--primary)" radius={[4, 4, 0, 0]} maxBarSize={70}>
                    <LabelList
                      dataKey="kwh"
                      position="top"
                      fontSize={11}
                      formatter={(v: number) => formatNumber(v)}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="rounded-[5px] border border-border bg-surface p-5">
            <h2 className="text-sm font-semibold">Electricity Bill Cost Trend</h2>
            <div className="mt-4 h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 24, right: 16, left: 4, bottom: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} />
                  <YAxis tickLine={false} axisLine={false} fontSize={12} width={80} />
                  <Tooltip formatter={(v: number) => [formatCurrency(v), "Bill amount"]} />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="var(--primary)"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  >
                    <LabelList
                      dataKey="amount"
                      position="top"
                      fontSize={11}
                      formatter={(v: number) => formatCurrency(v)}
                    />
                  </Line>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
