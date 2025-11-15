import { Router } from 'express';
import {
  getFieldsHandler,
  getProfileHandler,
  getRotationPlanHandler,
} from './farm.controller.js';

export const farmRouter = Router();

farmRouter.get('/profile', getProfileHandler);
farmRouter.get('/fields', getFieldsHandler);
farmRouter.get('/rotation-plan', getRotationPlanHandler);
