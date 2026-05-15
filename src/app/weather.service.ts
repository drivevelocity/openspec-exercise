import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, map } from 'rxjs';

export interface CurrentWeather {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

interface GeocodingResult {
  results?: Array<{
    name: string;
    latitude: number;
    longitude: number;
    country: string;
  }>;
}

interface ForecastResult {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    weather_code: number;
  };
}

const WMO_DESCRIPTIONS: Record<number, string> = {
  0: 'Clear sky',
  1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
  45: 'Foggy', 48: 'Icy fog',
  51: 'Light drizzle', 53: 'Drizzle', 55: 'Heavy drizzle',
  61: 'Light rain', 63: 'Rain', 65: 'Heavy rain',
  71: 'Light snow', 73: 'Snow', 75: 'Heavy snow',
  80: 'Showers', 81: 'Rain showers', 82: 'Violent showers',
  95: 'Thunderstorm', 96: 'Thunderstorm with hail',
};

function wmoDescription(code: number): string {
  return WMO_DESCRIPTIONS[code] ?? 'Unknown';
}

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private http = inject(HttpClient);

  getCurrentWeather(city: string): Observable<CurrentWeather> {
    const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;

    return this.http.get<GeocodingResult>(geocodingUrl).pipe(
      switchMap(geo => {
        const place = geo.results?.[0];
        if (!place) throw new Error(`City "${city}" not found`);

        const weatherUrl =
          `https://api.open-meteo.com/v1/forecast` +
          `?latitude=${place.latitude}&longitude=${place.longitude}` +
          `&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`;

        return this.http.get<ForecastResult>(weatherUrl).pipe(
          map(w => ({
            city: `${place.name}, ${place.country}`,
            temperature: Math.round(w.current.temperature_2m),
            condition: wmoDescription(w.current.weather_code),
            humidity: w.current.relative_humidity_2m,
            windSpeed: Math.round(w.current.wind_speed_10m),
          }))
        );
      })
    );
  }
}
