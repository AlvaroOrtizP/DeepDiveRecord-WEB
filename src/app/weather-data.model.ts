// src/app/weather-data.model.ts
export interface WeatherData {
  year: string;
  month: string;
  day: string;
  site: string;
  timeOfDay: string;
  wind: number;
  windDirection: number;
  gustsOfWind: number;
  waveHeight: string;
  wavePeriod: number;
  earthTemperature: number;
  waterTemperature: string;
  f1: number;
  descripcion1: string;
  f2: number;
  descripcion2: string;
  beginning: string;
  end: string;
  notas: string;
  diveDayId: number;
}
