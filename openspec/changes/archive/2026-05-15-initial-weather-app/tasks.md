## 1. Project Setup

- [x] 1.1 Scaffold Angular standalone app with `ng new` (no routing, CSS styles)
- [x] 1.2 Add `@fission-ai/openspec` to `package.json` dependencies
- [x] 1.3 Register `provideHttpClient()` in `app.config.ts`

## 2. Weather Service

- [x] 2.1 Create `WeatherService` with `getCurrentWeather(city: string)` method
- [x] 2.2 Implement geocoding call to Open-Meteo geocoding API
- [x] 2.3 Chain forecast call to Open-Meteo forecast API via `switchMap`
- [x] 2.4 Map WMO weather codes to human-readable condition strings
- [x] 2.5 Return a typed `CurrentWeather` object (city, temperature, condition, humidity, windSpeed)

## 3. App Component

- [x] 3.1 Add `weather`, `loading`, and `error` signals to `App`
- [x] 3.2 Call `WeatherService.getCurrentWeather('Saint Louis')` in `ngOnInit`
- [x] 3.3 Set signals on success and error

## 4. Template & Styles

- [x] 4.1 Render loading state
- [x] 4.2 Render error state
- [x] 4.3 Render weather card (city, temperature, condition, humidity, wind speed)
- [x] 4.4 Apply minimal CSS styling
