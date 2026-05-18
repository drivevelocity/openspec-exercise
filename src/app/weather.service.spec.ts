import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(WeatherService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should resolve city name and return mapped weather', () => {
    let result: any;
    service.getCurrentWeather('St. Louis').subscribe(w => (result = w));

    http.expectOne(r => r.url.includes('geocoding-api.open-meteo.com')).flush({
      results: [{ name: 'St Louis', latitude: 38.63, longitude: -90.20, country: 'United States' }],
    });

    http.expectOne(r => r.url.includes('api.open-meteo.com')).flush({
      current: { temperature_2m: 21.7, relative_humidity_2m: 55, wind_speed_10m: 14.4, weather_code: 1 },
    });

    expect(result).toEqual({
      city: 'St Louis, United States',
      temperature: 22,
      condition: 'Mainly clear',
      humidity: 55,
      windSpeed: 14,
    });
  });

  it('should throw when city is not found', () => {
    let err: any;
    service.getCurrentWeather('Nowhere').subscribe({ error: e => (err = e) });

    http.expectOne(r => r.url.includes('geocoding-api.open-meteo.com')).flush({ results: [] });

    expect(err.message).toContain('"Nowhere" not found');
  });

  it('should map unknown WMO code to "Unknown"', () => {
    let result: any;
    service.getCurrentWeather('St. Louis').subscribe(w => (result = w));

    http.expectOne(r => r.url.includes('geocoding-api.open-meteo.com')).flush({
      results: [{ name: 'St Louis', latitude: 38.63, longitude: -90.20, country: 'United States' }],
    });
    http.expectOne(r => r.url.includes('api.open-meteo.com')).flush({
      current: { temperature_2m: 10, relative_humidity_2m: 40, wind_speed_10m: 5, weather_code: 999 },
    });

    expect(result.condition).toBe('Unknown');
  });

  it('should propagate forecast API errors', () => {
    let err: any;
    service.getCurrentWeather('St. Louis').subscribe({ error: e => (err = e) });

    http.expectOne(r => r.url.includes('geocoding-api.open-meteo.com')).flush({
      results: [{ name: 'St Louis', latitude: 38.63, longitude: -90.20, country: 'United States' }],
    });
    http.expectOne(r => r.url.includes('api.open-meteo.com')).error(new ErrorEvent('network error'));

    expect(err).toBeTruthy();
  });
});
