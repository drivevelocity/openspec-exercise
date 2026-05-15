# Exercise 1 Hints — Weekly Forecast

Work through these one at a time. Try the exercise again after each hint before reading the next one.

---

**Hint 1 — Start with the data shape, not the UI**

Before describing any layout, spec the data model for a single forecast day. At minimum it needs: a date, a high temperature, a low temperature, and a weather condition. Write this as an interface or a list of fields in your spec first.

---

**Hint 2 — The Open-Meteo API already supports daily forecasts**

You don't need a new API. Add the `daily` parameter to the existing forecast URL:

```
https://api.open-meteo.com/v1/forecast
  ?latitude=<lat>&longitude=<lon>
  &current=temperature_2m,...
  &daily=temperature_2m_max,temperature_2m_min,weather_code
  &timezone=auto
```

The response will include parallel arrays: `daily.time`, `daily.temperature_2m_max`, `daily.temperature_2m_min`, `daily.weather_code`. Your spec should describe how those arrays get combined into a list of day objects.

---

**Hint 3 — Scope down if time is short**

If you're running low on time, narrow the spec to just the happy path: assume data is always available and focus on rendering a list of 7 days. You can skip the "no data" state for now.
