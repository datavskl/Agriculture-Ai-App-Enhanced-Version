import { Router } from 'express';
import {
  getPestRisksHandler,
  getResourceUtilizationHandler,
  getYieldProjectionsHandler,
} from './analytics.controller.js';

export const analyticsRouter = Router();

analyticsRouter.get('/yield-projections', getYieldProjectionsHandler);
analyticsRouter.get('/pest-risks', getPestRisksHandler);
analyticsRouter.get('/resource-utilization', getResourceUtilizationHandler);
