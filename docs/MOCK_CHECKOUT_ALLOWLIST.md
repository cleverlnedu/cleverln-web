# Production mock checkout allowlist

Production mock checkout creates a real course order and LMS entitlement without collecting payment. It is available only to verified sign-in accounts whose normalized email has an enabled row in `public.mock_checkout_allowlist`.

Apply `supabase/migrations/20261008000000_mock_checkout_allowlist.sql` to the Supabase project used by production. The table starts empty, so production mock checkout remains denied until an authorized test email is added.

Add or re-enable a test account in the Supabase SQL editor:

```sql
insert into public.mock_checkout_allowlist (email, enabled)
values (lower(btrim('test-account@example.com')), true)
on conflict (email) do update set enabled = true;
```

Disable an account without deleting its record:

```sql
update public.mock_checkout_allowlist
set enabled = false
where email = lower(btrim('test-account@example.com'));
```

The table has row-level security enabled and no client-facing policies. Only the server-side service client can read it; manage entries through the Supabase SQL editor. Local and preview mock checkout still requires `MOCK_CHECKOUT_ENABLED=true`.
