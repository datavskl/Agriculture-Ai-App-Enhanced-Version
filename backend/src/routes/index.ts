import { Router } from 'express';
import { weatherRouter } from '../modules/weather/weather.routes.js';
import { farmRouter } from '../modules/farm/farm.routes.js';
import { marketRouter } from '../modules/market/market.routes.js';
import { taskRouter } from '../modules/tasks/task.routes.js';
import { inventoryRouter } from '../modules/inventory/inventory.routes.js';
import { analyticsRouter } from '../modules/analytics/analytics.routes.js';

export const router = Router();

router.use('/weather', weatherRouter);
router.use('/farm', farmRouter);
router.use('/market', marketRouter);
router.use('/tasks', taskRouter);
router.use('/inventory', inventoryRouter);
router.use('/analytics', analyticsRouter);
