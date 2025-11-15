export type InventoryItem = {
  id: string;
  name: string;
  category: 'fertilizer' | 'pesticide' | 'equipment' | 'seed';
  quantity: number;
  unit: string;
  lastUpdated: string;
};
