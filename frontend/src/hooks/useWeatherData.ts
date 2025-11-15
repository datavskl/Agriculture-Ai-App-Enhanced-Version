import { useCallback, useEffect, useState } from 'react';
import { fetchWeatherSnapshot, WeatherAlert } from '@/services/api/weather';
import { WeatherData } from '@/types';

interface WeatherState {
  weather?: WeatherData;
  alerts: WeatherAlert[];
  isLoading: boolean;
  error?: string;
}

export const useWeatherData = (days = 5) => {
  const [state, setState] = useState<WeatherState>({
    alerts: [],
    isLoading: false,
  });

  const load = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: undefined }));
    try {
      const snapshot = await fetchWeatherSnapshot(days);
      setState({
        weather: snapshot.weather,
        alerts: snapshot.alerts,
        isLoading: false,
      });
    } catch (error) {
      console.error('Failed to load weather data', error);
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Unable to load weather data',
      }));
    }
  }, [days]);

  useEffect(() => {
    void load();
  }, [load]);

  return {
    ...state,
    refresh: load,
  };
};
