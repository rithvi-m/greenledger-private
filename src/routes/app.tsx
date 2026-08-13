import { Outlet, createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/greenledger/AppShell";
import { FacilityBillsProvider } from "@/lib/greenledger/FacilityBillsContext";

export const Route = createFileRoute("/app")({
  ssr: false,
  component: AppLayout,
});

function AppLayout() {
  return (
    <AppShell>
      <FacilityBillsProvider>
        <Outlet />
      </FacilityBillsProvider>
    </AppShell>
  );
}
