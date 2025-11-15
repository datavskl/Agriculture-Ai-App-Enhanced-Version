import express, { type Request, type Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import 'express-async-errors';

import { env } from './config/env.js';
import { requestLogger } from './middleware/requestLogger.js';
import { router as apiRouter } from './routes/index.js';
import { notFoundHandler } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';

export const createApp = () => {
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin: env.allowedOrigins,
    }),
  );
  app.use(express.json());
  app.use(requestLogger);

  app.get('/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.use('/api', apiRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
