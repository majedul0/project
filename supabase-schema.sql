-- You can copy and paste this into the Supabase SQL Editor to initialize your database structure.

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Services Table
create table public.services (
    id uuid default uuid_generate_v4() primary key,
    title text not null,
    description text not null,
    category text not null,
    icon text,
    features text[] default array[]::text[],
    image_url text,
    price numeric,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Extended product payload for the admin services UI (variants, badges, gallery, etc.)
alter table public.services
  add column if not exists product_data jsonb default '{}'::jsonb;

-- After creating tables/buckets, run supabase-fix-rls.sql in the SQL Editor so
-- storage uploads and admin CRUD are allowed (fixes RLS policy errors).

-- 2. Blogs Table
create table public.blogs (
    id uuid default uuid_generate_v4() primary key,
    headline text not null,
    subline text,
    body text,
    tags text[] default array[]::text[],
    author text,
    "imageUrl" text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Orders Table
create table public.orders (
    id uuid default uuid_generate_v4() primary key,
    name text not null,
    phone text not null,
    email text,
    address text not null,
    "paymentMethod" text,
    status text default 'Pending' not null,
    "cartItems" jsonb,
    "cartSubtotal" numeric,
    "deliveryCharge" numeric,
    total numeric,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Chat History Table
create table public.chat_history (
    id uuid default uuid_generate_v4() primary key,
    "sessionId" text not null,
    "mainConcept" text,
    "userMessage" text not null,
    "assistantSummary" text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- --- Storage Buckets ---
-- You will also need to create two public storage buckets in the Supabase Dashboard:
-- 1. img
-- 2. blog-img
-- Set them to "Public" so the URLs can be loaded properly.