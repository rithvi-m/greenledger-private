import { createFileRoute, Link } from "@tanstack/react-router";

import {

  Bar,

  BarChart,

  CartesianGrid,

  ResponsiveContainer,

  Tooltip,

  XAxis,

  YAxis,

} from "recharts";

import {

  AlertTriangle,

  ArrowDownRight,

  ArrowUpRight,

  BadgeCheck,

  FileUp,

  Minus,

} from "lucide-react";

import { BillUploadZone } from "@/components/greenledger/BillUploadZone";

import {

  formatCurrency,

  formatNumber,

  monthLabel,

} from "@/lib/greenledger/bills";

import {

  CEA_GRID_FACTOR,

  demoMetricsFromBills,

  formatInrLakhs,

  formatTco2e,

} from "@/lib/greenledger/metrics";

import { useFacilityBills } from "@/lib/greenledger/useFacilityBills";

import { FACILITY } from "@/lib/greenledger/session";

import { DataSourceBanner } from "@/components/greenledger/DataPrivacyPanel";



export const Route = createFileRoute("/app/")({

  head: () => ({

    meta: [

      { title: "Overview — GreenLedger" },

      {

        name: "description",

        content: "Facility compliance overview for ABC Steel Components, Coimbatore.",

      },

    ],

  }),

  component: Page,

});



function Page() {
  const { loading, reload, hasVerified, hasPending, current, previous, error } =
    useFacilityBills();

  const metrics = demoMetricsFromBills(current, previous);
  const hasComparison = Boolean(current && previous);



  const chartData = hasComparison

    ? [

        { name: monthLabel(previous!), kwh: previous!.electricity_kwh ?? 0 },

        { name: monthLabel(current!), kwh: current!.electricity_kwh ?? 0 },

      ]

    : current

      ? [{ name: monthLabel(current), kwh: current.electricity_kwh ?? 0 }]

      : [];



  const diff =

    hasComparison && current && previous

      ? (current.electricity_kwh ?? 0) - (previous.electricity_kwh ?? 0)

      : null;



  return (

    <div className="space-y-6">

      <DataSourceBanner empty={!hasVerified} />

      {error && (
        <div className="gl-alert-strip gl-alert-warn">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--gl-warn)" }} />
          <div className="text-sm">
            Could not load bills: {error}. Check your connection and refresh.
          </div>
        </div>
      )}

      {!hasVerified && hasPending && (
        <div className="gl-alert-strip">
          <FileUp className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gl-sage)]" />
          <div>
            <div className="text-sm font-medium">Bill uploaded — verification required</div>
            <div className="mt-0.5 text-xs text-muted-foreground">
              Open{" "}
              <Link to="/app/bills" className="text-[var(--gl-primary-light)] hover:underline">
                Bills
              </Link>{" "}
              and click <strong>Verify</strong> → <strong>Confirm &amp; Save</strong> to populate KPIs.
            </div>
          </div>
        </div>
      )}



      <header>

        <p className="text-xs text-muted-foreground">

          {FACILITY.discom} · {FACILITY.tariff}

          {hasVerified

            ? " · Figures from human-verified bills"

            : " · Upload & verify a bill to populate KPIs"}

        </p>

      </header>



      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">

        <Kpi

          label="CBAM exposure"

          value={formatInrLakhs(metrics.cbam)}

          sub={hasVerified ? "Est. tariff if uncertified" : "Awaiting verified bill"}

          accent={hasVerified ? "var(--gl-accent)" : undefined}

          delta={null}

          muted={!hasVerified}

        />

        <Kpi

          label="Monthly kWh"

          value={formatNumber(metrics.kwh)}

          sub={current ? monthLabel(current) : "Awaiting verified bill"}

          delta={metrics.kwhDelta}

          muted={!hasVerified}

        />

        <Kpi

          label="Scope 2 tCO₂e"

          value={formatTco2e(metrics.tco2e)}

          sub={hasVerified ? `CEA ${CEA_GRID_FACTOR} kg/kWh` : "Calculated after bill verify"}

          delta={null}

          muted={!hasVerified}

        />

        <Kpi

          label="Utility spend"

          value={formatCurrency(metrics.spend)}

          sub={hasVerified ? "TANGEDCO bill total" : "Awaiting verified bill"}

          accent={hasVerified ? "var(--gl-accent)" : undefined}

          delta={null}

          muted={!hasVerified}

        />

      </section>



      <section className="grid gap-4 lg:grid-cols-[2fr_3fr]">

        <BillUploadZone compact onUploaded={() => void reload()} />

        <div className="gl-console-card p-5">

          <h2 className="text-sm font-semibold font-display">Electricity consumption</h2>

          <p className="mt-1 text-xs text-muted-foreground">

            {hasVerified

              ? hasComparison

                ? "Month-over-month from verified bills"

                : "One month on file — upload another bill to compare"

              : "Chart appears after your first verified bill"}

          </p>

          {loading ? (

            <p className="mt-8 text-sm text-muted-foreground">Loading…</p>

          ) : chartData.length === 0 ? (

            <EmptyChartState />

          ) : (

            <>

              <div className="mt-4 h-56 w-full">

                <ResponsiveContainer width="100%" height="100%">

                  <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>

                    <CartesianGrid strokeDasharray="3 3" stroke="var(--gl-border)" vertical={false} />

                    <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={11} stroke="#6B7A6E" />

                    <YAxis tickLine={false} axisLine={false} fontSize={11} width={56} stroke="#6B7A6E" />

                    <Tooltip

                      cursor={{ fill: "rgba(var(--gl-sage-rgb), 0.1)" }}

                      contentStyle={{

                        background: "var(--gl-surface)",

                        border: "1px solid var(--gl-border)",

                        borderRadius: 6,

                        fontSize: 12,

                      }}

                      formatter={(v: number) => [`${formatNumber(v)} kWh`, "Consumption"]}

                    />

                    <Bar dataKey="kwh" fill="var(--gl-primary)" radius={[4, 4, 0, 0]} maxBarSize={72} />

                  </BarChart>

                </ResponsiveContainer>

              </div>

              {diff !== null && (

                <p className="mt-3 flex items-center gap-2 text-sm">

                  <DeltaIcon delta={diff} />

                  <span>

                    {diff === 0

                      ? "Same usage as previous month."

                      : `${formatNumber(Math.abs(diff))} kWh ${diff > 0 ? "more" : "less"} than last month.`}

                  </span>

                </p>

              )}

            </>

          )}

        </div>

      </section>



      <section className="space-y-3">

        {!hasVerified ? (

          <div className="gl-alert-strip">

            <FileUp className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gl-sage)]" />

            <div>

              <div className="text-sm font-medium">No verified bills yet</div>

              <div className="mt-0.5 text-xs text-muted-foreground">

                Upload a TANGEDCO PDF, then open{" "}

                <Link to="/app/bills" className="text-[var(--gl-primary-light)] hover:underline">

                  Bills

                </Link>{" "}

                to verify kWh. KPIs, chart, and certificate populate from that data.

              </div>

            </div>

          </div>

        ) : (

          <>

            <div className="gl-alert-strip gl-alert-warn">

              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--gl-warn)" }} />

              <div>

                <div className="text-sm font-medium">Generator run-hours 40% above baseline</div>

                <div className="mt-0.5 text-xs text-muted-foreground">

                  Estimated hidden utility leak of{" "}

                  <span style={{ color: "var(--gl-accent)" }}>~₹45,000/mo</span> (modeled — pilot validation pending) —{" "}

                  <Link to="/app/alerts" className="text-[var(--gl-primary-light)] hover:underline">

                    view alert details

                  </Link>

                </div>

              </div>

            </div>

            <div className="gl-alert-strip gl-alert-ok">

              <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gl-primary-light)]" />

              <div>

                <div className="text-sm font-medium">ISO 14064 draft certificate ready</div>

                <div className="mt-0.5 text-xs text-muted-foreground">

                  Scope 1 &amp; 2 report aligned for EU CBAM filing —{" "}

                  <Link to="/app/reports" className="text-[var(--gl-primary-light)] hover:underline">

                    preview certificate

                  </Link>

                </div>

              </div>

            </div>

          </>

        )}

      </section>

    </div>

  );

}



function EmptyChartState() {

  return (

    <div className="mt-6 flex h-56 flex-col items-center justify-center rounded-md border border-dashed px-4 text-center" style={{ borderColor: "var(--gl-border)" }}>

      <FileUp className="h-8 w-8 text-muted-foreground" strokeWidth={1.25} />

      <p className="mt-3 text-sm font-medium">No consumption data yet</p>

      <p className="mt-1 max-w-xs text-xs text-muted-foreground">

        Upload and verify a TANGEDCO bill to see kWh trends here.

      </p>

    </div>

  );

}



function Kpi({

  label,

  value,

  sub,

  delta,

  accent,

  muted,

}: {

  label: string;

  value: string;

  sub: string;

  delta: number | null;

  accent?: string;

  muted?: boolean;

}) {

  return (

    <div className={`gl-kpi ${muted ? "gl-kpi-empty" : ""}`}>

      <div className="gl-kpi-label">{label}</div>

      <div className="gl-kpi-value" style={accent ? { color: accent } : undefined}>

        {value}

      </div>

      <div className="gl-kpi-sub">{sub}</div>

      {delta !== null && <DeltaChip delta={delta} />}

    </div>

  );

}



function DeltaChip({ delta }: { delta: number }) {

  const flat = Math.abs(delta) < 0.05;

  const up = delta > 0;

  const cls = flat ? "gl-kpi-delta-flat" : up ? "gl-kpi-delta-up" : "gl-kpi-delta-down";

  return (

    <span className={`gl-kpi-delta ${cls}`}>

      {flat ? <Minus className="h-3 w-3" /> : up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}

      {flat ? "No change" : `${delta > 0 ? "+" : ""}${delta.toFixed(1)}%`}

    </span>

  );

}



function DeltaIcon({ delta }: { delta: number }) {

  if (delta === 0) return <Minus className="h-4 w-4 text-muted-foreground" />;

  if (delta > 0) return <ArrowUpRight className="h-4 w-4 text-destructive" />;

  return <ArrowDownRight className="h-4 w-4 text-[var(--gl-primary-light)]" />;

}

