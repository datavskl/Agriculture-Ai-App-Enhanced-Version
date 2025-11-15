import { request } from './client';
import { WeatherData, WeatherForecastEntry } from '@/types';

type ForecastResponse = {
  data: WeatherForecastEntry[];
};

type AlertsResponse = {
  data: WeatherAlert[];
};

export type WeatherSummaryResponse = Omit<WeatherData, 'forecast'>;

export type WeatherAlert = {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  issuedAt: string;
};

export const fetchWeatherSummary = () => request<WeatherSummaryResponse>('/weather/current');

export const fetchWeatherForecast = (days?: number) => {
  const searchParams = new URLSearchParams();
  if (days) {
    searchParams.set('days', String(days));
  }
  const query = searchParams.toString();
  const path = query ? `/weather/forecast?${query}` : '/weather/forecast';
  return request<ForecastResponse>(path);
};

export const fetchWeatherAlerts = () => request<AlertsResponse>('/weather/alerts');

export const fetchWeatherSnapshot = async (days = 5) => {
  const [summary, forecastResponse, alertsResponse] = await Promise.all([
    fetchWeatherSummary(),
    fetchWeatherForecast(days),
    fetchWeatherAlerts(),
  ]);

  const weather: WeatherData = {
    ...summary,
    forecast: forecastResponse.data,
  };

  return {
    weather,
    alerts: alertsResponse.data,
  };
};
