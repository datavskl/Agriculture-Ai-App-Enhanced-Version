export type WeatherSummary = {
  temperature: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  condition: string;
};

export type ForecastEntry = {
  date: string;
  high: number;
  low: number;
  condition: string;
};

export type WeatherAlert = {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  issuedAt: string;
};
