import { ForecastEntry, WeatherAlert, WeatherSummary } from './weather.types.js';

export const weatherSummary: WeatherSummary = {
  temperature: 28,
  humidity: 75,
  windSpeed: 12,
  precipitation: 5,
  condition: 'Sunny',
};

export const forecast: ForecastEntry[] = [
  { date: '2024-07-01', high: 31, low: 24, condition: 'Sunny' },
  { date: '2024-07-02', high: 32, low: 25, condition: 'Partly Cloudy' },
  { date: '2024-07-03', high: 29, low: 23, condition: 'Showers' },
  { date: '2024-07-04', high: 30, low: 24, condition: 'Sunny' },
  { date: '2024-07-05', high: 28, low: 22, condition: 'Thunderstorms' },
];

export const alerts: WeatherAlert[] = [
  {
    id: 'alert-1',
    title: 'High Heat Warning',
    description: 'Temperatures above 32°C expected for the next 48 hours. Adjust irrigation schedules accordingly.',
    severity: 'medium',
    issuedAt: new Date().toISOString(),
  },
];
