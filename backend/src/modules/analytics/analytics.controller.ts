import { Request, Response } from 'express';
import {
  getPestRisks,
  getResourceUtilization,
  getYieldProjections,
} from './analytics.service.js';

export const getYieldProjectionsHandler = (req: Request, res: Response) => {
  return res.json({ data: getYieldProjections() });
};

export const getPestRisksHandler = (req: Request, res: Response) => {
  return res.json({ data: getPestRisks() });
};

export const getResourceUtilizationHandler = (req: Request, res: Response) => {
  return res.json({ data: getResourceUtilization() });
};
