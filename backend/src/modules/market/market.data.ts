import { CommodityPrice, MarketTrend } from './market.types.js';

export const commodityPrices: CommodityPrice[] = [
  { commodity: 'Wheat', unit: '₹/quintal', latestPrice: 2950, change: 2.4 },
  { commodity: 'Rice', unit: '₹/quintal', latestPrice: 3150, change: -1.1 },
  { commodity: 'Cotton', unit: '₹/quintal', latestPrice: 6800, change: -0.8 },
  { commodity: 'Soybean', unit: '₹/quintal', latestPrice: 4200, change: 1.9 },
];

export const marketTrends: MarketTrend[] = [
  {
    commodity: 'Wheat',
    trend: [
      { timestamp: '2024-06-01', value: 2700 },
      { timestamp: '2024-06-15', value: 2800 },
      { timestamp: '2024-06-30', value: 2950 },
    ],
  },
  {
    commodity: 'Rice',
    trend: [
      { timestamp: '2024-06-01', value: 3200 },
      { timestamp: '2024-06-15', value: 3180 },
      { timestamp: '2024-06-30', value: 3150 },
    ],
  },
];
