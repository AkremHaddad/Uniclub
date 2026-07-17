# UniClub — web

Next.js + MongoDB rebuild of **UniClub**, a platform for university club visibility and student engagement — students discover and join clubs, club owners post updates and run events, admins approve new club registrations. Originally a 2nd-year academic group project (PHP/MySQL), rebuilt solo by Akram on a modern stack. See the repo root [`CLAUDE.md`](../CLAUDE.md) for the full rebuild history and [`PROJECT_REPORT.md`](../PROJECT_REPORT.md) for the original domain spec.

## Stack

- **Next.js 16** (App Router), **TypeScript**, **Tailwind CSS**
- **MongoDB** via **Mongoose** (`src/lib/mongodb.ts` — connection singleton, survives dev hot-reload)
- **Auth.js v5** (Credentials provider, JWT sessions, bcrypt password hashing)

## Actors

- **Student** — browses clubs/events/posts, requests to join a club, requests to register a new club, sets `interests` for recommendations
- **Club owner** — manages their own club's posts, events, and pending member requests (scoped to *their* club only — see `requireClubOwner` in `src/lib/auth-helpers.ts`)
- **Admin** — approves or rejects new-club requests (approval atomically creates the `Club` and promotes the requester to `clubOwner` via a Mongoose transaction)

## Features

- Club/event/post browsing (`/clubs`, `/clubs/[id]`)
- Join-request flow with owner approve/reject
- Club-registration request → admin approval pipeline (`/clubs/new`, `/admin/club-requests`)
- Club-owner management console (`/clubs/[id]/manage`) — posts, events, tags, pending members
- **Recommendations** (`/api/recommendations`) — content-based tag matching between a student's `interests` and each club's `tags`; deliberately simple (overlap count, not a trained model) and explainable, matching the original report's stated feature without overselling it as more than it is

## Getting started

```bash
npm install
cp .env.local.example .env.local   # fill in MONGODB_URI and AUTH_SECRET
npm run dev
```

```bash
npm run build       # production build
npm run lint          # eslint
npx tsc --noEmit       # typecheck
```

`AUTH_SECRET`: generate with `npx auth secret` or `openssl rand -base64 32`.
