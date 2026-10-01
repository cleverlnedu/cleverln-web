# Auth redirect configuration

The login and signup flows send OAuth and email confirmation users to
`/auth/callback` on the configured site origin.

- Local `.env.local`: `NEXT_PUBLIC_SITE_URL=http://localhost:3000`
- Vercel Production: `NEXT_PUBLIC_SITE_URL=https://cleverln.com`
- Supabase Dashboard → Authentication → URL Configuration: set **Site URL** to
  `https://cleverln.com` and add `https://cleverln.com/auth/callback` to the
  **Redirect URLs** allowlist.
- Keep `http://localhost:3000/auth/callback` in the Supabase allowlist for local
  development. Add any Vercel preview callback URLs only if OAuth is tested on
  preview deployments.

Production code ignores a localhost site URL and falls back to
`https://cleverln.com`, so a copied development value cannot send production
sign-ins back to a developer machine.
