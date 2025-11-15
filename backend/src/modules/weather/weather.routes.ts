import { Router } from 'express';
import {
  getCurrentWeatherHandler,
  getForecastHandler,
  getWeatherAlertsHandler,
} from './weather.controller.js';

export const weatherRouter = Router();

weatherRouter.get('/current', getCurrentWeatherHandler);
weatherRouter.get('/forecast', getForecastHandler);
weatherRouter.get('/alerts', getWeatherAlertsHandler);
