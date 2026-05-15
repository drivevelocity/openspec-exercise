# Weather App — OpenSpec Exercise

A simple Angular weather app used in a hands-on training session on spec-driven development.

## Prerequisites

| Tool | Version | Install |
|------|---------|---------|
| Node.js | 18 LTS or later | https://nodejs.org |
| OpenSpec | latest | `npm install -g @fission-ai/openspec` |
| GitHub account | — | https://github.com |

Verify your setup:

```bash
node --version      # v18.x or higher
openspec --version  # any version printed
```

## Getting started

1. Fork this repo on GitHub, then clone your fork:

```bash
git clone https://github.com/<your-username>/openspec-exercise.git
cd openspec-exercise
npm install
ng serve
```

2. Open http://localhost:4200 — you should see current weather for Warsaw.

## Lab exercises

See [EXERCISES.md](EXERCISES.md) for the hands-on tasks.
If you get stuck, check the [hints/](hints/) folder.

## How it works

The app calls two Open-Meteo APIs (no API key required):

1. **Geocoding** — converts a city name to coordinates  
   `https://geocoding-api.open-meteo.com/v1/search`

2. **Forecast** — fetches current weather for those coordinates  
   `https://api.open-meteo.com/v1/forecast`
