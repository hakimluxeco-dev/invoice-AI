CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  supplier TEXT NOT NULL,
  invoice_number TEXT NOT NULL,
  zero_rated_amount DECIMAL(10, 2) DEFAULT 0,
  total_excl_vat DECIMAL(10, 2) NOT NULL,
  vat DECIMAL(10, 2) NOT NULL,
  total_incl DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS invoice_summary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subtotal_excl_vat DECIMAL(10, 2) DEFAULT 0,
  vat_15 DECIMAL(10, 2) DEFAULT 0,
  grand_total_subtotal_vat DECIMAL(10, 2) DEFAULT 0,
  grand_total_zero_rated DECIMAL(10, 2) DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO invoice_summary (id) 
SELECT gen_random_uuid() 
WHERE NOT EXISTS (SELECT 1 FROM invoice_summary LIMIT 1);

CREATE OR REPLACE FUNCTION calculate_invoice_summary()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE invoice_summary
  SET 
    subtotal_excl_vat = (SELECT COALESCE(SUM(total_excl_vat), 0) FROM invoices),
    vat_15 = (SELECT COALESCE(SUM(vat), 0) FROM invoices),
    grand_total_subtotal_vat = (SELECT COALESCE(SUM(total_excl_vat), 0) + COALESCE(SUM(vat), 0) FROM invoices),
    grand_total_zero_rated = (SELECT COALESCE(SUM(total_excl_vat), 0) + COALESCE(SUM(vat), 0) + COALESCE(SUM(zero_rated_amount), 0) FROM invoices),
    updated_at = NOW();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_invoice_summary_trigger ON invoices;

CREATE TRIGGER update_invoice_summary_trigger
AFTER INSERT OR UPDATE OR DELETE ON invoices
FOR EACH STATEMENT
EXECUTE FUNCTION calculate_invoice_summary();

ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_summary ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Allow public read access on invoices" ON invoices;
  DROP POLICY IF EXISTS "Allow public insert access on invoices" ON invoices;
  DROP POLICY IF EXISTS "Allow public update access on invoices" ON invoices;
  DROP POLICY IF EXISTS "Allow public delete access on invoices" ON invoices;
  DROP POLICY IF EXISTS "Allow public read access on invoice_summary" ON invoice_summary;
END $$;

CREATE POLICY "Allow public read access on invoices"
ON invoices FOR SELECT
USING (true);

CREATE POLICY "Allow public insert access on invoices"
ON invoices FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow public update access on invoices"
ON invoices FOR UPDATE
USING (true);

CREATE POLICY "Allow public delete access on invoices"
ON invoices FOR DELETE
USING (true);

CREATE POLICY "Allow public read access on invoice_summary"
ON invoice_summary FOR SELECT
USING (true);

ALTER PUBLICATION supabase_realtime ADD TABLE invoices;
ALTER PUBLICATION supabase_realtime ADD TABLE invoice_summary;