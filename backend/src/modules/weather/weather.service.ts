import { z } from 'zod';
import { alerts, forecast, weatherSummary } from './weather.data.js';
import { ForecastEntry, WeatherAlert, WeatherSummary } from './weather.types.js';

const forecastSchema = z.object({
  days: z
    .string()
    .optional()
    .transform((value: string | undefined) => (value ? parseInt(value, 10) : undefined))
    .refine((value) => value === undefined || (Number.isInteger(value) && value > 0 && value <= 14), {
      message: 'days must be between 1 and 14',
    }),
});

export const getWeatherSummary = (): WeatherSummary => weatherSummary;

export const getForecast = (query: unknown): ForecastEntry[] => {
  const { days } = forecastSchema.parse(query);
  return days ? forecast.slice(0, days) : forecast;
};

export const getAlerts = (): WeatherAlert[] => alerts;
