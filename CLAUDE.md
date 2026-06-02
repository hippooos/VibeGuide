# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server on localhost:3000
npm run build    # Production build
npm run lint     # ESLint check
```

No test suite is configured in this project.

## Environment Setup

Copy `.env.example` to `.env.local` and fill in:
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
```

Both values come from the Supabase project dashboard under Settings > API. The app detects missing env vars via `lib/utils.ts:hasEnvVars` and shows a tutorial UI instead of the real auth UI when they're absent.

## Architecture

This is a Next.js App Router project with Supabase for authentication. Session management uses cookies via `@supabase/ssr`.

**Supabase client pattern** — there are three distinct clients, each used in a specific context:
- `lib/supabase/client.ts` — browser (Client Components), uses `createBrowserClient`
- `lib/supabase/server.ts` — server (Server Components, Route Handlers, Server Actions), uses `createServerClient` with the Next.js `cookies()` store; must be created fresh per-request, never in a module-level variable
- `lib/supabase/proxy.ts` — proxy/middleware session refresh, used in `proxy.ts`

**Session refresh** — `proxy.ts` (the Next.js proxy) runs `updateSession` on every request to keep the session cookie alive. It calls `supabase.auth.getClaims()` immediately after creating the client; no code should be inserted between client creation and that call. Unauthenticated requests to any path other than `/`, `/auth/*`, and `/login` are redirected to `/auth/login`.

**Route structure:**
- `/` — public home with tutorial steps
- `/auth/login`, `/auth/sign-up`, `/auth/forgot-password`, `/auth/update-password` — auth pages (public)
- `/auth/confirm` — email OTP confirmation route handler
- `/auth/error` — auth error display
- `/protected` — authenticated-only section; the layout and page both use the server Supabase client and redirect to `/auth/login` on missing session

**Auth flow:** sign-up sends a confirmation email; the link hits `/auth/confirm` which calls `verifyOtp` and redirects. Login uses `signInWithPassword` and redirects to `/protected`. Password reset uses `resetPasswordForEmail` then `updateUser`.

**UI components** live in `components/ui/` (shadcn/ui primitives) and `components/` (feature-level). Styling is Tailwind CSS with `cn()` from `lib/utils.ts` for conditional class merging. Dark/light theming is provided by `next-themes` with a `ThemeSwitcher` component.

## 新用户注册赠送点数

数据库中已配置触发器 `on_auth_user_created`：
- 每个新注册用户自动获得 **1 点数**（免费试用一次文档生成）
- 触发器函数：`public.handle_new_user()`
- 绑定在 `auth.users` 表的 INSERT 事件上
