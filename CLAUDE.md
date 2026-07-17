# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

## Project Overview

**UniClub** — "Club Events Management Platform," originally a 2nd-year academic group project (2023/2024, Faculté des Sciences de Monastir), built by a 4-person team: Ghassen Achour, Akram Haddad, Saber Berriche, Islem Ben Khalifa, supervised by Ms. Moumina Cheikh Ahmed Baba. Full original report saved at [`PROJECT_REPORT.md`](PROJECT_REPORT.md) — read that for the domain model (actors, requirements, UML descriptions).

In the summer following the group project, **Akram redid the project himself, solo**. This folder has accumulated multiple overlapping copies from both eras (`Uniclub-main/`, root-level `.sql` dumps, other stray copies) — treat all existing code here as **legacy reference only**, not a working baseline to build on.

## Domain summary (from the original report)

- **Problem**: university club events suffer from low visibility — social media requires already knowing a club exists, and the faculty's own club page is outdated. Goal: a central platform for club visibility and student engagement.
- **Actors**: Admin (manages clubs/students from a dashboard), Club Owner (manages their club's info, posts, events, members), Student (browses newsfeed/calendar, follows clubs, requests to join clubs, requests to register new clubs).
- **Key features**: club/event newsfeed, calendar, join/registration request flows, admin dashboard, and a stated but likely never fully built **AI recommendation system** to help students discover clubs/events — a genuine differentiator idea worth reviving (see Positioning note below).
- **Non-functional requirements called out in the report**: performance under load, high availability, secure data storage, simple/usable UI.

## Stack discrepancy — needs a decision

- The **written report** specifies HTML/CSS/jQuery frontend + **Node.js/Express/MongoDB/Mongoose** backend, plus Python (likely for the never-really-detailed AI recommendation piece).
- The **actually-built version** (`Uniclub-main/`, with its own README) is **PHP + MySQL** (XAMPP/WAMP, phpMyAdmin), not what the report describes — the team apparently pivoted mid-build or the report reflects the original proposal rather than the delivered app.
- `Uniclub-main/README.md` references a GitHub repo at `github.com/AkremHaddad/uniclub.git`, but there's no local `.git` folder linked in this directory as of 2026-07-14 — unconfirmed whether that remote still exists; verify with Akram before assuming it's available to push to.

## Decision (2026-07-14, confirmed)

- **Stack: Next.js + MongoDB**, per Akram's broader decision to specialize in Next.js/MERN-ish for web rebuilds (see `strategy-tech-stack` in Claude's memory). Vercel-deployable by design.
- **Scope includes the AI recommendation feature** from the original report (club/event discovery recommendations) — Akram explicitly confirmed this, aware it adds real effort/cost.
- **Repo: reuse `github.com/AkremHaddad/uniclub`** — Akram confirmed this repo is real/live and contains the old PHP version; the current local `Uniclub-main/` folder matches its content. Connect the new build to this existing remote rather than creating a new repo. Push per the standard cadence (commit+push after each task) once connected.
- Target: a fast, lean first pass ("in a day") — core CRUD/auth/dashboard/calendar/join-requests plus the AI recommendation feature. Aggressive timeline; fine to let it spill into a second session if needed.

## Status (2026-07-15)

Scaffold done — `web/` (Next.js 16, App Router, TypeScript, Tailwind, ESLint). Set up during the autonomous trip-day run:
- No local `.git` existed in this folder before now — `git init`'d, added `origin` = `github.com/AkremHaddad/uniclub.git`, fetched, and checked out a local `main` tracking `origin/main` (real history: the old PHP app's commits, back to "club page completed" etc.). No large-file problems in this history (checked — unlike PFE's repo, this one is clean).
- Hit a real filename collision doing that checkout: a local untracked `uniclub_nodata.sql` had different content than the one in git history. Did **not** overwrite it — renamed to `uniclub_nodata.local-pre-git.sql` so both are preserved; worth Akram checking which one's actually current.
- `web/src/lib/mongodb.ts` — same Mongoose connection singleton pattern as PFE's.
- `web/src/models/User.ts` — `User` model with the report's 3 roles (`student`, `clubOwner`, `admin`) plus `studyField`/`interests` fields (the report ties these to the planned AI recommendation feature).
- `web/.env.local.example`, minimal UniClub-branded placeholder landing page.
- Verified: `tsc --noEmit` clean, `next build` succeeds, `eslint` clean.
- **Committed and pushed**: commit `4aa7791`, clean push (no size issues, unlike PFE). Note: GitHub reports this repo's canonical URL is now `github.com/AkremHaddad/Uniclub.git` (capital U) — the old lowercase URL still redirects, but the remote was updated to the canonical one.

## Auth added (2026-07-15, same run, on top of the scaffold)

- **Auth.js v5 (`next-auth@beta`) with a Credentials provider**, JWT session strategy (no DB session adapter needed), bcrypt password hashing.
  - `src/auth.ts` — provider config, `authorize()` looks up the user by email and compares the bcrypt hash; `jwt`/`session` callbacks carry `role` from `User.role` into `session.user.role` so pages/middleware can branch on it without a DB round-trip per request.
  - `src/app/api/auth/[...nextauth]/route.ts` — standard handler re-export.
  - `src/app/api/signup/route.ts` — creates a user with `role: "student"` always; becoming a club owner or admin is a separate, deliberate action (not a signup-time choice), matching the report's actor model.
  - `src/types/next-auth.d.ts` — module augmentation so `session.user.role`/`.id` type-check (Auth.js's defaults don't know about these custom fields).
  - `src/components/Providers.tsx` (wraps the app in `SessionProvider`) and `src/components/Nav.tsx` (shows login/signup links or the logged-in user + role + logout, via `useSession`) — wired into `src/app/layout.tsx`.
  - `src/app/login/page.tsx`, `src/app/signup/page.tsx` — minimal functional forms (not the final design pass, just working auth UI).
  - `.env.local.example` updated with `AUTH_SECRET` (generate via `npx auth secret` or `openssl rand -base64 32`).
- **Verified**: `tsc --noEmit` clean, `eslint` clean, `next build` succeeds (with a placeholder `AUTH_SECRET` env var for the build step only). **Could not do a live/runtime smoke test** (actually signing up and logging in against a real database) — no `MONGODB_URI` is configured yet, Akram needs to create a MongoDB Atlas cluster (or similar) and fill in `.env.local` from the example. Static verification is as far as this could go without those credentials — flagging so this isn't mistaken for "fully tested."
## Club browsing + join requests added (2026-07-15, same run)

- **Models**: `Club` (name/description/owner), `Event` (club/title/date/location, indexed on `date` for calendar queries), `Post` (club/content), `Membership` (user/club/status — join requests; unique `(user, club)` index so re-requesting doesn't duplicate), `ClubRequest` (requestedBy/name/description/status — the *separate* "register a new club" flow, distinct from joining one: approval creates a `Club` and promotes the requester to `clubOwner`, not implemented yet, just the model).
- **API**: `GET /api/clubs` (public listing), `GET /api/clubs/[id]` (detail + its posts/events), `POST /api/clubs/[id]/join` (auth-required, creates a pending `Membership`, returns 409 on a duplicate request via the unique index rather than a generic 500).
- **Pages**: `/clubs` (listing, server component querying Mongo directly — no reason to round-trip through the API route from a server component), `/clubs/[id]` (detail, events + posts, a `JoinClubButton` client component that prompts login if signed out).
- Both club pages are `export const dynamic = "force-dynamic"` — club data changes often and there's no reason to cache/statically generate them. This is also why `next build` succeeds with no `MONGODB_URI` set: dynamic routes defer DB access to request time rather than needing it at build time.
- **Verified**: `tsc --noEmit` clean, `eslint` clean, `next build` succeeds. Same caveat as auth: no live smoke test against a real database yet (no `MONGODB_URI` configured).
## Club-creation approval pipeline added (2026-07-15, same run)

Without this, there was no way to ever create a `Club` at all — a real priority gap, since browsing/joining has nothing to browse in a fresh deployment.

- **`src/lib/auth-helpers.ts`**: `requireRole(...roles)` — a small RBAC helper (session check + role check + consistent error shape) so route handlers don't each reimplement it.
- **`POST /api/club-requests`**: any logged-in user submits `{name, description}`; **`GET /api/club-requests`**: admin-only, lists pending requests.
- **`POST /api/club-requests/[id]/approve`**: admin-only. Does three writes atomically inside a **Mongoose session transaction** — mark the request approved, create the `Club`, promote the requester's `User.role` to `clubOwner`. Named explicitly because it's a real integrity concern, not decorative: without a transaction, a crash between steps could leave an "approved" request with no actual `Club`, or a `Club` with an owner who was never actually promoted. `dbSession.withTransaction()` makes it all-or-nothing.
- **`POST /api/club-requests/[id]/reject`**: admin-only, single write, no transaction needed.
- **Pages**: `/clubs/new` (request form, any logged-in user), `/admin/club-requests` (server-side role-gated — checks `session.user.role` before rendering, not just relying on the API's own check, so a non-admin never sees the admin UI shell at all).
- Nav shows a "Club requests" link only when `session.user.role === "admin"`.
- **Verified**: `tsc --noEmit` clean, `next build` succeeds. `eslint` initially caught a real issue — `AdminClubRequestsList`'s data-fetching `useEffect` called an outer async function that set state, which trips the `react-hooks/set-state-in-effect` rule; fixed by defining the fetch inside the effect with a cancellation guard (React's recommended pattern, also avoids a set-state-after-unmount bug if the component unmounts mid-fetch) — now clean. Same DB caveat as before: static verification only, no live smoke test without a real `MONGODB_URI`.
## Club-owner management added (2026-07-15, same run) — closes out the core actor-flow scope

- **`requireClubOwner(clubId)`** added to `auth-helpers.ts`, distinct from `requireRole("clubOwner")`: having the role only means you own *some* club, not this one — every owner-management route checks the specific club's `owner` field against the session, not just the role. Multiple club owners exist in the system, each scoped to their own club.
- **`POST /api/clubs/[id]/posts`**, **`POST /api/clubs/[id]/events`** — owner-only, create content for their club.
- **`GET /api/clubs/[id]/members`** (pending join requests) + **`POST .../members/[membershipId]/approve`** / **`.../reject`** — owner-only. The membership lookup is scoped to `{ _id: membershipId, club: id }`, not just the membership's own ID, so an owner can't approve/reject a membership row belonging to a *different* club by guessing/incrementing an ID.
- **`/clubs/[id]/manage`** page — forms for posts/events + the pending-members list, server-side ownership-gated (same pattern as `/admin/club-requests`: checked before rendering, not just relying on the API). A "Manage club" link replaces the "Request to join" button on the club detail page when the viewer is the owner.
- **Verified**: `tsc --noEmit` clean, `eslint` clean (applied the effect-cancellation-guard pattern from the previous commit's fix directly this time, no repeat of that lint error), `next build` succeeds, all new routes registered correctly. Same DB caveat as every prior commit here.
- **This closes out the "core actor flows" scope** (task 18): visitors can browse, students can request to join or request a new club, admins approve club requests, owners manage their club's content and membership.

## AI recommendation feature added (2026-07-15, same run) — closes out Uniclub's planned scope

Kept deliberately honest about what this is: **content-based filtering** (score = count of overlapping tags between a student's `interests` and a club's `tags`), not a trained model — the original report never specified the technique, just the outcome ("recommendations"), and this is the simplest thing that actually works for a small club catalog. Same philosophy as Spendo's planned "smart alerts": real, explainable, not oversold as "AI" beyond what it is.

- **`Club.tags: string[]`** added (indexed) — set by the owner via a new "Tags" section on `/clubs/[id]/manage` (`PATCH /api/clubs/[id]`, owner-only via `requireClubOwner`).
- **`User.interests`** (already existed on the model from the scaffold, unused until now) is now actually collected — added optional `studyField`/`interests` fields to the signup form and API.
- **`GET /api/recommendations`**: for the logged-in user, finds clubs whose `tags` overlap their `interests`, excludes clubs they're already a member of (approved or pending — recommendations should surface something *new*), scores by overlap count, returns top 5. Returns an empty list (not an error) when the user has no interests set.
- **`RecommendedClubs` component** on `/clubs`: fetches and renders the list, but renders nothing at all (not an empty state) when logged out, loading, or no matches — a quiet section that only appears when it has something real to say, rather than an empty box implying something's broken.
- **Verified**: `tsc --noEmit` clean (caught and fixed two real implicit-`any` errors on `.lean()`-typed array callbacks — Mongoose's `.lean()` loses some type inference, needed explicit `(i: string)` annotations), `eslint` clean, `next build` succeeds, all routes registered. Same DB caveat as every commit this session.
- **This closes out Uniclub's full planned scope for this run** — task 17 done alongside task 18. Six commits total: scaffold, auth, browsing/joining, creation pipeline, owner management, recommendations.

## Re-verified 2026-07-17

Separate session, re-checked before adding anything: `tsc --noEmit`, `eslint`, and `next build` (with a placeholder `AUTH_SECRET`) all still clean, all 22 routes register correctly. No code changes needed — only gap left was the README (now done, see below). GitHub flagged **1 moderate Dependabot vulnerability** on push (`https://github.com/AkremHaddad/Uniclub/security/dependabot/1`) — not investigated or fixed this session, worth a look next time this repo is touched.

## Progress Tracking & GitHub Hygiene (standing rules, set 2026-07-14)

- **Write/maintain a real README.md** for the new build — ✅ done 2026-07-17, commit `6ec20e2`, adapted from the old `Uniclub-main/README.md` as suggested here.
- **Keep `C:\Projects\my profile\Project Summaries\Uniclub.md` (+ generated `.pdf`) up to date** as real implementation work happens — foreground architecture/technique decisions over a plain feature list. See `Project Summaries/_TEMPLATE.md`.
- **Commit and push after each completed task/subtask** to the existing `AkremHaddad/uniclub` remote (confirmed live).
- Explain non-obvious architecture/technique decisions as they're made — Akram is using this work to learn architecture/patterns, not just to get working code.
