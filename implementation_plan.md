# Backend ↔ Web Integration Plan

## Summary

The backend exposes two authenticated REST endpoints at `https://api.pulkitworks.info:5000`:
- `POST /auth/register` — creates a user (name, email, password, role)
- `POST /auth/login` — authenticates and returns a JWT + user object `{id, name, email, role}`
- `GET /api/dashboard` — returns role-based dashboard data (requires `Authorization: Bearer <token>`)

Currently the frontend is entirely mock-data driven. The integration plan wires up real API calls, stores the JWT in a context/localStorage, redirects to the correct role-based dashboard, and feeds live data into each dashboard view.

---

## Proposed Changes

### 1. API Client Layer

#### [NEW] `lib/api.ts`
Central API helper with base URL constant and typed `apiFetch` wrapper that:
- Sets `Content-Type: application/json`
- Attaches `Authorization: Bearer <token>` from localStorage when available
- Returns parsed JSON + throws on non-2xx

---

### 2. Auth Context

#### [NEW] `context/AuthContext.tsx`
React context that provides:
- `user` — `{id, name, email, role}` or `null`
- `token` — JWT string or `null`
- `login(email, password)` — calls `POST /auth/login`, stores token+user in localStorage, updates state
- `register(name, email, password, role)` — calls `POST /auth/register`
- `logout()` — clears state + localStorage

#### [MODIFY] `app/layout.tsx`
Wrap children in `<AuthProvider>`.

---

### 3. Login Page

#### [MODIFY] `app/login/page.tsx`
- Call `AuthContext.login(email, password)` on "Sign In" click (real API)
- Show loading spinner & error message states
- On success, redirect to `/dashboard/${user.role}?role=${user.role}` using the **role returned from the API** (not a hardcoded one)
- Keep the "Demo Mode" section but make each demo button actually call the real login API with known credentials

---

### 4. Register Page

#### [MODIFY] `app/register/page.tsx`
- On form submit, call `AuthContext.register(name, email, password, role)`
- Remove the fake `setTimeout` redirect
- Show real API errors (e.g., "User already exists")
- On success show the confirmation screen → redirect to `/login`

---

### 5. Dashboard Pages — Live Data from `GET /api/dashboard`

#### [MODIFY] `app/dashboard/worker/page.tsx`
Replace hardcoded `tasks` and `alerts` arrays with data fetched from `GET /api/dashboard` using the stored token.

#### [MODIFY] `app/dashboard/supervisor/page.tsx`
Same — populate team stats and incident counts from the API response.

#### [MODIFY] `app/dashboard/safety/page.tsx`
Same — fetch `pending_incidents`, `critical_hazards`, etc.

#### [MODIFY] `app/dashboard/admin/page.tsx`
Same — fetch `total_users`, `total_incidents`, etc.

#### [MODIFY] `app/dashboard/authority/page.tsx`
Same — fetch `analytics` object.

---

### 6. Route Protection

#### [NEW] `components/ui/ProtectedRoute.tsx`
A client-side guard component that:
- Reads `AuthContext.user`
- If `null` → redirects to `/login`
- If role doesn't match the current dashboard path → redirects to correct dashboard

Wrap each dashboard page with this guard.

---

### 7. Sidebar / Navbar — Show Real User Info

#### [MODIFY] `components/layout/Sidebar.tsx`
- Read user name and role from `AuthContext` instead of `useSearchParams`
- Show user's actual name + role badge
- Add a "Sign Out" button that calls `AuthContext.logout()`

---

### 8. Next.js Config

#### [MODIFY] `next.config.ts`
Add `NEXT_PUBLIC_API_URL=https://api.pulkitworks.info:5000` as an env variable reference so the API base URL is configurable without code changes.

#### [NEW] `.env.local` (in `/web`)
```
NEXT_PUBLIC_API_URL=https://api.pulkitworks.info:5000
```

---

## Verification Plan

### Automated
- Start Next.js dev server (`npm run dev` in `/web`)
- Browser test: Open login page → submit real credentials → verify redirect to correct dashboard
- Browser test: Open dashboard → verify data loads from API (not hardcoded)
- Browser test: Logout → verify redirect to /login

### Manual
- Test registration of a new user
- Test invalid login shows error
- Test that typing wrong role in URL is guarded
