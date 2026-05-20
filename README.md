# Weather App — OpenSpec Exercise

A simple Angular weather app used in a hands-on training session on spec-driven development. The exercises use OpenSpec slash commands (`/opsx-*`). This repo has OpenSpec configured for all three major AI coding tools — use whichever you prefer:

| Tool | Commands |
|------|----------|
| Cursor | `/opsx-*` slash commands (`.cursor/commands/`) |
| Claude Code | `/opsx:*` slash commands (`.claude/commands/`) |
| GitHub Copilot | `/opsx-*` prompt files (`.github/prompts/`) |

> **Note — expanded profile:** This repo ships with the full OpenSpec command set (`new`, `continue`, `ff`, `verify`, `sync`, `archive`, `bulk-archive`). A default `openspec init` installs only the `core` profile, whose starting point is `/opsx:propose` rather than `/opsx:new`. See [EXERCISES.md](EXERCISES.md#about-this-setup) for a comparison of the two workflows.

## Prerequisites

| Tool | Version | Install |
|------|---------|---------|
| Node.js | 20 LTS or later | https://nodejs.org |
| OpenSpec | latest | `npm install -g @fission-ai/openspec` |
| GitHub account | — | https://github.com |

Verify your setup:

```bash
node --version      # v20.19.0 or higher
openspec --version  # any version printed
```

## Getting started

1. Fork this repo on GitHub, then clone your fork:

```bash
git clone https://github.com/michal-depta/openspec-exercise.git
cd openspec-exercise
npm install
ng serve
```

2. Open http://localhost:4200 — you should see current weather for St. Louis, Missouri.

### Included AI tooling

This repo already includes optional AI tooling for environments that support MCP servers and slash-command skills:

- Cursor users get project MCP setup from `.cursor/mcp.json`, which starts the Angular CLI MCP server with `npx -y @angular/cli mcp`.
- Cursor and Claude Code users get a repo-local copy of the canonical `/angular-developer` skill and references from https://github.com/angular/skills.
- Other tools can still install the latest upstream `/angular-developer` skill directly from https://github.com/angular/skills if they do not read repo-local skills.

They help AI assistants follow current Angular guidance while working through the OpenSpec exercises, but the app and lab instructions do not require them.

## Lab exercises

See [EXERCISES.md](EXERCISES.md) for the hands-on tasks.

## How it works

The app calls two Open-Meteo APIs (no API key required):

1. **Geocoding** — converts a city name to coordinates  
   `https://geocoding-api.open-meteo.com/v1/search`

2. **Forecast** — fetches current weather for those coordinates  
   `https://api.open-meteo.com/v1/forecast`
