import { Router } from 'express';
import { getMarketTrendHandler, listCommodityPricesHandler } from './market.controller.js';

export const marketRouter = Router();

marketRouter.get('/prices', listCommodityPricesHandler);
marketRouter.get('/trend', getMarketTrendHandler);
