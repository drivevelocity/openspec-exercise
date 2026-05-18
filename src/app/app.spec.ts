import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { App } from './app';

describe('App', () => {
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should create', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show loading state before API responds', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.state-message')?.textContent).toContain('Loading');
    http.expectOne(r => r.url.includes('geocoding-api.open-meteo.com')).flush({ results: [] });
  });

  it('should render weather card after successful API response', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    http.expectOne(r => r.url.includes('geocoding-api.open-meteo.com')).flush({
      results: [{ name: 'St Louis', latitude: 38.63, longitude: -90.20, country: 'United States' }],
    });
    http.expectOne(r => r.url.includes('api.open-meteo.com')).flush({
      current: { temperature_2m: 25, relative_humidity_2m: 60, wind_speed_10m: 10, weather_code: 0 },
    });

    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.weather-card')).toBeTruthy();
    expect(el.querySelector('.temperature')?.textContent).toContain('25');
    expect(el.querySelector('.condition')?.textContent).toContain('Clear sky');
  });

  it('should render error message when API fails', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    http.expectOne(r => r.url.includes('geocoding-api.open-meteo.com')).error(new ErrorEvent('network error'));

    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.state-message.error')).toBeTruthy();
    expect(el.querySelector('.weather-card')).toBeNull();
  });
});
