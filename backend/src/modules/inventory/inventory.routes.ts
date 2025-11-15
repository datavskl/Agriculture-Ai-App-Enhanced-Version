import { Router } from 'express';
import {
  listInventoryHandler,
  updateInventoryQuantityHandler,
} from './inventory.controller.js';

export const inventoryRouter = Router();

inventoryRouter.get('/', listInventoryHandler);
inventoryRouter.patch('/:id/quantity', updateInventoryQuantityHandler);
