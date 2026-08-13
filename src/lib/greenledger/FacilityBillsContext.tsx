import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { type BillRow, fetchBills, verifiedBills } from "./bills";

type FacilityBillsContextValue = {
  bills: BillRow[];
  verified: BillRow[];
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
  hasVerified: boolean;
  hasPending: boolean;
  current: BillRow | undefined;
  previous: BillRow | undefined;
};

const FacilityBillsContext = createContext<FacilityBillsContextValue | null>(null);

export function FacilityBillsProvider({ children }: { children: ReactNode }) {
  const [bills, setBills] = useState<BillRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setBills(await fetchBills());
    } catch (e: unknown) {
      setBills([]);
      setError(e instanceof Error ? e.message : "Could not load bills");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  useEffect(() => {
    const onFocus = () => void reload();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [reload]);

  const verified = verifiedBills(bills);
  const hasPending = bills.some((b) => b.status !== "verified");

  const value = useMemo<FacilityBillsContextValue>(
    () => ({
      bills,
      verified,
      loading,
      error,
      reload,
      hasVerified: verified.length > 0,
      hasPending,
      current: verified[verified.length - 1],
      previous: verified[verified.length - 2],
    }),
    [bills, verified, loading, error, reload, hasPending],
  );

  return <FacilityBillsContext.Provider value={value}>{children}</FacilityBillsContext.Provider>;
}

export function useFacilityBills(): FacilityBillsContextValue {
  const ctx = useContext(FacilityBillsContext);
  if (!ctx) {
    throw new Error("useFacilityBills must be used within FacilityBillsProvider");
  }
  return ctx;
}
