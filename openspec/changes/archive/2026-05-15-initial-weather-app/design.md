## Context

A new Angular standalone app. No existing codebase to conform to. The design should be as simple as possible — this is a training exercise, not a production app.

## Goals / Non-Goals

**Goals:**
- Single component, minimal dependencies
- Works without any API key or account
- Handles loading and error states visibly
- Easy for participants to read and extend

**Non-Goals:**
- Authentication
- Routing
- Unit tests
- State management library
- Server-side rendering

## Decisions

**Use Open-Meteo (geocoding + forecast) instead of a keyed API.**
Open-Meteo is free and requires no registration. This eliminates the "everyone sign up for an API key" setup burden entirely. Two sequential HTTP calls: geocoding resolves the city name to lat/lon, then forecast fetches current conditions for those coordinates.

**Geocoding → forecast chain via RxJS `switchMap`.**
The two calls are naturally sequential (coordinates from call 1 feed call 2). `switchMap` in `WeatherService` keeps the logic in one Observable chain and avoids nested subscriptions.

**WMO weather code mapped to human-readable strings in the service.**
The Open-Meteo API returns numeric WMO weather codes. A static lookup table in the service converts them to display strings. This keeps the component dumb — it only receives a `condition: string`.

**Angular signals for component state.**
Three signals — `weather`, `loading`, `error` — map directly to the three UI states. No `async` pipe, no `*ngIf` on Observables. Signals are the modern Angular pattern and are easy to read at a glance.

**Single `App` component, no child components.**
The weather card is simple enough to live in the root component template. Splitting it into a `WeatherCardComponent` adds ceremony without benefit at this scale.

## Risks / Trade-offs

- **Hardcoded city:** Saint Louis is always shown on load. Participants will replace this in Exercise 2, so it is intentional.
- **No error retry:** A failed API call shows an error message with no retry button. Acceptable for a training app.
- **WMO table is incomplete:** Only common codes are mapped; rare codes fall back to "Unknown". Good enough for the exercise.
