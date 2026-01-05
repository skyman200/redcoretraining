-- Add columns for Japanese Partners
ALTER TABLE partner_applications 
ADD COLUMN branch_name text,
ADD COLUMN branch_code text,
ADD COLUMN account_type text,
ADD COLUMN account_holder_katakana text;

-- Add comment
COMMENT ON COLUMN partner_applications.account_holder_katakana IS 'Must be in Katakana for JP banks';
