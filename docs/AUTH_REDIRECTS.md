# Auth redirect configuration

The login and signup flows send OAuth and email confirmation users to
`/auth/callback` on the configured site origin.

- Local `.env.local`: `NEXT_PUBLIC_SITE_URL=http://localhost:3000`
- Vercel Production: `NEXT_PUBLIC_SITE_URL=https://cleverln.com`
- Supabase Dashboard → Authentication → URL Configuration: set **Site URL** to
  `https://cleverln.com`. The project is shared with the LMS, so the
  **Redirect URLs** allowlist holds both apps' callbacks:
  - `https://cleverln.com/auth/callback`
  - `https://lms.cleverln.com/dashboard` (LMS Google sign-in)
  - `http://localhost:3000/auth/callback` (website, local)
  - `http://localhost:3001/dashboard` (LMS, local)
- Add any Vercel preview callback URLs only if OAuth is tested on preview
  deployments.

Production code ignores a localhost site URL and falls back to
`https://cleverln.com`, so a copied development value cannot send production
sign-ins back to a developer machine.

## Shared sign-in with the LMS

The website and the LMS share one sign-in. `src/lib/sharedSession.ts` keeps the
Supabase session in cookies on `.cleverln.com`, so a learner signed in here
opens `lms.cleverln.com` already signed in, and signing out of either site signs
out of both. The LMS has a copy of the file (`CleverLN_LMS/src/services/sharedSession.js`);
keep the two in step.

"Remember for 30 days" sets the cookies' lifetime. Checked, the sign-in lasts
30 days; unchecked, it ends when the browser closes. Both sites honour it.

Locally the website runs on `:3000` and the LMS on `:3001`
(`NEXT_PUBLIC_LMS_URL=http://localhost:3001`). Browsers share `localhost`
cookies across ports, so the shared sign-in works locally too, as long as both
are opened on `localhost` (not `127.0.0.1`). Vercel preview URLs cannot share
cookies, so on previews each site signs in separately.

If Supabase ever sends an LMS Google sign-in to this site instead (when its
redirect URL is missing from the allowlist), `AuthProvider` forwards the
returned tokens to the LMS dashboard.
