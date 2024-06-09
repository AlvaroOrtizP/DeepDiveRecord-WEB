import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherData } from './weather-data.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { FooterComponent } from "./shared/components/footer/footer.component";


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
        CommonModule,
        RouterModule,
        MatToolbarModule,
        MatButtonModule,
        MatCardModule,
        NavbarComponent,
        FooterComponent
    ]
})

export class AppComponent {
  title = 'DeepDiveRecord-Web';
  weatherData: WeatherData[] = [
    {
      year: '2024',
      month: '06',
      day: '01',
      site: 'Site A',
      timeOfDay: 'Morning',
      wind: 10,
      windDirection: 180,
      gustsOfWind: 15.5,
      waveHeight: '1.2m',
      wavePeriod: 5,
      earthTemperature: 25,
      waterTemperature: '22°C',
      f1: 1,
      descripcion1: 'Clear',
      f2: 0,
      descripcion2: '',
      beginning: '06:00',
      end: '18:00',
      notas: 'No issues',
      diveDayId: 1
    },
    {
      year: '2024',
      month: '06',
      day: '02',
      site: 'Site B',
      timeOfDay: 'Afternoon',
      wind: 12,
      windDirection: 190,
      gustsOfWind: 18.7,
      waveHeight: '1.5m',
      wavePeriod: 6,
      earthTemperature: 26,
      waterTemperature: '23°C',
      f1: 1,
      descripcion1: 'Partly cloudy',
      f2: 0,
      descripcion2: '',
      beginning: '12:00',
      end: '20:00',
      notas: 'Light rain',
      diveDayId: 2
    }
    // Agrega más datos si es necesario
  ];


  /*

  constructor(private weatherService: WeatherService) {
    this.weatherData = this.weatherService.getWeatherData();
  }
  */
  constructor() {
    // No necesitas el WeatherService aquí ya que estamos usando datos estáticos
  }
}
