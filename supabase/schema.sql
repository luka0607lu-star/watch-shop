create extension if not exists pgcrypto;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  brand text,
  category text,
  description text,
  price numeric(12,2) not null default 0,
  old_price numeric(12,2),
  image_url text,
  gallery text[] default '{}',
  stock integer not null default 0,
  featured boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  phone text not null,
  address text not null,
  city text not null,
  note text,
  items jsonb not null,
  total numeric(12,2) not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;
alter table public.orders enable row level security;

create policy "Public can read active products"
on public.products for select
using (active = true or auth.role() = 'authenticated');

create policy "Authenticated can insert products"
on public.products for insert to authenticated
with check (true);

create policy "Authenticated can update products"
on public.products for update to authenticated
using (true) with check (true);

create policy "Authenticated can delete products"
on public.products for delete to authenticated
using (true);

create policy "Anyone can create orders"
on public.orders for insert
with check (true);

create policy "Authenticated can read orders"
on public.orders for select to authenticated
using (true);

insert into storage.buckets (id,name,public)
values ('product-images','product-images',true)
on conflict (id) do nothing;

create policy "Public product images"
on storage.objects for select
using (bucket_id='product-images');

create policy "Authenticated upload product images"
on storage.objects for insert to authenticated
with check (bucket_id='product-images');

create policy "Authenticated update product images"
on storage.objects for update to authenticated
using (bucket_id='product-images');

create policy "Authenticated delete product images"
on storage.objects for delete to authenticated
using (bucket_id='product-images');