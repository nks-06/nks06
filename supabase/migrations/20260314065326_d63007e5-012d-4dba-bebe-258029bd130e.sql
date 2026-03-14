CREATE EXTENSION IF NOT EXISTS pgcrypto;
UPDATE admin_settings 
SET password_hash = crypt('Iphone@014', gen_salt('bf', 10))
WHERE id = '63a03f30-8fe6-4b6a-9730-b14125bd446b';