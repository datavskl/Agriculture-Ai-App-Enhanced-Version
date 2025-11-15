import { InventoryItem } from './inventory.types.js';

export const inventory: InventoryItem[] = [
  {
    id: 'inv-1',
    name: 'Urea Fertilizer',
    category: 'fertilizer',
    quantity: 120,
    unit: 'kg',
    lastUpdated: '2024-06-28',
  },
  {
    id: 'inv-2',
    name: 'Glyphosate Herbicide',
    category: 'pesticide',
    quantity: 25,
    unit: 'L',
    lastUpdated: '2024-06-22',
  },
  {
    id: 'inv-3',
    name: 'Drip Irrigation Filters',
    category: 'equipment',
    quantity: 10,
    unit: 'pieces',
    lastUpdated: '2024-06-18',
  },
  {
    id: 'inv-4',
    name: 'Hybrid Rice Seed',
    category: 'seed',
    quantity: 80,
    unit: 'kg',
    lastUpdated: '2024-06-12',
  },
];
