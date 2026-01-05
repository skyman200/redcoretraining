-- Add columns for International Partners
ALTER TABLE partner_applications 
ADD COLUMN type text DEFAULT 'domestic',
ADD COLUMN country text,
ADD COLUMN wise_email text,
ADD COLUMN swift_code text,
ADD COLUMN passport_number text,
ADD COLUMN bank_address text;

-- Add comment
COMMENT ON COLUMN partner_applications.type IS 'domestic or international';
