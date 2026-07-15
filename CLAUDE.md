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
- **Not done yet**: auth, Club/Event/Post/membership models, actual actor-flow pages, the AI recommendation feature (task 17). Only `web/`, `CLAUDE.md`, and `PROJECT_REPORT.md` get committed from this session — the pre-existing `Uniclub-main/`, loose `.sql` dumps, and `Rapport.pdf` stay untracked/uncommitted (legacy reference clutter, not part of the fresh rebuild).

## Progress Tracking & GitHub Hygiene (standing rules, set 2026-07-14)

- **Write/maintain a real README.md** for the new build (the old `Uniclub-main/README.md` is actually decent and can be adapted, not necessarily rewritten from scratch).
- **Keep `C:\Projects\my profile\Project Summaries\Uniclub.md` (+ generated `.pdf`) up to date** as real implementation work happens — foreground architecture/technique decisions over a plain feature list. See `Project Summaries/_TEMPLATE.md`.
- **Commit and push after each completed task/subtask** to the existing `AkremHaddad/uniclub` remote (confirmed live).
- Explain non-obvious architecture/technique decisions as they're made — Akram is using this work to learn architecture/patterns, not just to get working code.
