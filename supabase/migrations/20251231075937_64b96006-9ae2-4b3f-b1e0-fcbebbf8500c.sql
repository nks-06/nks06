-- Create storage bucket for portfolio images
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-images', 'portfolio-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to portfolio images
CREATE POLICY "Portfolio images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio-images');

-- Allow authenticated uploads (via edge function with service role)
CREATE POLICY "Allow public uploads to portfolio images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'portfolio-images');

-- Allow updates
CREATE POLICY "Allow public updates to portfolio images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'portfolio-images');

-- Allow deletes
CREATE POLICY "Allow public deletes from portfolio images"
ON storage.objects FOR DELETE
USING (bucket_id = 'portfolio-images');