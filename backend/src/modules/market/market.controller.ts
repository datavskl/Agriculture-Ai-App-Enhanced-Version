import { Request, Response } from 'express';
import { getMarketTrend, listCommodityPrices } from './market.service.js';

export const listCommodityPricesHandler = (req: Request, res: Response) => {
  return res.json({ data: listCommodityPrices() });
};

export const getMarketTrendHandler = (req: Request, res: Response) => {
  const trend = getMarketTrend(req.query);
  return res.json(trend);
};
