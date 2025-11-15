import { Request, Response } from 'express';
import { getAlerts, getForecast, getWeatherSummary } from './weather.service.js';

export const getCurrentWeatherHandler = (req: Request, res: Response) => {
  return res.json(getWeatherSummary());
};

export const getForecastHandler = (req: Request, res: Response) => {
  const data = getForecast(req.query);
  return res.json({ data });
};

export const getWeatherAlertsHandler = (req: Request, res: Response) => {
  return res.json({ data: getAlerts() });
};
