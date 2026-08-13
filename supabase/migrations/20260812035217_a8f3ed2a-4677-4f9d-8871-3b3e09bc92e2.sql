ALTER TABLE public.bills ADD COLUMN IF NOT EXISTS billing_month date;

CREATE TABLE IF NOT EXISTS public.bill_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bill_id uuid NOT NULL REFERENCES public.bills(id) ON DELETE CASCADE,
  changed_by text,
  field_name text NOT NULL,
  old_value text,
  new_value text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.bill_audit_log TO anon;
GRANT SELECT, INSERT ON public.bill_audit_log TO authenticated;
GRANT ALL ON public.bill_audit_log TO service_role;

ALTER TABLE public.bill_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Audit log is readable" ON public.bill_audit_log FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Audit log can be created" ON public.bill_audit_log FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE INDEX IF NOT EXISTS bill_audit_log_bill_id_idx ON public.bill_audit_log(bill_id);
CREATE INDEX IF NOT EXISTS bills_billing_month_idx ON public.bills(billing_month);