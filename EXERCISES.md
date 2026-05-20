# Lab Exercises — Spec-Driven Development with OpenSpec

You have a running weather app that shows current conditions for **St. Louis, Missouri**.  
Your goal is to extend it — but before writing any code, you will write a **spec**.

A spec is a short, structured description of what you want to build. It makes your intent explicit so that an AI tool can generate targeted, correct code instead of guessing.

Each exercise follows the same full cycle:

> **new** → **continue** (repeat until ready) → commit → **apply** → **verify** → **sync** → **archive**

---

## About this setup

This repo uses the **expanded OpenSpec workflow** — the full command set, configured for explicit step-by-step artifact authoring. This is intentional for learning, but it is not what you get from a default `openspec init` in a fresh repo.

**Default (`core` profile) — what a fresh install provides:**

```
/opsx:propose ──► /opsx:apply ──► /opsx:sync ──► /opsx:archive
```

In the `core` profile, `/opsx:propose` does in one step what `new` + `continue` does here: it scaffolds the change directory and generates all planning artifacts (proposal, specs, design, tasks) at once.

**Expanded profile — what this repo uses:**

```
/opsx:new ──► /opsx:continue (×N) ──► /opsx:apply ──► /opsx:verify ──► /opsx:sync ──► /opsx:archive
```

This lab uses `continue` deliberately. Going artifact-by-artifact forces you to think through each piece before moving on — which is the whole point of the exercise. Once you are comfortable with the workflow, you will likely prefer `propose` (or `/opsx:ff`) for day-to-day speed.

To enable the expanded workflow in your own repo after the lab:

```bash
openspec config profile
openspec update
```

---

## Exercise 1 — Weekly Forecast

**Time:** ~12 minutes

### Background

The app shows only today's conditions. Users want to plan ahead and see the week ahead.

---

### Step 1 — Start the change

In Cursor, run:
```
/opsx-new weekly-forecast
```
This scaffolds the change directory and shows you the first artifact to fill in (a proposal).

---

### Step 2 — Build the spec artifacts

The spec-driven workflow produces these artifacts in order:
1. **Proposal** — what you want to build and why
2. **Design** — technical decisions and implementation approach
3. **Spec** — requirements and scenarios for each capability
4. **Tasks** — a checklist of implementation steps

Think through the following as you fill in each artifact:
- What data does each day in the forecast need? (date, high, low, condition?)
- Where does this data come from? (hint: the Open-Meteo forecast API supports a `daily` parameter)
- How should it look on screen? (list? cards? something else?)
- What if the forecast data is unavailable?

Run `/opsx-continue` once per artifact until all are created:
```
/opsx-continue weekly-forecast
```

---

### Step 3 — Commit before touching code

Before any code is generated, commit the spec artifacts:
```bash
git add openspec/
git commit -m "spec: weekly-forecast artifacts"
```

This keeps the spec and the implementation in separate commits, making it easy to review what was planned versus what was built.

---

### Step 4 — Generate the implementation

```
/opsx-apply weekly-forecast
```

Cursor will work through the task checklist from your spec and generate the code.

---

### Step 5 — Verify the implementation

```
/opsx-verify weekly-forecast
```

This checks that the implementation matches your spec: all tasks completed, requirements covered, design decisions followed. Fix any critical issues before continuing.

---

### Step 6 — Sync specs to the main spec store

```
/opsx-sync weekly-forecast
```

This merges the delta spec from your change into the project's permanent spec files. Think of it as "accepting" the new requirements into the canonical source of truth.

---

### Step 7 — Archive the change

```
/opsx-archive weekly-forecast
```

The change is moved to the archive. The implementation is live, the spec is in the main store, and the change directory is out of the way.

---

## Exercise 2 — Weather for Your Location

**Time:** ~15 minutes

### Background

The app currently shows weather for a hardcoded city. Users should see weather for wherever they actually are.

---

### Step 1 — Start the change

```
/opsx-new user-location
```

---

### Step 2 — Build the spec artifacts

Think through the following as you fill in each artifact:
- How does the app know where the user is? There is more than one answer — pick one and justify it in your proposal.
- What does the UI show while the location is being determined?
- What happens when something goes wrong?

```
/opsx-continue user-location
```

Keep running `/opsx-continue` until all artifacts are complete.

---

### Step 3 — Commit before touching code

```bash
git add openspec/
git commit -m "spec: user-location artifacts"
```

---

### Step 4 — Generate the implementation

```
/opsx-apply user-location
```

---

### Step 5 — Verify the implementation

```
/opsx-verify user-location
```

Pay particular attention to the error and edge cases — verify they are actually handled in the generated code, not just described in the spec.

---

### Step 6 — Sync specs

```
/opsx-sync user-location
```

---

### Step 7 — Archive the change

```
/opsx-archive user-location
```

---

## Stuck?

Progressive hints are in the [hints/](hints/) folder:
- [Exercise 1 hints](hints/exercise-1-hints.md)
- [Exercise 2 hints](hints/exercise-2-hints.md)

Try to work through each hint one at a time rather than reading all of them at once.
