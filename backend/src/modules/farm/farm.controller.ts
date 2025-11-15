import { Request, Response } from 'express';
import { getFarmerProfile, getFields, getRotationPlan } from './farm.service.js';

export const getProfileHandler = (req: Request, res: Response) => {
  return res.json(getFarmerProfile());
};

export const getFieldsHandler = (req: Request, res: Response) => {
  const data = getFields(req.query);
  return res.json({ data });
};

export const getRotationPlanHandler = (req: Request, res: Response) => {
  const plan = getRotationPlan(req.query);
  return res.json(plan);
};
