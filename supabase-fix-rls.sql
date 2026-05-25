-- Run this in Supabase Dashboard → SQL Editor
-- Fixes: "new row violates row-level security policy" when uploading images or saving services

-- =============================================================================
-- 1. Storage (img + blog-img buckets) — required for admin image uploads
-- =============================================================================
-- Ensure buckets exist (create in Dashboard → Storage if missing): img, blog-img

DROP POLICY IF EXISTS "Public read img" ON storage.objects;
DROP POLICY IF EXISTS "Public upload img" ON storage.objects;
DROP POLICY IF EXISTS "Public update img" ON storage.objects;
DROP POLICY IF EXISTS "Public delete img" ON storage.objects;
DROP POLICY IF EXISTS "Public read blog-img" ON storage.objects;
DROP POLICY IF EXISTS "Public upload blog-img" ON storage.objects;
DROP POLICY IF EXISTS "Public update blog-img" ON storage.objects;
DROP POLICY IF EXISTS "Public delete blog-img" ON storage.objects;

CREATE POLICY "Public read img"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'img');

CREATE POLICY "Public upload img"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'img');

CREATE POLICY "Public update img"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'img');

CREATE POLICY "Public delete img"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'img');

CREATE POLICY "Public read blog-img"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'blog-img');

CREATE POLICY "Public upload blog-img"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'blog-img');

CREATE POLICY "Public update blog-img"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'blog-img');

CREATE POLICY "Public delete blog-img"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'blog-img');

-- =============================================================================
-- 2. Services table — store full admin product payload + allow CRUD from the app
-- =============================================================================
ALTER TABLE public.services
  ADD COLUMN IF NOT EXISTS product_data jsonb DEFAULT '{}'::jsonb;

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read services" ON public.services;
DROP POLICY IF EXISTS "Public insert services" ON public.services;
DROP POLICY IF EXISTS "Public update services" ON public.services;
DROP POLICY IF EXISTS "Public delete services" ON public.services;

CREATE POLICY "Public read services"
  ON public.services FOR SELECT
  USING (true);

CREATE POLICY "Public insert services"
  ON public.services FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public update services"
  ON public.services FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public delete services"
  ON public.services FOR DELETE
  USING (true);

-- =============================================================================
-- 3. Blogs table — public read, admin write from the app
-- =============================================================================
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read blogs" ON public.blogs;
DROP POLICY IF EXISTS "Public insert blogs" ON public.blogs;
DROP POLICY IF EXISTS "Public update blogs" ON public.blogs;
DROP POLICY IF EXISTS "Public delete blogs" ON public.blogs;

CREATE POLICY "Public read blogs"
  ON public.blogs FOR SELECT
  USING (true);

CREATE POLICY "Public insert blogs"
  ON public.blogs FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public update blogs"
  ON public.blogs FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public delete blogs"
  ON public.blogs FOR DELETE
  USING (true);
