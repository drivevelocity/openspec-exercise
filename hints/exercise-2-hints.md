# Exercise 2 Hints — Weather for Your Location

Work through these one at a time. Try the exercise again after each hint before reading the next one.

---

**Hint 1 — Think about the browser API**

The browser has a built-in API for getting the user's physical location. What does it return? What are the two ways it can fail? Write those failure cases into your spec before you describe any UI.

---

**Hint 2 — Your spec needs at least three states**

A good spec for this feature should describe what the UI looks like in each of these situations:
- While waiting for the location (loading)
- When the location was retrieved successfully (show weather)
- When something went wrong — permission denied, or detection failed (show an error)

If your spec only describes the happy path, go back and add the error states.

---

**Hint 3 — Connecting location to weather**

Browser geolocation returns `latitude` and `longitude` directly. You can pass those straight to the Open-Meteo forecast URL — no geocoding step needed. Your spec should describe this data flow: geolocation → coordinates → weather API call.

The relevant Open-Meteo URL shape is:
```
https://api.open-meteo.com/v1/forecast?latitude=<lat>&longitude=<lon>&current=temperature_2m,...
```
