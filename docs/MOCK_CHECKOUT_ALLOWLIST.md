# Production mock checkout allowlist

Production mock checkout creates a real course order and LMS entitlement without collecting payment. It is available only to verified sign-in accounts whose normalized email has an enabled row in `public.mock_checkout_allowlist`.

The table is part of the shared database schema in `CleverLN_LMS/supabase/schema.sql`. Its rows are not part of that file, so production mock checkout remains denied until an authorized test email is added.

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

The table has row-level security enabled and no client-facing policies. Only the server-side service client can read it; manage entries through the Supabase SQL editor.

Production, preview deployments and local development all write to the same production database, so the allowlist is enforced in every environment. Outside production (`VERCEL_ENV` other than `production`, including local `next dev`), mock checkout must also be switched on with `MOCK_CHECKOUT_ENABLED=true`. Keep that variable out of the Vercel Preview environment unless previews are protected with Vercel Deployment Protection.
