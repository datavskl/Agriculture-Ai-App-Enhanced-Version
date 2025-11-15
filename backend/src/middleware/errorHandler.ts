import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { logger } from '../config/logger.js';

type ErrorWithStatus = Partial<Error> & { status?: number };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: unknown, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'ValidationError',
      details: err.errors,
    });
  }

  logger.error({ err }, 'Unhandled error');

  const error = err as ErrorWithStatus;
  const status = typeof error.status === 'number' ? error.status : 500;
  const message = error.message ?? 'Internal Server Error';

  return res.status(status).json({ error: message });
};
