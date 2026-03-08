-- ─── Hotel Quinto Booking System Schema ──────────────────────────────────────
-- Run this in your Supabase SQL editor (https://supabase.com/dashboard)

-- Bookings table
create table if not exists bookings (
  id text primary key,
  room_type_id text not null,
  check_in date not null,
  check_out date not null,
  nights integer not null,
  guest_name text not null,
  guest_email text not null,
  guest_phone text not null,
  guest_country text,
  adults integer not null default 1,
  children integer not null default 0,
  special_requests text,
  status text not null default 'pending',
  source text not null default 'direct',
  external_id text,
  total_price_usd numeric(10,2) not null,
  total_price_cop numeric(12,0) not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Index for availability queries (overlapping date ranges)
create index if not exists idx_bookings_dates
  on bookings (room_type_id, check_in, check_out)
  where status not in ('cancelled', 'no_show');

-- Index for status filtering
create index if not exists idx_bookings_status on bookings (status);

-- Channel feeds table (stores iCal URLs from Booking.com, Airbnb, etc.)
create table if not exists channel_feeds (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  source text not null,
  room_type_id text not null,
  ical_url text not null,
  enabled boolean not null default true,
  last_synced_at timestamptz,
  created_at timestamptz not null default now()
);

-- Auto-update updated_at on bookings
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create or replace trigger bookings_updated_at
  before update on bookings
  for each row
  execute function update_updated_at();

-- Enable Row Level Security
alter table bookings enable row level security;
alter table channel_feeds enable row level security;

-- Service role can do everything (used by our API routes)
create policy "Service role full access on bookings"
  on bookings for all
  using (true)
  with check (true);

create policy "Service role full access on channel_feeds"
  on channel_feeds for all
  using (true)
  with check (true);
