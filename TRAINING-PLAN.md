# Spec-Driven Development — Hands-On Lab Plan

## Overview

A 30-minute hands-on session introducing developers to spec-driven development using OpenSpec. Participants will work on a simple Angular weather app, writing specifications before any code is generated. The primary goal is to internalize the **spec-first mindset**: why thinking through requirements in a structured spec leads to better outcomes when working with AI coding tools.

- **Duration:** 30 minutes
- **Audience:** Angular beginners, general software developers
- **Framework:** Angular (standalone, no auth)
- **App:** Weather app (current conditions + forecast)

---

## Learning Objectives

By the end of the session, participants will:

1. Understand what a spec is and why it comes before code
2. Have completed at least one full spec → implementation cycle using OpenSpec
3. Appreciate how a well-written spec reduces ambiguity and improves AI-generated code quality

---

## Part 1: Trainer Preparation

### 1.1 Set Up the Base Repository

- [ ] Scaffold a new Angular app:
  ```bash
  npx @angular/cli new weather-app --standalone --routing=false --style=css
  ```
- [ ] Replace the default app with a working weather app that uses **mock data** (no real API calls, no API keys needed):
  - Displays current weather for a hardcoded location (e.g., "Warsaw")
  - Shows: city name, temperature, weather condition (e.g., "Sunny"), humidity, wind speed
  - Visually minimal but functional — a single component is fine
- [ ] Install and configure OpenSpec in the project:
  ```bash
  npm install -g openspec   # or per project — confirm installation method
  openspec init
  ```
- [ ] Commit the working base app to `main`

### 1.2 Prepare Exercise Checkpoints

Create a `hints/` folder at the repo root with per-exercise Markdown files:

```
hints/
  exercise-1-hints.md    # Step-by-step prompts if stuck
  exercise-2-hints.md
```

Each hints file should:
- Describe the goal in plain language
- Offer 3 progressive hints (vague → specific)
- NOT provide a complete solution — the participant writes the spec themselves

### 1.3 Write the Exercise Instructions

Create an `EXERCISES.md` file (see Part 3 below) and commit it to the repo.

### 1.4 Pre-flight Checklist

Before the training day:
- [ ] Verify the app runs cleanly with `ng serve` on a clean `npm install`
- [ ] Verify `openspec` CLI works end-to-end on the base app
- [ ] Test the full exercise flow yourself — time it
- [ ] Confirm the repo is public on GitHub (participants need to fork it)
- [ ] Add a `README.md` with prerequisites and quick-start instructions

---

## Part 2: Participant Prerequisites (Before the Lab)

Communicate the following to participants **at least one day before** the session.

### Required

| Tool | Version | Install |
|------|---------|---------|
| Node.js | 18 LTS or later | https://nodejs.org |
| OpenSpec | latest | `npm install -g openspec` |
| GitHub account | — | https://github.com |

### Verify Setup

Participants should run these commands and confirm they succeed:

```bash
node --version      # should print v18.x or higher
openspec --version  # should print a version number
```

### Fork the Repo

1. Go to the training repo on GitHub (trainer provides the URL)
2. Click **Fork** → create a fork under your own account
3. Clone your fork locally:
   ```bash
   git clone https://github.com/<your-username>/openspec-exercise.git
   cd openspec-exercise
   npm install
   ng serve
   ```
4. Open http://localhost:4200 — you should see the weather app running

> No git experience beyond clone is needed. Participants work locally; pushing is optional.

---

## Part 3: Lab Exercises

### Timing

| Segment | Time |
|---------|------|
| Intro / context-setting | 3 min |
| Exercise 1 | 12 min |
| Brief debrief | 3 min |
| Exercise 2 | 15 min |
| Wrap-up discussion | 2 min |

Each exercise follows the same 7-step cycle: **new → continue (×N) → commit → apply → verify → sync → archive**

---

### Trainer Intro Script (3 min)

Cover these points briefly:

> "Today we're going to practice writing a spec *before* writing any code. A spec isn't a design doc — it's a short, structured description of what you want to build. When you give a spec to an AI tool, it has enough context to generate useful, targeted code instead of making assumptions. The app you're looking at shows weather data for St. Louis, Missouri. Your job is to extend it — but first, you'll write the spec."

Also briefly explain the cycle they'll follow in each exercise: start a change, build up the spec artifacts one by one, commit, then let the AI implement — and finally verify, sync, and archive.

---

### Exercise 1 — Weekly Forecast (12 min)

**Goal:** Display a 7-day weather forecast below the current conditions.

**Cycle:**
1. `/opsx-new weekly-forecast` — scaffold the change
2. `/opsx-continue` (×4) — proposal → spec → design → tasks
3. `git commit` — commit spec artifacts before any code
4. `/opsx-apply` — generate implementation
5. `/opsx-verify` — check implementation matches spec
6. `/opsx-sync` — merge delta spec into main specs
7. `/opsx-archive` — close out the change

**Checkpoint hints (in `hints/exercise-1-hints.md`):**

- *Hint 1:* Start with the data model for a single day — spec the interface before describing any UI
- *Hint 2:* Each day should at minimum show: date, high/low temperature, condition
- *Hint 3:* If you're short on time, scope the spec to the happy path only — skip the "no data" state

---

### Exercise 2 — Weather for the User's Location (15 min)

**Goal:** Add the ability to show weather for the user's current location instead of a hardcoded city.

**Intentionally left open:** How to get the location is not specified. Participants must think through this in their spec.

**Cycle:**
1. `/opsx-new user-location` — scaffold the change
2. `/opsx-continue` (×4) — proposal → spec → design → tasks
3. `git commit` — commit spec artifacts before any code
4. `/opsx-apply` — generate implementation
5. `/opsx-verify` — pay special attention to error states (denied, timeout)
6. `/opsx-sync` — merge delta spec into main specs
7. `/opsx-archive` — close out the change

**Checkpoint hints (in `hints/exercise-2-hints.md`):**

- *Hint 1:* The proposal should answer how the app determines the user's location — there's more than one valid approach
- *Hint 2:* The spec should cover failure/edge cases, not just the happy path
- *Hint 3:* The design artifact is the right place to record why one approach was chosen over alternatives

---

### Wrap-Up Discussion (2 min)

Ask the group:
- Did writing the spec change what you ended up building?
- Where did you find yourself going back to revise the spec?
- What would have happened if you'd skipped the spec and gone straight to code?

---

## Part 4: Repository Structure (Final)

```
openspec-exercise/              # repo root
├── src/                        # Angular app source
├── public/                     # Static assets
├── hints/
│   ├── exercise-1-hints.md
│   └── exercise-2-hints.md
├── EXERCISES.md                # Lab instructions for participants
├── TRAINING-PLAN.md            # This file (trainer reference)
├── README.md                   # Prerequisites + quick-start
├── angular.json
├── package.json
├── tsconfig.json
└── openspec.config.*           # OpenSpec config (after openspec init)
```

---

## Part 5: Contingency Notes

| Problem | Mitigation |
|---------|------------|
| Participant can't install OpenSpec | Pair them with a neighbour who can |
| `ng serve` fails on a machine | Check Node version; `npm install` again |
| Exercise 1 runs long | Skip the error/denied state in the spec — focus on happy path only |
| Group moves fast | Bonus: ask them to write a spec for adding temperature unit toggle (°C / °F) |
| GitHub inaccessible | Share the repo as a ZIP via email/chat as fallback; skip git steps |
