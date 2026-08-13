CREATE TABLE public.facilities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  industry TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.facilities TO anon;
GRANT SELECT ON public.facilities TO authenticated;
GRANT ALL ON public.facilities TO service_role;
ALTER TABLE public.facilities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Facilities are readable" ON public.facilities FOR SELECT TO anon, authenticated USING (true);

INSERT INTO public.facilities (id, company, location, industry)
VALUES ('11111111-1111-4111-8111-111111111111', 'ABC Steel Components', 'Coimbatore, Tamil Nadu', 'Steel Components Manufacturing');

CREATE TABLE public.bills (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  facility_id UUID NOT NULL REFERENCES public.facilities(id) ON DELETE CASCADE,
  billing_period TEXT,
  file_url TEXT NOT NULL,
  file_name TEXT,
  file_type TEXT,
  file_size BIGINT,
  status TEXT NOT NULL DEFAULT 'uploaded',
  electricity_kwh NUMERIC,
  maximum_demand_kva NUMERIC,
  power_factor NUMERIC,
  total_amount NUMERIC,
  account_number TEXT,
  uploaded_by TEXT,
  verified_by TEXT,
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON public.bills TO anon;
GRANT SELECT, INSERT, UPDATE ON public.bills TO authenticated;
GRANT ALL ON public.bills TO service_role;
ALTER TABLE public.bills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Bills are readable" ON public.bills FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Bills can be created" ON public.bills FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Bills can be updated" ON public.bills FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_bills_updated_at BEFORE UPDATE ON public.bills
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();