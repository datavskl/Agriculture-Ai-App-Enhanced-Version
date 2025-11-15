import { NextFunction, Request, Response } from 'express';
import { logger } from '../config/logger.js';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = process.hrtime.bigint();

  res.on('finish', () => {
    const duration = Number(process.hrtime.bigint() - start) / 1_000_000;
    logger.info({
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      duration: `${duration.toFixed(2)}ms`,
    });
  });

  next();
};
