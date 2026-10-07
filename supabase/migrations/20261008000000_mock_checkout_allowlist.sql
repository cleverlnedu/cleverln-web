create table if not exists public.mock_checkout_allowlist (
  email text primary key,
  enabled boolean not null default true,
  created_at timestamptz not null default now(),
  constraint mock_checkout_allowlist_email_normalized
    check (email = lower(btrim(email)) and email <> '')
);

comment on table public.mock_checkout_allowlist is
  'Verified accounts allowed to complete production mock course checkouts.';

alter table public.mock_checkout_allowlist enable row level security;

revoke all on table public.mock_checkout_allowlist from public, anon, authenticated;
grant select on table public.mock_checkout_allowlist to service_role;
