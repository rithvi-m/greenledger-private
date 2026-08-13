import { type BillRow } from "./bills";

/** CEA India grid emission factor (kg CO₂e per kWh). */
export const CEA_GRID_FACTOR = 0.716;

/** Estimated CBAM tariff rate applied to embedded emissions value. */
export const CBAM_TARIFF_RATE = 0.28;

/** Estimated ₹ per tCO₂e for CBAM exposure modelling. */
export const CBAM_RUPEE_PER_TCO2E = 8500;

export function scope2Tco2e(kwh: number | null): number | null {
  if (kwh === null) return null;
  return (kwh * CEA_GRID_FACTOR) / 1000;
}

export function formatTco2e(n: number | null, digits = 1): string {
  if (n === null) return "—";
  return n.toLocaleString("en-IN", { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

export function cbamExposureInr(tco2e: number | null): number | null {
  if (tco2e === null) return null;
  return Math.round(tco2e * CBAM_RUPEE_PER_TCO2E * CBAM_TARIFF_RATE);
}

export function formatInrLakhs(n: number | null): string {
  if (n === null) return "—";
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  return `₹${n.toLocaleString("en-IN")}`;
}

export function pctChange(current: number, previous: number): number | null {
  if (previous === 0) return null;
  return ((current - previous) / previous) * 100;
}

export function demoMetricsFromBills(current: BillRow | undefined, previous: BillRow | undefined) {
  const kwh = current?.electricity_kwh ?? null;
  const prevKwh = previous?.electricity_kwh ?? null;
  const tco2e = scope2Tco2e(kwh);
  const cbam = cbamExposureInr(tco2e);
  const spend = current?.total_amount ?? null;
  const kwhDelta =
    kwh !== null && prevKwh !== null ? pctChange(kwh, prevKwh) : null;

  return { kwh, prevKwh, tco2e, cbam, spend, kwhDelta };
}
