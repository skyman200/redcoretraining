-- Add language_region column for partner applications
ALTER TABLE partner_applications 
ADD COLUMN language_region text DEFAULT 'ko';

-- Add comment
COMMENT ON COLUMN partner_applications.language_region IS 'ko, en, ja, es, de';
