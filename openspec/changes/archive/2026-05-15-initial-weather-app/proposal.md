## Why

We need a starting point for a hands-on training exercise on spec-driven development. The app must be simple enough to understand at a glance, but realistic enough to extend meaningfully. A weather app satisfies both: the domain is universally understood and it has a natural set of follow-on features (forecast, location detection) that participants will add during the lab.

## What Changes

A new Angular application is created from scratch. It displays current weather conditions for a hardcoded city (Saint Louis) by calling two free, no-auth APIs from Open-Meteo.

## Capabilities

### New Capabilities

- `current-weather`: Display current weather conditions for a fixed city, including temperature, weather condition, humidity, and wind speed. Handles loading and error states.

### Modified Capabilities

## Impact

- New Angular project at the repository root
- Two external API calls at startup (Open-Meteo geocoding + forecast)
- No authentication, no persistent state, no routing
