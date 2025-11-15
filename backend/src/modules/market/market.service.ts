import { z } from 'zod';
import { commodityPrices, marketTrends } from './market.data.js';
import { CommodityPrice, MarketTrend } from './market.types.js';

const commodityQuerySchema = z.object({
  commodity: z.string().optional(),
});

export const listCommodityPrices = (): CommodityPrice[] => commodityPrices;

export const getMarketTrend = (query: unknown): MarketTrend => {
  const { commodity } = commodityQuerySchema.parse(query);
  if (!commodity) {
    const error = new Error('commodity query parameter is required');
    (error as { status?: number }).status = 400;
    throw error;
  }
  const trend = marketTrends.find((entry) => entry.commodity.toLowerCase() === commodity.toLowerCase());
  if (!trend) {
    const error = new Error(`No trend data found for ${commodity}`);
    (error as { status?: number }).status = 404;
    throw error;
  }
  return trend;
};
