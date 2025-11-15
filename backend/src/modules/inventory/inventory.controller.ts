import { Request, Response } from 'express';
import { listInventory, updateInventoryQuantity } from './inventory.service.js';

export const listInventoryHandler = (req: Request, res: Response) => {
  const data = listInventory(req.query);
  return res.json({ data });
};

export const updateInventoryQuantityHandler = (req: Request, res: Response) => {
  const item = updateInventoryQuantity(req.params.id, req.body);
  return res.json(item);
};
