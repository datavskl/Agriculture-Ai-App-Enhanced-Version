import { TimeSeriesPoint } from '../../shared/types.js';

export type CommodityPrice = {
  commodity: string;
  unit: string;
  latestPrice: number;
  change: number;
};

export type MarketTrend = {
  commodity: string;
  trend: TimeSeriesPoint[];
};
