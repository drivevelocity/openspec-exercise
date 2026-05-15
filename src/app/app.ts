import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService, CurrentWeather } from './weather.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private weatherService = inject(WeatherService);

  weather = signal<CurrentWeather | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit() {
    this.weatherService.getCurrentWeather('St. Louis').subscribe({
      next: data => {
        this.weather.set(data);
        this.loading.set(false);
      },
      error: err => {
        this.error.set(err.message ?? 'Failed to load weather data');
        this.loading.set(false);
      },
    });
  }
}
