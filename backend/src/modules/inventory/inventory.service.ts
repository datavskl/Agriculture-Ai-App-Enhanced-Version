import { z } from 'zod';
import { inventory } from './inventory.data.js';
import { InventoryItem } from './inventory.types.js';

const listQuerySchema = z.object({
  category: z.enum(['fertilizer', 'pesticide', 'equipment', 'seed']).optional(),
});

const updateQuantitySchema = z.object({
  quantity: z.number().int().nonnegative(),
});

export const listInventory = (query: unknown): InventoryItem[] => {
  const { category } = listQuerySchema.parse(query);
  return category ? inventory.filter((item) => item.category === category) : inventory;
};

export const updateInventoryQuantity = (id: string, body: unknown): InventoryItem => {
  const payload = updateQuantitySchema.parse(body);
  const item = inventory.find((entry) => entry.id === id);
  if (!item) {
    const error = new Error(`Inventory item ${id} not found`);
    (error as { status?: number }).status = 404;
    throw error;
  }
  item.quantity = payload.quantity;
  item.lastUpdated = new Date().toISOString().slice(0, 10);
  return item;
};
