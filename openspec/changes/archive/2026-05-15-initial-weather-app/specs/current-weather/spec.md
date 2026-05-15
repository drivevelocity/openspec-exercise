## ADDED Requirements

### Requirement: Display current weather for a fixed city
The system SHALL fetch and display current weather conditions for a hardcoded city (Saint Louis) on application load.

#### Scenario: Successful load
- **WHEN** the application starts
- **THEN** it calls the Open-Meteo geocoding API to resolve the city name to coordinates, then calls the Open-Meteo forecast API for current conditions, and displays: city name, temperature (°C, rounded), weather condition (human-readable), humidity (%), wind speed (km/h, rounded)

#### Scenario: Loading state
- **WHEN** the API calls are in flight
- **THEN** the UI displays a loading indicator in place of the weather card

#### Scenario: API or network error
- **WHEN** either API call fails for any reason
- **THEN** the UI displays a human-readable error message in place of the weather card and does not crash
