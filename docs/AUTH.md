# Auth — Email + Google Sign-in (Vite + Express)

> **Stack:** Express + JWT (`jsonwebtoken`/`src/lib/auth.ts:27` HMAC-SHA256) + `bcryptjs` + `Prisma` + Google OAuth 2.0. Powered by **Prosperity Systems Hub ([ps-hub.org](https://ps-hub.org))**.

## How it works

### Email / password (credentials)

1. **Register** `POST /api/register` (`server/index.ts:86`) — validates via `src/lib/registerValidation.ts:1` (name 2-60, email format, password 6-128), checks `prisma.user.findUnique({email})`, hashes with `bcrypt.hash(password,10)`, creates `User` (`passwordHash` set, `googleId` null).
2. **Sign-in** `POST /api/auth/signin` — `verifyCredentials` (`src/lib/auth.ts:7`) looks up by normalized email, `bcrypt.compare`, then `signJwt({uid,email})` and sets `httpOnly` cookie `token` (30d, `sameSite:lax`). If the account has `passwordHash=null` (Google-only), returns 401 "Use Google sign-in".
3. **Session** `GET /api/me` — reads `token` cookie or `Authorization: Bearer`, `verifyJwt`, loads `prisma.user` (select id/name/email/image/...). Client hydrates via `src/lib/auth-client.tsx:51` `AuthProvider` (`useSession` / `useAuth`) which fetches `/api/me` on mount.
4. **Sign-out** `POST /api/auth/signout` — clears cookie.

Frontend sign-in form lives at `src/app/signin/page.tsx:1` — email/password fields + "Continue with Google" button.

### Google OAuth (sign-up & sign-in)

Users can **sign up or sign in with one click** — no password needed. If they already have an email/password account with the same email, the Google identity is **linked** automatically.

**Env (`.env.example:9`):**

```
GOOGLE_CLIENT_ID=          # from https://console.cloud.google.com/apis/credentials
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=http://localhost:4000/api/auth/google/callback  # must be registered exactly in Google Console
FRONTEND_URL=http://localhost:3000
JWT_SECRET=                # or NEXTAUTH_SECRET (fallback)
```

**Server routes (`server/index.ts:99`):**

| Route | Method | What it does |
|-------|--------|--------------|
| `/api/auth/google` | GET | If `GOOGLE_CLIENT_ID/SECRET` missing → 501 honest. Otherwise sets `oauth_state` cookie, redirects to `https://accounts.google.com/o/oauth2/v2/auth?client_id=...&redirect_uri=GOOGLE_REDIRECT_URI&scope=openid email profile` |
| `/api/auth/google/callback` | GET | Validates `state`, exchanges `code` → `https://oauth2.googleapis.com/token`, fetches `https://www.googleapis.com/oauth2/v2/userinfo` (id/email/name/picture), calls `findOrCreateGoogleUser` (`src/lib/auth.ts:15`), `signJwt`, sets `token` cookie, `302` to `${FRONTEND_URL}/dashboard` |
| `/api/auth/google` | POST | Accepts `{idToken}` (GIS One-Tap), verifies via `https://oauth2.googleapis.com/tokeninfo?id_token=...`, checks `aud===GOOGLE_CLIENT_ID`, then same `findOrCreateGoogleUser` flow, returns `{user}` JSON |

**DB (`prisma/schema.prisma:10`):**

```prisma
model User {
  id           String  @id @default(cuid())
  email        String  @unique
  passwordHash String? // nullable for Google users
  googleId     String? @unique
  name         String
  image        String?
}
```

Migration to apply after pulling this change:

```bash
npx prisma migrate dev --name add-google-oauth
# or on prod
npx prisma migrate deploy
```

**Frontend (`src/app/signin/page.tsx:30`):**

```tsx
<a href="/api/auth/google" className="...">Continue with Google</a>
```

- Vite proxies `/api` → `:4000`, so the link works in dev (`:3000/api/auth/google` → Express).
- No password is ever stored for Google users (`passwordHash=null`). If they later try password sign-in, the server tells them to use Google.

## Honest state

- If `GOOGLE_CLIENT_ID` is not set, `/api/auth/google` returns **501** with message `Google OAuth not configured. Set GOOGLE_CLIENT_ID... See docs/AUTH.md` — never a fake redirect.
- If Google is configured but DB migration hasn't run, `findOrCreateGoogleUser` will throw — the callback returns 500 and logs. Run `prisma migrate`.

## Testing the flow

1. Set the three env vars, register the redirect URI exactly in Google Console (Authorized redirect URIs).
2. `npm run server` (4000) + `npm run dev` (3000).
3. Visit `/signin` → "Continue with Google" → consent → redirect to `/dashboard` (authenticated). Check `GET /api/me` returns the user.

## Future

- Link/unlink providers in `/settings` (allow adding password to a Google account).
- `emailVerified` flag, refresh-token flow, or Supabase Auth instead of raw OAuth if you prefer managed.
